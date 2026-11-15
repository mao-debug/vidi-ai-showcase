import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, Radar, Eye, Linkedin } from "lucide-react";
import { site, presentation as copy, footer } from "@/lib/vidi-content";
import { PresentationMedia, TeamHeadshot } from "@/components/presentation-media";
import { usePresentationMotion } from "@/hooks/use-presentation-motion";
import caesarImage from "@/assets/caesar-cinematic-concept.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "VIDI — A new perspective on independence" },
    { name: "description", content: "Envision the Future, Empower the Execution. Meet Vidi, our wearable assistive-technology prototype: distance sensing, visual questions, and wearer control." },
    { property: "og:title", content: "VIDI — A new perspective on independence" },
    { property: "og:description", content: "From a new perspective to a wearable possibility. The Vidi live prototype presentation." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: Index,
});
function Chapter({ n, children }: { n: string; children: React.ReactNode }) {
  return <p className="chapter-label"><span>{n}</span><span className="chapter-line" />{children}</p>;
}
function Index() {
  usePresentationMotion();
  return <div className="presentation" id="top">
    <a href="#problem" className="skip-link">Skip to presentation</a>
    <div className="reading-progress" aria-hidden="true" />
    <header className="glass-header"><a href="#top" className="nav-brand" aria-label="Vidi, beginning">VIDI</a><nav aria-label="Presentation sections">{copy.navigation.map(item => <a key={item.href} href={item.href}>{item.label}</a>)}</nav><span className="nav-domain">{site.domain}<ArrowUpRight size={13} aria-hidden="true" /></span></header>
    <main>
      <section className="hero-journey" aria-labelledby="hero-title">
        <div className="hero-stage">
          <img className="caesar-image" src={caesarImage} width={1536} height={1024} alt="Cinematic concept artwork of Julius Caesar in a charcoal cloak, turning toward cool light and holding modern glasses below his chin by one temple. Concept eyewear, not the Vidi prototype." fetchPriority="high" />
          <div className="hero-copy"><h1 id="hero-title">{copy.hero.title}</h1><p className="hero-meaning"><em>{copy.hero.meaning}</em></p></div>
          <div className="hero-footer"><span>{copy.hero.caption}</span><a href="#problem">{copy.hero.scroll}<ArrowDown size={17} aria-hidden="true" /></a></div>
          <div className="lens-dissolve" aria-hidden="true" />
        </div>
      </section>
      <section id="problem" className="section-shell problem-section" aria-labelledby="problem-title">
        <div className="problem-split">
          <div className="problem-text">
            <div data-reveal><Chapter n="I">The problem</Chapter><h2 id="problem-title">{copy.problem.title}</h2></div>
            <div className="problem-captions">{copy.problem.captions.map((caption, i) => <p key={caption} data-reveal><span>0{i + 1}</span><span className="problem-caption-body"><strong>{caption}</strong><small>{copy.problem.details[i]}</small></span></p>)}</div>
          </div>
          <div className="problem-visual" data-reveal><PresentationMedia slot="problem" /><div className="problem-graph" data-reveal><PresentationMedia slot="problemGraph" /></div></div>
        </div>
      </section>
      <section id="prototype" className="prototype-section section-shell" aria-labelledby="prototype-title">
        <div className="section-heading" data-reveal><Chapter n="II">Our Solution</Chapter><h2 id="prototype-title">{copy.prototype.title}</h2><p className="section-subtitle">{copy.prototype.subtitle}</p></div>
        <div className="prototype-images"><div className="prototype-main" data-reveal><PresentationMedia slot="prototype" /></div><div className="prototype-detail" data-reveal><div className="solution-box"><p className="solution-kicker">{copy.prototype.solution.kicker}</p><h3 className="solution-title">{copy.prototype.solution.title}</h3><ul className="solution-points">{copy.prototype.solution.points.map((point, i) => <li key={point}><span>0{i + 1}</span>{point}</li>)}</ul><p className="solution-status">{copy.prototype.solution.status}</p></div></div><div className="prototype-bottom-text solution-box" data-reveal><p className="solution-kicker">{copy.prototype.bottomNote.kicker}</p><p className="solution-line">{copy.prototype.bottomNote.line}</p></div><div className="prototype-bottom-media" data-reveal><PresentationMedia slot="detail" /></div></div>
      </section>
      <section id="how-it-works" className="hardware-section section-shell" aria-labelledby="hardware-title">
        <div data-reveal><Chapter n="III">How It Works</Chapter><h2 id="hardware-title">{copy.hardware.title}</h2></div>
        <div className="hardware-split"><div className="architecture-figure" data-reveal><PresentationMedia slot="architecture" /></div><div className="hardware-side solution-box" data-reveal><p className="solution-kicker">{copy.hardware.sideBox.kicker}</p><h3 className="solution-title">{copy.hardware.sideBox.title}</h3><ul className="solution-points">{copy.hardware.sideBox.points.map((point, i) => <li key={point}><span>0{i + 1}</span>{point}</li>)}</ul><p className="solution-status">{copy.hardware.sideBox.status}</p></div></div>
        <div className="hardware-paths">{copy.hardware.paths.map((path, i) => <div className="hardware-path" key={path.label} data-reveal><div className="path-heading">{i === 0 ? <Radar strokeWidth={1.3} aria-hidden="true" /> : <Eye strokeWidth={1.3} aria-hidden="true" />}<h3>{path.label}</h3></div><ol>{path.steps.map((step, j) => <li key={step}><span className="path-index">0{j + 1}</span><span>{step}</span></li>)}</ol></div>)}</div>
      </section>
      <section id="next-steps" className="next-section section-shell" aria-labelledby="next-title">
        <div data-reveal><Chapter n="IV">What’s Next</Chapter><h2 id="next-title">{copy.next.title}</h2><p className="section-subtitle">{copy.next.subtitle}</p></div>
        <div className="next-timeline">{copy.next.cards.map((card) => <article className="next-card" data-reveal key={card.label}><p className="next-card-label">{card.label}</p><h3>{card.title}</h3><p className="next-card-text">{card.text}</p></article>)}</div>
      </section>
      <section id="team" className="team-section section-shell" aria-labelledby="team-title">
        <div data-reveal><Chapter n="V">Meet the team</Chapter><h2 id="team-title">{copy.team.title}</h2><p className="section-subtitle">{copy.team.subtitle}</p></div>
        <p className="control-status" data-reveal>{copy.team.status}</p>
        <ul className="team-cards">
          {copy.team.members.map((member) => <li className="team-card" key={member.name} data-reveal>
            <TeamHeadshot member={member} />
            <h3 className="team-name">{member.name}</h3>
            <p className="team-role">{member.role}</p>
            {member.linkedin ? <a className="team-link" href={member.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn<Linkedin size={15} aria-hidden="true" /></a> : <span className="team-link team-link-empty">LinkedIn link to add</span>}
          </li>)}
        </ul>
      </section>
    </main>
    <footer className="presentation-footer section-shell"><span>VIDI</span><p>{footer.note}</p><span>{site.domain}</span></footer>
  </div>;
}
