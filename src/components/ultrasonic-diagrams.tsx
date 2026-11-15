import { ArrowRight, Battery, Radio, Cpu, Cable, CircuitBoard } from "lucide-react";
import { ultrasonicExplanation as copy, sensorUpdateHz, sensorUpdateIntervalMs } from "@/lib/vidi-content";

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
      <div className="sensor-timing" role="img" aria-label="Left sensor fires at 0 and 80 milliseconds; right sensor fires at 40 and 120 milliseconds.">
        <div className="timing-axis"><span />{copy.timing.slots.map(ms => <span key={ms}>{ms} ms</span>)}</div>
        {copy.timing.lanes.map((lane, laneIndex) => <div className="timing-lane" key={lane}><strong>{lane}</strong>{copy.timing.slots.map((ms, slotIndex) => <span key={ms} className={`timing-slot ${slotIndex % 2 === laneIndex ? "timing-fire" : "timing-wait"} firing-${slotIndex}`}><span>{slotIndex % 2 === laneIndex ? "↑" : "—"}</span></span>)}</div>)}
      </div>
      <p className="timing-summary">One sensor fires every {copy.timing.firingIntervalMs} ms · Each sensor updates every {updateMs} ms · {hz} Hz per sensor.</p>
      <ol className="sensor-processing">{copy.timing.processing.map((step, i) => <li key={step}><ProcessingCue index={i} /><strong>{step}</strong>{i < copy.timing.processing.length - 1 && <ArrowRight className="processing-arrow" aria-hidden="true" />}</li>)}</ol>
    </article>
    <article className="sensor-diagram transport-diagram" data-reveal aria-labelledby="transport-title">
      <h3 id="transport-title">{copy.transport.title}</h3>
      <div className="serial-flow">{copy.transport.nodes.map((node, i) => { const Icon = NodeIcons[i]; return <div className="serial-node" key={node}>{Icon && <Icon size={32} strokeWidth={1.5} aria-hidden="true" />}<strong>{node}</strong>{i < 3 && <ArrowRight className="serial-arrow" aria-hidden="true" />}</div>; })}</div>
      <p className="serial-label">JSON over USB serial · {copy.transport.baud.toLocaleString("en-US")} baud.</p>
      <div className="serial-details"><div><p className="sensor-note">{copy.transport.note}</p><p className="packet-caption">{copy.transport.packetLabel}</p></div><pre className="sensor-packet"><code>{JSON.stringify(copy.transport.packet, null, 2)}</code></pre></div>
    </article>
    <aside className="sensor-power" data-reveal aria-label="System power"><Battery size={32} aria-hidden="true" /><div><h3>{copy.power.title}</h3><p>{copy.power.source}</p></div><div className="power-draw"><p>Approx. {copy.power.peakWatts} W peak system draw.</p><p>Approx. {copy.power.estimatedRuntimeHours} hours battery life at peak system draw.</p></div></aside>
  </div>;
}