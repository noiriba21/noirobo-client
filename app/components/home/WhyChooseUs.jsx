"use client";
import { motion } from "framer-motion";
import {
  FaCoins,
  FaUserCheck,
  FaCalendarDays,
  FaShieldHalved,
} from "react-icons/fa6";

const items = [
  { icon: FaCoins, title: "Affordable Rental Prices", text: "Pay only for the days you need. No heavy upfront cost for tools you use once." },
  { icon: FaUserCheck, title: "Verified Equipment Owners", text: "Every owner and every listing is reviewed before it goes live." },
  { icon: FaCalendarDays, title: "Flexible Rental Periods", text: "Rent by the day, week or month, and extend as your project grows." },
  { icon: FaShieldHalved, title: "Secure Payments", text: "Payments are handled by Stripe, so your card details stay protected." },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-5"
        >
          <p className="eyebrow">Why Choose Us</p>
          <h2 className="t-h2 mt-4">
            Built on trust, <em>made for makers</em>
          </h2>
          <p className="t-lead mt-6 max-w-md">
            NoiROBO connects people who own great equipment with people who need
            it, in a rental marketplace that is clear, fair and secure.
          </p>
        </motion.div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:col-span-7">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-base-100 p-8"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-primary">
                <it.icon />
              </span>
              <h3 className="t-h4 mt-6">{it.title}</h3>
              <p className="t-small mt-3">{it.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}