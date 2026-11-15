import { ArrowRight, Battery, Radio, Cpu, Cable, CircuitBoard } from "lucide-react";
import { useEffect, useState } from "react";
import { ultrasonicExplanation as copy, sensorUpdateHz, sensorUpdateIntervalMs } from "@/lib/vidi-content";

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
  return <svg viewBox="0 0 160 60" aria-hidden="true" className="processing-cue">
    {index === 0 && <><g className="cue-noise">{[12, 27, 42, 58, 74].map((x, i) => <circle key={x} cx={x} cy={[36, 15, 43, 22, 34][i]} r="3" />)}</g><path d="M84 30h20m-6-6 6 6-6 6M112 42l14-8 14-6 14-12" /><circle cx="126" cy="34" r="3" /><circle cx="140" cy="28" r="3" /></>}
    {index === 1 && <><path d="M25 53 80 12 135 53M25 53Q10 0 80 12M135 53Q150 0 80 12" /><circle cx="80" cy="12" r="5" /><circle cx="25" cy="53" r="3" /><circle cx="135" cy="53" r="3" /></>}
    {index === 2 && <><circle cx="48" cy="30" r="22" /><path d="M48 14v16l12 8M84 30h61m-8-8 8 8-8 8" /></>}
  </svg>;
}

export function UltrasonicDiagrams() {
  const updateMs = sensorUpdateIntervalMs(copy.timing.firingIntervalMs);
  const hz = sensorUpdateHz(copy.timing.firingIntervalMs);
  const NodeIcons = [Radio, Cpu, Cable, CircuitBoard];
  return <div className="ultrasonic-explanation">
    <article className="sensor-diagram echo-diagram" data-reveal aria-labelledby="echo-title">
      <h3 id="echo-title">{copy.echo.title}</h3>
      <div className="echo-scene">
        <div className="echo-sensor"><Radio size={34} aria-hidden="true" /><strong>{copy.echo.sensor}</strong></div>
        <div className="echo-travel"><div className="pulse-lane pulse-out"><span>{copy.echo.outbound}</span><ArrowRight aria-hidden="true" /></div><div className="pulse-lane pulse-back"><ArrowRight aria-hidden="true" /><span>{copy.echo.returning}</span></div></div>
        <div className="echo-obstacle"><span aria-hidden="true" /><strong>{copy.echo.obstacle}</strong></div>
      </div>
      <p className="echo-formula">{copy.echo.formula}</p><p className="sensor-note">{copy.echo.note}</p>
    </article>
    <article className="sensor-diagram timing-diagram" data-reveal aria-labelledby="timing-title">
      <h3 id="timing-title">{copy.timing.title}</h3>
      <MultiplexTiming />
      <p className="timing-summary">One sensor fires every {copy.timing.firingIntervalMs} ms · Each sensor updates every {updateMs} ms · {hz} Hz per sensor.</p>
      <ol className="sensor-processing">
        {copy.timing.processing.map((step, i) => <li key={step}>
          <details name="esp32-processing">
            <summary><ProcessingCue index={i} /><strong>{step}</strong></summary>
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
