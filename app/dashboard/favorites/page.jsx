"use client";
import Link from "next/link";
import DataTable from "../../components/DataTable";
import useLoad from "../../lib/useLoad";
import { api } from "../../lib/api";
import { toast } from "../../lib/notify";
import { taka } from "../../lib/constants";

export default function Favorites() {
  const { data, loading, reload } = useLoad("/favorites");

  const remove = async (id) => {
    try {
      await api(`/favorites/${id}`, { method: "DELETE" });
      toast("success", "Removed from favorites");
      reload();
    } catch (e) {
      toast("error", e.message);
    }
  };

  const columns = [
    { label: "Equipment", key: "name" },
    { label: "Category", key: "category" },
    { label: "Price", render: (r) => `${taka(r.price)} / ${r.rentalType.toLowerCase()}` },
    {
      label: "Actions",
      render: (r) => (
        <div className="flex gap-2">
          <Link href={`/equipment/${r._id}`} className="btn btn-primary btn-xs">View Details</Link>
          <button onClick={() => remove(r._id)} className="btn btn-outline-light btn-xs">Remove</button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="t-h2">Favorites</h1>
      <DataTable columns={columns} rows={data || []} loading={loading} empty="No favorites saved yet." />
    </div>
  );
}