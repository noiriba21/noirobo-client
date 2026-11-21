"use client";
import { motion } from "framer-motion";

const O = "#FF6A1A";
const BG = "#0a0c0f";

function Limb({ x1, y1, x2, y2, w }) {
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={O} strokeWidth={w + 3} strokeLinecap="round" />
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={BG} strokeWidth={w} strokeLinecap="round" />
    </g>
  );
}

function Joint({ cx, cy, r }) {
  return <circle cx={cx} cy={cy} r={r} fill={BG} stroke={O} strokeWidth="1.8" />;
}

export default function GlowRobot() {
  const verts = Array.from({ length: 9 }, (_, i) => 58 + i * 10);
  const hors = Array.from({ length: 14 }, (_, i) => 20 + i * 12);
  const torso = "M58 80 H142 L130 176 H70 Z";

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="absolute bottom-0 left-0 z-10 w-[26%]"
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, delay: 0.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 200 340" fill="none" className="h-auto w-full" aria-hidden="true">
          <defs>
            <filter id="robotGlow" x="-20%" y="-10%" width="140%" height="120%">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <clipPath id="robotClip">
              <path d={torso} />
              <rect x="70" y="14" width="60" height="52" rx="16" />
            </clipPath>
            <radialGradient id="robotFloor" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={O} stopOpacity="0.5" />
              <stop offset="100%" stopColor={O} stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* মাটিতে আলোর ছায়া */}
          <ellipse cx="100" cy="333" rx="80" ry="8" fill="url(#robotFloor)" />

          <g filter="url(#robotGlow)">
            {/* পা */}
            <Limb x1="84" y1="196" x2="80" y2="256" w={14} />
            <Limb x1="80" y1="256" x2="82" y2="316" w={12} />
            <Limb x1="116" y1="196" x2="120" y2="256" w={14} />
            <Limb x1="120" y1="256" x2="118" y2="316" w={12} />
            <Joint cx={80} cy={256} r={8} />
            <Joint cx={120} cy={256} r={8} />
            <rect x="62" y="316" width="36" height="13" rx="5" fill={BG} stroke={O} strokeWidth="1.8" />
            <rect x="102" y="316" width="36" height="13" rx="5" fill={BG} stroke={O} strokeWidth="1.8" />

            {/* কোমর */}
            <Joint cx={84} cy={196} r={9} />
            <Joint cx={116} cy={196} r={9} />
            <rect x="78" y="174" width="44" height="14" rx="4" fill={BG} stroke={O} strokeWidth="1.6" />

            {/* হাত */}
            <Limb x1="50" y1="92" x2="36" y2="148" w={12} />
            <Limb x1="36" y1="148" x2="42" y2="202" w={11} />
            <Limb x1="150" y1="92" x2="164" y2="148" w={12} />
            <Limb x1="164" y1="148" x2="158" y2="202" w={11} />
            <Joint cx={36} cy={148} r={7} />
            <Joint cx={164} cy={148} r={7} />
            <Joint cx={42} cy={210} r={8} />
            <Joint cx={158} cy={210} r={8} />

            {/* ধড় */}
            <path d={torso} stroke={O} strokeWidth="2" strokeLinejoin="round" fill="rgba(255,106,26,0.06)" />
            <Joint cx={50} cy={92} r={11} />
            <Joint cx={150} cy={92} r={11} />
            <circle cx="50" cy="92" r="3" fill={O} />
            <circle cx="150" cy="92" r="3" fill={O} />

            {/* বুকের core */}
            <rect x="84" y="102" width="32" height="30" rx="6" stroke={O} strokeWidth="1.4" />
            <circle cx="100" cy="117" r="11" stroke={O} strokeWidth="0.8" opacity="0.8" />
            <circle cx="100" cy="117" r="6.5" fill={O} />

            {/* গলা */}
            <rect x="92" y="66" width="16" height="14" fill={BG} stroke={O} strokeWidth="1.4" />

            {/* মাথা */}
            <rect x="70" y="14" width="60" height="52" rx="16" stroke={O} strokeWidth="2" fill="rgba(255,106,26,0.06)" />
            <rect x="64" y="30" width="6" height="18" rx="3" fill={BG} stroke={O} strokeWidth="1.4" />
            <rect x="130" y="30" width="6" height="18" rx="3" fill={BG} stroke={O} strokeWidth="1.4" />
            <rect x="80" y="30" width="40" height="16" rx="8" stroke={O} strokeWidth="1.4" fill="rgba(255,106,26,0.18)" />
            <circle cx="92" cy="38" r="3.2" fill={O} />
            <circle cx="108" cy="38" r="3.2" fill={O} />
            <path d="M90 56 H110" stroke={O} strokeWidth="1.4" strokeLinecap="round" />
            <line x1="100" y1="14" x2="100" y2="4" stroke={O} strokeWidth="2" />
            <circle cx="100" cy="3" r="3" fill={O} />

            {/* জালের (mesh) রেখা */}
            <g clipPath="url(#robotClip)" stroke={O} strokeWidth="0.6" opacity="0.28">
              {verts.map((x) => (
                <line key={`v${x}`} x1={x} y1="10" x2={x} y2="180" />
              ))}
              {hors.map((y) => (
                <line key={`h${y}`} x1="50" y1={y} x2="150" y2={y} />
              ))}
            </g>
          </g>
        </svg>
      </motion.div>
    </motion.div>
  );
}