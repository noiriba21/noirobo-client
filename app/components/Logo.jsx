export function LogoMark({ className = "" }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="21" stroke="#F4F1EC" strokeWidth="1.3" />
      <circle cx="24" cy="24" r="17.5" stroke="#F4F1EC" strokeOpacity="0.18" strokeWidth="0.7" />
      <polygon points="14.6,15 17.6,15 33.4,33 30.4,33" fill="#FF6A1A" />
      <rect x="14.6" y="15" width="2.8" height="18" fill="#F4F1EC" />
      <rect x="30.6" y="15" width="2.8" height="18" fill="#F4F1EC" />
      <circle cx="38.8" cy="9.2" r="2.8" fill="#FF6A1A" />
    </svg>
  );
}

export default function Logo({ stacked = false, tagline = true }) {
  const wordmark = (size) => (
    <span
      className={`uppercase leading-none tracking-[0.22em] text-base-content ${size}`}
      style={{ fontFamily: "var(--font-heading), Georgia, serif" }}
    >
      NoiROBO
    </span>
  );

  const tag = (
    <span className="hidden text-[0.5rem] font-semibold uppercase tracking-[0.28em] text-secondary sm:block">
      Robot &amp; Car Tools Rental
    </span>
  );

  if (stacked) {
    return (
      <span className="flex flex-col items-center gap-4">
        <LogoMark className="h-20 w-auto" />
        {wordmark("text-4xl")}
        {tagline && tag}
      </span>
    );
  }

  return (
    <span className="flex items-center gap-3">
      <LogoMark className="h-10 w-auto" />
      <span className="flex flex-col gap-1.5">
        {wordmark("text-[1.4rem]")}
        {tagline && tag}
      </span>
    </span>
  );
}