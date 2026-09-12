import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

function DevotionalImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`relative grid h-full w-full place-items-center overflow-hidden bg-[radial-gradient(circle_at_50%_35%,#5e2518_0%,#220b09_48%,#090303_100%)] ${className}`}
      >
        <div className="partner-motif absolute inset-0 opacity-25" />
        <div className="relative text-center">
          <span className="block font-serif text-5xl text-[#e7b755]">ॐ</span>
          <span className="mt-3 block font-mono text-[9px] tracking-[0.3em] text-[#d7b87b] uppercase">{src}</span>
        </div>
      </div>
    );
  }

  return <img src={src} alt={alt} onError={() => setFailed(true)} className={className} draggable={false} />;
}

function Mandala() {
  return (
    <svg viewBox="0 0 600 600" aria-hidden="true" className="h-full w-full overflow-visible">
      <defs>
        <linearGradient id="mandalaGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff0b5" />
          <stop offset="0.5" stopColor="#c88a2e" />
          <stop offset="1" stopColor="#fff0b5" />
        </linearGradient>
      </defs>
      <circle cx="300" cy="300" r="286" fill="none" stroke="url(#mandalaGold)" strokeWidth="1" opacity=".22" />
      <circle cx="300" cy="300" r="250" fill="none" stroke="url(#mandalaGold)" strokeWidth="1" strokeDasharray="4 14" opacity=".42" />
      <circle cx="300" cy="300" r="205" fill="none" stroke="url(#mandalaGold)" strokeWidth="1" opacity=".28" />
      {Array.from({ length: 24 }).map((_, i) => (
        <g key={i} transform={`rotate(${i * 15} 300 300)`}>
          <path
            d="M300 22 C320 56 320 88 300 117 C280 88 280 56 300 22Z"
            fill="none"
            stroke="url(#mandalaGold)"
            strokeWidth="1.2"
            opacity={i % 2 ? 0.22 : 0.48}
          />
          <circle cx="300" cy="137" r="3" fill="#e7b755" opacity=".55" />
        </g>
      ))}
      {Array.from({ length: 12 }).map((_, i) => (
        <g key={`inner-${i}`} transform={`rotate(${i * 30} 300 300)`}>
          <path
            d="M300 102 C333 143 329 178 300 207 C271 178 267 143 300 102Z"
            fill="none"
            stroke="#dca444"
            strokeWidth="1"
            opacity=".3"
          />
        </g>
      ))}
    </svg>
  );
}

function Diya() {
  return (
    <div className="diya-orbit" aria-hidden="true">
      <div className="diya-level">
        <div className="diya">
          <span className="diya-flame" />
          <span className="diya-wick" />
          <span className="diya-bowl" />
        </div>
      </div>
    </div>
  );
}

function SacredImage() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 20 });

  return (
    <div
      className="baba-wrapper partner-perspective relative mx-auto aspect-square w-[78vw] max-w-[520px]"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - rect.left) / rect.width - 0.5);
        my.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.86, rotateY: 18 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 1.3, delay: 0.35, ease: EASE }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-full w-full"
      >
        <div className="partner-mandala spin-slower pointer-events-none absolute -inset-[21%]">
          <Mandala />
        </div>
        <div className="pointer-events-none absolute -inset-[8%] rounded-full bg-[radial-gradient(circle,rgba(229,160,58,.2),transparent_67%)] blur-2xl" />

        <div
          style={{ transform: "translateZ(38px)" }}
          className="baba-frame relative h-full w-full overflow-hidden rounded-[38%_38%_8%_8%/28%_28%_8%_8%] border border-[#f1ca78]/35 bg-[#130605] p-2 shadow-[0_35px_100px_-30px_rgba(230,140,33,.6)] sm:p-3"
        >
          <div className="relative h-full w-full overflow-hidden rounded-[36%_36%_6%_6%/26%_26%_6%_6%] bg-black">
            <DevotionalImage src="shyambaba.jpg" alt="Shree Khatu Shyam Ji" className="h-full w-full object-contain" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#120403]/55 via-transparent to-[#f5bd54]/5" />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-[#ffe8ae]/20 ring-inset" />
          </div>

          <span className="pointer-events-none absolute top-[3%] left-1/2 h-[1px] w-[55%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#ffe5a2] to-transparent" />
          <span className="pointer-events-none absolute bottom-[3%] left-1/2 font-serif text-[clamp(.75rem,2vw,1rem)] tracking-[0.25em] text-[#f3cd80]">
            श्री श्याम
          </span>
        </div>

        {/* Garland made from restrained marigold beads, not emoji. */}
        <div className="partner-garland pointer-events-none absolute top-[1%] left-1/2 z-20 flex w-[66%] -translate-x-1/2 justify-between">
          {Array.from({ length: 15 }).map((_, i) => (
            <span key={i} className={i % 3 === 0 ? "bg-[#b52116]" : "bg-[#dc8c20]"} />
          ))}
        </div>

        <Diya />
      </motion.div>
    </div>
  );
}

function PartnerHero() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  return (
    <section
      id="partner-home"
      ref={ref}
      className="hero partner-hero relative flex min-h-[100svh] w-full items-center overflow-hidden bg-[#090303] px-4 pt-28 pb-16 sm:px-6 sm:pt-32 lg:px-10 lg:pt-36"
    >
      <div className="partner-motif pointer-events-none absolute inset-0 opacity-30" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_76%_46%,rgba(156,49,23,.38),transparent_34%),radial-gradient(circle_at_20%_20%,rgba(229,150,47,.13),transparent_28%),linear-gradient(120deg,#090303_0%,#130504_52%,#060202_100%)]" />
      <div className="pointer-events-none absolute -top-[25vw] -right-[18vw] h-[65vw] w-[65vw] rounded-full border border-[#d9a44a]/10" />
      <div className="pointer-events-none absolute -bottom-[30vw] -left-[18vw] h-[70vw] w-[70vw] rounded-full border border-[#d9a44a]/10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#090303] to-transparent" />

      <div className="hero-box relative mx-auto grid w-full max-w-[1600px] grid-cols-12 items-center gap-x-8 gap-y-16 lg:gap-x-16">
        <motion.div style={{ y: textY, opacity }} className="order-2 col-span-12 lg:order-1 lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease: EASE }}
            className="tag mb-6 flex items-center gap-3 sm:mb-8"
          >
            <span className="h-px w-8 bg-[#e5ae50]" />
            <span className="font-mono text-[9px] tracking-[0.27em] text-[#eecb88] uppercase sm:text-[10px] sm:tracking-[0.34em]">
              Official Devotional Partner
            </span>
          </motion.div>

          <h1 className="max-w-5xl font-display text-[clamp(3.25rem,13vw,7rem)] leading-[0.86] tracking-[0.01em] text-[#f5e9cf] lg:text-[clamp(5rem,8vw,9.5rem)]">
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.22, duration: 1, ease: EASE }}
                className="block"
              >
                SHREE KHATU
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.34, duration: 1, ease: EASE }}
                className="block bg-gradient-to-r from-[#fff0bd] via-[#d99b3a] to-[#f9d78e] bg-clip-text text-transparent"
              >
                SHYAM JI
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.8, ease: EASE }}
            className="mt-5 font-serif text-[clamp(1.25rem,3.3vw,2.15rem)] italic text-[#cda969] sm:mt-7"
          >
            Khatu Dham, Rajasthan
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.8, ease: EASE }}
            className="mt-6 max-w-xl text-sm leading-[1.85] text-[#d8c9ae] sm:text-base"
          >
            This page represents a sacred devotional commitment. A spiritual bond of gratitude,
            faith, discipline, and service.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.05, duration: 0.8 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href="#pledge"
              data-cursor="Pledge"
              className="group inline-flex items-center gap-4 rounded-full bg-[#e0a43d] px-6 py-3.5 text-[#210b04] transition-colors hover:bg-[#f5d185] sm:px-7 sm:py-4"
            >
              <span className="font-mono text-[10px] font-bold tracking-[0.22em] uppercase">Our sacred pledge</span>
              <span className="transition-transform duration-500 group-hover:translate-y-1">↓</span>
            </a>
            <span className="font-serif text-lg italic text-[#9d8154]">Hare Ka Sahara</span>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: imageY, opacity }} className="order-1 col-span-12 lg:order-2 lg:col-span-5">
          <SacredImage />
        </motion.div>
      </div>

      <div className="pointer-events-none absolute right-4 bottom-5 left-4 flex items-center justify-between font-mono text-[8px] tracking-[0.22em] text-[#8f7248] uppercase sm:right-8 sm:left-8 sm:text-[9px] lg:right-10 lg:left-10">
        <span>Faith · Discipline · Service</span>
        <span>Scroll to enter</span>
      </div>
    </section>
  );
}

function Pledge() {
  return (
    <section id="pledge" className="pledge partner-pledge relative overflow-hidden bg-[#d99731] px-4 py-20 text-[#210b04] sm:px-6 sm:py-28 lg:px-10 lg:py-36">
      <div className="partner-motif-dark pointer-events-none absolute inset-0 opacity-15" />
      <div className="pointer-events-none absolute top-0 left-1/2 h-px w-[88%] -translate-x-1/2 bg-[#2b0d05]/25" />

      <div className="relative mx-auto grid max-w-[1600px] grid-cols-12 gap-y-10">
        <div className="col-span-12 flex items-center gap-4 lg:col-span-3 lg:items-start">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase">(01)</span>
          <span className="h-px flex-1 bg-[#2b0d05]/30 lg:max-w-20" />
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase">The Pledge</span>
        </div>

        <div className="col-span-12 lg:col-span-9">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <p className="font-display text-[clamp(6.5rem,27vw,18rem)] leading-[0.72] tracking-[-0.03em]">10%</p>
            <div className="mt-8 max-w-4xl border-t border-[#2b0d05]/30 pt-8 sm:mt-12 sm:pt-10">
              <p className="text-[clamp(1.25rem,3.5vw,2.6rem)] leading-[1.25]">
                <span className="gold font-bold">of the TOTAL INCOME GENERATED</span>
                <br />
                is humbly dedicated each month
                <br />
                <span className="gold font-bold">to Shree Khatu Shyam Ji</span>
                <br />
                <br />
                through <span className="gold font-bold">Temple Contribution</span> or{" "}
                <span className="gold font-bold">Charitable Service</span> for humanity.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Purpose() {
  return (
    <section id="purpose" className="section relative overflow-hidden bg-[#090303] px-4 py-20 sm:px-6 sm:py-28 lg:px-10 lg:py-36">
      <div className="partner-motif pointer-events-none absolute inset-0 opacity-20" />
      <div className="relative mx-auto max-w-[1600px]">
        <div className="flex items-center gap-4 border-b border-[#e5b55f]/15 pb-6">
          <span className="font-mono text-[10px] tracking-[0.3em] text-[#dba54d]">(02)</span>
          <span className="font-mono text-[10px] tracking-[0.3em] text-[#9d8154] uppercase">Why we give</span>
        </div>

        <div className="grid grid-cols-12 gap-y-12 pt-12 sm:pt-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="col-span-12 lg:col-span-8"
          >
            <h2 className="font-display text-[clamp(3.2rem,12vw,9rem)] leading-[0.88] text-[#f1e2c5]">
              PURPOSE OF THE
              <span className="block font-serif font-normal italic text-[#dca64a]">devotional offering</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.12, duration: 0.8, ease: EASE }}
            className="col-span-12 self-end lg:col-span-4"
          >
            <p className="max-w-xl text-sm leading-[1.9] text-[#cbb999] sm:text-base">
              This dedication is rooted in timeless values of seva, daan, and dharma. The offering
              is intended for food donation, education support, healthcare help, and spiritual service.
            </p>
          </motion.div>
        </div>

        <div className="mt-20 grid grid-cols-3 border-y border-[#e5b55f]/15 sm:mt-28">
          {["SEVA", "DAAN", "DHARMA"].map((word, i) => (
            <motion.div
              key={word}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.7, ease: EASE }}
              className="relative py-6 text-center sm:py-10"
            >
              {i > 0 && <span className="absolute top-0 bottom-0 left-0 w-px bg-[#e5b55f]/15" />}
              <span className="font-display text-[clamp(1.1rem,5vw,4rem)] tracking-[0.08em] text-[#e5c990]">{word}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section id="divine-inspiration" className="section relative overflow-hidden bg-[#100504] px-4 py-20 sm:px-6 sm:py-28 lg:px-10 lg:py-36">
      <div className="pointer-events-none absolute top-0 left-1/2 h-px w-[92%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#dba84e]/35 to-transparent" />
      <div className="relative mx-auto max-w-[1600px]">
        <div className="mb-12 flex flex-col gap-5 sm:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-5 flex items-center gap-4">
              <span className="font-mono text-[10px] tracking-[0.3em] text-[#dba54d]">(03)</span>
              <span className="font-mono text-[10px] tracking-[0.3em] text-[#9d8154] uppercase">Sacred frames</span>
            </div>
            <h2 className="font-display text-[clamp(3.1rem,11vw,8rem)] leading-[0.85] text-[#f1e2c5]">
              DIVINE <span className="font-serif font-normal italic text-[#dca64a]">inspiration</span>
            </h2>
          </div>
          <p className="font-serif text-lg italic text-[#9d8154] md:text-right">A quiet visual meditation.</p>
        </div>

        <div className="image-grid grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 55, rotateX: 8 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: (i % 2) * 0.1, duration: 0.9, ease: EASE }}
              data-cursor="Divine"
              className={`img-card group relative m-0 overflow-hidden ${i === 0 || i === 3 ? "aspect-[4/5] sm:aspect-[5/4]" : "aspect-[4/5]"}`}
            >
              <DevotionalImage
                src="krishna.png"
                alt={`Divine inspiration ${i + 1}`}
                className="h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105"
              />
              <div className="overlay pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090303]/85 via-transparent to-[#d69e3d]/5" />
              <span className="pointer-events-none absolute top-4 left-4 h-8 w-8 border-t border-l border-[#f0c36c]/70 sm:top-6 sm:left-6 sm:h-12 sm:w-12" />
              <span className="pointer-events-none absolute right-4 bottom-4 h-8 w-8 border-r border-b border-[#f0c36c]/70 sm:right-6 sm:bottom-6 sm:h-12 sm:w-12" />
              <figcaption className="pointer-events-none absolute right-6 bottom-5 left-6 flex items-end justify-between font-mono text-[9px] tracking-[0.25em] text-[#ebcd8d] uppercase">
                <span>Krishna</span>
                <span>0{i + 1}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function DevotionalNote() {
  return (
    <section className="footer devotional-note relative overflow-hidden bg-[#d99731] px-4 py-20 text-center text-[#210b04] sm:px-6 sm:py-28">
      <div className="partner-motif-dark pointer-events-none absolute inset-0 opacity-15" />
      <div className="relative mx-auto max-w-4xl">
        <span className="font-serif text-5xl sm:text-7xl">ॐ</span>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mt-7 text-base leading-[1.9] sm:text-xl"
        >
          This webpage is a <span className="gold font-bold">devotional spiritual showcase</span> only.
          <br />
          No legal document, business identity, financial data, or personal information is presented here.
        </motion.p>
        <div className="mx-auto my-8 h-px w-24 bg-[#210b04]/30" />
        <p className="font-serif text-[clamp(1.7rem,5vw,3.5rem)] italic">“Hare Ka Sahara, Baba Shyam Hamara”</p>
      </div>
    </section>
  );
}

export default function PartnerPage() {
  useEffect(() => {
    document.title = "Official Devotional Partner — Shree Khatu Shyam Ji";
  }, []);

  return (
    <main className="partner-page bg-[#090303] text-[#f5e9cf]">
      <PartnerHero />
      <Pledge />
      <Purpose />
      <Gallery />
      <DevotionalNote />
    </main>
  );
}