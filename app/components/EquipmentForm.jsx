"use client";
import { useState } from "react";
import {
  CATEGORIES, RENTAL_TYPES, CONDITIONS,
  inputCls, selectCls, areaCls, uploadImage,
} from "../lib/constants";
import { toast } from "../lib/notify";

function Field({ label, children, wide }) {
  return (
    <label className={`t-small block ${wide ? "sm:col-span-2" : ""}`}>
      {label}
      <div className="mt-1">{children}</div>
    </label>
  );
}

export default function EquipmentForm({ initial = {}, onSubmit, label }) {
  const [f, setF] = useState({
    name: "", description: "", category: CATEGORIES[0], segment: "robot",
    location: "", price: "", rentalType: "Daily", quantity: "",
    condition: "Good", brand: "", model: "", image: "", terms: "",
    ...initial,
  });
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      let image = f.image;
      if (file) image = await uploadImage(file);
      if (!image) throw new Error("Please upload an image or paste an image link");
      await onSubmit({ ...f, image });
    } catch (err) {
      toast("error", err.message);
    }
    setBusy(false);
  };

  return (
    <form onSubmit={submit} className="card-dark grid gap-4 p-6 sm:grid-cols-2" style={{ transform: "none" }}>
      <Field label="Equipment name">
        <input required value={f.name} onChange={set("name")} className={inputCls} />
      </Field>
      <Field label="Category">
        <select value={f.category} onChange={set("category")} className={selectCls}>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
      </Field>
      <Field label="Section (home page group)">
        <select value={f.segment} onChange={set("segment")} className={selectCls}>
          <option value="robot">Robot</option>
          <option value="car">Car</option>
        </select>
      </Field>
      <Field label="Location">
        <input required value={f.location} onChange={set("location")} className={inputCls} />
      </Field>
      <Field label="Rental price (৳)">
        <input required type="number" min="1" value={f.price} onChange={set("price")} className={inputCls} />
      </Field>
      <Field label="Rental type">
        <select value={f.rentalType} onChange={set("rentalType")} className={selectCls}>
          {RENTAL_TYPES.map((c) => <option key={c}>{c}</option>)}
        </select>
      </Field>
      <Field label="Available quantity">
        <input required type="number" min="0" value={f.quantity} onChange={set("quantity")} className={inputCls} />
      </Field>
      <Field label="Equipment condition">
        <select value={f.condition} onChange={set("condition")} className={selectCls}>
          {CONDITIONS.map((c) => <option key={c}>{c}</option>)}
        </select>
      </Field>
      <Field label="Brand">
        <input required value={f.brand} onChange={set("brand")} className={inputCls} />
      </Field>
      <Field label="Model">
        <input required value={f.model} onChange={set("model")} className={inputCls} />
      </Field>
      <Field label="Description" wide>
        <textarea required rows={3} value={f.description} onChange={set("description")} className={areaCls} />
      </Field>
      <Field label="Upload image (imgbb)">
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} className="file-input w-full border border-white/15 bg-base-100" />
      </Field>
      <Field label="Or paste image link">
        <input value={f.image} onChange={set("image")} placeholder="https://..." className={inputCls} />
      </Field>
      <Field label="Rental terms and conditions" wide>
        <textarea required rows={3} value={f.terms} onChange={set("terms")} className={areaCls} />
      </Field>
      <div className="sm:col-span-2">
        <button disabled={busy} className="btn btn-primary px-8">
          {busy ? "Saving..." : label}
        </button>
        <span className="t-caption ml-4">New equipment starts as Pending until an admin approves it.</span>
      </div>
    </form>
  );
}