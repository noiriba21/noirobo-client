"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import RequireAuth from "../../../components/RequireAuth";
import EquipmentForm from "../../../components/EquipmentForm";
import Spinner from "../../../components/Spinner";
import { api } from "../../../lib/api";
import { alertBox } from "../../../lib/notify";

export default function EditEquipment() {
  const { id } = useParams();
  const router = useRouter();
  const [item, setItem] = useState(null);

  useEffect(() => {
    api(`/equipment/${id}`).then(setItem).catch(() => router.push("/dashboard"));
  }, [id, router]);

  const onSubmit = async (data) => {
    await api(`/equipment/${id}`, { method: "PATCH", body: data });
    await alertBox("success", "Equipment updated");
    router.back();
  };

  return (
    <RequireAuth roles={["owner", "admin"]}>
      {!item ? (
        <Spinner />
      ) : (
        <div className="max-w-4xl space-y-6">
          <h1 className="t-h2">Update Equipment</h1>
          <EquipmentForm initial={item} onSubmit={onSubmit} label="Save changes" />
        </div>
      )}
    </RequireAuth>
  );
}