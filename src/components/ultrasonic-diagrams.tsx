import { ArrowRight, Radio, Cpu, Cable, CircuitBoard } from "lucide-react";
import { useState } from "react";
import { ultrasonicExplanation as copy } from "@/lib/vidi-content";

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

function PairTiming() {
  const [step, setStep] = useState(0);
  const { steps, triggerGapMs, echoDeadlineMs } = copy.timing;

  return <>
    <p className="sensor-note">The Pi requests a fresh pair. The ESP32 triggers left, then right, with at least {triggerGapMs} ms between trigger attempts and a {echoDeadlineMs} ms echo deadline per channel.</p>
    <ol className="pair-sequence" aria-label="Measurement sequence">
      {steps.map((item, index) => <li key={item.title}>
        <button type="button" aria-current={index === step ? "step" : undefined} onClick={() => setStep(index)}>
          <code>{item.signal}</code><strong>{item.title}</strong>
        </button>
      </li>)}
    </ol>
    <div className="multiplex-controls">
      <button type="button" onClick={() => setStep(current => (current + 1) % steps.length)}>Step</button>
      <p className="sensor-note" aria-live="polite">{steps[step].detail}</p>
    </div>
  </>;
}

export function UltrasonicDiagrams() {
  const NodeIcons = [Radio, Cpu, Cable, CircuitBoard];
  return <div className="ultrasonic-explanation">
    <article className="sensor-diagram echo-diagram" data-reveal aria-labelledby="echo-title">
      <h3 id="echo-title">{copy.echo.title}</h3>
      <EchoCapture />
    </article>
    <article className="sensor-diagram timing-diagram" data-reveal aria-labelledby="timing-title">
      <h3 id="timing-title">{copy.timing.title}</h3>
      <PairTiming />
    </article>
    <article className="sensor-diagram transport-diagram" data-reveal aria-labelledby="transport-title">
      <h3 id="transport-title">{copy.transport.title}</h3>
      <div className="serial-flow">{copy.transport.nodes.map((node, i) => { const Icon = NodeIcons[i]; return <div className="serial-node" key={node}>{Icon && <Icon size={32} strokeWidth={1.5} aria-hidden="true" />}<strong>{node}</strong>{i < 3 && <ArrowRight className="serial-arrow" aria-hidden="true" />}</div>; })}</div>
      <p className="serial-label">JSON over USB serial · {copy.transport.baud.toLocaleString("en-US")} baud.</p>
      <div className="serial-details"><div><p className="sensor-note">{copy.transport.note}</p><p className="packet-caption">{copy.transport.packetLabel}</p></div><pre className="sensor-packet"><code>{JSON.stringify(copy.transport.packet, null, 2)}</code></pre></div>
    </article>
  </div>;
}
