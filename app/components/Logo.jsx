export function LogoMark({ className = "" }) {
  const main = "#F2F4F7";
  const accent = "#FF6A1A";

  return (
    <svg
      viewBox="0 0 168 140"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* robot-এর বাহু (গোল জোড়ের গর্ত সহ) */}
      <path
        fillRule="evenodd"
        fill={main}
        d="M22 0H97V44H22A22 22 0 0 1 22 0ZM22 9a13 13 0 1 0 0 26a13 13 0 1 0 0-26Z"
      />
      <circle cx="22" cy="22" r="6" fill={main} />

      {/* কমলা মাথা ও চোখ */}
      <path
        fillRule="evenodd"
        fill={accent}
        d="M101 0H104A22 22 0 0 1 104 44H101ZM108 12a4 4 0 1 0 0 8a4 4 0 1 0 0-8Z"
      />

      {/* থাবা (gripper) */}
      <path d="M132 12C150 10 162 24 162 44" stroke={main} strokeWidth="9" strokeLinecap="round" />
      <path d="M161 52L159 64" stroke={main} strokeWidth="7" strokeLinecap="round" />
      <path d="M158 70L156 78" stroke={main} strokeWidth="5" strokeLinecap="round" />

      {/* N: রুপালি অংশ */}
      <polygon points="0,52 24,52 88,140 0,140" fill={main} />
      {/* N: কমলা অংশ */}
      <polygon points="34,52 58,52 100,110 100,52 120,52 120,140 98,140" fill={accent} />
    </svg>
  );
}

export default function Logo({ stacked = false, tagline = true }) {
  const wordmark = (size) => (
    <span
      className={`font-semibold leading-none tracking-tight text-base-content ${size}`}
      style={{ fontFamily: "var(--font-heading), system-ui, sans-serif" }}
    >
      Noi<span className="text-primary">ROBO</span>
    </span>
  );

  const tag = (
    <span className="text-[0.58rem] font-semibold uppercase tracking-[0.32em] text-secondary">
      Robot &amp; Car Rental
    </span>
  );

  if (stacked) {
    return (
      <span className="flex flex-col items-center gap-3">
        <LogoMark className="h-24 w-auto" />
        {wordmark("text-4xl")}
        {tagline && tag}
      </span>
    );
  }

  return (
    <span className="flex items-center gap-3">
      <LogoMark className="h-11 w-auto" />
      <span className="flex flex-col gap-1.5">
        {wordmark("text-[1.6rem]")}
        {tagline && tag}
      </span>
    </span>
  );
}