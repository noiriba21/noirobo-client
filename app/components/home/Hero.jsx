"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaMagnifyingGlass } from "react-icons/fa6";
import GlowRobot from "./GlowRobot";

// আসল ছবি বসাতে চাইলে এখানে ছবির পথ লেখো, যেমন: "/images/hero-car.png"
// ফাঁকা থাকলে আমার আঁকা car দেখাবে
const CAR_IMAGE = "";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
});

const chips = ["Arduino", "Drone", "OBD2 Scanner", "3D Printer", "Welding"];

const trust = [
  { title: "Daily · Weekly · Monthly", text: "Flexible rental periods" },
  { title: "Verified Owners", text: "Every listing is reviewed" },
  { title: "Secure Payment", text: "Protected by Stripe" },
];

function RobotArt() {
  const line = "#9AA4B2";
  const dark = "#0d1118";
  const orange = "#FF6A1A";
  return (
    <svg viewBox="0 0 360 420" fill="none" className="h-full w-auto" aria-hidden="true">
      <rect x="110" y="368" width="140" height="40" rx="6" fill={dark} stroke={line} strokeWidth="2" />
      <rect x="150" y="350" width="60" height="20" fill={dark} stroke={line} strokeWidth="2" />
      <line x1="180" y1="338" x2="128" y2="226" stroke={line} strokeWidth="32" strokeLinecap="round" />
      <line x1="180" y1="338" x2="128" y2="226" stroke={dark} strokeWidth="28" strokeLinecap="round" />
      <line x1="128" y1="226" x2="232" y2="124" stroke={line} strokeWidth="28" strokeLinecap="round" />
      <line x1="128" y1="226" x2="232" y2="124" stroke={dark} strokeWidth="24" strokeLinecap="round" />
      <circle cx="180" cy="338" r="22" fill={dark} stroke={orange} strokeWidth="2.5" />
      <circle cx="180" cy="338" r="7" fill={orange} />
      <circle cx="128" cy="226" r="19" fill={dark} stroke={orange} strokeWidth="2.5" />
      <circle cx="128" cy="226" r="6" fill={orange} />
      <circle cx="232" cy="124" r="15" fill={dark} stroke={orange} strokeWidth="2.5" />
      <circle cx="232" cy="124" r="5" fill={orange} />
      <path d="M232 110 L214 66 M232 110 L254 68" stroke={line} strokeWidth="6" strokeLinecap="round" />
      <path d="M214 66 L228 60 M254 68 L240 60" stroke={orange} strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function CarArt() {
  const o = "#FF6A1A";
  const body =
    "M62 186 C54 168 56 146 74 136 L196 120 C236 88 288 70 340 68 C392 66 438 84 472 112 L596 138 C628 146 652 158 656 176 L656 186 Z";
  const verts = Array.from({ length: 26 }, (_, i) => 50 + i * 24);
  const hors = [84, 100, 116, 132, 148, 164, 180];
  const spokes = Array.from({ length: 6 }, (_, i) => (i * Math.PI) / 3);
  const wheels = [170, 520];

  return (
    <svg viewBox="0 0 700 240" fill="none" className="h-auto w-full" aria-hidden="true">
      <defs>
        <filter id="carGlow" x="-10%" y="-20%" width="120%" height="140%">
          <feGaussianBlur stdDeviation="3.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id="carClip">
          <path d={body} />
        </clipPath>
        <radialGradient id="carFloor" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={o} stopOpacity="0.5" />
          <stop offset="100%" stopColor={o} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* মাটিতে কমলা আলোর ছায়া */}
      <ellipse cx="360" cy="222" rx="320" ry="14" fill="url(#carFloor)" />

      <g filter="url(#carGlow)">
        {/* গাড়ির শরীর */}
        <path d={body} stroke={o} strokeWidth="2" strokeLinejoin="round" fill="rgba(255,106,26,0.05)" />

        {/* জালের (mesh) রেখা */}
        <g clipPath="url(#carClip)" stroke={o} strokeWidth="0.6" opacity="0.28">
          {verts.map((x) => (
            <line key={x} x1={x} y1="60" x2={x} y2="190" />
          ))}
          {hors.map((y) => (
            <line key={y} x1="40" y1={y} x2="670" y2={y} />
          ))}
        </g>

        {/* কাচ, থাম, দরজা */}
        <path
          d="M214 114 C246 92 290 80 338 80 C384 80 418 92 444 114 Z"
          stroke={o}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M338 80 V114" stroke={o} strokeWidth="1.2" />
        <path d="M78 148 C200 136 430 128 604 148" stroke={o} strokeWidth="1.2" opacity="0.85" />
        <path d="M262 118 C258 148 260 170 264 186" stroke={o} strokeWidth="1" opacity="0.7" />
        <path d="M430 122 V186" stroke={o} strokeWidth="1" opacity="0.7" />

        {/* হেডলাইট ও টেইললাইট */}
        <path d="M606 142 L644 158" stroke={o} strokeWidth="4" strokeLinecap="round" />
        <path d="M60 150 H78" stroke={o} strokeWidth="4" strokeLinecap="round" />

        {/* চাকা */}
        {wheels.map((cx) => (
          <g key={cx}>
            <path d={`M${cx - 44} 180 A44 44 0 0 1 ${cx + 44} 180`} stroke={o} strokeWidth="1.6" />
            <circle cx={cx} cy="180" r="34" fill="#0a0c0f" stroke={o} strokeWidth="2" />
            <circle cx={cx} cy="180" r="22" stroke={o} strokeWidth="0.9" opacity="0.8" />
            {spokes.map((a, i) => (
              <line
                key={i}
                x1={cx + Math.cos(a) * 6}
                y1={180 + Math.sin(a) * 6}
                x2={cx + Math.cos(a) * 22}
                y2={180 + Math.sin(a) * 22}
                stroke={o}
                strokeWidth="1.2"
              />
            ))}
            <circle cx={cx} cy="180" r="5" fill={o} />
          </g>
        ))}
      </g>
    </svg>
  );
}

export default function Hero() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const onSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/equipment?search=${encodeURIComponent(q)}` : "/equipment");
  };

  return (
    <section className="relative flex min-h-[calc(100svh-5rem)] flex-col overflow-hidden">
      {/* ===== Background ===== */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 75% 60%, rgba(255,106,26,0.2) 0%, transparent 48%), radial-gradient(ellipse at 15% 15%, #151b26 0%, #0a0c0f 60%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at center, black 25%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 25%, transparent 75%)",
        }}
      />

      {/* ধোঁয়ার মতো নড়তে থাকা আলো */}
      <motion.div
        animate={{ x: [0, 50, 0], opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-24 top-1/4 h-96 w-96 rounded-full bg-primary/20 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -40, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-secondary/10 blur-3xl"
      />

     
      {/* ===== কনটেন্ট ===== */}
      <div className="container-x relative z-10 grid flex-1 items-center gap-8 py-14 lg:grid-cols-12 lg:py-20">
        {/* বাম: লেখা */}
        <div className="lg:col-span-6">
          <motion.p {...fade(0.05)} className="eyebrow">
            Robot &amp; Car Tools Rental
          </motion.p>

          <h1 className="t-h1 mt-6">
            <motion.span {...fade(0.15)} className="block">
              Build robots. Fix cars.
            </motion.span>

            <span className="block overflow-hidden pb-3 pr-3">
              <motion.span
                initial={{ y: "115%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block"
              >
                <motion.span
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 4, delay: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="t-accent shimmer-text inline-block text-[0.86em]"
                >
                  Rent the tools.
                </motion.span>
              </motion.span>
            </span>
          </h1>

          <motion.p {...fade(0.3)} className="t-lead mt-6 max-w-xl">
            Robotics kits, AI hardware and car workshop equipment from trusted
            owners. Book by the day, week or month.
          </motion.p>

          <motion.form
            {...fade(0.45)}
            onSubmit={onSearch}
            className="mt-9 flex max-w-xl items-center gap-2 rounded-full border border-white/15 bg-base-100/60 p-2 pl-5 backdrop-blur-md"
          >
            <FaMagnifyingGlass className="shrink-0 text-base-content/50" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by equipment name or location"
              aria-label="Search equipment"
              className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm text-base-content outline-none placeholder:text-base-content/40"
            />
            <button type="submit" className="btn btn-primary btn-sm px-6">
              Search
            </button>
          </motion.form>

          <motion.div {...fade(0.55)} className="mt-5 flex flex-wrap items-center gap-2">
            {chips.map((c) => (
              <Link
                key={c}
                href={`/equipment?search=${encodeURIComponent(c)}`}
                className="rounded-full border border-white/10 px-3.5 py-1.5 text-xs text-base-content/70 transition hover:border-primary hover:text-primary"
              >
                {c}
              </Link>
            ))}
          </motion.div>

          <motion.div {...fade(0.7)} className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/equipment" className="btn btn-primary btn-lg px-8">
              Browse Equipment
            </Link>
            <Link href="/#how-it-works" className="btn btn-outline-light btn-lg px-8">
              How It Works
            </Link>
          </motion.div>
        </div>

        {/* ডান: car */}
                <div className="relative pl-[24%] lg:col-span-6">
          <GlowRobot />
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              {CAR_IMAGE ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={CAR_IMAGE}
                  alt="Glowing wireframe sports car"
                  className="w-full object-contain mix-blend-screen"
                />
              ) : (
                <CarArt />
              )}
            </motion.div>
          </motion.div>

          {/* HUD card */}
          <motion.div
            {...fade(1.1)}
            className="absolute right-0 top-0 hidden w-44 rounded-xl border border-white/10 bg-base-100/70 p-3 backdrop-blur-md sm:block lg:-top-4"
          >
            <p className="t-label text-[0.6rem] text-primary">OBD2 · Live Scan</p>
            <div className="mt-3 flex h-8 items-end gap-1">
              {[40, 70, 50, 90, 60, 80, 45].map((h, i) => (
                <motion.span
                  key={i}
                  animate={{ height: [`${h}%`, `${Math.max(20, 100 - h)}%`, `${h}%`] }}
                  transition={{ duration: 2 + i * 0.2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-full rounded-sm bg-primary/80"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <p className="t-caption mt-2">Engine · Battery · Sensors</p>
          </motion.div>
        </div>
      </div>

      {/* ===== নিচের বিশ্বাসের লাইন ===== */}
            {/* ===== নিচের বিশ্বাসের লাইন ===== */}
      <motion.div
        {...fade(0.9)}
        className="relative z-10 border-t border-white/10 bg-base-100/60 backdrop-blur-md"
      >
        <div className="container-x grid gap-4 py-5 sm:grid-cols-3 sm:gap-0">
          {trust.map((t, i) => (
            <div
              key={t.title}
              className={`text-center sm:px-6 ${i !== 0 ? "sm:border-l sm:border-white/10" : ""}`}
            >
              <p className="t-label text-base-content">{t.title}</p>
              <p className="t-caption mt-1">{t.text}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}