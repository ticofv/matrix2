import { useEffect, useState } from 'react'
import { db } from '../firebase'
import { collection, onSnapshot } from 'firebase/firestore'

const preguntas = [
  { id: 'p1',  texto: '¿Qué tan interesante te pareció el tema?' },
  { id: 'p2',  texto: '¿Qué tan clara fue la explicación?' },
  { id: 'p3',  texto: '¿Conocías la hipótesis antes?' },
  { id: 'p4',  texto: '¿Creés que vivimos en una simulación?' },
  { id: 'p5',  texto: '¿Qué filósofo te pareció más convincente?' },
  { id: 'p6',  texto: '¿Qué sección te pareció más interesante?' },
  { id: 'p7',  texto: '¿Cómo calificarías el diseño visual?' },
  { id: 'p8',  texto: '¿Qué tan fácil fue navegar la página?' },
  { id: 'p9',  texto: '¿El quiz te pareció entretenido?' },
  { id: 'p10', texto: '¿Recomendarías esta página?' },
  { id: 'p11', texto: '¿La tecnología podría simular universos?' },
  { id: 'p12', texto: '¿Cambió tu perspectiva sobre la realidad?' },
  { id: 'p13', texto: '¿Qué tan preparado estuvo el equipo?' },
  { id: 'p14', texto: '¿Te gustaría seguir investigando?' },
  { id: 'p15', texto: '¿Cómo calificarías la investigación?' },
]

const usuarios = [
  { usuario: 'jguzman',  contrasena: '123456' },
  { usuario: 'jvasquez', contrasena: '123456' },
  { usuario: 'bloaiza',  contrasena: '123456' },
]

interface Respuesta {
  nombre: string
  seccion: string
  respuestas: Record<string, string>
}

export default function Estadisticas() {
  const [autenticado, setAutenticado] = useState(false)
  const [usuario, setUsuario] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [errorLogin, setErrorLogin] = useState('')
  const [datos, setDatos] = useState<Respuesta[]>([])
  const [cargando, setCargando] = useState(true)

  function login() {
    const valido = usuarios.find(
      u => u.usuario === usuario.trim() && u.contrasena === contrasena
    )
    if (valido) {
      setAutenticado(true)
      setErrorLogin('')
    } else {
      setErrorLogin('Usuario o contraseña incorrectos.')
    }
  }

  useEffect(() => {
    if (!autenticado) return
    const unsub = onSnapshot(collection(db, 'encuestas'), snapshot => {
      const lista = snapshot.docs.map(doc => doc.data() as Respuesta)
      setDatos(lista)
      setCargando(false)
    })
    return () => unsub()
  }, [autenticado])

  function contarRespuestas(id: string) {
    const conteo: Record<string, number> = {}
    datos.forEach(d => {
      const r = d.respuestas[id]
      if (r) conteo[r] = (conteo[r] || 0) + 1
    })
    return Object.entries(conteo).sort((a, b) => b[1] - a[1])
  }

  // Pantalla de login
  if (!autenticado) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-sm">

          <p className="font-mono text-xs text-green-400 tracking-widest mb-6 text-center">
            ◉ ACCESO RESTRINGIDO
          </p>

          <h1 className="text-3xl font-light text-white text-center mb-10">
            Estadísticas
          </h1>

          <div className="flex flex-col gap-4">
            <div>
              <label className="font-mono text-xs text-neutral-500 block mb-2">
                USUARIO
              </label>
              <input
                value={usuario}
                onChange={e => setUsuario(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && login()}
                placeholder="tu usuario"
                className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-green-500 transition-colors"
              />
            </div>

            <div>
              <label className="font-mono text-xs text-neutral-500 block mb-2">
                CONTRASEÑA
              </label>
              <input
                type="password"
                value={contrasena}
                onChange={e => setContrasena(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && login()}
                placeholder="••••••"
                className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-green-500 transition-colors"
              />
            </div>

            {errorLogin && (
              <p className="text-red-400 font-mono text-xs text-center">
                {errorLogin}
              </p>
            )}

            <button
              onClick={login}
              className="w-full bg-green-500 hover:bg-green-400 text-black font-mono text-xs tracking-widest py-3 rounded-lg transition-colors mt-2"
            >
              ENTRAR →
            </button>
          </div>

        </div>
      </main>
    )
  }

  // Pantalla de estadísticas
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 pb-24">

      <div className="flex justify-between items-start mb-16">
        <div>
          <p className="font-mono text-xs text-green-400 tracking-widest mb-2">
            RESULTADOS EN TIEMPO REAL
          </p>
          <h1 className="text-4xl font-light text-white">Estadísticas</h1>
          <p className="text-neutral-500 mt-2 font-mono text-xs">
            {cargando ? 'Cargando...' : `${datos.length} respuestas totales`}
          </p>
        </div>
        <button
          onClick={() => setAutenticado(false)}
          className="font-mono text-xs text-neutral-500 hover:text-white border border-neutral-700 px-4 py-2 rounded-lg transition-colors"
        >
          SALIR
        </button>
      </div>

      {cargando ? (
        <p className="text-neutral-500 font-mono text-xs text-center animate-pulse">
          CARGANDO DATOS...
        </p>
      ) : datos.length === 0 ? (
        <p className="text-neutral-500 text-center">
          Todavía no hay respuestas. Compartí el link de la encuesta.
        </p>
      ) : (
        <div className="flex flex-col gap-12">
          {preguntas.map((pregunta, i) => {
            const conteo = contarRespuestas(pregunta.id)
            const total = conteo.reduce((sum, [, n]) => sum + n, 0)

            return (
              <div key={pregunta.id}>
                <p className="font-mono text-xs text-neutral-500 mb-1">
                  PREGUNTA {i + 1}
                </p>
                <h3 className="text-white font-light mb-4">{pregunta.texto}</h3>

                <div className="flex flex-col gap-3">
                  {conteo.map(([opcion, cantidad]) => {
                    const porcentaje = Math.round((cantidad / total) * 100)
                    return (
                      <div key={opcion}>
                        <div className="flex justify-between font-mono text-xs text-neutral-400 mb-1">
                          <span>{opcion}</span>
                          <span>{cantidad} ({porcentaje}%)</span>
                        </div>
                        <div className="h-2 bg-neutral-800 rounded-full">
                          <div
                            className="h-2 bg-green-400 rounded-full transition-all duration-700"
                            style={{ width: `${porcentaje}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}

          {/* Lista de participantes */}
          <div>
            <p className="font-mono text-xs text-neutral-500 mb-4">
              PARTICIPANTES ({datos.length})
            </p>
            <div className="flex flex-col gap-2">
              {datos.map((d, i) => (
                <div key={i} className="flex justify-between bg-neutral-900 px-4 py-3 rounded-lg">
                  <span className="text-white text-sm">{d.nombre}</span>
                  <span className="font-mono text-xs text-neutral-500">{d.seccion}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </main>
  )
}