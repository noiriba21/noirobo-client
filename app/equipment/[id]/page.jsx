"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FaHeart, FaRegHeart, FaLocationDot } from "react-icons/fa6";
import RequireAuth from "../../components/RequireAuth";
import { useAuth } from "../../components/AuthProvider";
import BookingModal from "../../components/BookingModal";
import Spinner from "../../components/Spinner";
import { api } from "../../lib/api";
import { toast } from "../../lib/notify";
import { taka } from "../../lib/constants";

function Details() {
  const { id } = useParams();
  const { role } = useAuth();
  const [item, setItem] = useState(null);
  const [error, setError] = useState("");
  const [fav, setFav] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setItem(await api(`/equipment/${id}`));
        const ids = await api("/favorites/ids");
        setFav(ids.includes(id));
      } catch (e) {
        setError(e.message);
      }
    })();
  }, [id]);

  const toggleFav = async () => {
    try {
      if (fav) {
        await api(`/favorites/${id}`, { method: "DELETE" });
        setFav(false);
        toast("info", "Removed from favorites");
      } else {
        await api("/favorites", { method: "POST", body: { equipmentId: id } });
        setFav(true);
        toast("success", "Added to favorites");
      }
    } catch (e) {
      toast("error", e.message);
    }
  };

  if (error) {
    return (
      <div className="container-x py-24 text-center">
        <h2 className="t-h2">Equipment not found</h2>
        <Link href="/equipment" className="btn btn-primary mt-8">
          Browse equipment
        </Link>
      </div>
    );
  }
  if (!item) return <Spinner />;

  const info = [
    ["Category", item.category],
    ["Rental type", item.rentalType],
    ["Condition", item.condition],
    ["Brand", item.brand],
    ["Model", item.model],
    ["Available quantity", item.quantity],
  ];

  return (
    <div className="container-x py-16">
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="card-dark overflow-hidden" style={{ transform: "none" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.image} alt={item.name} className="aspect-[4/3] w-full object-cover" />
        </div>

        <div>
          <p className="eyebrow">{item.category}</p>
          <h1 className="t-h1 mt-4">{item.name}</h1>
          <p className="t-small mt-3 flex items-center gap-2">
            <FaLocationDot className="text-primary" /> {item.location}
          </p>
          <p className="t-price mt-6">
            {taka(item.price)} <small>/ {item.rentalType.toLowerCase()}</small>
          </p>
          <p className="t-body mt-6">{item.description}</p>

          <dl className="mt-8 grid grid-cols-2 gap-4">
            {info.map(([k, v]) => (
              <div key={k} className="rounded-lg border border-white/10 p-3">
                <dt className="t-caption">{k}</dt>
                <dd className="mt-1 text-sm">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            {role === "customer" && item.quantity > 0 ? (
              <button onClick={() => setOpen(true)} className="btn btn-primary btn-lg px-8">
                Book Now
              </button>
            ) : (
              <p className="t-small self-center">
                {item.quantity <= 0
                  ? "Currently unavailable"
                  : "Only customer accounts can book equipment."}
              </p>
            )}
            <button onClick={toggleFav} className="btn btn-outline-light btn-lg">
              {fav ? <FaHeart className="text-primary" /> : <FaRegHeart />}
              {fav ? "Favorited" : "Add to Favorites"}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        <div className="card-dark p-6" style={{ transform: "none" }}>
          <h3 className="t-h4">Rental Terms &amp; Conditions</h3>
          <p className="t-small mt-3">{item.terms}</p>
        </div>
        <div className="card-dark p-6" style={{ transform: "none" }}>
          <h3 className="t-h4">Owner Information</h3>
          <p className="t-body mt-3">{item.ownerName}</p>
          <p className="t-small">{item.ownerEmail}</p>
        </div>
      </div>

      {open && <BookingModal item={item} onClose={() => setOpen(false)} />}
    </div>
  );
}

export default function EquipmentDetailsPage() {
  return (
    <RequireAuth>
      <Details />
    </RequireAuth>
  );
}