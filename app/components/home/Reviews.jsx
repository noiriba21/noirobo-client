"use client";
import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft } from "react-icons/fa6";

const reviews = [
  { name: "Tanvir Ahmed", role: "Robotics Club Lead", rating: 5, text: "We rented a Jetson Nano and a robot arm kit for our competition. Everything arrived tested and the booking took two minutes." },
  { name: "Nusrat Jahan", role: "Final-year CSE Student", rating: 5, text: "Buying an AI board for one project was impossible on my budget. Renting it weekly made my thesis demo possible." },
  { name: "Rafiul Karim", role: "Garage Owner", rating: 4, text: "The OBD2 scanner and engine hoist saved me from a big purchase. Clear pricing and the owner was very helpful." },
  { name: "Samira Chowdhury", role: "Hobbyist Maker", rating: 5, text: "A 3D printer for a month, with no upfront cost. The whole process felt professional and secure." },
];

export default function Reviews() {
  return (
    <section className="py-24">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <p className="eyebrow">Customer Reviews</p>
          <h2 className="t-h2 mt-4">
            Our customers <em>love what we do</em>
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {reviews.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.12 }}
              className="card-dark flex h-full flex-col p-8"
            >
              <FaQuoteLeft className="text-2xl text-primary" />
              <p className="t-body mt-5">{r.text}</p>
              <div className="mt-auto flex items-center justify-between gap-4 pt-8">
                <div>
                  <p className="font-semibold text-base-content">{r.name}</p>
                  <p className="t-caption">{r.role}</p>
                </div>
                <div className="flex gap-1" aria-label={`${r.rating} out of 5 stars`}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <FaStar
                      key={n}
                      className={n <= r.rating ? "text-primary" : "text-base-content/20"}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}