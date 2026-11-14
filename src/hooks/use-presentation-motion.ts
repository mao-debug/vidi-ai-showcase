import { useEffect } from "react";

export function usePresentationMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | undefined;
    let frame = 0;
    const updateProgress = () => {
      frame = 0;
      const distance = root.scrollHeight - window.innerHeight;
      root.style.setProperty("--reading-progress", String(distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0));
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(updateProgress); };
    const configure = () => {
      observer?.disconnect();
      root.classList.toggle("presentation-motion", !reduced.matches);
      if (reduced.matches || !("IntersectionObserver" in window)) return;
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer?.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: "0px 0px -25px 0px" });
      document.querySelectorAll("[data-reveal]").forEach((element) => observer?.observe(element));
    };
    configure();
    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    reduced.addEventListener("change", configure);
    return () => {
      observer?.disconnect();
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      reduced.removeEventListener("change", configure);
      root.classList.remove("presentation-motion");
      root.style.removeProperty("--reading-progress");
    };
  }, []);
}