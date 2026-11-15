import { ArrowRight, Battery, Radio, Cpu, Cable, CircuitBoard, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { ultrasonicExplanation as copy, sensorUpdateHz, sensorUpdateIntervalMs } from "@/lib/vidi-content";

function EchoCapture() {
  const [distanceCm, setDistanceCm] = useState(100);
  const speed = 331.3 + 0.606 * 20;
  const echoMs = 20 * distanceCm / speed;
  const echoEnd = 8 + 4.6 * echoMs;

  return <div className="echo-capture">
    <div className="capture-panel">
      <div className="capture-heading"><strong>HC-SR04 pulse capture</strong><span>Illustrative trace · 20 °C</span></div>
      <div className="capture-trace" aria-hidden="true">
        <div><span>TRIG</span><svg viewBox="0 0 100 30" preserveAspectRatio="none"><path d="M0 24H3V6H5V24H100" /></svg></div>
        <div><span>ECHO</span><svg viewBox="0 0 100 30" preserveAspectRatio="none"><path d={`M0 24H8V6H${echoEnd}V24H100`} /></svg></div>
        <div className="capture-interval"><span>Δt</span><div><span style={{ left: "8%", width: `${echoEnd - 8}%` }} /></div></div>
      </div>
      <p className="sensor-note">The ESP32 sends a 10 µs trigger. Interrupts timestamp both ECHO edges. Their difference is the acoustic round-trip time. The trigger width and delay before ECHO rises are schematic.</p>
    </div>
    <div className="capture-readout">
      <label htmlFor="echo-distance">Simulated obstacle distance</label>
      <input id="echo-distance" type="range" min="2" max="300" value={distanceCm} aria-valuetext={`${distanceCm} centimeters`} onChange={event => setDistanceCm(event.currentTarget.valueAsNumber)} />
      <output htmlFor="echo-distance"><strong>{distanceCm} cm</strong><span>{echoMs.toFixed(2)} ms echo</span></output>
      <p className="echo-formula">{copy.echo.formula}</p>
      <p className="sensor-note">At 20 °C, sound travels at about {speed.toFixed(1)} m/s. The firmware accepts raw ranges from 2 to 300 cm.</p>
    </div>
  </div>;
}

function MultiplexTiming() {
  const { slots, firingIntervalMs, lanes } = copy.timing;
  const times = [...slots, slots.length * firingIntervalMs];
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const edge = (index: number) => 10 + index * 100;
  const events = [times.filter((_, i) => i % 2 === 0), slots.filter((_, i) => i % 2 === 1), times.filter((_, i) => i > 0 && i % 2 === 0)];
  const trackWidth = edge(times.length - 1) + 20;

  useEffect(() => {
    if (!playing) return;
    // The final boundary is also the first left trigger of the next cycle.
    const timer = window.setInterval(() => setStep(current => current % slots.length + 1), firingIntervalMs);
    return () => window.clearInterval(timer);
  }, [playing, firingIntervalMs, slots.length]);

  return <>
    <div className="multiplex-chart" role="img" aria-label="Relative timing. The left sensor triggers at 0, 80, and 160 milliseconds. The right sensor triggers at 40 and 120 milliseconds. At 80 and 160 milliseconds, the ESP32 finishes the right slot and sends a fused packet just before the next left trigger.">
      <div className="multiplex-axis" aria-hidden="true">{times.map((ms, i) => <span key={ms} style={{ left: `${edge(i) / trackWidth * 100}%` }}>{ms}</span>)}<span className="multiplex-unit">ms</span></div>
      {[...lanes, "Fused JSON"].map((lane, index) => <div className="multiplex-lane" key={lane} aria-hidden="true">
        <strong>{lane}</strong>
        <svg viewBox={`0 0 ${trackWidth} 36`} preserveAspectRatio="none" className={index === 2 ? "multiplex-output" : undefined}>
          {slots.map((ms, i) => <rect key={ms} className={i % 2 === 0 ? "multiplex-slot left-slot" : "multiplex-slot right-slot"} x={edge(i)} width="100" height="36" />)}
          {times.map((ms, i) => <path key={ms} className="multiplex-grid" d={`M${edge(i)} 0V36`} />)}
          <path className="multiplex-cursor" d={`M${edge(step)} 0V36`} />
          <path className="multiplex-wave" d={`M0 28 ${events[index].map(ms => `H${edge(ms / firingIntervalMs)}v-19h14v19`).join(" ")} H${trackWidth}`} />
          {events[index].includes(times[step]) && <circle className="multiplex-active" cx={edge(step)} cy="9" r="4" />}
        </svg>
      </div>)}
    </div>
    <div className="multiplex-controls">
      <button type="button" onClick={() => setPlaying(current => !current)}>{playing ? "Pause" : "Play"}</button>
      <button type="button" onClick={() => { setPlaying(false); setStep(current => current % slots.length + 1); }}>Step</button>
      <span><strong>{times[step]} ms</strong> · {step % 2 !== 0 ? "Right trigger" : step === 0 ? "Left trigger" : "Fused packet → left trigger"}</span>
    </div>
    <p className="sensor-note">Play runs at {sensorUpdateHz(firingIntervalMs)} fused packets per second. Step advances {firingIntervalMs} ms. Pulse widths are illustrative.</p>
  </>;
}

function ProcessingCue({ index }: { index: number }) {
  return <svg viewBox="0 0 240 96" aria-hidden="true" className="processing-cue">
    {index === 0 && <>
      <path className="cue-grid" d="M23 12V75H221M23 32H221M23 54H221" />
      <path d="M33 27L68 34L103 42L138 49L173 57L208 64" />
      <g className="cue-raw"><circle cx="33" cy="24" r="3" /><circle cx="68" cy="38" r="3" /><circle cx="103" cy="39" r="3" /><circle cx="138" cy="19" r="3" /><circle cx="173" cy="61" r="3" /><circle cx="208" cy="62" r="3" /></g>
      <text x="151" y="21">Raw samples</text><text x="36" y="66">Tracked range</text><text x="188" y="90">Time →</text>
    </>}
    {index === 1 && <>
      <path className="cue-grid" d="M120 10V72M48 72H192" />
      <path d="M58 72L104 25L182 72M58 85H182M58 81V89M182 81V89" />
      <circle cx="58" cy="72" r="3" /><circle cx="182" cy="72" r="3" /><circle cx="104" cy="25" r="4" />
      <text x="113" y="22">Estimate</text><text x="35" y="71">L</text><text x="196" y="71">R</text>
      <text className="cue-label-field" x="120" y="89" textAnchor="middle">14 cm</text>
    </>}
    {index === 2 && <>
      <path className="cue-grid" d="M23 12V75H221M23 37H221M23 57H221" />
      <path d="M33 23L118 49" /><path className="cue-grid" d="M118 49L201 75M118 49V75M201 75V55" />
      <circle cx="118" cy="49" r="4" /><circle cx="201" cy="75" r="3" />
      <text x="123" y="43">Now</text><text x="153" y="21">Projection</text><text x="188" y="90">Time →</text>
    </>}
  </svg>;
}

export function UltrasonicDiagrams() {
  const updateMs = sensorUpdateIntervalMs(copy.timing.firingIntervalMs);
  const hz = sensorUpdateHz(copy.timing.firingIntervalMs);
  const NodeIcons = [Radio, Cpu, Cable, CircuitBoard];
  return <div className="ultrasonic-explanation">
    <article className="sensor-diagram echo-diagram" data-reveal aria-labelledby="echo-title">
      <h3 id="echo-title">{copy.echo.title}</h3>
      <EchoCapture />
    </article>
    <article className="sensor-diagram timing-diagram" data-reveal aria-labelledby="timing-title">
      <h3 id="timing-title">{copy.timing.title}</h3>
      <MultiplexTiming />
      <p className="timing-summary">One sensor fires every {copy.timing.firingIntervalMs} ms · Each sensor updates every {updateMs} ms · {hz} Hz per sensor.</p>
      <ol className="sensor-processing">
        {copy.timing.processing.map((step, i) => <li key={step}>
          <details name="esp32-processing">
            <summary>
              <span className="processing-heading"><strong>{step}</strong><ChevronDown size={18} aria-hidden="true" /></span>
              <ProcessingCue index={i} />
              <span className="processing-metric">{copy.timing.processingMetrics[i]}</span>
            </summary>
            <p>{copy.timing.processingDetails[i]}</p>
          </details>
          {i < copy.timing.processing.length - 1 && <ArrowRight className="processing-arrow" aria-hidden="true" />}
        </li>)}
      </ol>
    </article>
    <article className="sensor-diagram transport-diagram" data-reveal aria-labelledby="transport-title">
      <h3 id="transport-title">{copy.transport.title}</h3>
      <div className="serial-flow">{copy.transport.nodes.map((node, i) => { const Icon = NodeIcons[i]; return <div className="serial-node" key={node}>{Icon && <Icon size={32} strokeWidth={1.5} aria-hidden="true" />}<strong>{node}</strong>{i < 3 && <ArrowRight className="serial-arrow" aria-hidden="true" />}</div>; })}</div>
      <p className="serial-label">JSON over USB serial · {copy.transport.baud.toLocaleString("en-US")} baud.</p>
      <div className="serial-details"><div><p className="sensor-note">{copy.transport.note}</p><p className="packet-caption">{copy.transport.packetLabel}</p></div><pre className="sensor-packet"><code>{JSON.stringify(copy.transport.packet, null, 2)}</code></pre></div>
    </article>
    <aside className="sensor-power" data-reveal aria-label="System power"><Battery size={32} aria-hidden="true" /><div><h3>{copy.power.title}</h3><p>{copy.power.source}</p></div><div className="power-draw"><p>Approx. {copy.power.peakWatts} W peak system draw.</p><p>Estimated battery life at peak draw is approximately {copy.power.estimatedRuntimeHours} hours.</p></div></aside>
  </div>;
}
