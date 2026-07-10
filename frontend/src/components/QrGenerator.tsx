import { useEffect, useRef } from 'react'
import QRCode from 'qrcode'
import { getPublicUrl } from '../api'

type Props = {
  publicUrl: string
}

export default function QrGenerator({ publicUrl }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current || !publicUrl) return
    QRCode.toCanvas(canvasRef.current, publicUrl, {
      width: 220,
      margin: 2,
      color: {
        dark: '#1e3a8a',
        light: '#ffffff',
      },
    })
  }, [publicUrl])

  async function downloadPng() {
    const dataUrl = await QRCode.toDataURL(publicUrl, {
      width: 800,
      margin: 2,
      color: {
        dark: '#1e3a8a',
        light: '#ffffff',
      },
    })

    const link = document.createElement('a')
    link.href = dataUrl
    link.download = 'manufacturing-unit-qr.png'
    link.click()
  }

  return (
    <section className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
      <h2 className="text-lg font-semibold text-blue-900">QR Code (Single URL)</h2>
      <p className="mt-1 text-sm leading-6 text-slate-600">
        Generate this QR once. When details change in admin, the same QR will show updated data.
      </p>

      <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:items-start">
        <div className="rounded-xl bg-white p-3 shadow-sm">
          <canvas ref={canvasRef} />
        </div>

        <div className="w-full flex-1">
          <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
            QR URL
          </div>
          <div className="mt-1 break-all rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800">
            {publicUrl || getPublicUrl()}
          </div>

          <button
            type="button"
            onClick={() => void downloadPng()}
            className="mt-4 h-11 w-full rounded-xl bg-blue-700 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-800 sm:w-auto"
          >
            Download PNG
          </button>
        </div>
      </div>
    </section>
  )
}
