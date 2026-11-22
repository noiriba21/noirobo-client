"use client";
import { useState } from "react";
import { api } from "../lib/api";
import { toast } from "../lib/notify";
import { taka, calcDays, calcAmount, inputCls, areaCls } from "../lib/constants";

export default function BookingModal({ item, onClose }) {
  const today = new Date().toISOString().slice(0, 10);
  const [f, setF] = useState({
    startDate: "",
    endDate: "",
    quantity: 1,
    phone: "",
    address: "",
    notes: "",
  });
  const [busy, setBusy] = useState(false);

  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));
  const days = calcDays(f.startDate, f.endDate);
  const total = days > 0 ? calcAmount(item, days, Number(f.quantity) || 0) : 0;

  const submit = async (e) => {
    e.preventDefault();
    const qty = Number(f.quantity);
    if (days <= 0) return toast("error", "End date must be on or after start date");
    if (!Number.isInteger(qty) || qty < 1 || qty > item.quantity) {
      return toast("error", `Quantity must be between 1 and ${item.quantity}`);
    }
    setBusy(true);
    try {
      const { url } = await api("/create-checkout-session", {
        method: "POST",
        body: { equipmentId: item._id, ...f, quantity: qty },
      });
      window.location.href = url;
    } catch (err) {
      toast("error", err.message);
      setBusy(false);
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-lg border border-white/10 bg-base-200">
        <h3 className="t-h3">Book {item.name}</h3>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="t-small">
              Rental start date
              <input type="date" min={today} required value={f.startDate} onChange={set("startDate")} className={`${inputCls} mt-1`} />
            </label>
            <label className="t-small">
              Rental end date
              <input type="date" min={f.startDate || today} required value={f.endDate} onChange={set("endDate")} className={`${inputCls} mt-1`} />
            </label>
          </div>
          <label className="t-small block">
            Required quantity (max {item.quantity})
            <input type="number" min="1" max={item.quantity} required value={f.quantity} onChange={set("quantity")} className={`${inputCls} mt-1`} />
          </label>
          <input required placeholder="Contact number" value={f.phone} onChange={set("phone")} className={inputCls} />
          <input required placeholder="Delivery address" value={f.address} onChange={set("address")} className={inputCls} />
          <textarea placeholder="Additional notes (optional)" value={f.notes} onChange={set("notes")} className={areaCls} rows={2} />

          <div className="rounded-lg border border-white/10 bg-base-100 p-4">
            <div className="flex justify-between text-sm">
              <span>
                {days > 0 ? `${days} day(s) × ${f.quantity || 0} unit(s)` : "Select dates"}
              </span>
              <span className="t-price">{taka(total)}</span>
            </div>
            <p className="t-caption mt-2">
              Billed per {item.rentalType.toLowerCase()} period. Card payment is charged in USD at ৳120 = $1.
            </p>
          </div>

          <div className="modal-action">
            <button type="button" onClick={onClose} className="btn btn-outline-light">
              Cancel
            </button>
            <button disabled={busy} className="btn btn-primary">
              {busy ? "Redirecting..." : "Confirm & Pay"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}