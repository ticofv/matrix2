import { useEffect, useState } from 'react'

interface Props {
  onTerminado: () => void
}

export default function Intro({ onTerminado }: Props) {
  const [fase, setFase] = useState<'matrix' | 'texto' | 'fade'>('matrix')
  const [chars, setChars] = useState<{ id: number; x: number; chars: string[]; speed: number; opacity: number }[]>([])
  const [contador, setContador] = useState(3)

  // Genera las columnas de caracteres cayendo
  useEffect(() => {
    const columnas = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: (i / 30) * 100,
      chars: Array.from({ length: 20 }, () => getRandomChar()),
      speed: 0.5 + Math.random() * 2,
      opacity: 0.1 + Math.random() * 0.6,
    }))
    setChars(columnas)

    // Cambia los chars aleatoriamente
    const interval = setInterval(() => {
      setChars(prev => prev.map(col => ({
        ...col,
        chars: col.chars.map(() => getRandomChar()),
      })))
    }, 80)

    return () => clearInterval(interval)
  }, [])

  // Cuenta regresiva
  useEffect(() => {
    if (fase !== 'matrix') return

    const interval = setInterval(() => {
      setContador(prev => {
        if (prev <= 1) {
          clearInterval(interval)
          setFase('texto')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [fase])

  // Después del texto hace fade
  useEffect(() => {
    if (fase !== 'texto') return
    const timer = setTimeout(() => setFase('fade'), 2000)
    return () => clearTimeout(timer)
  }, [fase])

  // Cuando termina el fade llama onTerminado
  useEffect(() => {
    if (fase !== 'fade') return
    const timer = setTimeout(() => onTerminado(), 1000)
    return () => clearTimeout(timer)
  }, [fase])

  return (
    <div
      className={`fixed inset-0 bg-black z-50 flex flex-col items-center justify-center overflow-hidden transition-opacity duration-1000 ${
        fase === 'fade' ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Columnas de caracteres cayendo */}
      <div className="absolute inset-0 overflow-hidden">
        {chars.map(col => (
          <div
            key={col.id}
            className="absolute top-0 flex flex-col gap-1"
            style={{
              left: `${col.x}%`,
              opacity: col.opacity,
              animation: `fall ${col.speed}s linear infinite`,
            }}
          >
            {col.chars.map((char, i) => (
              <span
                key={i}
                className="font-mono text-xs leading-4"
                style={{
                  color: i === 0 ? '#ffffff' : '#22c55e',
                  textShadow: i === 0 ? '0 0 8px #fff' : '0 0 4px #22c55e',
                }}
              >
                {char}
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* Overlay oscuro en el centro */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-black opacity-70" />

      {/* Contenido central */}
      <div className="relative z-10 text-center">
        {fase === 'matrix' && (
          <>
            <p className="font-mono text-xs text-green-400 tracking-widest mb-6 opacity-70">
              INICIALIZANDO SIMULACIÓN...
            </p>
            <div
              className="text-8xl md:text-9xl font-mono text-green-400 transition-all duration-500"
              style={{ textShadow: '0 0 30px #22c55e, 0 0 60px #22c55e' }}
            >
              {contador}
            </div>
            <p className="font-mono text-xs text-neutral-500 tracking-widest mt-6">
              ACCEDIENDO A LA REALIDAD BASE
            </p>
          </>
        )}

        {fase === 'texto' && (
          <div className="animate-pulse">
            <p className="font-mono text-xs text-green-400 tracking-widest mb-4">
              ¿ES ESTO REAL?
            </p>
            <h1
              className="text-4xl md:text-6xl font-light text-white"
              style={{ textShadow: '0 0 20px rgba(255,255,255,0.5)' }}
            >
              Bienvenido a la simulación
            </h1>
            <p className="font-mono text-xs text-neutral-500 tracking-widest mt-4">
              LICEO DANIEL ODUBER QUIRÓS · 11-2
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fall {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        .bg-gradient-radial {
          background: radial-gradient(ellipse at center, transparent 20%, black 80%);
        }
      `}</style>
    </div>
  )
}

function getRandomChar() {
  const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン$#@%&*!?<>{}[]'
  return chars[Math.floor(Math.random() * chars.length)]
}