"use client";
import { useEffect, useState } from "react";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  LineChart, Line, PieChart, Pie, Cell,
} from "recharts";
import { useAuth } from "../components/AuthProvider";
import Spinner from "../components/Spinner";
import { api } from "../lib/api";
import { taka } from "../lib/constants";

const O = "#ff6a1a";
const COLORS = ["#ff6a1a", "#9aa4b2", "#4c8dff", "#22c55e", "#f59e0b"];
const tip = {
  contentStyle: {
    background: "#12161c",
    border: "1px solid #1c2028",
    borderRadius: 8,
    color: "#ece9e4",
  },
};

function Stat({ label, value }) {
  return (
    <div className="card-dark p-6" style={{ transform: "none" }}>
      <p className="t-label text-base-content/60">{label}</p>
      <p className="t-stat mt-3">{value}</p>
    </div>
  );
}

function Chart({ title, children }) {
  return (
    <div className="card-dark p-6" style={{ transform: "none" }}>
      <h3 className="t-h4 mb-4">{title}</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function Overview() {
  const { role } = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    const path =
      role === "admin" ? "/analytics/admin" : role === "owner" ? "/analytics/owner" : "/bookings/mine";
    api(path).then(setData).catch(() => setData({}));
  }, [role]);

  if (!data) return <Spinner className="py-24" />;

  if (role === "admin") {
    return (
      <div className="space-y-8">
        <h1 className="t-h2">Platform overview</h1>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <Stat label="Total users" value={data.totalUsers ?? 0} />
          <Stat label="Total equipment" value={data.totalEquipment ?? 0} />
          <Stat label="Total bookings" value={data.totalBookings ?? 0} />
          <Stat label="Pending approvals" value={data.pendingApprovals ?? 0} />
          <Stat label="Completed rentals" value={data.completedRentals ?? 0} />
          <Stat label="Total revenue" value={taka(data.totalRevenue)} />
        </div>
        <div className="grid gap-6 xl:grid-cols-2">
          <Chart title="Monthly bookings">
            <BarChart data={data.monthly || []}>
              <CartesianGrid stroke="#1c2028" />
              <XAxis dataKey="month" stroke="#9aa4b2" />
              <YAxis allowDecimals={false} stroke="#9aa4b2" />
              <Tooltip {...tip} />
              <Bar dataKey="bookings" fill={O} radius={[4, 4, 0, 0]} />
            </BarChart>
          </Chart>
          <Chart title="Monthly revenue (৳)">
            <LineChart data={data.monthly || []}>
              <CartesianGrid stroke="#1c2028" />
              <XAxis dataKey="month" stroke="#9aa4b2" />
              <YAxis stroke="#9aa4b2" />
              <Tooltip {...tip} />
              <Line type="monotone" dataKey="revenue" stroke={O} strokeWidth={2} />
            </LineChart>
          </Chart>
        </div>
      </div>
    );
  }

  if (role === "owner") {
    return (
      <div className="space-y-8">
        <h1 className="t-h2">Your rental business</h1>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Stat label="Listed equipment" value={data.totalListed ?? 0} />
          <Stat label="Total bookings" value={data.totalBookings ?? 0} />
          <Stat label="Completed rentals" value={data.completedRentals ?? 0} />
          <Stat label="Total earnings" value={taka(data.totalEarnings)} />
        </div>
        <Chart title="Monthly earnings (৳)">
          <BarChart data={data.monthly || []}>
            <CartesianGrid stroke="#1c2028" />
            <XAxis dataKey="month" stroke="#9aa4b2" />
            <YAxis stroke="#9aa4b2" />
            <Tooltip {...tip} />
            <Bar dataKey="earnings" fill={O} radius={[4, 4, 0, 0]} />
          </BarChart>
        </Chart>
      </div>
    );
  }

  const bookings = Array.isArray(data) ? data : [];
  const spent = bookings.reduce((s, b) => s + b.amount, 0);
  const byStatus = Object.entries(
    bookings.reduce((m, b) => ({ ...m, [b.bookingStatus]: (m[b.bookingStatus] || 0) + 1 }), {})
  ).map(([name, value]) => ({ name, value }));

  return (
    <div className="space-y-8">
      <h1 className="t-h2">Welcome back</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Total rentals" value={bookings.length} />
        <Stat label="Active bookings" value={bookings.filter((b) => b.bookingStatus === "confirmed").length} />
        <Stat label="Total spent" value={taka(spent)} />
      </div>
      <Chart title="Bookings by status">
        {byStatus.length === 0 ? (
          <PieChart />
        ) : (
          <PieChart>
            <Pie data={byStatus} dataKey="value" nameKey="name" outerRadius={100} label>
              {byStatus.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip {...tip} />
          </PieChart>
        )}
      </Chart>
    </div>
  );
}