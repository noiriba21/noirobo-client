"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import EquipmentCard from "../components/home/EquipmentCard";
import Spinner from "../components/Spinner";
import { CATEGORIES, RENTAL_TYPES, inputCls, selectCls } from "../lib/constants";

const API = process.env.NEXT_PUBLIC_API_URL;
const LIMIT = 9;

function Browse() {
  const sp = useSearchParams();
  const [f, setF] = useState({
    search: sp.get("search") || "",
    category: sp.get("category") || "",
    segment: sp.get("segment") || "",
    rentalType: "",
    minPrice: "",
    maxPrice: "",
    availability: "",
    sort: "",
  });
  const [q, setQ] = useState(f.search);
  const [page, setPage] = useState(1);
  const [data, setData] = useState({ equipment: [], total: 0, totalPages: 0 });
  const [loading, setLoading] = useState(true);

  const set = (k) => (e) => {
    setF((p) => ({ ...p, [k]: e.target.value }));
    setPage(1);
  };

  useEffect(() => {
    const t = setTimeout(() => {
      setQ(f.search);
      setPage(1);
    }, 400);
    return () => clearTimeout(t);
  }, [f.search]);

  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries({ ...f, search: q, page, limit: LIMIT }).forEach(([k, v]) => {
      if (v !== "" && v != null) params.set(k, v);
    });
    const ctrl = new AbortController();
    setLoading(true);
    fetch(`${API}/equipment?${params}`, { signal: ctrl.signal, cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch((e) => {
        if (e.name !== "AbortError") setLoading(false);
      });
    return () => ctrl.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [f.category, f.segment, f.rentalType, f.minPrice, f.maxPrice, f.availability, f.sort, q, page]);

  return (
    <div className="container-x py-16">
      <p className="eyebrow">All Equipment</p>
      <h1 className="t-h1 mt-4">
        Find the <em>right tool</em>
      </h1>

      <div className="card-dark mt-10 grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-4" style={{ transform: "none" }}>
        <input value={f.search} onChange={set("search")} placeholder="Search name or location" className={`${inputCls} lg:col-span-2`} />
        <select value={f.category} onChange={set("category")} className={selectCls}>
          <option value="">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <select value={f.rentalType} onChange={set("rentalType")} className={selectCls}>
          <option value="">Any rental type</option>
          {RENTAL_TYPES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <input type="number" min="0" value={f.minPrice} onChange={set("minPrice")} placeholder="Min price" className={inputCls} />
        <input type="number" min="0" value={f.maxPrice} onChange={set("maxPrice")} placeholder="Max price" className={inputCls} />
        <select value={f.availability} onChange={set("availability")} className={selectCls}>
          <option value="">Any availability</option>
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>
        <select value={f.sort} onChange={set("sort")} className={selectCls}>
          <option value="">Recently added</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      <p className="t-small mt-6">{data.total || 0} equipment found</p>

      {loading ? (
        <Spinner className="py-24" />
      ) : data.equipment.length === 0 ? (
        <p className="t-body py-20 text-center">No equipment matches your search.</p>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.equipment.map((item, i) => (
            <EquipmentCard key={item._id} item={item} index={i} />
          ))}
        </div>
      )}

      {data.totalPages > 1 && (
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
          <button className="btn btn-outline-light btn-sm" disabled={page === 1} onClick={() => setPage(page - 1)}>
            Prev
          </button>
          {Array.from({ length: data.totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`btn btn-sm ${n === page ? "btn-primary" : "btn-outline-light"}`}
            >
              {n}
            </button>
          ))}
          <button className="btn btn-outline-light btn-sm" disabled={page === data.totalPages} onClick={() => setPage(page + 1)}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default function EquipmentPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <Browse />
    </Suspense>
  );
}