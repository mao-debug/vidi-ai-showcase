import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowDownRight, Radar, Eye, Headphones, Hand, Mic, ScanEye } from "lucide-react";
import { site, problem, intro, demoMoments, hardware, control, footer } from "@/lib/vidi-content";
import { PresentationMedia } from "@/components/presentation-media";
import { usePresentationMotion } from "@/hooks/use-presentation-motion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vidi AI — Visual information, on your terms" },
      { name: "description", content: "Vidi AI: a wearable assistive-technology prototype. Explore the problem, our prototype, three demo moments, and the next steps in one continuous presentation." },
      { property: "og:title", content: "Vidi AI — Visual information, on your terms" },
      { property: "og:description", content: "A wearable prototype that turns what a camera sees into information the wearer can use. The Vidi AI final presentation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Chapter({ number, children }: { number: string; children: React.ReactNode }) {
  return <div className="chapter-label"><span>{number}</span><span className="chapter-line" /><span>{children}</span></div>;
}

function Index() {
  usePresentationMotion();
  return (
    <div className="presentation" id="top">
      <a href="#main" className="skip-link">Skip to main content</a>
      <div className="reading-progress" aria-hidden="true" />
      <header className="presentation-header">
        <span className="wordmark"><span className="brand-symbol" aria-hidden="true">v.</span>{site.name}</span>
        <span className="header-note">A wearable perspective<span className="media-dot" /></span>
      </header>
      <main id="main">
        <section id="problem" className="opening section-shell" aria-labelledby="problem-heading">
          <div className="opening-content">
            <Chapter number="01">The problem</Chapter>
            <h1 id="problem-heading" className="opening-title"><span>What’s in</span><span>front of <em>me?</em></span></h1>
            <p className="opening-intro">Getting timely visual information can take extra steps. Checking an obstacle at head height. Identifying a bill. Choosing what to wear.</p>
            <div className="opening-bottom"><span>{site.name}<br /><span className="text-muted-foreground">Visual information, on your terms.</span></span><ArrowDown size={28} strokeWidth={1} aria-hidden="true" /></div>
          </div>
          <div className="perspective-field" aria-hidden="true"><div className="perspective-plane plane-one" /><div className="perspective-plane plane-two" /><div className="perspective-plane plane-three" /><span className="field-cross cross-one">+</span><span className="field-cross cross-two">+</span><div className="field-caption">A different way to see.</div></div>
        </section>

        <section className="context-section section-shell" aria-label="Our design goal">
          <div className="context-copy" data-reveal><p>{problem.paragraphs[1]}</p><span className="small-label">The opportunity</span></div>
          <div className="goal-statement" data-reveal><ArrowDownRight className="goal-arrow" strokeWidth={1} aria-hidden="true" /><h2>Everyday visual information.<br /><span className="text-primary">A wearable interface.</span><br />The user in control.</h2><p>Increasing autonomy, while respecting the value of existing tools and human assistance.</p></div>
        </section>

        <section className="prototype-section section-shell" aria-labelledby="intro-heading">
          <div className="section-heading" data-reveal><Chapter number="02">Meet the prototype</Chapter><h2 id="intro-heading" className="brand-title">{site.name}<span className="text-primary">.</span></h2><p className="section-deck">{site.tagline}</p><p className="body-copy">{intro.nameExplanation}</p></div>
          <div data-reveal className="prototype-visual"><PresentationMedia slot="prototype" /></div>
          <div className="prototype-specs" data-reveal><span><Radar size={20} aria-hidden="true" />Two distance zones</span><span><Eye size={20} aria-hidden="true" />One camera</span><span><Headphones size={20} aria-hidden="true" />Spoken information</span></div>
        </section>

        <section id="demo" className="demo-section" aria-labelledby="demo-heading">
          <div className="section-shell demo-heading" data-reveal><Chapter number="03">Three moments</Chapter><h2 id="demo-heading" className="section-title">Different moments.<br /><span className="text-primary">One perspective.</span></h2></div>
          {demoMoments.map((moment, index) => (
            <article className={`demo-moment moment-${moment.id}`} key={moment.id} aria-labelledby={`heading-${moment.id}`}>
              <div className="section-shell moment-grid">
                <div className="moment-copy" data-reveal><span className="moment-number" aria-hidden="true">0{index + 1}</span><p className="moment-status"><span className="media-dot" />{moment.status}</p><h3 id={`heading-${moment.id}`}>{moment.cue}</h3><p className="moment-subtitle">{moment.title}</p><p className="body-copy">{moment.body}</p></div>
                <div className="moment-visual" data-reveal><PresentationMedia slot={moment.id} /></div>
              </div>
            </article>
          ))}
        </section>

        <section id="how-it-works" className="hardware-section section-shell" aria-labelledby="hardware-heading">
          <div data-reveal><Chapter number="04">Behind the frame</Chapter><h2 id="hardware-heading" className="section-title">Two paths.<br /><span className="text-primary">One wearable.</span></h2></div>
          <div className="hardware-paths">{hardware.paths.map((path, index) => <div className="hardware-path" data-reveal key={path.label}><div className="path-title">{index === 0 ? <Radar aria-hidden="true" /> : <Eye aria-hidden="true" />}<h3>{path.label}</h3></div><ol>{path.steps.map((step, i) => <li key={step}><span className="path-node" aria-hidden="true">0{i + 1}</span><span>{step}</span></li>)}</ol></div>)}</div>
          <div className="hardware-notes" data-reveal><p className="text-primary">{hardware.status}</p><p>{hardware.stereoscopic}</p></div>
        </section>

        <section id="next-steps" className="control-section section-shell" aria-labelledby="control-heading">
          <div data-reveal><Chapter number="05">The next question</Chapter><h2 id="control-heading" className="section-title">How does the wearer<br /><span className="text-primary">stay in control?</span></h2><p className="body-copy control-intro">{control.intro}</p></div>
          <div className="control-grid"><div data-reveal><h3>{control.activityCues.heading}</h3><p className="body-copy">{control.activityCues.body}</p></div><div data-reveal><h3>{control.ideas.heading}</h3><ul className="control-ideas">{control.ideas.items.map((item, i) => { const Icon = [Mic, Hand, ScanEye][i]; return <li key={item}>{Icon && <Icon size={22} aria-hidden="true" />}<span>{item}</span></li>; })}</ul></div></div>
          <p className="future-note" data-reveal>{control.futureChip}</p>
          <div className="closing-statement" data-reveal><span className="small-label">Next milestone</span><p>Start.<br /><span>Redirect.</span><br /><em>Stop.</em></p><div className="closing-caption">Test whether wearers can reliably start, redirect, and stop assistance.<ArrowDownRight size={38} strokeWidth={1} aria-hidden="true" /></div></div>
        </section>
      </main>
      <footer className="presentation-footer section-shell"><span className="wordmark">{site.name}<span className="text-primary">.</span></span><p>{footer.team.join(" · ")}</p><span>{site.domain}</span></footer>
    </div>
  );
}
