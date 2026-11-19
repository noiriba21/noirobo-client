"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaMagnifyingGlass } from "react-icons/fa6";

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
      {/* ===== Background: বাম robot, ডান car ===== */}
      <div className="absolute inset-0 grid grid-rows-2 md:grid-cols-2 md:grid-rows-1">
        <div
          className="relative"
          style={{
            background:
              "radial-gradient(ellipse at 30% 40%, #1b2a40 0%, #0d1118 65%)",
          }}
        >
          <video
            className="absolute inset-0 hidden h-full w-full object-cover opacity-60 md:block"
            src="/videos/robot.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
          <span className="t-label absolute left-6 top-6 text-white/60 md:left-10">
            01 — Robotics
          </span>
        </div>

        <div
          className="relative"
          style={{
            background:
              "radial-gradient(ellipse at 70% 40%, #3a1d0c 0%, #0d1118 65%)",
          }}
        >
          <video
            className="absolute inset-0 hidden h-full w-full object-cover opacity-60 md:block"
            src="/videos/car.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
          <span className="t-label absolute right-6 top-6 text-white/60 md:right-10">
            02 — Automotive
          </span>
        </div>
      </div>

      {/* ===== ছায়া ও মাঝের পাতলা দাগ ===== */}
      <div className="absolute inset-0 bg-gradient-to-b from-base-100/70 via-base-100/50 to-base-100" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,12,15,0.75)_0%,transparent_65%)]" />
      <div className="absolute left-1/2 top-0 hidden h-full w-px bg-white/10 md:block" />

      {/* ===== লেখা ===== */}
      <div className="container-x relative z-10 flex flex-1 items-center py-20">
        <div className="mx-auto max-w-4xl text-center">
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
                  transition={{
                    duration: 4,
                    delay: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                                 className="t-accent shimmer-text inline-block text-[0.86em]"
                >
                  Rent the tools.
                </motion.span>
              </motion.span>
            </span>
          </h1>
          <motion.p {...fade(0.3)} className="t-lead mx-auto mt-6 max-w-2xl">
            Robotics kits, AI hardware and car workshop equipment from trusted
            owners. Book by the day, week or month.
          </motion.p>

          {/* Search bar */}
          <motion.form
            {...fade(0.45)}
            onSubmit={onSearch}
            className="mx-auto mt-10 flex max-w-2xl items-center gap-2 rounded-full border border-white/15 bg-base-100/60 p-2 pl-5 backdrop-blur-md"
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

          {/* Quick chips */}
          <motion.div
            {...fade(0.55)}
            className="mt-5 flex flex-wrap items-center justify-center gap-2"
          >
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

          {/* Buttons */}
          <motion.div
            {...fade(0.7)}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <Link href="/equipment" className="btn btn-primary btn-lg px-8">
              Browse Equipment
            </Link>
            <Link href="/#how-it-works" className="btn btn-outline-light btn-lg px-8">
              How It Works
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ===== নিচের বিশ্বাসের লাইন ===== */}
      <motion.div
        {...fade(0.9)}
        className="relative z-10 border-t border-white/10 bg-base-100/60 backdrop-blur-md"
      >
        <div className="container-x grid gap-4 py-5 sm:grid-cols-3 sm:gap-0">
          {trust.map((t, i) => (
            <div
              key={t.title}
              className={`text-center sm:px-6 ${
                i !== 0 ? "sm:border-l sm:border-white/10" : ""
              }`}
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