"use client";
import RequireAuth from "../../components/RequireAuth";
import DataTable, { Badge } from "../../components/DataTable";
import useLoad from "../../lib/useLoad";
import { api } from "../../lib/api";
import { toast } from "../../lib/notify";
import { taka, fmtDate, selectCls } from "../../lib/constants";

export default function AllRentals() {
  const { data, loading, reload } = useLoad("/bookings/all");

  const changeStatus = async (id, status) => {
    try {
      await api(`/bookings/${id}/status`, { method: "PATCH", body: { status } });
      toast("success", "Booking status updated");
      reload();
    } catch (e) {
      toast("error", e.message);
    }
  };

  const columns = [
    {
      label: "Customer Information",
      render: (r) => (
        <div>
          <p>{r.customerName}</p>
          <p className="t-caption">{r.customerEmail}</p>
        </div>
      ),
    },
    {
      label: "Owner Information",
      render: (r) => (
        <div>
          <p>{r.ownerName}</p>
          <p className="t-caption">{r.ownerEmail}</p>
        </div>
      ),
    },
    { label: "Equipment Name", key: "equipmentName" },
    { label: "Rental Duration", render: (r) => `${fmtDate(r.startDate)} → ${fmtDate(r.endDate)}` },
    { label: "Booking Amount", render: (r) => taka(r.amount) },
    { label: "Payment Status", render: (r) => <Badge value={r.paymentStatus} /> },
    {
      label: "Booking Status",
      render: (r) => (
        <select
          value={r.bookingStatus}
          onChange={(e) => changeStatus(r._id, e.target.value)}
          className={`${selectCls} select-sm w-36`}
        >
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      ),
    },
  ];

  return (
    <RequireAuth roles={["admin"]}>
      <div className="space-y-6">
        <h1 className="t-h2">All Rentals</h1>
        <DataTable columns={columns} rows={data || []} loading={loading} />
      </div>
    </RequireAuth>
  );
}