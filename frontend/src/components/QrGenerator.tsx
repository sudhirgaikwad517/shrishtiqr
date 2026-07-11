import { useEffect, useRef } from 'react'
import { getPublicUrl } from '../api'
import { drawQrWithLogo, qrWithLogoDataUrl } from '../utils/qrWithLogo'

type Props = {
  publicUrl: string
}

export default function QrGenerator({ publicUrl }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current || !publicUrl) return
    void drawQrWithLogo(canvasRef.current, publicUrl, 220)
  }, [publicUrl])

  async function downloadPng() {
    const dataUrl = await qrWithLogoDataUrl(publicUrl, 800)
    const link = document.createElement('a')
    link.href = dataUrl
    link.download = 'shrishti-manufacturing-unit-qr.png'
    link.click()
  }

  return (
    <section className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
      <h2 className="text-lg font-semibold text-[#1a4f8f]">QR Code (Single URL)</h2>
      <p className="mt-1 text-sm leading-6 text-slate-600">
        Generate this QR once with a dairy icon in the center. When details change in admin,
        the same QR will show updated data.
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
            className="mt-4 h-11 w-full rounded-xl bg-[#1a4f8f] px-4 text-sm font-medium text-white shadow-sm hover:bg-[#153d6f] sm:w-auto"
          >
            Download PNG
          </button>
        </div>
      </div>
    </section>
  )
}
