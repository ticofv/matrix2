import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const contenido = [
  { titulo: 'Inicio', ruta: '/', texto: 'hipótesis simulación realidad investigación' },
  { titulo: 'Platón — Alegoría de la Cueva', ruta: '/filosofia', texto: 'platón cueva sombras prisioneros filosofía griega realidad' },
  { titulo: 'Descartes — El Genio Maligno', ruta: '/filosofia', texto: 'descartes genio maligno cogito ergo sum duda radical' },
  { titulo: 'Nick Bostrom — El Trilema', ruta: '/bostrom', texto: 'bostrom trilema oxford 2003 simulación probabilidad civilización' },
  { titulo: 'Física Cuántica', ruta: '/ciencia', texto: 'física cuántica wheeler it from bit holográfico partículas observación' },
  { titulo: 'Jacobo Grinberg', ruta: '/grinberg', texto: 'grinberg teoría sintérgica conciencia cerebro lattice neuronal campo' },
  { titulo: 'El Debate', ruta: '/debate', texto: 'debate argumentos favor contra simulación evidencia' },
  { titulo: 'Quiz — ¿Qué filósofo sos?', ruta: '/quiz', texto: 'quiz preguntas filósofo resultado platón descartes bostrom grinberg' },
  { titulo: 'Juego Kahoot', ruta: '/kahoot', texto: 'kahoot juego preguntas puntaje respuestas' },
  { titulo: 'Encuesta', ruta: '/encuesta', texto: 'encuesta preguntas opinión investigación' },
  { titulo: 'Proyecto de Investigación', ruta: '/proyecto', texto: 'proyecto desarrollo logros investigación análisis' },
  { titulo: 'Equipo 11-2', ruta: '/equipo', texto: 'equipo estudiantes liceo daniel oduber quirós 11-2 costa rica' },
]

export default function Buscador() {
  const [abierto, setAbierto] = useState(false)
  const [query, setQuery] = useState('')
  const [resultados, setResultados] = useState(contenido)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (abierto) setTimeout(() => inputRef.current?.focus(), 100)
  }, [abierto])

  useEffect(() => {
    const q = query.toLowerCase().trim()
    if (!q) { setResultados(contenido); return }
    setResultados(
      contenido.filter(c =>
        c.titulo.toLowerCase().includes(q) ||
        c.texto.toLowerCase().includes(q)
      )
    )
  }, [query])

  // Abrir con Ctrl+K
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setAbierto(prev => !prev)
      }
      if (e.key === 'Escape') setAbierto(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  function ir(ruta: string) {
    navigate(ruta)
    setAbierto(false)
    setQuery('')
  }

  return (
    <>
      {/* Botón en navbar — lo agregás manualmente en Navbar.tsx */}
      <button
        onClick={() => setAbierto(true)}
        className="font-mono text-xs text-neutral-500 hover:text-white transition-colors flex items-center gap-1"
        title="Buscar (Ctrl+K)"
      >
        ⌕
        <span className="hidden md:inline">BUSCAR</span>
      </button>

      {/* Modal */}
      {abierto && (
        <div
          className="fixed inset-0 z-[9500] flex items-start justify-center pt-24 px-6"
          onClick={() => setAbierto(false)}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Panel */}
          <div
            className="relative z-10 w-full max-w-lg bg-neutral-950 border border-neutral-700 rounded-xl overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-neutral-800">
              <span className="text-neutral-500">⌕</span>
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Buscar en la investigación..."
                className="flex-1 bg-transparent text-white text-sm focus:outline-none placeholder:text-neutral-600"
              />
              <span className="font-mono text-xs text-neutral-600">ESC</span>
            </div>

            {/* Resultados */}
            <div className="max-h-80 overflow-y-auto">
              {resultados.length === 0 ? (
                <p className="text-neutral-500 font-mono text-xs text-center py-8">
                  Sin resultados para "{query}"
                </p>
              ) : (
                resultados.map((r, i) => (
                  <button
                    key={i}
                    onClick={() => ir(r.ruta)}
                    className="w-full text-left px-4 py-3 hover:bg-neutral-900 transition-colors border-b border-neutral-800/50 last:border-0"
                  >
                    <p className="text-white text-sm">{r.titulo}</p>
                    <p className="font-mono text-xs text-neutral-500 mt-0.5">{r.ruta}</p>
                  </button>
                ))
              )}
            </div>

            <div className="px-4 py-2 border-t border-neutral-800">
              <p className="font-mono text-xs text-neutral-600">
                Ctrl+K para abrir · ESC para cerrar
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}