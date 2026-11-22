"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import RequireAuth from "../../components/RequireAuth";
import Spinner from "../../components/Spinner";
import { api } from "../../lib/api";
import { alertBox } from "../../lib/notify";

function Confirm() {
  const sid = useSearchParams().get("session_id");
  const ran = useRef(false);
  const [state, setState] = useState("loading");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!sid || ran.current) return;
    ran.current = true;
    api("/payments/confirm", { method: "POST", body: { sessionId: sid } })
      .then(() => {
        setState("ok");
        alertBox("success", "Payment successful", "Your booking is confirmed.");
      })
      .catch((e) => {
        setState("error");
        setMsg(e.message);
      });
  }, [sid]);

  if (!sid) return <p className="container-x py-24">Missing payment session.</p>;
  if (state === "loading") return <Spinner />;

  return (
    <div className="container-x py-24 text-center">
      {state === "ok" ? (
        <>
          <p className="eyebrow">Payment complete</p>
          <h1 className="t-h1 mt-4">
            Booking <em>confirmed</em>
          </h1>
          <p className="t-lead mx-auto mt-5 max-w-lg">
            Thank you. Your payment was received and your rental is booked.
          </p>
          <div className="mt-10 flex justify-center gap-3">
            <Link href="/dashboard/my-rentals" className="btn btn-primary">
              View my rentals
            </Link>
            <Link href="/equipment" className="btn btn-outline-light">
              Keep browsing
            </Link>
          </div>
        </>
      ) : (
        <>
          <h1 className="t-h1">Something went wrong</h1>
          <p className="t-body mt-4">{msg}</p>
          <Link href="/equipment" className="btn btn-primary mt-8">
            Back to equipment
          </Link>
        </>
      )}
    </div>
  );
}

export default function PaymentSuccess() {
  return (
    <RequireAuth>
      <Suspense fallback={<Spinner />}>
        <Confirm />
      </Suspense>
    </RequireAuth>
  );
}