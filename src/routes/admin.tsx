import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { dressBySlug } from "@/lib/dresses";
import { formatLong, inr } from "@/lib/site";
import { seo } from "@/lib/seo";
import { adminListBookings, adminLogin, adminLogout, adminMe, adminUpdateBooking } from "@/server/admin";
import type { BookingRow, BookingStatus } from "@/server/db.server";

export const Route = createFileRoute("/admin")({
  head: () => seo({ title: "Admin | Classic Aura", description: "Private dashboard for Classic Aura.", path: "/admin", noindex: true }),
  component: AdminPage,
});

const LABEL: Record<BookingStatus, string> = {
  pending_payment: "Awaiting payment",
  paid: "Paid (to confirm)",
  confirmed: "Confirmed",
  delivered: "Delivered",
  returned: "Returned",
  cancelled: "Cancelled",
  requested: "New request",
  expired: "Payment expired",
};
const ORDER: BookingStatus[] = ["paid", "requested", "confirmed", "delivered", "returned", "pending_payment", "expired", "cancelled"];
const EARNING: BookingStatus[] = ["paid", "confirmed", "delivered", "returned"];

function AdminPage() {
  const [email, setEmail] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    adminMe().then((me) => setEmail(me.email)).catch(() => setEmail(null));
  }, []);

  if (email === undefined) return <main className="mx-auto max-w-xl px-5 py-16" aria-busy="true" />;
  if (!email) return <Login onDone={setEmail} />;
  return <Dashboard email={email} onSignOut={() => setEmail(null)} />;
}

function Login({ onDone }: { onDone: (email: string) => void }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const result = await adminLogin({ data: form });
      onDone(result.email);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not sign in.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto max-w-sm px-5 py-20">
      <p className="kicker">Classic Aura</p>
      <h1 className="mt-2 font-display text-4xl text-cream">Admin sign in</h1>
      <form onSubmit={submit} className="mt-8 grid gap-5">
        <div>
          <label className="label" htmlFor="ad-email">Email</label>
          <input id="ad-email" type="email" autoComplete="username" required className="field" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>
        <div>
          <label className="label" htmlFor="ad-pass">Password</label>
          <input id="ad-pass" type="password" autoComplete="current-password" required className="field" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        </div>
        {error ? <p className="field-error">{error}</p> : null}
        <button className="btn btn-solid" type="submit" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button>
      </form>
    </main>
  );
}

function Dashboard({ email, onSignOut }: { email: string; onSignOut: () => void }) {
  const [rows, setRows] = useState<BookingRow[] | null>(null);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<BookingStatus | "all">("all");
  const [query, setQuery] = useState("");

  const load = useCallback(async () => {
    setError("");
    try {
      setRows(await adminListBookings());
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : "Could not load bookings.";
      if (/sign in/i.test(message)) onSignOut();
      else setError(message);
    }
  }, [onSignOut]);

  useEffect(() => {
    void load();
  }, [load]);

  const stats = useMemo(() => {
    const all = rows ?? [];
    return {
      revenue: all.filter((r) => EARNING.includes(r.status)).reduce((sum, r) => sum + r.total, 0),
      toConfirm: all.filter((r) => r.status === "paid").length,
      trials: all.filter((r) => r.status === "requested").length,
      waiting: all.filter((r) => r.status === "pending_payment").length,
    };
  }, [rows]);

  const shown = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return (rows ?? []).filter((r) => {
      if (filter !== "all" && r.status !== filter) return false;
      if (!needle) return true;
      return [r.ref, r.name, r.mobile, r.email, r.area].some((value) => value.toLowerCase().includes(needle));
    });
  }, [rows, filter, query]);

  function exportCsv() {
    const header = ["Ref", "Type", "Status", "Name", "Mobile", "Email", "Address", "Total", "Paid at", "Outfits", "Created"];
    const lines = (rows ?? []).map((r) => [
      r.ref, r.kind, r.status, r.name, r.mobile, r.email, `${r.address}, ${r.area} ${r.pincode}`, r.total, r.paid_at ?? "",
      (r.booking_items ?? []).map((i) => `${dressBySlug(i.dress_slug)?.name ?? i.dress_slug}${i.rental_date ? ` ${i.rental_date} x${i.days}d` : ""}`).join(" | "),
      r.created_at,
    ]);
    const csv = [header, ...lines].map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `classic-aura-bookings-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="mx-auto max-w-6xl px-5 py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="kicker">Classic Aura admin</p>
          <h1 className="font-display text-4xl text-cream">Bookings</h1>
          <p className="text-sm text-mute">{email}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="btn btn-line" onClick={() => void load()}>Refresh</button>
          <button className="btn btn-line" onClick={exportCsv} disabled={!rows?.length}>Export CSV</button>
          <button
            className="btn btn-line"
            onClick={async () => {
              await adminLogout();
              onSignOut();
            }}
          >
            Sign out
          </button>
        </div>
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat k="Confirmed value" v={inr(stats.revenue)} />
        <Stat k="Paid, to confirm" v={String(stats.toConfirm)} />
        <Stat k="New requests" v={String(stats.trials)} />
        <Stat k="Awaiting payment" v={String(stats.waiting)} />
      </dl>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        {(["all", ...ORDER] as const).map((status) => (
          <button
            key={status}
            className={"btn min-h-9 px-3 py-1 " + (filter === status ? "btn-solid" : "btn-line")}
            aria-pressed={filter === status}
            onClick={() => setFilter(status)}
          >
            {status === "all" ? "All" : LABEL[status]}
          </button>
        ))}
        <input className="field ml-auto max-w-xs" placeholder="Search name, mobile, ref…" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search bookings" />
      </div>

      {error ? <p className="field-error mt-4">{error}</p> : null}
      {rows === null && !error ? <p className="mt-8 text-mute">Loading…</p> : null}
      {rows && shown.length === 0 ? <p className="mt-8 text-mute">No bookings here yet.</p> : null}

      <ul className="mt-6 grid gap-4">
        {shown.map((row) => (
          <BookingCard key={row.id} row={row} onSaved={load} />
        ))}
      </ul>
    </main>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="border border-line bg-paper px-4 py-3">
      <dt className="text-xs tracking-label uppercase text-mute">{k}</dt>
      <dd className="font-display text-3xl text-cream">{v}</dd>
    </div>
  );
}

function BookingCard({ row, onSaved }: { row: BookingRow; onSaved: () => Promise<void> }) {
  const [status, setStatus] = useState<BookingStatus>(row.status);
  const [notes, setNotes] = useState(row.admin_notes ?? "");
  const [slot, setSlot] = useState(row.delivery_slot ?? "");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const dirty = status !== row.status || notes !== (row.admin_notes ?? "") || slot !== (row.delivery_slot ?? "");

  async function save() {
    setBusy(true);
    setMsg("");
    try {
      await adminUpdateBooking({ data: { id: row.id, status, adminNotes: notes, deliverySlot: slot } });
      await onSaved();
      setMsg("Saved");
    } catch (cause) {
      setMsg(cause instanceof Error ? cause.message : "Could not save.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <li className="border border-line bg-paper p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-display text-2xl text-cream">
          {row.name} <span className="text-sm text-gold">{row.ref}</span>
        </p>
        <p className="text-sm text-mute">
          {row.kind === "trial" ? "Home trial" : `${inr(row.total)}${row.razorpay_link_id ? "" : " · cash on delivery"}`} · {LABEL[row.status]} · {new Date(row.created_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
        </p>
      </div>
      <p className="mt-2 text-sm">
        <a className="underline" href={`tel:+91${row.mobile}`}>{row.mobile}</a>
        {" · "}
        <a className="underline" href={`https://wa.me/91${row.whatsapp || row.mobile}`}>WhatsApp</a>
        {" · "}
        <a className="underline" href={`mailto:${row.email}`}>{row.email}</a>
      </p>
      <p className="mt-1 text-sm text-mute">{row.address}, {row.area}, {row.city} {row.pincode}</p>
      {row.preferred_time ? <p className="text-sm text-mute">Preferred time: {row.preferred_time}</p> : null}
      {row.notes ? <p className="text-sm text-mute">Customer notes: {row.notes}</p> : null}
      <ul className="mt-3 divide-y divide-line border-y border-line text-sm">
        {(row.booking_items ?? []).map((item, index) => (
          <li key={index} className="flex justify-between gap-3 py-2">
            <span>{dressBySlug(item.dress_slug)?.name ?? item.dress_slug}</span>
            <span className="text-mute">
              {item.rental_date ? `${formatLong(item.rental_date)} · ${item.days} day${item.days === 1 ? "" : "s"} · ${inr(item.fee)}` : "Trial"}
            </span>
          </li>
        ))}
      </ul>
      {row.razorpay_payment_id ? <p className="mt-2 text-xs text-mute">Razorpay payment: {row.razorpay_payment_id}</p> : null}
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="sm:col-span-3">
          <label className="label" htmlFor={`sl-${row.id}`}>Delivery time (the customer sees this when you confirm)</label>
          <input id={`sl-${row.id}`} className="field" placeholder="e.g. Tomorrow, 6 to 8 PM" value={slot} onChange={(e) => setSlot(e.target.value)} maxLength={120} />
        </div>
        <div>
          <label className="label" htmlFor={`st-${row.id}`}>Status</label>
          <select id={`st-${row.id}`} className="field" value={status} onChange={(e) => setStatus(e.target.value as BookingStatus)}>
            {ORDER.map((s) => (
              <option key={s} value={s}>{LABEL[s]}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="label" htmlFor={`nt-${row.id}`}>Your notes (private)</label>
          <input id={`nt-${row.id}`} className="field" value={notes} onChange={(e) => setNotes(e.target.value)} maxLength={2000} />
        </div>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <button className="btn btn-solid min-h-9 px-4 py-1" onClick={() => void save()} disabled={!dirty || busy}>{busy ? "Saving…" : "Save"}</button>
        {msg ? <span className="text-sm text-mute">{msg}</span> : null}
      </div>
    </li>
  );
}
