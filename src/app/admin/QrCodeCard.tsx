"use client";

import { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

export function QrCodeCard({ url }: { url: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  function handleDownload() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "lavazza-menu-qr.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <div className="rounded-xl bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-base font-bold text-stone-900">QR Kod</h2>
      <p className="mb-3 break-all text-xs text-stone-500">{url}</p>
      <div className="mb-3 inline-block rounded-lg border border-stone-200 p-3">
        <QRCodeCanvas ref={canvasRef} value={url} size={180} marginSize={2} />
      </div>
      <div>
        <button
          onClick={handleDownload}
          className="rounded-md bg-stone-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-stone-800"
        >
          PNG olarak indir
        </button>
      </div>
    </div>
  );
}
