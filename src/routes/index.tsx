import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, Eye, Linkedin } from "lucide-react";
import { site, presentation as copy, footer } from "@/lib/vidi-content";
import { PresentationMedia, TeamHeadshot } from "@/components/presentation-media";
import { usePresentationMotion } from "@/hooks/use-presentation-motion";
import caesarImage from "@/assets/caesar-cinematic-concept.jpg";
import { UltrasonicDiagrams } from "@/components/ultrasonic-diagrams";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "VIDI — A new perspective on independence" },
    { name: "description", content: "Meet VIDI, our wearable assistive technology prototype with distance sensing, spoken answers about the scene, and wearer controls." },
    { property: "og:title", content: "VIDI — A new perspective on independence" },
    { property: "og:description", content: "Explore the VIDI smart glasses prototype and see how it combines distance sensing, vision, and voice." },
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
    <header className="glass-header">
      <a href="#top" className="nav-brand" aria-label="VIDI, back to top">VIDI</a>
      <nav className="desktop-sections" aria-label="Presentation sections">{copy.navigation.map(item => <a key={item.href} href={item.href}>{item.label}</a>)}</nav>
      <details className="mobile-sections">
        <summary>Sections</summary>
        <nav aria-label="Presentation sections">{copy.navigation.map(item => <a key={item.href} href={item.href} onClick={event => {
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
          const menu = event.currentTarget.closest("details");
          menu?.querySelector("summary")?.focus();
          if (menu) menu.open = false;
        }}>{item.label}</a>)}</nav>
      </details>
      <span className="nav-domain">{site.domain}<ArrowUpRight size={13} aria-hidden="true" /></span>
    </header>
    <main>
      <section className="hero-journey" aria-labelledby="hero-title">
        <div className="hero-stage">
          <img className="caesar-image" src={caesarImage} width={1536} height={1024} alt="Cinematic concept artwork of Julius Caesar in a charcoal cloak, turning toward cool light and holding modern glasses below his chin by one temple. Concept eyewear, not the VIDI prototype." fetchPriority="high" />
          <div className="hero-copy"><h1 id="hero-title">{copy.hero.title}</h1><p className="hero-meaning"><em>{copy.hero.meaning}</em></p></div>
          <div className="hero-footer">
            <span>{copy.hero.caption}</span>
            <a className="hero-qr" href={`https://${site.domain}/`}>
              <img src="/vidi-follow-along.svg" width={104} height={104} alt="" />
              <span><strong>Follow along</strong><br />{site.domain}</span>
            </a>
            <a href="#problem">{copy.hero.scroll}<ArrowDown size={17} aria-hidden="true" /></a>
          </div>
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
        <div className="section-heading" data-reveal><Chapter n="II">Our solution</Chapter><h2 id="prototype-title">{copy.prototype.title}</h2><p className="section-subtitle">{copy.prototype.subtitle}</p></div>
        <div className="prototype-images"><div className="prototype-row prototype-row-top"><div className="prototype-main" data-reveal><PresentationMedia slot="prototype" /></div><div className="prototype-detail" data-reveal><div className="solution-box"><p className="solution-kicker">{copy.prototype.solution.kicker}</p><h3 className="solution-title">{copy.prototype.solution.title}</h3><ul className="solution-points">{copy.prototype.solution.points.map((point, i) => <li key={point}><span>0{i + 1}</span>{point}</li>)}</ul><p className="solution-status">{copy.prototype.solution.status}</p></div></div></div><div className="prototype-row prototype-row-bottom"><div className="prototype-bottom-text solution-box" data-reveal><p className="solution-kicker">{copy.prototype.bottomNote.kicker}</p><p className="solution-line">{copy.prototype.bottomNote.line}</p></div><div className="prototype-bottom-media" data-reveal><PresentationMedia slot="detail" /></div></div></div>
      </section>
      <section id="engineering" className="engineering-section section-shell" aria-labelledby="engineering-title">
        <div data-reveal><Chapter n="III">Engineering and design</Chapter><h2 id="engineering-title">{copy.engineering.title}</h2><p className="section-subtitle">{copy.engineering.subtitle}</p></div>
        <div className="engineering-grid">
          <div className="engineering-mechanical" data-reveal>
            <p className="solution-kicker">{copy.engineering.mechanical.kicker}</p>
            <h3>{copy.engineering.mechanical.title}</h3>
            <p className="engineering-body">{copy.engineering.mechanical.body}</p>
            <ul className="engineering-tags">{copy.engineering.mechanical.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
          </div>
          <div className="engineering-photos" data-reveal>
            <ul className="engineering-photo-grid">
              {copy.engineering.photos.items.map((photo) => <li key={photo.label}><img src={photo.src} alt={photo.alt} loading="lazy" /><figcaption><strong>{photo.label}</strong><span>{photo.caption}</span></figcaption></li>)}
            </ul>
            <p className="engineering-render-note">{copy.engineering.photos.note}</p>
          </div>
        </div>
        <div className="engineering-architecture" data-reveal>
          <p className="solution-kicker">{copy.engineering.architecture.kicker}</p>
          <ul className="engineering-parts">
            {copy.engineering.architecture.items.map((item) => <li key={item.part}><strong>{item.part}</strong><span>{item.role}</span></li>)}
          </ul>
          <p className="engineering-comms">{copy.engineering.architecture.comms}</p>
        </div>
        <div className="engineering-lower">
          <div className="engineering-evolution" data-reveal>
            <p className="solution-kicker">{copy.engineering.evolution.kicker}</p>
            <h3>{copy.engineering.evolution.title}</h3>
            <ol className="engineering-steps">
              {copy.engineering.evolution.steps.map((step, i) => <li key={step}><span className="path-index">0{i + 1}</span><span>{step}</span></li>)}
            </ol>
          </div>
          <div className="engineering-innovation" data-reveal>
            <p className="solution-kicker">{copy.engineering.innovation.kicker}</p>
            <p className="engineering-body">{copy.engineering.innovation.body}</p>
            <ul className="engineering-limits">
              {copy.engineering.innovation.limitations.map((limit) => <li key={limit}>{limit}</li>)}
            </ul>
            <p className="engineering-status">{copy.engineering.innovation.status}</p>
          </div>
        </div>
      </section>
      <section id="how-it-works" className="hardware-section section-shell" aria-labelledby="hardware-title">
        <div data-reveal><Chapter n="IV">How it works</Chapter><h2 id="hardware-title">{copy.hardware.title}</h2></div>
        <UltrasonicDiagrams />
        <div className="hardware-paths">{copy.hardware.paths.slice(1).map((path) => <div className="hardware-path" key={path.label} data-reveal><div className="path-heading"><Eye strokeWidth={1.3} aria-hidden="true" /><h3>{path.label}</h3></div><ol>{path.steps.map((step, j) => <li key={step}><span className="path-index">0{j + 1}</span><span>{step}</span></li>)}</ol></div>)}</div>
      </section>
      <section id="software" className="software-section section-shell" aria-labelledby="software-title">
        <div data-reveal><Chapter n="V">Software</Chapter><h2 id="software-title">{copy.software.title}</h2><p className="section-subtitle">{copy.software.subtitle}</p></div>
        <div className="software-grid">
          {copy.software.modules.map((mod) => <article className="software-card" data-reveal key={mod.kicker}><p className="solution-kicker">{mod.kicker}</p><h3>{mod.title}</h3><p className="software-body">{mod.body}</p></article>)}
        </div>
        <div className="software-flow" data-reveal>
          <p className="solution-kicker">{copy.software.flow.kicker}</p>
          <ol>{copy.software.flow.steps.map((step, i) => <li key={step}><span className="path-index">0{i + 1}</span><span>{step}</span></li>)}</ol>
        </div>
      </section>
      <section id="next-steps" className="next-section section-shell" aria-labelledby="next-title">
        <div data-reveal><Chapter n="VI">What’s next</Chapter><h2 id="next-title">{copy.next.title}</h2><p className="section-subtitle">{copy.next.subtitle}</p></div>
        <div className="next-timeline">{copy.next.cards.map((card) => <article className="next-card" data-reveal key={card.label}><p className="next-card-label">{card.label}</p><h3>{card.title}</h3><p className="next-card-text">{card.text}</p></article>)}</div>
      </section>
      <section id="team" className="team-section section-shell" aria-labelledby="team-title">
        <div data-reveal><Chapter n="VII">Meet the team</Chapter><h2 id="team-title">{copy.team.title}</h2><p className="section-subtitle">{copy.team.subtitle}</p></div>
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
