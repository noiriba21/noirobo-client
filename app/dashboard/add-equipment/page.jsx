"use client";
import { useRouter } from "next/navigation";
import RequireAuth from "../../components/RequireAuth";
import EquipmentForm from "../../components/EquipmentForm";
import { api } from "../../lib/api";
import { alertBox } from "../../lib/notify";

export default function AddEquipment() {
  const router = useRouter();
  const onSubmit = async (data) => {
    await api("/equipment", { method: "POST", body: data });
    await alertBox("success", "Equipment added", "It will appear after admin approval.");
    router.push("/dashboard/my-equipment");
  };
  return (
    <RequireAuth roles={["owner"]}>
      <div className="max-w-4xl space-y-6">
        <h1 className="t-h2">Add Equipment</h1>
        <EquipmentForm onSubmit={onSubmit} label="Add equipment" />
      </div>
    </RequireAuth>
  );
}