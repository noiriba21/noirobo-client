"use client";
import { motion } from "framer-motion";

const steps = [
  { no: "01", title: "Find your equipment", text: "Search or filter by category, price and location to find exactly what your project needs." },
  { no: "02", title: "Select rental dates", text: "Pick a start and end date. The total cost is calculated for you instantly." },
  { no: "03", title: "Book & collect", text: "Pay securely with Stripe, then collect or receive the equipment from the owner." },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 py-24">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <p className="eyebrow">How It Works</p>
          <h2 className="t-h2 mt-4">
            Three steps to <em>get started</em>
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.no}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="card-dark p-8"
            >
              <p className="t-stat text-primary">{s.no}</p>
              <h3 className="t-h3 mt-6">{s.title}</h3>
              <p className="t-small mt-3">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}