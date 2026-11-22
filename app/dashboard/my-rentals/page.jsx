"use client";
import DataTable, { Badge } from "../../components/DataTable";
import useLoad from "../../lib/useLoad";
import { taka, fmtDate } from "../../lib/constants";

export default function MyRentals() {
  const { data, loading } = useLoad("/bookings/mine");
  const columns = [
    { label: "Equipment Name", key: "equipmentName" },
    { label: "Rental Start", render: (r) => fmtDate(r.startDate) },
    { label: "Rental End", render: (r) => fmtDate(r.endDate) },
    { label: "Booking Date", render: (r) => fmtDate(r.createdAt) },
    { label: "Total Amount", render: (r) => taka(r.amount) },
    { label: "Payment Status", render: (r) => <Badge value={r.paymentStatus} /> },
    { label: "Booking Status", render: (r) => <Badge value={r.bookingStatus} /> },
  ];
  return (
    <div className="space-y-6">
      <h1 className="t-h2">My Rentals</h1>
      <DataTable columns={columns} rows={data || []} loading={loading} empty="You have no rentals yet." />
    </div>
  );
}