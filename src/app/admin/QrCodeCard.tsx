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
    <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-blue-100">
      <h2 className="mb-3 text-base font-bold text-blue-950">QR Kod</h2>
      <p className="mb-3 break-all text-xs text-blue-400">{url}</p>
      <div className="mb-3 inline-block rounded-lg border border-blue-200 p-3">
        <QRCodeCanvas ref={canvasRef} value={url} size={180} marginSize={2} />
      </div>
      <div>
        <button
          onClick={handleDownload}
          className="rounded-md bg-yellow-400 px-3 py-1.5 text-xs font-bold text-blue-950 hover:bg-yellow-300"
        >
          PNG olarak indir
        </button>
      </div>
    </div>
  );
}
