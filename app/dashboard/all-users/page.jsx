"use client";
import RequireAuth from "../../components/RequireAuth";
import DataTable from "../../components/DataTable";
import useLoad from "../../lib/useLoad";
import { api } from "../../lib/api";
import { toast } from "../../lib/notify";
import { fmtDate, selectCls } from "../../lib/constants";

export default function AllUsers() {
  const { data, loading, reload } = useLoad("/users");

  const changeRole = async (id, role) => {
    try {
      await api(`/users/${id}/role`, { method: "PATCH", body: { role } });
      toast("success", "Role updated");
      reload();
    } catch (e) {
      toast("error", e.message);
    }
  };

  const columns = [
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Role", render: (r) => <span className="capitalize">{r.role}</span> },
    { label: "Registration Date", render: (r) => fmtDate(r.createdAt) },
    {
      label: "Change Role",
      render: (r) => (
        <select
          value={r.role}
          onChange={(e) => changeRole(r._id, e.target.value)}
          className={`${selectCls} select-sm w-32`}
        >
          <option value="customer">Customer</option>
          <option value="owner">Owner</option>
          <option value="admin">Admin</option>
        </select>
      ),
    },
  ];

  return (
    <RequireAuth roles={["admin"]}>
      <div className="space-y-6">
        <h1 className="t-h2">All Users</h1>
        <DataTable columns={columns} rows={data || []} loading={loading} />
      </div>
    </RequireAuth>
  );
}