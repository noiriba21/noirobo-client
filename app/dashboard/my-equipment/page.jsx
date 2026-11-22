"use client";
import Link from "next/link";
import RequireAuth from "../../components/RequireAuth";
import DataTable, { Badge } from "../../components/DataTable";
import useLoad from "../../lib/useLoad";
import { api } from "../../lib/api";
import { toast, confirmBox } from "../../lib/notify";
import { taka } from "../../lib/constants";

export default function MyEquipment() {
  const { data, loading, reload } = useLoad("/equipment/mine");

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
    { label: "Equipment Name", key: "name" },
    { label: "Category", key: "category" },
    { label: "Rental Price", render: (r) => `${taka(r.price)} / ${r.rentalType.toLowerCase()}` },
    { label: "Available Qty", key: "quantity" },
    { label: "Status", render: (r) => <Badge value={r.status} /> },
    {
      label: "Actions",
      render: (r) => (
        <div className="flex gap-2">
          <Link href={`/equipment/${r._id}`} className="btn btn-outline-light btn-xs">View Details</Link>
          <Link href={`/dashboard/edit-equipment/${r._id}`} className="btn btn-primary btn-xs">Update</Link>
          <button onClick={() => remove(r._id)} className="btn btn-outline-light btn-xs">Delete</button>
        </div>
      ),
    },
  ];

  return (
    <RequireAuth roles={["owner"]}>
      <div className="space-y-6">
        <h1 className="t-h2">My Equipment</h1>
        <DataTable columns={columns} rows={data || []} loading={loading} empty="You have not added equipment yet." />
      </div>
    </RequireAuth>
  );
}