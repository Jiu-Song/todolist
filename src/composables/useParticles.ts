import { ref, onMounted, onUnmounted, nextTick } from 'vue'

// Particle 接口定义
interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
}

export function useParticles() {

const particleCanvas = ref<HTMLCanvasElement>()
const particles: Particle[] = []
const PARTICLE_COUNT = 80
let particleAnimId = 0

function initParticles(width: number, height: number) {
  particles.length = 0
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      size: Math.random() * 2.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
    })
  }
}

function animateParticles() {
  const canvas = particleCanvas.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const { width, height } = canvas
  ctx.clearRect(0, 0, width, height)

  for (const p of particles) {
    p.x += p.vx
    p.y += p.vy

    if (p.x < 0) p.x = width
    if (p.x > width) p.x = 0
    if (p.y < 0) p.y = height
    if (p.y > height) p.y = 0

    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`
    ctx.fill()
  }

  particleAnimId = requestAnimationFrame(animateParticles)
}

function resizeParticleCanvas() {
  const canvas = particleCanvas.value
  if (!canvas) return
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  initParticles(canvas.width, canvas.height)
}

onMounted(() => {
  nextTick(() => {
    resizeParticleCanvas()
    animateParticles()
  })
  window.addEventListener('resize', resizeParticleCanvas)
})

 onUnmounted(() => {
  cancelAnimationFrame(particleAnimId)
  window.removeEventListener('resize', resizeParticleCanvas)
})

return {particleCanvas}

}

