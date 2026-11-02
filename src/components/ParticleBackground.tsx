import { useEffect, useRef } from 'react'

interface Props {
  reduced: boolean
}

interface Node {
  x: number; y: number; z: number // z: 0 (far) → 1 (near)
  vx: number; vy: number
  r: number
  hue: 0 | 1 // 0 blue, 1 cyan
}

interface Stream {
  seed: number
  speed: number
  amp: number
  yBase: number
  phase: number
  hue: 0 | 1
}

const BLUE = '8, 102, 255'
const CYAN = '0, 217, 255'

/**
 * Hero background: depth-layered nodes joined by fine lines, plus slow
 * luminous streams. Pointer pulls nearby nodes and shifts parallax layers.
 *
 * Performance: DPR capped at 1.75, node count scales with area and drops on
 * low-core devices, the loop pauses when off-screen or the tab is hidden,
 * and `pointer-events: none` keeps the page fully interactive. With
 * reduced motion a single static frame is drawn.
 */
export function ParticleBackground({ reduced }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let w = 0, h = 0, dpr = 1
    let nodes: Node[] = []
    let streams: Stream[] = []
    let raf = 0
    let running = false
    let visible = true
    const pointer = { x: 0, y: 0, tx: 0, ty: 0, active: false }
    const lowPower = (navigator.hardwareConcurrency ?? 8) <= 4

    const build = () => {
      const area = w * h
      const density = lowPower ? 26000 : 18000
      const count = Math.max(28, Math.min(lowPower ? 36 : 70, Math.round(area / density)))
      nodes = Array.from({ length: count }, () => {
        const z = Math.random()
        return {
          x: Math.random() * w, y: Math.random() * h, z,
          vx: (Math.random() - 0.5) * (0.12 + z * 0.28),
          vy: (Math.random() - 0.5) * (0.12 + z * 0.28),
          r: 0.6 + z * 1.6,
          hue: Math.random() > 0.72 ? 1 : 0,
        }
      })
      streams = Array.from({ length: lowPower ? 1 : 2 }, (_, i) => ({
        seed: Math.random() * 1000,
        speed: 0.00006 + Math.random() * 0.00007,
        amp: 40 + Math.random() * 90,
        yBase: h * (0.35 + i * 0.3),
        phase: Math.random() * Math.PI * 2,
        hue: i % 2 === 0 ? 0 : 1,
      }))
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 1.75)
      w = Math.max(1, rect.width)
      h = Math.max(1, rect.height)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      build()
      draw(performance.now())
    }

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h)

      // ease pointer
      pointer.x += (pointer.tx - pointer.x) * 0.06
      pointer.y += (pointer.ty - pointer.y) * 0.06

      // streams (drawn first, behind nodes)
      ctx.lineCap = 'round'
      for (const s of streams) {
        const col = s.hue ? CYAN : BLUE
        const grad = ctx.createLinearGradient(0, 0, w, 0)
        grad.addColorStop(0, `rgba(${col}, 0)`)
        grad.addColorStop(0.5, `rgba(${col}, 0.22)`)
        grad.addColorStop(1, `rgba(${col}, 0)`)
        ctx.strokeStyle = grad
        ctx.lineWidth = 1
        ctx.beginPath()
        const step = 24
        for (let x = -step; x <= w + step; x += step) {
          const y =
            s.yBase +
            Math.sin(x * 0.004 + t * s.speed * 6 + s.phase) * s.amp +
            Math.sin(x * 0.011 + t * s.speed * 11 + s.seed) * (s.amp * 0.22) +
            pointer.y * 14
          if (x === -step) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()

        // travelling light head
        const hp = ((t * s.speed * 14 + s.seed) % 1)
        const hx = hp * (w + 200) - 100
        const hy =
          s.yBase +
          Math.sin(hx * 0.004 + t * s.speed * 6 + s.phase) * s.amp +
          Math.sin(hx * 0.011 + t * s.speed * 11 + s.seed) * (s.amp * 0.22) +
          pointer.y * 14
        const rg = ctx.createRadialGradient(hx, hy, 0, hx, hy, 46)
        rg.addColorStop(0, `rgba(${col}, 0.55)`)
        rg.addColorStop(1, `rgba(${col}, 0)`)
        ctx.fillStyle = rg
        ctx.fillRect(hx - 46, hy - 46, 92, 92)
      }

      const link = Math.min(150, Math.max(96, w / 9))

      // move + parallax
      const pos: { x: number; y: number; n: Node }[] = new Array(nodes.length)
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        if (!reduced) {
          n.x += n.vx
          n.y += n.vy
          if (n.x < -20) n.x = w + 20
          else if (n.x > w + 20) n.x = -20
          if (n.y < -20) n.y = h + 20
          else if (n.y > h + 20) n.y = -20
        }
        let x = n.x + pointer.x * 26 * n.z
        let y = n.y + pointer.y * 18 * n.z
        if (pointer.active) {
          const dx = x - pointerPx.x
          const dy = y - pointerPx.y
          const d2 = dx * dx + dy * dy
          const R = 160
          if (d2 < R * R && d2 > 1) {
            const d = Math.sqrt(d2)
            const f = ((R - d) / R) * 16 * (0.4 + n.z)
            x += (dx / d) * f
            y += (dy / d) * f
          }
        }
        pos[i] = { x, y, n }
      }

      // links
      ctx.lineWidth = 0.6
      for (let i = 0; i < pos.length; i++) {
        for (let j = i + 1; j < pos.length; j++) {
          const a = pos[i], b = pos[j]
          const dx = a.x - b.x
          if (dx > link || dx < -link) continue
          const dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 > link * link) continue
          const k = 1 - Math.sqrt(d2) / link
          const depth = (a.n.z + b.n.z) / 2
          ctx.strokeStyle = `rgba(${a.n.hue || b.n.hue ? CYAN : BLUE}, ${k * (0.12 + depth * 0.3)})`
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
      }

      // nodes
      for (const p of pos) {
        const col = p.n.hue ? CYAN : BLUE
        ctx.fillStyle = `rgba(${col}, ${0.3 + p.n.z * 0.6})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.n.r, 0, Math.PI * 2)
        ctx.fill()
        if (p.n.z > 0.8) {
          ctx.fillStyle = `rgba(${col}, 0.08)`
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.n.r * 4, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    const pointerPx = { x: -9999, y: -9999 }
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointerPx.x = e.clientX - rect.left
      pointerPx.y = e.clientY - rect.top
      pointer.tx = (pointerPx.x / w - 0.5) * 2
      pointer.ty = (pointerPx.y / h - 0.5) * 2
      pointer.active = pointerPx.y >= 0 && pointerPx.y <= h
    }
    const onLeave = () => { pointer.active = false; pointer.tx = 0; pointer.ty = 0 }

    const loop = (t: number) => {
      if (!running) return
      draw(t)
      raf = requestAnimationFrame(loop)
    }
    const start = () => {
      if (running || reduced || !visible || document.hidden) return
      running = true
      raf = requestAnimationFrame(loop)
    }
    const stop = () => { running = false; cancelAnimationFrame(raf) }

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible) start()
      else stop()
    })
    io.observe(canvas)
    const onVis = () => (document.hidden ? stop() : start())
    document.addEventListener('visibilitychange', onVis)

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()

    if (!reduced) {
      window.addEventListener('pointermove', onMove, { passive: true })
      window.addEventListener('pointerleave', onLeave)
      start()
    }

    return () => {
      stop()
      io.disconnect()
      ro.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
    }
  }, [reduced])

  return <canvas ref={canvasRef} className="hero__canvas" aria-hidden="true" />
}
