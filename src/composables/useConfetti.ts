import { ref, onMounted, onUnmounted, nextTick } from 'vue'

interface Confetti {
  x: number
  y: number
  vx: number
  vy: number
  color: string
  size: number
  rotation: number
  rotationSpeed: number
  life: number
}

export function useConfetti() {
  // 数据和变量（和粒子一样，从 TodoList.vue 搬过来）
  // init、animate、resize 函数
  // triggerConfetti 函数  ← 这是和粒子的区别
  // onMounted / onUnmounted
  // return { confettiCanvas, triggerConfetti }  ← 多暴露一个 trigger
  // ==================== 彩带特效（已提供） ====================

const confettiCanvas = ref<HTMLCanvasElement>()
const confettis: Confetti[] = []
const COLORS = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff922b', '#845ef7', '#ff6eb4']
let confettiAnimId = 0

function triggerConfetti() {
  const canvas = confettiCanvas.value
  if (!canvas) return
  const cx = canvas.width / 2
  const cy = canvas.height / 2

  for (let i = 0; i < 60; i++) {
    const angle = (Math.PI * 2 * i) / 60 + Math.random() * 0.5
    const speed = Math.random() * 6 + 2
    confettis.push({
      x: cx,
      y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 3,
      color: COLORS[Math.floor(Math.random() * COLORS.length)]!,
      size: Math.random() * 8 + 4,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      life: 1,
    })
  }

  if (!confettiAnimId) {
    animateConfetti()
  }
}

function animateConfetti() {
  const canvas = confettiCanvas.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  for (let i = confettis.length - 1; i >= 0; i--) {
    const c = confettis[i]!
    c.x += c.vx
    c.y += c.vy
    c.vy += 0.12
    c.rotation += c.rotationSpeed
    c.life -= 0.012

    if (c.life <= 0) {
      confettis.splice(i, 1)
      continue
    }

    ctx.save()
    ctx.translate(c.x, c.y)
    ctx.rotate((c.rotation * Math.PI) / 180)
    ctx.globalAlpha = c.life
    ctx.fillStyle = c.color
    ctx.fillRect(-c.size / 2, -c.size / 4, c.size, c.size / 2)
    ctx.restore()
  }

  if (confettis.length > 0) {
    confettiAnimId = requestAnimationFrame(animateConfetti)
  } else {
    confettiAnimId = 0
  }
}

function resizeConfettiCanvas() {
  const canvas = confettiCanvas.value
  if (!canvas) return
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

onMounted(() => {
  nextTick(() => {
    resizeConfettiCanvas()
  })
  window.addEventListener('resize', resizeConfettiCanvas)
})

onUnmounted(() => {
  cancelAnimationFrame(confettiAnimId)
  window.removeEventListener('resize', resizeConfettiCanvas)
})

    return { confettiCanvas, triggerConfetti }
}

