"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import EquipmentCard from "./EquipmentCard";

const config = {
  robot: {
    eyebrow: "01 — Robotics & AI",
    title: (
      <>
        Robots, sensors &amp; <em>AI hardware</em>
      </>
    ),
    text: "From first Arduino projects to AI vision boards, rent the parts and kits that bring your robot to life.",
    href: "/equipment?segment=robot",
    label: "View all robot tools",
    tint: "linear-gradient(180deg, transparent 0%, rgba(27,42,64,0.4) 50%, transparent 100%)",
  },
  car: {
    eyebrow: "02 — Automotive",
    title: (
      <>
        Garage-grade <em>car tools</em>
      </>
    ),
    text: "Scanners, welders, hoists and EV testers. Professional workshop equipment without the professional price.",
    href: "/equipment?segment=car",
    label: "View all car tools",
    tint: "linear-gradient(180deg, transparent 0%, rgba(58,29,12,0.4) 50%, transparent 100%)",
  },
};

export default function SegmentSection({ type, items = [] }) {
  const c = config[type];

  return (
    <section className="py-24" style={{ background: c.tint }}>
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col justify-between gap-6 md:flex-row md:items-end"
        >
          <div className="max-w-2xl">
            <p className="eyebrow">{c.eyebrow}</p>
            <h2 className="t-h2 mt-4">{c.title}</h2>
            <p className="t-lead mt-5">{c.text}</p>
          </div>
          <Link href={c.href} className="btn btn-outline-light">
            {c.label}
          </Link>
        </motion.div>

        {items.length === 0 ? (
          <p className="t-body mt-12">No equipment to show yet.</p>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item, i) => (
              <EquipmentCard key={item._id} item={item} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}