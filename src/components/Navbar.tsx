import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { db } from '../firebase'
import { collection, onSnapshot } from 'firebase/firestore'
import Buscador from './Buscador'

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
  { to: '/kahoot',      label: 'Juego' },
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
  modoClaro: boolean
  setModoClaro: (v: boolean) => void
}

export default function Navbar({
  particulasActivas,
  setParticulasActivas,
  cursorActivo,
  setCursorActivo,
  modoClaro,
  setModoClaro,
}: Props) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
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
    if (nuevo === 4) setMensaje('A 3 toques...')
    else if (nuevo === 6) setMensaje('A 1 toque...')
    else if (nuevo >= 7) {
      setMensaje('✓ Modo desarrollador')
      setToques(0)
      setTimeout(() => { setMensaje(''); setPanelDev(true) }, 800)
      return
    }
    timerRef.current = setTimeout(() => { setToques(0); setMensaje('') }, 2000)
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
    navigator.clipboard.writeText('https://matrix2-ldoq.vercel.app/encuesta')
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2000)
  }

  function activarModoFeria() {
    setParticulasActivas(false)
    setPanelDev(false)
  }

  return (
    <>
      <nav className={`sticky top-0 z-50 backdrop-blur border-b ${modoClaro ? 'bg-white/90 border-neutral-200' : 'bg-black/90 border-neutral-800'}`}>
        <div className="max-w-5xl mx-auto px-6 py-3 flex justify-between items-center">

          {/* Logo */}
          <div className="relative shrink-0">
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

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-4">
            <ul className="flex gap-4">
              {links.map(l => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className={`font-mono text-xs tracking-widest transition-colors ${
                      pathname === l.to ? 'text-green-400' : modoClaro ? 'text-neutral-600 hover:text-black' : 'text-neutral-500 hover:text-white'
                    }`}
                  >
                    {l.label.toUpperCase()}
                  </Link>
                </li>
              ))}
            </ul>
            <Buscador />
            <button
              onClick={() => setModoClaro(!modoClaro)}
              className={`font-mono text-xs transition-colors ${modoClaro ? 'text-neutral-600 hover:text-black' : 'text-neutral-500 hover:text-white'}`}
            >
              {modoClaro ? '◐ OSCURO' : '○ CLARO'}
            </button>
          </div>

          {/* Mobile: buscador + modo + hamburguesa */}
          <div className="flex md:hidden items-center gap-3">
            <Buscador />
            <button
              onClick={() => setModoClaro(!modoClaro)}
              className={`font-mono text-xs ${modoClaro ? 'text-neutral-600' : 'text-neutral-500'}`}
            >
              {modoClaro ? '◐' : '○'}
            </button>
            <button
              onClick={() => setOpen(prev => !prev)}
              className={`font-mono text-xs px-2 py-1 ${modoClaro ? 'text-neutral-600' : 'text-neutral-400'}`}
            >
              {open ? '✕' : '☰'}
            </button>
          </div>

        </div>

        {/* Menú móvil — dentro del nav para que no se cierre solo */}
        {open && (
          <div className={`md:hidden border-t ${modoClaro ? 'border-neutral-200 bg-white' : 'border-neutral-800 bg-neutral-950'}`}>
            <div className="flex flex-col px-6 py-4 gap-1">
              {links.map(l => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={`font-mono text-sm tracking-widest py-3 border-b transition-colors ${
                    modoClaro ? 'border-neutral-100' : 'border-neutral-800/50'
                  } ${
                    pathname === l.to ? 'text-green-400' : modoClaro ? 'text-neutral-600' : 'text-neutral-400'
                  }`}
                >
                  {l.label.toUpperCase()}
                </Link>
              ))}
              <button
                onClick={() => { setModoClaro(!modoClaro); setOpen(false) }}
                className="font-mono text-sm text-neutral-500 tracking-widest py-3 text-left"
              >
                {modoClaro ? '◐ MODO OSCURO' : '○ MODO CLARO'}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Panel desarrollador */}
      {panelDev && (
        <div className="fixed inset-0 z-[9990] flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={cerrarPanel} />
          <div className="relative z-10 w-full max-w-sm bg-neutral-950 border border-green-500/30 rounded-xl p-6">

            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="font-mono text-xs text-green-400 tracking-widest">◉ MODO DESARROLLADOR</p>
                <p className="font-mono text-xs text-neutral-600 mt-1">
                  {autenticado ? `Bienvenido` : 'Acceso restringido'}
                </p>
              </div>
              <button onClick={cerrarPanel} className="text-neutral-500 hover:text-white text-lg">✕</button>
            </div>

            {!autenticado ? (
              <div className="flex flex-col gap-4">
                <div>
                  <label className="font-mono text-xs text-neutral-500 block mb-2">USUARIO</label>
                  <input
                    value={usuarioInput}
                    onChange={e => setUsuarioInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && login()}
                    placeholder="tu usuario"
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-green-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="font-mono text-xs text-neutral-500 block mb-2">CONTRASEÑA</label>
                  <input
                    type="password"
                    value={contrasenaInput}
                    onChange={e => setContrasenaInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && login()}
                    placeholder="••••••"
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-green-500 transition-colors"
                  />
                </div>
                {errorLogin && <p className="text-red-400 font-mono text-xs text-center">{errorLogin}</p>}
                <button
                  onClick={login}
                  className="w-full bg-green-500 hover:bg-green-400 text-black font-mono text-xs tracking-widest py-3 rounded-lg transition-colors mt-2"
                >
                  ENTRAR →
                </button>
              </div>

            ) : (
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
                  <span className="font-mono text-xs text-green-400">{copiado ? '✓ Copiado' : '⎘ Copiar'}</span>
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
                  onClick={() => setModoClaro(!modoClaro)}
                  className="flex items-center justify-between w-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 px-4 py-3 rounded-lg transition-colors"
                >
                  <span className="font-mono text-xs text-white">Modo claro</span>
                  <span className={`font-mono text-xs ${modoClaro ? 'text-green-400' : 'text-neutral-500'}`}>
                    {modoClaro ? '● ON' : '○ OFF'}
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