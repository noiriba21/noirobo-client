import Spinner from "./Spinner";

export function Badge({ value }) {
  const v = String(value || "").toLowerCase();
  const tone = ["paid", "approved", "confirmed", "completed", "available"].includes(v)
    ? "badge-success"
    : ["rejected", "cancelled", "unpaid"].includes(v)
    ? "badge-error"
    : "badge-warning";
  return <span className={`badge badge-outline capitalize ${tone}`}>{value}</span>;
}

export default function DataTable({ columns, rows = [], loading, empty = "Nothing to show yet." }) {
  if (loading) return <Spinner className="py-16" />;
  return (
    <div className="overflow-x-auto rounded-xl border border-white/10">
      <table className="table">
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.label} className="t-label whitespace-nowrap bg-base-200 text-base-content/70">
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="t-small py-10 text-center">
                {empty}
              </td>
            </tr>
          ) : (
            rows.map((r, i) => (
              <tr key={r._id || i} className="hover:bg-base-200/50">
                {columns.map((c) => (
                  <td key={c.label} className="whitespace-nowrap text-sm">
                    {c.render ? c.render(r) : r[c.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}