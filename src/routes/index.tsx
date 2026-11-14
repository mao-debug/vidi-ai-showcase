import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, Radar, Eye, Headphones, MoveUpRight } from "lucide-react";
import { site, presentation as copy, footer } from "@/lib/vidi-content";
import { PresentationMedia } from "@/components/presentation-media";
import { usePresentationMotion } from "@/hooks/use-presentation-motion";
import caesarImage from "@/assets/caesar-glasses-concept.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "VIDI AI — A new perspective on independence" },
    { name: "description", content: "Vidi means ‘I saw.’ Meet Vidi AI, our wearable assistive-technology prototype: distance sensing, visual questions, and wearer control." },
    { property: "og:title", content: "VIDI AI — A new perspective on independence" },
    { property: "og:description", content: "From a new perspective to a wearable possibility. The Vidi AI live prototype presentation." },
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
    <header className="glass-header"><a href="#top" className="nav-brand" aria-label="Vidi AI, beginning">VIDI <span>AI</span></a><nav aria-label="Presentation sections">{copy.navigation.map(item => <a key={item.href} href={item.href}>{item.label}</a>)}</nav><span className="nav-domain">{site.domain}<ArrowUpRight size={13} aria-hidden="true" /></span></header>
    <main>
      <section className="hero-journey" aria-labelledby="hero-title">
        <div className="hero-stage">
          <img className="caesar-image" src={caesarImage} width={1536} height={1024} alt="Concept artwork of Julius Caesar in ivory drapery, looking at the audience and holding glasses in a white marble setting. These are concept glasses, not our prototype." fetchPriority="high" />
          <div className="hero-copy"><p className="hero-kicker">{copy.hero.kicker}</p><h1 id="hero-title">VIDI<br /><span>AI</span></h1><p className="hero-meaning">{copy.hero.meaning}</p><p className="hero-reference"><em>{copy.hero.reference}</em><span>— {copy.hero.attribution}</span></p></div>
          <div className="hero-footer"><span>{copy.hero.caption}</span><a href="#problem">{copy.hero.scroll}<ArrowDown size={17} aria-hidden="true" /></a></div>
          <div className="lens-dissolve" aria-hidden="true" />
        </div>
      </section>
      <section id="problem" className="section-shell problem-section" aria-labelledby="problem-title">
        <div data-reveal><Chapter n="I">The problem</Chapter><h2 id="problem-title">{copy.problem.title}</h2></div>
        <div className="problem-visual" data-reveal><PresentationMedia slot="problem" /></div>
        <div className="problem-captions">{copy.problem.captions.map((caption, i) => <p key={caption} data-reveal><span>0{i + 1}</span>{caption}</p>)}</div>
        <div className="comparison-row" data-reveal><div><h3>{copy.problem.comparisonTitle}</h3><p>{copy.problem.comparison}</p></div><PresentationMedia slot="comparison" /></div>
      </section>
      <section id="prototype" className="prototype-section section-shell" aria-labelledby="prototype-title">
        <div className="section-heading" data-reveal><Chapter n="II">The prototype</Chapter><h2 id="prototype-title">{copy.prototype.title}</h2><p className="section-subtitle">{copy.prototype.subtitle}</p></div>
        <div className="prototype-images"><div className="prototype-main" data-reveal><PresentationMedia slot="prototype" /></div><div className="prototype-detail" data-reveal><PresentationMedia slot="detail" /></div></div>
        <div className="prototype-labels" data-reveal>{copy.prototype.labels.map((label, i) => { const Icon = [Eye, Radar, Headphones][i]; return <p key={label}>{Icon && <Icon size={21} strokeWidth={1.3} aria-hidden="true" />}{label}</p>; })}</div>
      </section>
      <section id="demo" className="demo-section section-shell" aria-labelledby="demo-title">
        <div data-reveal><Chapter n="III">The demonstration</Chapter><h2 id="demo-title">{copy.demo.title}</h2><p className="status-label">{copy.demo.status}</p></div>
        <div className="demo-wide" data-reveal><PresentationMedia slot="walk" /></div><p className="supplement-note">{copy.demo.supplement}</p>
        <div className="scene-reveal"><div data-reveal><h3>{copy.demo.sceneTitle}</h3><span className="glass-label">{copy.demo.sceneStatus}</span><p>{copy.demo.sceneNote}</p></div><div data-reveal><PresentationMedia slot="scene" /></div></div>
      </section>
      <section id="how-it-works" className="hardware-section section-shell" aria-labelledby="hardware-title">
        <div data-reveal><Chapter n="IV">How it works</Chapter><h2 id="hardware-title">{copy.hardware.title}</h2></div>
        <div className="hardware-paths">{copy.hardware.paths.map((path, i) => <div className="hardware-path" key={path.label} data-reveal><div className="path-heading">{i === 0 ? <Radar strokeWidth={1.3} aria-hidden="true" /> : <Eye strokeWidth={1.3} aria-hidden="true" />}<h3>{path.label}</h3></div><ol>{path.steps.map((step, j) => <li key={step}><span className="path-index">0{j + 1}</span><span>{step}</span></li>)}</ol></div>)}</div>
        <div className="hardware-note" data-reveal><p>{copy.hardware.status}</p><p>{copy.hardware.note}</p></div>
      </section>
      <section id="next-steps" className="next-section section-shell" aria-labelledby="next-title">
        <div data-reveal><Chapter n="V">What’s next</Chapter><h2 id="next-title">{copy.next.title}</h2><p className="section-subtitle">{copy.next.subtitle}</p></div>
        <div className="activity-cues">{copy.next.cues.map((cue, i) => <div data-reveal key={cue}><span>0{i + 1}</span><p>{cue}</p><MoveUpRight size={25} strokeWidth={1} aria-hidden="true" /></div>)}</div>
        <p className="future-line" data-reveal>{copy.next.future}<br /><span>{copy.next.access}</span></p><p className="milestone" data-reveal>{copy.next.milestone}</p>
        <div className="final-word" data-reveal><p>On your terms.</p><span>VIDI AI</span></div>
      </section>
    </main>
    <footer className="presentation-footer section-shell"><span>VIDI AI</span><p>{footer.team.join(" · ")}</p><span>{site.domain}</span></footer>
  </div>;
}
