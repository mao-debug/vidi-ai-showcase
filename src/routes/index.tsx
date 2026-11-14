import { createFileRoute } from "@tanstack/react-router";
import {
  site,
  nav,
  problem,
  intro,
  demoMoments,
  hardware,
  control,
  footer,
} from "@/lib/vidi-content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vidi AI — Visual information, on your terms" },
      {
        name: "description",
        content:
          "Vidi AI is a wearable assistive-technology prototype for people who are blind or have low vision. Final presentation: the problem, three demo moments, the hardware, and what comes next.",
      },
      { property: "og:title", content: "Vidi AI — Visual information, on your terms" },
      {
        property: "og:description",
        content:
          "A wearable assistive-technology prototype that turns what a camera sees into information the wearer can use. Final presentation at vidiai.us.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4"
        >
          <a href="#top" className="text-xl font-bold tracking-tight">
            {site.name}
          </a>
          <ul className="flex flex-wrap items-center gap-6 text-base">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#demo"
                className="inline-block rounded-md bg-primary px-5 py-2 font-semibold text-primary-foreground hover:opacity-90"
              >
                Jump to demo
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main id="main">
        {/* Problem */}
        <section id="problem" aria-labelledby="problem-heading" className="mx-auto max-w-4xl px-6 py-24">
          <h1 id="problem-heading" className="text-5xl font-bold leading-tight tracking-tight md:text-6xl">
            {problem.headline}
          </h1>
          {problem.paragraphs.map((p) => (
            <p key={p.slice(0, 24)} className="mt-8 text-xl leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}
          <p className="mt-10 rounded-lg border-l-4 border-primary bg-card p-6 text-xl leading-relaxed">
            {problem.goal}
          </p>
        </section>

        {/* Name + prototype */}
        <section aria-labelledby="intro-heading" className="border-y border-border bg-card">
          <div className="mx-auto max-w-4xl px-6 py-24">
            <h2 id="intro-heading" className="text-4xl font-bold tracking-tight md:text-5xl">
              {site.name}
            </h2>
            <p className="mt-4 text-2xl text-primary">{site.tagline}</p>
            <p className="mt-6 text-xl leading-relaxed text-muted-foreground">
              {intro.nameExplanation}
            </p>

            <figure className="mt-12 rounded-lg border border-border bg-background p-8">
              <figcaption className="text-lg font-semibold">
                {intro.mediaSlotLabel}
              </figcaption>
              <p className="mt-2 text-base text-muted-foreground">{intro.mediaSlotNote}</p>
              <HardwareDiagram />
            </figure>
          </div>
        </section>

        {/* Demo moments */}
        <section id="demo" aria-labelledby="demo-heading" className="mx-auto max-w-6xl px-6 py-24">
          <h2 id="demo-heading" className="text-4xl font-bold tracking-tight md:text-5xl">
            Three demo moments
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {demoMoments.map((moment) => (
              <article
                key={moment.id}
                className="flex flex-col rounded-lg border border-border bg-card p-8"
              >
                <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                  {moment.status}
                </p>
                <h3 className="mt-4 text-2xl font-bold leading-snug">{moment.cue}</h3>
                <p className="mt-2 text-lg font-semibold text-muted-foreground">
                  {moment.title}
                </p>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                  {moment.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Hardware */}
        <section
          id="how-it-works"
          aria-labelledby="hardware-heading"
          className="border-y border-border bg-card"
        >
          <div className="mx-auto max-w-6xl px-6 py-24">
            <h2 id="hardware-heading" className="text-4xl font-bold tracking-tight md:text-5xl">
              {hardware.title}
            </h2>
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {hardware.paths.map((path) => (
                <div key={path.label} className="rounded-lg border border-border bg-background p-8">
                  <h3 className="text-xl font-bold">{path.label}</h3>
                  <ol className="mt-6 space-y-4">
                    {path.steps.map((step, i) => (
                      <li key={step} className="flex items-center gap-4">
                        <span
                          aria-hidden="true"
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground"
                        >
                          {i + 1}
                        </span>
                        <span className="text-lg">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
            <p className="mt-10 text-xl font-semibold text-primary">{hardware.status}</p>
            <p className="mt-6 max-w-4xl text-lg leading-relaxed text-muted-foreground">
              {hardware.stereoscopic}
            </p>
          </div>
        </section>

        {/* Control gap / next steps */}
        <section id="next-steps" aria-labelledby="control-heading" className="mx-auto max-w-4xl px-6 py-24">
          <h2 id="control-heading" className="text-4xl font-bold tracking-tight md:text-5xl">
            {control.title}
          </h2>
          <p className="mt-8 text-xl leading-relaxed text-muted-foreground">{control.intro}</p>

          <div className="mt-12 space-y-10">
            <div>
              <h3 className="text-2xl font-bold">{control.activityCues.heading}</h3>
              <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
                {control.activityCues.body}
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold">{control.ideas.heading}</h3>
              <ul className="mt-4 list-disc space-y-3 pl-8 text-lg leading-relaxed text-muted-foreground">
                {control.ideas.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <p className="text-lg leading-relaxed text-muted-foreground">{control.futureChip}</p>
            <p className="rounded-lg border-l-4 border-primary bg-card p-6 text-xl font-semibold leading-relaxed">
              {control.milestone}
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-base text-muted-foreground">
          <p>
            {site.name} — {footer.team.join(" · ")}
          </p>
          <p>
            {footer.note}{" "}
            <a
              href={`https://${site.domain}`}
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              {site.domain}
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

/**
 * Labeled stand-in diagram for the glasses prototype.
 * Replace this whole figure with the real photo or demo clip when available.
 */
function HardwareDiagram() {
  return (
    <div
      role="img"
      aria-label="Diagram of the Vidi AI glasses: two ultrasonic distance sensors on the front of the frame connected to an ESP32 microcontroller, and one IMX708 camera connected to a Raspberry Pi 4, which sends audio responses to a Bluetooth headset."
      className="mt-8 grid gap-6 md:grid-cols-3"
    >
      <div className="rounded-lg border border-border bg-card p-6 text-center">
        <p className="text-lg font-bold">Glasses frame</p>
        <p className="mt-2 text-base text-muted-foreground">
          Two ultrasonic sensors (left and right zones) + one IMX708 camera
        </p>
      </div>
      <div className="rounded-lg border border-border bg-card p-6 text-center">
        <p className="text-lg font-bold">Processing</p>
        <p className="mt-2 text-base text-muted-foreground">
          ESP32 reads the sensors; Raspberry Pi 4 handles the camera and requests
        </p>
      </div>
      <div className="rounded-lg border border-border bg-card p-6 text-center">
        <p className="text-lg font-bold">Output</p>
        <p className="mt-2 text-base text-muted-foreground">
          Short spoken responses through a Bluetooth headset
        </p>
      </div>
    </div>
  );
}
