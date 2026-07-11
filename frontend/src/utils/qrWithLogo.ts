import QRCode from 'qrcode'

const BRAND_BLUE = '#1a4f8f'
const DAIRY_ICON = '/dairy-qr-icon.png'
// PNG artwork sits ~9px left of canvas center (170px wide source)
const ICON_ARTWORK_OFFSET_X = 9 / 170

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

function drawDairyIconFallback(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
) {
  const cx = x + size / 2
  const cy = y + size / 2
  ctx.fillStyle = '#000000'

  // Head
  ctx.beginPath()
  ctx.ellipse(cx, cy + size * 0.06, size * 0.28, size * 0.3, 0, 0, Math.PI * 2)
  ctx.fill()

  // Ears
  ctx.beginPath()
  ctx.ellipse(x + size * 0.18, cy - size * 0.02, size * 0.08, size * 0.1, 0, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.ellipse(x + size * 0.82, cy - size * 0.02, size * 0.08, size * 0.1, 0, 0, Math.PI * 2)
  ctx.fill()

  // Horns
  ctx.beginPath()
  ctx.moveTo(cx - size * 0.14, y + size * 0.18)
  ctx.quadraticCurveTo(cx - size * 0.22, y + size * 0.04, cx - size * 0.1, y + size * 0.08)
  ctx.fill()
  ctx.beginPath()
  ctx.moveTo(cx + size * 0.14, y + size * 0.18)
  ctx.quadraticCurveTo(cx + size * 0.22, y + size * 0.04, cx + size * 0.1, y + size * 0.08)
  ctx.fill()

  // Eyes
  ctx.fillStyle = '#ffffff'
  ctx.beginPath()
  ctx.ellipse(cx - size * 0.1, cy - size * 0.02, size * 0.035, size * 0.05, 0, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.ellipse(cx + size * 0.1, cy - size * 0.02, size * 0.035, size * 0.05, 0, 0, Math.PI * 2)
  ctx.fill()

  // Snout
  roundRect(ctx, cx - size * 0.16, cy + size * 0.14, size * 0.32, size * 0.2, size * 0.1)
  ctx.fill()

  // Nostrils
  ctx.fillStyle = '#000000'
  ctx.beginPath()
  ctx.arc(cx - size * 0.06, cy + size * 0.22, size * 0.028, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.arc(cx + size * 0.06, cy + size * 0.22, size * 0.028, 0, Math.PI * 2)
  ctx.fill()
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  rx: number,
  ry: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath()
  ctx.moveTo(rx + r, ry)
  ctx.lineTo(rx + w - r, ry)
  ctx.quadraticCurveTo(rx + w, ry, rx + w, ry + r)
  ctx.lineTo(rx + w, ry + h - r)
  ctx.quadraticCurveTo(rx + w, ry + h, rx + w - r, ry + h)
  ctx.lineTo(rx + r, ry + h)
  ctx.quadraticCurveTo(rx, ry + h, rx, ry + h - r)
  ctx.lineTo(rx, ry + r)
  ctx.quadraticCurveTo(rx, ry, rx + r, ry)
  ctx.closePath()
}

export async function drawQrWithLogo(
  canvas: HTMLCanvasElement,
  url: string,
  size: number,
  iconSrc = DAIRY_ICON,
) {
  await QRCode.toCanvas(canvas, url, {
    width: size,
    margin: 2,
    errorCorrectionLevel: 'H',
    color: {
      dark: BRAND_BLUE,
      light: '#ffffff',
    },
  })

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const iconSize = Math.round(size * 0.24)
  const iconOffsetX = Math.round(iconSize * ICON_ARTWORK_OFFSET_X)
  const x = Math.round((size - iconSize) / 2) + iconOffsetX
  const y = Math.round((size - iconSize) / 2)
  const cx = Math.round(size / 2)
  const cy = y + iconSize / 2
  const radius = iconSize / 2 + 6

  // Plain white patch only — no border
  ctx.fillStyle = '#ffffff'
  ctx.beginPath()
  ctx.arc(cx, cy, radius, 0, Math.PI * 2)
  ctx.fill()

  try {
    const img = await loadImage(iconSrc)
    ctx.drawImage(img, x, y, iconSize, iconSize)
  } catch {
    drawDairyIconFallback(ctx, x, y, iconSize)
  }
}

export async function qrWithLogoDataUrl(
  url: string,
  size: number,
  iconSrc = DAIRY_ICON,
) {
  const canvas = document.createElement('canvas')
  await drawQrWithLogo(canvas, url, size, iconSrc)
  return canvas.toDataURL('image/png')
}
