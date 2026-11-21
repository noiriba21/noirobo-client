"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import EquipmentCard from "./EquipmentCard";

export default function FeaturedEquipment({ items = [] }) {
  return (
    <section className="py-24">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col justify-between gap-6 md:flex-row md:items-end"
        >
          <div className="max-w-2xl">
            <p className="eyebrow">Featured Equipment</p>
            <h2 className="t-h2 mt-4">
              Popular right now, <em>ready to rent</em>
            </h2>
          </div>
          <Link href="/equipment" className="btn btn-outline-light">
            View all equipment
          </Link>
        </motion.div>

        {items.length === 0 ? (
          <p className="t-body mt-12">
            No equipment to show yet. Please check back soon.
          </p>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, i) => (
              <EquipmentCard key={item._id} item={item} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}