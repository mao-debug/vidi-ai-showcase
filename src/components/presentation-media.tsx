import { Camera, AudioLines, Scan, Glasses, MoveUpRight, Image, UserRound } from "lucide-react";
import { presentationMedia, type TeamMember } from "@/lib/vidi-content";

// One editable headshot slot per team member: photo when supplied, reserved slot until then.
export function TeamHeadshot({ member }: { member: TeamMember }) {
  return (
    <figure className="team-headshot">
      {member.headshot ? (
        <img className="actual-headshot" src={member.headshot} alt={`Headshot of ${member.name}`} loading="lazy" />
      ) : (
        <div className="headshot-empty">
          <UserRound className="headshot-icon" strokeWidth={1} aria-hidden="true" />
          <span className="headshot-note"><span className="media-dot" />Headshot slot<MoveUpRight size={14} aria-hidden="true" /></span>
        </div>
      )}
    </figure>
  );
}

export function PresentationMedia({ slot }: { slot: string }) {
  const media = presentationMedia[slot];
  if (!media) return null;
  const Icon = slot === "walk" ? Scan : slot === "scene" ? AudioLines : slot === "detail" ? Camera : slot === "prototype" ? Glasses : Image;

  return (
    <figure className={`project-media media-${slot}`}>
      {media.src ? (
        media.kind === "image" ? (
          <img src={media.src} alt={media.alt} loading="lazy" className="actual-media" />
        ) : (
          <video controls preload="metadata" poster={media.poster} aria-label={media.alt} className="actual-media">
            <source src={media.src} />
            {media.captionsSrc && <track kind="captions" src={media.captionsSrc} srcLang="en" label="English" default />}
          </video>
        )
      ) : (
        <div className="media-empty">
          <div className="media-corner corner-tl" /><div className="media-corner corner-tr" />
          <div className="media-corner corner-bl" /><div className="media-corner corner-br" />
          {slot === "prototype" ? <PrototypeDiagram /> : <Icon className="media-icon" strokeWidth={1} aria-hidden="true" />}
          <div className="media-reservation"><span className="media-dot" />{slot === "prototype" ? "Actual glasses photo" : slot === "detail" ? "Camera & sensor close-up" : slot === "walk" ? "Actual demo footage / stills" : slot === "comparison" ? "Comparison visual" : "Actual project visual"}<MoveUpRight size={16} aria-hidden="true" /></div>
        </div>
      )}
      <figcaption className="media-caption"><span>{media.caption}</span><span>{media.src ? "Vidi" : "Placeholder · awaiting your media"}</span></figcaption>
      {media.kind === "video" && media.src && media.transcript && <details className="mt-4 text-muted-foreground"><summary>Demo transcript</summary><p className="mt-3">{media.transcript}</p></details>}
    </figure>
  );
}

function PrototypeDiagram() {
  return (
    <div className="prototype-diagram">
      <svg viewBox="0 0 700 260" role="img" aria-label="Conceptual glasses-frame diagram showing left and right ultrasonic sensors and a central IMX708 camera. Not a product photograph.">
        <g className="frame-strokes" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="M95 98 43 55 13 62 M605 98 657 55 687 62" />
          <path d="M85 94 Q165 64 277 93 L288 107 Q350 81 412 107 L423 93 Q535 64 615 94 L602 160 Q598 188 564 190 L460 190 Q429 187 421 158 L409 119 Q350 95 291 119 L279 158 Q271 187 240 190 L136 190 Q102 188 98 160 Z" />
          <path d="M114 108 Q185 88 261 108 L250 157 Q248 168 232 170 L142 170 Q125 167 122 151 Z M439 108 Q515 88 586 108 L578 151 Q575 167 558 170 L468 170 Q452 168 450 157 Z" />
        </g>
        <g className="sensor-strokes" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="102" cy="90" r="14" /><circle cx="102" cy="90" r="6" />
          <circle cx="598" cy="90" r="14" /><circle cx="598" cy="90" r="6" />
          <rect x="337" y="86" width="26" height="21" rx="3" /><circle cx="350" cy="96" r="6" />
          <path d="M102 70 V28 H175 M598 70 V28 H525 M350 112 V226" />
        </g>
        <g fill="currentColor" className="diagram-labels">
          <text x="185" y="33">LEFT SENSOR</text><text x="515" y="33" textAnchor="end">RIGHT SENSOR</text>
          <text x="350" y="247" textAnchor="middle">IMX708 CAMERA</text>
        </g>
      </svg>
      <span className="diagram-note">Hardware schematic · not a product photo</span>
    </div>
  );
}