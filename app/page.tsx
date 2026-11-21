import { Suspense } from "react";
import Hero from "./components/home/Hero";
import Categories from "./components/home/Categories";
import FeaturedEquipment from "./components/home/FeaturedEquipment";
import SegmentSection from "./components/home/SegmentSection";
import WhyChooseUs from "./components/home/WhyChooseUs";
import HowItWorks from "./components/home/HowItWorks";
import Reviews from "./components/home/Reviews";

const API = process.env.NEXT_PUBLIC_API_URL;

async function getItems(path: string) {
  try {
    const res = await fetch(`${API}${path}`, { cache: "no-store" });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

async function EquipmentSections() {
  const [featured, robot, car] = await Promise.all([
    getItems("/equipment/featured?limit=6"),
    getItems("/equipment/featured?segment=robot&limit=4"),
    getItems("/equipment/featured?segment=car&limit=4"),
  ]);

  return (
    <>
      <FeaturedEquipment items={featured} />
      <SegmentSection type="robot" items={robot} />
      <SegmentSection type="car" items={car} />
    </>
  );
}

function EquipmentFallback() {
  return (
    <div className="container-x flex justify-center py-32">
      <span className="loading loading-spinner loading-lg text-primary" />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <Suspense fallback={<EquipmentFallback />}>
        <EquipmentSections />
      </Suspense>
      <WhyChooseUs />
      <HowItWorks />
      <Reviews />
    </>
  );
}