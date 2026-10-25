"use client";

import * as React from "react";

/*
 * Polaroid Line Carousel — infinite loop with continuous gentle drift & physics swing.
 * Instant photos pegged to a sagging string that glide seamlessly without end.
 */

export type Slide = {
  image?: string;
  title?: string;
  price?: string;
  alt?: string;
};

export type PolaroidLineCarouselProps = {
  slides?: Slide[];
  /** Height of the carousel stage. Default clamp(440px, 56vh, 520px). */
  height?: number | string;
  /** Width of a print in px. */
  cardWidth?: number;
  /** How far the string sags in the middle, px. */
  sag?: number;
  /** How much the prints swing; 0 holds them still. */
  swing?: number;
  /** Continuous slow glide speed (px per frame). Default 0.38 (~22px/s). 0 disables drift. */
  autoplaySpeed?: number;
  /** Colour of the string. */
  string?: string;
  background?: string;
  ink?: string;
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
};

export const buonAppetitoDishes: Slide[] = [
  {
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBsa40SUOipkdJNmPE0f465HyZdDKS0awrb6DTLNkUV6knIECIMkT8LHSTOIuFKTtGdBRmOTTzYWFjbSoVtz5jbyguYQuLAzYQEfWCViOZsxhPK85xvK6B5EfIiGocEEdxJiHdAVgfrNR8oectYrX543xe2vYGOKTQSX__uojYc74S_NI6lPHDcnU55PDWFAJGbLVMMfvyRxJ7Cej__AXRjLtoSuMyo_5Aaa2rmHvZ-y8huZzS7Bd3D4uBjOW9z0UlyEx8rb0Wtrw",
    title: "Pizza Burrata & Tartufo",
    price: "18,50 €",
    alt: "Pizza Burrata y Trufa en horno de leña",
  },
  {
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQfcvZyWuIyDHlqDlP1al_rCPPd36sMiQqTq95C8t8u-rlUW9rDJGNhMDoV5-pB5teBd1gCSskpRnVtiyPOefPw62YZs1hczW838eCEAjCwXs_zn0tG4iK196MKuHlgRPFhaWv4hQGx87mbZosSfm0lMVYQvL--iuS5f0XLXCFMumCVKhnJWqyiHLHs7FBcJExQw-7YCoHIogeuGktgShccYGDD7n0hr6v_Pg8EUkQX8sd-Lhx0lrOCMeFY2pWQwEDJI5OO5G29A",
    title: "Linguine allo Scoglio",
    price: "22,00 €",
    alt: "Linguine con marisco fresco del puerto",
  },
  {
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1200&q=85",
    title: "Pesca del Día de Lonja",
    price: "24,50 €",
    alt: "Pescado fresco del puerto de Andratx",
  },
  {
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC69E0dlzLgjkYZzgpE2iqME2voyY1ihzE61WlHoK-pPvpnN7X9GFZNejm5eDp3euAzNB-qbnSXPpK22Bp7BhFIsxaidxMfjGRPe-H0HdvQhEP9RVWf173qRMdSKj3MWxWOuxp73DQx__znBiD8kYWM3_2Yxo4MzvCavRYVppXVqjnm8gNL4z7WnGJ0dbxImOhBL5xo8hWXrUKmgSL4wIFMNsPE0HI37dcgPqwYo-_1g1fjDhpQdzWkSP9BFD_Iog6zkPHaQQRHBg",
    title: "Tagliatelle al Ragù Toscano",
    price: "21,00 €",
    alt: "Tagliatelle al ragú estofado",
  },
  {
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=85",
    title: "Burrata Pugliese con Ramellet",
    price: "16,00 €",
    alt: "Burrata fresca de Puglia con tomates de rama",
  },
  {
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDhn7u965wyptoBtEgGjhNSq8WPKAJd7HYt302Oa_DSq09PnU3kJpWZNZdDbOus6azX98pyKg2C6Pq8gCIu833A3-F7v22-dxFUSebuvaKVVltpr_lal2yDhoG5X2UT6ERyAyLcXYjG9-bYrNr8UOt0PqBT-Pk0jUWvjefWI7HZcMZTcdNfaL0Lm3un_fAum7FJ7MmQy9sW8mLqrnW5CVQmL8B-YRDFpsQqqPqtZ9HdDzmpEKfc7w7SV5XHvCHS2TJC73eGDg4jeg",
    title: "Tiramisú Tradizionale",
    price: "8,50 €",
    alt: "Tiramisú tradicional al café",
  },
];

export function clamp(v: number, a: number, b: number): number {
  return Math.min(b, Math.max(a, v));
}

export function stringY(x: number, w: number, y0: number, sag: number): number {
  const t = clamp(x / w, 0, 1);
  return y0 + 4 * sag * t * (1 - t);
}

export function springStep(x: number, v: number, target: number, dt: number, k = 60): [number, number] {
  const c = 2 * Math.sqrt(k);
  const nv = v + (k * (target - x) - c * v) * dt;
  return [x + nv * dt, nv];
}

export function swingStep(a: number, w: number, lineVel: number, dt: number, gain: number): [number, number] {
  const nw = w + (-36 * a - 4.5 * w + lineVel * 0.003 * gain) * dt;
  return [clamp(a + nw * dt, -0.55, 0.55), nw];
}

export function pad2(n: number): string {
  return n < 10 ? "0" + n : String(n);
}

const PL_CSS = `
.pl-root{position:relative;width:100%;overflow:hidden;background:transparent;color:var(--pl-ink);user-select:none;-webkit-user-select:none;touch-action:pan-y;outline:none;cursor:grab}
.pl-root[data-drag='1']{cursor:grabbing}
.pl-string{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;overflow:visible}
.pl-card{position:absolute;left:0;top:0;width:var(--pl-cw);transform-origin:50% 0;will-change:transform;cursor:pointer}
.pl-print{margin-top:10px;background:#fbfaf7;padding:10px 10px 0;border-radius:4px;box-shadow:0 2px 8px rgba(24,51,33,.08),0 18px 32px -16px rgba(24,51,33,.20);transition:transform .4s cubic-bezier(.2,.7,.2,1),filter .4s ease}
.pl-card[data-on='0'] .pl-print{transform:scale(.92);filter:saturate(.78) brightness(.96)}
.pl-card[data-on='1'] .pl-print{transform:scale(1.02);filter:none;box-shadow:0 4px 14px rgba(24,51,33,.12),0 24px 44px -14px rgba(24,51,33,.28)}
.pl-shot{position:relative;aspect-ratio:1;overflow:hidden;background:#ebe6de;border-radius:2px}
.pl-shot img{position:absolute;inset:0;width:100%;height:100%;max-width:none;object-fit:cover;display:block;pointer-events:none}
.pl-note{height:44px;display:flex;align-items:center;justify-content:center;padding:0 8px;font:italic 400 15px/1.1 ui-serif,Georgia,'Times New Roman',serif;color:#2c3a2f;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.pl-peg{position:absolute;left:50%;top:0;width:11px;height:26px;margin-left:-5.5px;border-radius:2px;background:linear-gradient(90deg,#c9a67a,#e3c9a1 45%,#b8915f);box-shadow:0 2px 4px rgba(0,0,0,.25)}
.pl-peg::after{content:'';position:absolute;left:4.5px;top:8px;width:2px;height:7px;background:rgba(80,60,30,.45);border-radius:1px}
.pl-controls{position:absolute;left:0;right:0;bottom:18px;display:flex;align-items:center;justify-content:center;gap:20px;cursor:default}
.pl-btn{appearance:none;width:38px;height:38px;border-radius:50%;border:1px solid rgba(24,51,33,0.18);background:rgba(255,255,255,0.85);backdrop-filter:blur(8px);color:#183321;display:grid;place-items:center;cursor:pointer;transition:all .2s ease;flex-shrink:0;box-shadow:0 2px 6px rgba(0,0,0,0.04)}
.pl-btn:hover{background:#183321;color:#ffffff;border-color:#183321;transform:scale(1.05)}
.pl-btn:active{transform:scale(0.92)}
`;

export default function PolaroidLineCarousel({
  slides = buonAppetitoDishes,
  height = "clamp(460px, 58vh, 520px)",
  cardWidth = 270,
  sag = 30,
  swing = 1,
  autoplaySpeed = 0.38, // Continuous slow drift (~22px/sec)
  string = "#7d7468",
  ink = "#183321",
  className,
  style,
  ariaLabel = "Carrusel de platos destacados",
}: PolaroidLineCarouselProps) {
  const origCount = slides.length;
  // Triplicate slides to create a completely seamless infinite wrapping line
  const allSlides = React.useMemo(() => [...slides, ...slides, ...slides], [slides]);
  const totalCount = allSlides.length;

  const [dragging, setDragging] = React.useState(false);
  const [size, setSize] = React.useState({ w: 1200, h: 480, cw: cardWidth });

  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const pathRef = React.useRef<SVGPathElement | null>(null);
  const cards = React.useRef<(HTMLDivElement | null)[]>([]);

  // Simulation physics state
  const sim = React.useRef({
    off: 0,
    vel: 0,
    target: 0,
    a: new Array(totalCount).fill(0),
    w: new Array(totalCount).fill(0),
  });

  const drag = React.useRef<null | {
    x: number;
    off: number;
    lx: number;
    lt: number;
    v: number;
    moved: boolean;
  }>(null);

  const lastTouch = React.useRef(0);
  const isHovered = React.useRef(false);
  const opts = React.useRef({ sag, swing, autoplaySpeed });
  opts.current = { sag, swing, autoplaySpeed };

  const spacing = size.cw * 1.08;
  const totalLineLength = totalCount * spacing;

  // Responsive stage sizing
  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ro = new ResizeObserver(() => {
      const r = root.getBoundingClientRect();
      const isMobile = r.width < 640;
      const maxRatio = isMobile ? 0.63 : 0.38;
      const cw = Math.round(Math.max(180, Math.min(cardWidth, r.width * maxRatio, r.height * 0.49)));
      setSize({ w: r.width, h: r.height, cw });
    });
    ro.observe(root);
    return () => ro.disconnect();
  }, [cardWidth]);

  // Frame update loop with infinite seamless wrapping & continuous slow drift
  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let visible = true;
    let raf = 0;
    let prev = performance.now();
    const S = sim.current;

    const frame = (now: number) => {
      raf = 0;
      if (!visible) return;
      const dt = Math.min(0.033, (now - prev) / 1000);
      prev = now;
      const { w, h, cw } = size;
      const isMobile = w < 640;
      const y0 = isMobile ? 18 : 26;
      const d = drag.current;
      const o = opts.current;

      // Continuous gentle drift (like Sobre Nosotros circular gallery)
      if (
        o.autoplaySpeed > 0 &&
        !d &&
        !isHovered.current &&
        now - lastTouch.current > 1200
      ) {
        S.target += o.autoplaySpeed;
      }

      let lineVel: number;
      if (d && d.moved) {
        lineVel = d.v * 1000;
      } else {
        const before = S.off;
        [S.off, S.vel] = springStep(S.off, S.vel, S.target, dt, 40);
        lineVel = -(S.off - before) / Math.max(dt, 1e-3);
      }

      // Safe wrap numbers so S.off never overflows
      if (S.off > totalLineLength * 10 || S.off < -totalLineLength * 10) {
        const wrapUnits = Math.floor(S.off / totalLineLength);
        S.off -= wrapUnits * totalLineLength;
        S.target -= wrapUnits * totalLineLength;
      }

      const g = reduce ? 0 : o.swing;
      let minDistance = Infinity;
      let closestCardIndex = 0;

      for (let i = 0; i < totalCount; i++) {
        const el = cards.current[i];
        if (!el) continue;

        // Calculate card's wrapped position relative to center of screen
        let relX = ((i * spacing - S.off) % totalLineLength + totalLineLength) % totalLineLength;
        if (relX > totalLineLength / 2) {
          relX -= totalLineLength;
        }

        const screenX = w / 2 + relX;
        const dist = Math.abs(relX);
        if (dist < minDistance) {
          minDistance = dist;
          closestCardIndex = i % origCount;
        }

        // Hide cards that are far offscreen
        if (screenX < -cw * 1.5 || screenX > w + cw * 1.5) {
          el.style.visibility = "hidden";
          continue;
        }

        el.style.visibility = "visible";
        let a = S.a[i] || 0;
        let av = S.w[i] || 0;
        [a, av] = swingStep(a, av, lineVel, dt, g);
        if (g) a += Math.sin(now / 1400 + i * 1.6) * 0.0008 * g;
        S.a[i] = a;
        S.w[i] = av;

        const y = stringY(screenX, w, y0, o.sag) - 6;
        el.style.transform = `translate(${(screenX - cw / 2).toFixed(1)}px, ${y.toFixed(1)}px) rotate(${a.toFixed(4)}rad)`;
        const isCenter = dist < cw * 0.55;
        el.setAttribute("data-on", isCenter ? "1" : "0");
        el.style.zIndex = String(Math.round(100 - dist / 8));
      }

      pathRef.current?.setAttribute("d", `M0 ${y0} Q${w / 2} ${y0 + 2 * o.sag} ${w} ${y0}`);

      raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) {
        prev = performance.now();
        raf = requestAnimationFrame(frame);
      }
    });

    io.observe(root);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [size, spacing, totalCount, totalLineLength, origCount]);

  // Touch and drag interactions
  const onDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest(".pl-controls")) return;
    lastTouch.current = performance.now();
    drag.current = {
      x: e.clientX,
      off: sim.current.off,
      lx: e.clientX,
      lt: e.timeStamp,
      v: 0,
      moved: false,
    };
  };

  const onMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 5) {
      d.moved = true;
      setDragging(true);
      try {
        rootRef.current?.setPointerCapture(e.pointerId);
      } catch {}
    }
    if (!d.moved) return;
    const dt = Math.max(1, e.timeStamp - d.lt);
    d.v = 0.7 * ((e.clientX - d.lx) / dt) + 0.3 * d.v;
    d.lx = e.clientX;
    d.lt = e.timeStamp;

    // Infinite dragging without clamp walls
    const off = d.off - dx;
    sim.current.off = off;
    sim.current.target = off;
  };

  const onUp = (e: React.PointerEvent) => {
    const d = drag.current;
    drag.current = null;
    lastTouch.current = performance.now();

    try {
      if (rootRef.current?.hasPointerCapture(e.pointerId)) {
        rootRef.current?.releasePointerCapture(e.pointerId);
      }
    } catch {}

    if (!d) return;
    if (d.moved) {
      setDragging(false);
      sim.current.vel = -d.v * 800;
      // Snap smoothly to nearest card
      const snapOffset = sim.current.off - d.v * 160;
      const nearestCard = Math.round(snapOffset / spacing);
      sim.current.target = nearestCard * spacing;
      return;
    }

    // Tap on card to bring to center
    const card = (e.target as HTMLElement).closest("[data-i]");
    if (card) {
      const cardIdx = Number(card.getAttribute("data-i"));
      let relX = ((cardIdx * spacing - sim.current.off) % totalLineLength + totalLineLength) % totalLineLength;
      if (relX > totalLineLength / 2) relX -= totalLineLength;
      sim.current.target = sim.current.off + relX;
    }
  };

  const step = (dir: number) => {
    lastTouch.current = performance.now();
    const nearest = Math.round(sim.current.target / spacing);
    sim.current.target = (nearest + dir) * spacing;
  };

  return (
    <div
      ref={rootRef}
      className={["pl-root", className].filter(Boolean).join(" ")}
      style={{
        height,
        ["--pl-ink" as string]: ink,
        ["--pl-cw" as string]: size.cw + "px",
        ...style,
      }}
      data-drag={dragging ? "1" : "0"}
      role="region"
      aria-label={ariaLabel}
      tabIndex={0}
      onMouseEnter={() => { isHovered.current = true; }}
      onMouseLeave={() => { isHovered.current = false; }}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
    >
      <style>{PL_CSS}</style>
      <svg className="pl-string" aria-hidden="true">
        <path ref={pathRef} fill="none" stroke={string} strokeWidth="1.5" strokeLinecap="round" />
      </svg>

      {allSlides.map((sl, i) => (
        <div
          key={i}
          className="pl-card"
          data-i={i}
          ref={(el) => void (cards.current[i] = el)}
        >
          <div className="pl-print">
            <div className="pl-shot">
              <img src={sl.image} alt={sl.alt || sl.title || ""} draggable={false} loading="lazy" />
            </div>
            <div className="pl-note">{sl.title || ""}</div>
          </div>
          <div className="pl-peg" />
        </div>
      ))}

      {/* Minimal Navigation Arrows */}
      <div className="pl-controls">
        <button
          type="button"
          className="pl-btn"
          aria-label="Plato anterior"
          onClick={() => step(-1)}
        >
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 3 5 8l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <button
          type="button"
          className="pl-btn"
          aria-label="Plato siguiente"
          onClick={() => step(1)}
        >
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="m6 3 5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
