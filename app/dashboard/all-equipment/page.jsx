"use client";
import Link from "next/link";
import RequireAuth from "../../components/RequireAuth";
import DataTable, { Badge } from "../../components/DataTable";
import useLoad from "../../lib/useLoad";
import { api } from "../../lib/api";
import { toast, confirmBox } from "../../lib/notify";
import { taka } from "../../lib/constants";

export default function AllEquipment() {
  const { data, loading, reload } = useLoad("/admin/equipment");

  const setStatus = async (id, status) => {
    try {
      await api(`/equipment/${id}/status`, { method: "PATCH", body: { status } });
      toast("success", `Equipment ${status}`);
      reload();
    } catch (e) {
      toast("error", e.message);
    }
  };

  const remove = async (id) => {
    if (!(await confirmBox("Delete this equipment?", "This cannot be undone."))) return;
    try {
      await api(`/equipment/${id}`, { method: "DELETE" });
      toast("success", "Equipment deleted");
      reload();
    } catch (e) {
      toast("error", e.message);
    }
  };

  const columns = [
    { label: "Equipment", key: "name" },
    { label: "Category", key: "category" },
    { label: "Owner", render: (r) => r.ownerName || r.ownerEmail },
    { label: "Price", render: (r) => taka(r.price) },
    { label: "Qty", key: "quantity" },
    { label: "Status", render: (r) => <Badge value={r.status} /> },
    {
      label: "Actions",
      render: (r) => (
        <div className="flex gap-2">
          <button onClick={() => setStatus(r._id, "approved")} className="btn btn-primary btn-xs">Approve</button>
          <button onClick={() => setStatus(r._id, "rejected")} className="btn btn-outline-light btn-xs">Reject</button>
          <Link href={`/dashboard/edit-equipment/${r._id}`} className="btn btn-outline-light btn-xs">Update</Link>
          <button onClick={() => remove(r._id)} className="btn btn-outline-light btn-xs">Delete</button>
        </div>
      ),
    },
  ];

  return (
    <RequireAuth roles={["admin"]}>
      <div className="space-y-6">
        <h1 className="t-h2">All Equipment</h1>
        <DataTable columns={columns} rows={data || []} loading={loading} />
      </div>
    </RequireAuth>
  );
}