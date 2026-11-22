export const CATEGORIES = [
  "Robotics & Electronics",
  "AI & ML Hardware",
  "3D Printing & Fabrication",
  "Vehicles & Car Tools",
  "Car Workshop Equipment",
  "EV & Battery Tools",
];
export const RENTAL_TYPES = ["Daily", "Weekly", "Monthly"];
export const CONDITIONS = ["New", "Like New", "Good", "Fair"];

export const inputCls =
  "input w-full border border-white/15 bg-base-100 text-base-content focus:border-primary focus:outline-none";
export const selectCls =
  "select w-full border border-white/15 bg-base-100 text-base-content focus:border-primary focus:outline-none";
export const areaCls =
  "textarea w-full border border-white/15 bg-base-100 text-base-content focus:border-primary focus:outline-none";

export const taka = (n) => `৳${Number(n || 0).toLocaleString("en-US")}`;

export const fmtDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "-";

export function calcDays(start, end) {
  if (!start || !end) return 0;
  const d = Math.round((new Date(end) - new Date(start)) / 86400000) + 1;
  return d > 0 ? d : 0;
}

export function calcAmount(item, days, qty) {
  const units =
    item.rentalType === "Weekly"
      ? Math.ceil(days / 7)
      : item.rentalType === "Monthly"
      ? Math.ceil(days / 30)
      : days;
  return item.price * units * qty;
}

export async function uploadImage(file) {
  const fd = new FormData();
  fd.append("image", file);
  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
    { method: "POST", body: fd }
  );
  const json = await res.json();
  if (!json.success) throw new Error("Image upload failed");
  return json.data.url;
}