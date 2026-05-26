import { useEffect, useState } from "react";
import QRCodeLib from "qrcode";

export default function TicketCard({ booking, event }) {
  if (!booking) return null;

  const bookingDate = booking.bookingDate ? new Date(booking.bookingDate).toLocaleString() : new Date().toLocaleString();
  const [qrDataUrl, setQrDataUrl] = useState(null);

  useEffect(() => {
    let mounted = true;
    QRCodeLib.toDataURL(String(booking.ticketCode), { errorCorrectionLevel: "H", margin: 1, width: 320 })
      .then((url) => mounted && setQrDataUrl(url))
      .catch((err) => console.error("qr gen", err));
    return () => (mounted = false);
  }, [booking.ticketCode]);

  function handleDownload() {
    if (!qrDataUrl) return;
    const link = document.createElement("a");
    link.href = qrDataUrl;
    link.download = `ticket-${booking.ticketCode}.png`;
    link.click();
  }

  return (
    <div className="rounded-2xl border border-white/6 bg-white/3 p-6 shadow-glow">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="text-xs text-slate-400">Event</p>
          <p className="font-semibold text-white">{event?.title ?? booking.eventId}</p>

          <div className="mt-3">
            <p className="text-xs text-slate-400">Ticket code</p>
            <p className="font-mono text-sm text-cyan-200">{booking.ticketCode}</p>
          </div>

          <div className="mt-3">
            <p className="text-xs text-slate-400">Booked on</p>
            <p className="text-sm text-slate-300">{bookingDate}</p>
          </div>

          <div className="mt-4 flex gap-2">
            <button onClick={handleDownload} className="rounded-full bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200 transition hover:bg-cyan-400/15">
              Download ticket
            </button>
          </div>
        </div>

        <div className="w-44 flex-shrink-0 flex items-center justify-center rounded-xl bg-slate-900 p-3">
          {qrDataUrl ? (
            // eslint-disable-next-line jsx-a11y/img-redundant-alt
            <img src={qrDataUrl} alt={`QR code for ${booking.ticketCode}`} className="h-36 w-36 object-contain" />
          ) : (
            <div className="text-slate-400">Generating...</div>
          )}
        </div>
      </div>
    </div>
  );
}
