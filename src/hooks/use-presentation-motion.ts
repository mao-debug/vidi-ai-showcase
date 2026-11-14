import { useEffect } from "react";

export function usePresentationMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 760px)");
    const hero = document.querySelector<HTMLElement>(".hero-journey");
    const image = document.querySelector<HTMLImageElement>(".caesar-image");
    const stage = document.querySelector<HTMLElement>(".hero-stage");
    let observer: IntersectionObserver | undefined;
    let frame = 0;
    const update = () => {
      frame = 0;
      const distance = root.scrollHeight - window.innerHeight;
      root.style.setProperty("--reading-progress", String(distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0));
      if (!hero || !image || !stage) return;
      if (reduced.matches || mobile.matches) { hero.style.setProperty("--hero-zoom", "1"); hero.style.setProperty("--hero-dissolve", "0"); hero.style.setProperty("--hero-copy", "1"); return; }
      const travel = hero.offsetHeight - stage.offsetHeight;
      const progress = Math.min(1, Math.max(0, -hero.getBoundingClientRect().top / Math.max(1, travel)));
      // Outward-facing right lens center in the 1536×1024 cinematic portrait.
      const width = stage.clientWidth, height = stage.clientHeight;
      const fit = Math.max(width / 1536, height / 1024);
      const lensX = (width - 1536 * fit) / 2 + 1536 * fit * .653;
      const lensY = (height - 1024 * fit) / 2 + 1024 * fit * .578;
      const push = Math.pow(progress, 1.65);
      const scale = 1 + push * 29;
      image.style.transformOrigin = `${lensX}px ${lensY}px`;
      image.style.transform = `translate(${(width / 2 - lensX) * push}px, ${(height / 2 - lensY) * push}px) scale(${scale})`;
      hero.style.setProperty("--hero-copy", String(1 - Math.min(1, progress * 4)));
      hero.style.setProperty("--hero-dissolve", String(Math.max(0, (progress - .74) / .26)));
      hero.style.setProperty("--lens-opening", `${Math.max(0, (progress - .74) / .26) * 150}%`);
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    const configure = () => {
      observer?.disconnect();
      root.classList.toggle("presentation-motion", !reduced.matches && !mobile.matches);
      root.classList.toggle("cinematic-motion", !reduced.matches && !mobile.matches);
      if (!reduced.matches && !mobile.matches && "IntersectionObserver" in window) {
        observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
          if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer?.unobserve(entry.target); }
        }), { threshold: .06 });
        document.querySelectorAll("[data-reveal]").forEach((el) => observer?.observe(el));
      }
      if ((reduced.matches || mobile.matches) && image) image.style.transform = "none";
      update();
    };
    configure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    reduced.addEventListener("change", configure);
    mobile.addEventListener("change", configure);
    return () => {
      observer?.disconnect(); window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll);
      reduced.removeEventListener("change", configure); mobile.removeEventListener("change", configure);
      root.classList.remove("presentation-motion", "cinematic-motion");
      root.style.removeProperty("--reading-progress");
    };
  }, []);
}
