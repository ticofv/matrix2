import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { db } from '../firebase'
import { collection, onSnapshot } from 'firebase/firestore'

const links = [
  { to: '/',            label: 'Inicio' },
  { to: '/filosofia',   label: 'Filosofía' },
  { to: '/bostrom',     label: 'Bostrom' },
  { to: '/ciencia',     label: 'Ciencia' },
  { to: '/grinberg',    label: 'Grinberg' },
  { to: '/debate',      label: 'Debate' },
  { to: '/quiz',        label: 'Quiz' },
  { to: '/encuesta',    label: 'Encuesta' },
  { to: '/proyecto',    label: 'Proyecto' },
  { to: '/equipo',      label: 'Equipo' },
  { to: '/kahoot', label: 'Juego' },
]

const usuarios = [
  { usuario: 'jguzman',  contrasena: '123456' },
  { usuario: 'jvasquez', contrasena: '123456' },
  { usuario: 'bloaiza',  contrasena: '123456' },
]

interface Props {
  particulasActivas: boolean
  setParticulasActivas: (v: boolean) => void
  cursorActivo: boolean
  setCursorActivo: (v: boolean) => void
}

export default function Navbar({ particulasActivas, setParticulasActivas, cursorActivo, setCursorActivo }: Props) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [abierto, setAbierto] = useState(false)
  const [toques, setToques] = useState(0)
  const [mensaje, setMensaje] = useState('')
  const [panelDev, setPanelDev] = useState(false)
  const [autenticado, setAutenticado] = useState(false)
  const [usuarioInput, setUsuarioInput] = useState('')
  const [contrasenaInput, setContrasenaInput] = useState('')
  const [errorLogin, setErrorLogin] = useState('')
  const [totalEncuestas, setTotalEncuestas] = useState<number | null>(null)
  const [copiado, setCopiado] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'encuestas'), snap => {
      setTotalEncuestas(snap.size)
    })
    return () => unsub()
  }, [])

  function tocarLogo() {
    const nuevo = toques + 1
    setToques(nuevo)
    if (timerRef.current) clearTimeout(timerRef.current)

    if (nuevo === 4) {
      setMensaje('A 3 toques...')
    } else if (nuevo === 6) {
      setMensaje('A 1 toque...')
    } else if (nuevo >= 7) {
      setMensaje('✓ Modo desarrollador')
      setToques(0)
      setTimeout(() => {
        setMensaje('')
        setPanelDev(true)
      }, 800)
      return
    }

    timerRef.current = setTimeout(() => {
      setToques(0)
      setMensaje('')
    }, 2000)
  }

  function login() {
    const valido = usuarios.find(
      u => u.usuario === usuarioInput.trim() && u.contrasena === contrasenaInput
    )
    if (valido) {
      setAutenticado(true)
      setErrorLogin('')
      setUsuarioInput('')
      setContrasenaInput('')
    } else {
      setErrorLogin('Usuario o contraseña incorrectos.')
    }
  }

  function cerrarPanel() {
    setPanelDev(false)
    setAutenticado(false)
    setUsuarioInput('')
    setContrasenaInput('')
    setErrorLogin('')
  }

  function resetearIntro() {
    sessionStorage.removeItem('introVista')
    window.location.reload()
  }

  function copiarLinkEncuesta() {
    navigator.clipboard.writeText('https://matrixldoq.netlify.app/encuesta')
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2000)
  }

  function activarModoFeria() {
    setParticulasActivas(false)
    setPanelDev(false)
  }

  return (
    <>
      <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur border-b border-neutral-800">
        <div className="max-w-5xl mx-auto px-6 py-3 flex justify-between items-center">

          <div className="relative">
            <span
              onClick={tocarLogo}
              className="font-mono text-xs text-green-400 tracking-widest cursor-pointer select-none"
            >
              ∿ SIM.
            </span>
            {mensaje && (
              <div className="absolute top-7 left-0 bg-neutral-900 border border-neutral-700 px-3 py-2 rounded-lg font-mono text-xs text-green-400 whitespace-nowrap z-50">
                {mensaje}
              </div>
            )}
          </div>

          <ul className="hidden md:flex gap-6">
            {links.map(l => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className={`font-mono text-xs tracking-widest transition-colors ${
                    pathname === l.to ? 'text-green-400' : 'text-neutral-500 hover:text-white'
                  }`}
                >
                  {l.label.toUpperCase()}
                </Link>
              </li>
            ))}
          </ul>

          <button
            onClick={() => setAbierto(!abierto)}
            className="md:hidden font-mono text-xs text-neutral-500 hover:text-white transition-colors"
          >
            {abierto ? '✕ CERRAR' : '☰ MENÚ'}
          </button>

        </div>

        {abierto && (
          <div className="md:hidden border-t border-neutral-800 bg-black/95">
            <ul className="flex flex-col px-6 py-4 gap-4">
              {links.map(l => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    onClick={() => setAbierto(false)}
                    className={`font-mono text-sm tracking-widest transition-colors block py-1 ${
                      pathname === l.to ? 'text-green-400' : 'text-neutral-500'
                    }`}
                  >
                    {l.label.toUpperCase()}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* Panel desarrollador */}
      {panelDev && (
        <div className="fixed inset-0 z-[9990] flex items-center justify-center px-6">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={cerrarPanel}
          />

          <div className="relative z-10 w-full max-w-sm bg-neutral-950 border border-green-500/30 rounded-xl p-6">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="font-mono text-xs text-green-400 tracking-widest">
                  ◉ MODO DESARROLLADOR
                </p>
                <p className="font-mono text-xs text-neutral-600 mt-1">
                  {autenticado ? `Bienvenido, ${usuarioInput || 'dev'}` : 'Acceso restringido'}
                </p>
              </div>
              <button
                onClick={cerrarPanel}
                className="text-neutral-500 hover:text-white transition-colors text-lg"
              >
                ✕
              </button>
            </div>

            {/* Login */}
            {!autenticado ? (
              <div className="flex flex-col gap-4">
                <div>
                  <label className="font-mono text-xs text-neutral-500 block mb-2">
                    USUARIO
                  </label>
                  <input
                    value={usuarioInput}
                    onChange={e => setUsuarioInput(e.target.value)}
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
                    value={contrasenaInput}
                    onChange={e => setContrasenaInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && login()}
                    placeholder="••••••"
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-green-500 transition-colors"
                  />
                </div>
                {errorLogin && (
                  <p className="text-red-400 font-mono text-xs text-center">{errorLogin}</p>
                )}
                <button
                  onClick={login}
                  className="w-full bg-green-500 hover:bg-green-400 text-black font-mono text-xs tracking-widest py-3 rounded-lg transition-colors mt-2"
                >
                  ENTRAR →
                </button>
              </div>

            ) : (
              /* Panel de opciones */
              <div className="flex flex-col gap-3">

                <button
                  onClick={() => { cerrarPanel(); navigate('/estadisticas') }}
                  className="flex items-center justify-between w-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 px-4 py-3 rounded-lg transition-colors"
                >
                  <span className="font-mono text-xs text-white">Ver estadísticas</span>
                  <span className="font-mono text-xs text-green-400">
                    {totalEncuestas !== null ? `${totalEncuestas} respuestas` : '...'}
                  </span>
                </button>

                <button
                  onClick={copiarLinkEncuesta}
                  className="flex items-center justify-between w-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 px-4 py-3 rounded-lg transition-colors"
                >
                  <span className="font-mono text-xs text-white">Copiar link de encuesta</span>
                  <span className="font-mono text-xs text-green-400">
                    {copiado ? '✓ Copiado' : '⎘ Copiar'}
                  </span>
                </button>

                <button
                  onClick={resetearIntro}
                  className="flex items-center justify-between w-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 px-4 py-3 rounded-lg transition-colors"
                >
                  <span className="font-mono text-xs text-white">Resetear intro</span>
                  <span className="font-mono text-xs text-neutral-500">↺ Recargar</span>
                </button>

                <button
                  onClick={() => setParticulasActivas(!particulasActivas)}
                  className="flex items-center justify-between w-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 px-4 py-3 rounded-lg transition-colors"
                >
                  <span className="font-mono text-xs text-white">Partículas de fondo</span>
                  <span className={`font-mono text-xs ${particulasActivas ? 'text-green-400' : 'text-neutral-500'}`}>
                    {particulasActivas ? '● ON' : '○ OFF'}
                  </span>
                </button>

                <button
                  onClick={() => setCursorActivo(!cursorActivo)}
                  className="flex items-center justify-between w-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 px-4 py-3 rounded-lg transition-colors"
                >
                  <span className="font-mono text-xs text-white">Cursor personalizado</span>
                  <span className={`font-mono text-xs ${cursorActivo ? 'text-green-400' : 'text-neutral-500'}`}>
                    {cursorActivo ? '● ON' : '○ OFF'}
                  </span>
                </button>

                <button
                  onClick={activarModoFeria}
                  className="flex items-center justify-between w-full bg-neutral-900 hover:bg-neutral-800 border border-amber-700/50 px-4 py-3 rounded-lg transition-colors"
                >
                  <span className="font-mono text-xs text-white">Modo feria</span>
                  <span className="font-mono text-xs text-amber-400">⚡ Activar</span>
                </button>

                <button
                  onClick={() => { cerrarPanel(); navigate('/presentacion') }}
                  className="flex items-center justify-between w-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 px-4 py-3 rounded-lg transition-colors"
                >
                  <span className="font-mono text-xs text-white">Modo presentación</span>
                  <span className="font-mono text-xs text-neutral-500">▶ Abrir</span>
                </button>

                <button
                  onClick={() => setAutenticado(false)}
                  className="w-full border border-neutral-800 text-neutral-600 hover:text-neutral-400 font-mono text-xs tracking-widest py-2 rounded-lg transition-colors mt-2"
                >
                  CERRAR SESIÓN
                </button>

              </div>
            )}

          </div>
        </div>
      )}
    </>
  )
}