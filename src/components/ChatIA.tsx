import { useState, useRef, useEffect } from 'react'

const API_KEY = import.meta.env.VITE_GROQ_KEY

const SISTEMA = `Eres un asistente especializado en la hipótesis de la simulación. 
Ayudás a estudiantes del Liceo Daniel Oduber Quirós de Costa Rica.
Respondés en español, de forma clara para estudiantes de secundaria.
Máximo 3 párrafos por respuesta.
Solo respondés sobre: hipótesis de la simulación, Platón, Descartes, Nick Bostrom, 
Jacobo Grinberg, física cuántica, conciencia y realidad.
Si preguntan algo fuera de estos temas, decís amablemente que solo podés ayudar con la investigación.`

interface Mensaje {
  rol: 'usuario' | 'ia'
  texto: string
}

export default function ChatIA() {
  const [abierto, setAbierto] = useState(false)
  const [mensajes, setMensajes] = useState<Mensaje[]>([
    {
      rol: 'ia',
      texto: '¡Hola! Soy el asistente de esta investigación. Preguntame sobre la hipótesis de la simulación, Platón, Descartes, Bostrom o Grinberg.',
    },
  ])
  const [input, setInput] = useState('')
  const [cargando, setCargando] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [mensajes])

  async function enviar() {
    if (!input.trim() || cargando) return

    const pregunta = input.trim()
    setInput('')
    setMensajes(prev => [...prev, { rol: 'usuario', texto: pregunta }])
    setCargando(true)

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [
            { role: 'system', content: SISTEMA },
            { role: 'user', content: pregunta },
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        console.error('Error API:', data)
        throw new Error(data.error?.message || 'Error desconocido')
      }

      const respuesta = data.choices?.[0]?.message?.content
      if (respuesta) {
        setMensajes(prev => [...prev, { rol: 'ia', texto: respuesta }])
      } else {
        throw new Error('Respuesta vacía')
      }

    } catch (e: any) {
      console.error(e)
      setMensajes(prev => [...prev, {
        rol: 'ia',
        texto: 'No se pudo conectar. Intentá de nuevo.',
      }])
    }

    setCargando(false)
  }

  return (
    <>
      <button
        onClick={() => setAbierto(!abierto)}
        className="fixed bottom-6 right-6 z-[9000] w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 text-black flex items-center justify-center transition-all duration-300"
        style={{ boxShadow: '0 0 20px rgba(34,197,94,0.4)' }}
      >
        {abierto ? (
          <span className="text-lg font-bold">✕</span>
        ) : (
          <span className="text-xl">✦</span>
        )}
      </button>

      {abierto && (
        <div
          className="fixed bottom-24 right-6 z-[8999] w-80 md:w-96 bg-neutral-950 border border-neutral-700 rounded-xl shadow-2xl flex flex-col"
          style={{ height: '480px' }}
        >
          <div className="flex items-center gap-3 px-4 py-3 border-b border-neutral-800">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <div>
              <p className="font-mono text-xs text-white tracking-widest">ASISTENTE IA</p>
              <p className="font-mono text-xs text-neutral-500">Hipótesis de la Simulación</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
            {mensajes.map((m, i) => (
              <div key={i} className={`flex ${m.rol === 'usuario' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-3 py-2 rounded-lg text-sm leading-relaxed ${
                  m.rol === 'usuario'
                    ? 'bg-green-500 text-black'
                    : 'bg-neutral-800 text-neutral-300'
                }`}>
                  {m.texto}
                </div>
              </div>
            ))}

            {cargando && (
              <div className="flex justify-start">
                <div className="bg-neutral-800 px-3 py-2 rounded-lg">
                  <span className="font-mono text-xs text-neutral-500 animate-pulse">
                    pensando...
                  </span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="border-t border-neutral-800 px-3 py-3 flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && enviar()}
              placeholder="Hacé una pregunta..."
              disabled={cargando}
              className="flex-1 bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-green-500 transition-colors disabled:opacity-50"
            />
            <button
              onClick={enviar}
              disabled={cargando || !input.trim()}
              className="bg-green-500 hover:bg-green-400 disabled:opacity-40 text-black px-3 py-2 rounded-lg font-mono text-xs transition-colors"
            >
              →
            </button>
          </div>
        </div>
      )}
    </>
  )
}