"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaRobot,
  FaMicrochip,
  FaCube,
  FaCarSide,
  FaScrewdriverWrench,
  FaCarBattery,
  FaArrowRight,
} from "react-icons/fa6";

const categories = [
  { name: "Robotics & Electronics", icon: FaRobot, text: "Arduino, Raspberry Pi, robot arms, sensors and drones" },
  { name: "AI & ML Hardware", icon: FaMicrochip, text: "Jetson boards and camera vision modules" },
  { name: "3D Printing & Fabrication", icon: FaCube, text: "3D printers and laser cutters for your builds" },
  { name: "Vehicles & Car Tools", icon: FaCarSide, text: "OBD2 scanners, paint and diagnostic tools" },
  { name: "Car Workshop Equipment", icon: FaScrewdriverWrench, text: "Jacks, welders, engine hoists and tyre machines" },
  { name: "EV & Battery Tools", icon: FaCarBattery, text: "Battery testers and EV diagnostics" },
];

export default function Categories() {
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
          <p className="eyebrow">Explore Categories</p>
          <h2 className="t-h2 mt-4">
            Everything you need, <em>organised</em>
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              className="h-full"
            >
              <Link
                href={`/equipment?category=${encodeURIComponent(c.name)}`}
                className="card-dark group flex h-full flex-col p-7"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-xl text-primary transition group-hover:border-primary group-hover:bg-primary group-hover:text-primary-content">
                  <c.icon />
                </span>
                <h3 className="t-h4 mt-6">{c.name}</h3>
                <p className="t-small mt-2">{c.text}</p>
                <span className="t-label mt-auto flex items-center gap-2 pt-6 text-primary">
                  Browse <FaArrowRight />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}