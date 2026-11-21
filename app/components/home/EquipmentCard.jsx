"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaLocationDot, FaArrowRight } from "react-icons/fa6";

export default function EquipmentCard({ item, index = 0 }) {
  const available = item.quantity > 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
      className="card-dark flex h-full flex-col overflow-hidden"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-base-200">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <span
          className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider backdrop-blur ${
            available
              ? "bg-success/20 text-success"
              : "bg-error/20 text-error"
          }`}
        >
          {available ? `${item.quantity} available` : "Unavailable"}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="t-label text-primary">{item.category}</p>
        <h3 className="t-h4 mt-2">{item.name}</h3>
        <p className="t-small mt-2 flex items-center gap-2">
          <FaLocationDot className="text-primary" />
          {item.location}
        </p>

        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <p className="t-price">
            ৳{Number(item.price).toLocaleString("en-US")}{" "}
            <small>/ {String(item.rentalType).toLowerCase()}</small>
          </p>
          <Link href={`/equipment/${item._id}`} className="btn btn-primary btn-sm">
            View Details <FaArrowRight />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
