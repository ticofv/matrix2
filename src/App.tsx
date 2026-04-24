import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Filosofia from './pages/Filosofia'
import Bostrom from './pages/Bostrom'
import Ciencia from './pages/Ciencia'
import Equipo from './pages/Equipo'
import Grinberg from './pages/Grinberg'
import Debate from './pages/Debate'
import Quiz from './pages/Quiz'
import Presentacion from './pages/Presentacion'
import Encuesta from './pages/Encuesta'
import Estadisticas from './pages/Estadisticas'
import Proyecto from './pages/Proyecto'
import Kahoot from './pages/Kahoot'
import Intro from './components/Intro'
import ParticleBackground from './components/ParticleBackground'
import CustomCursor from './components/CustomCursor'
import PageTransition from './components/PageTransition'
import ChatIA from './components/ChatIA'

function Inner({
  mostrarIntro,
  terminarIntro,
  particulasActivas,
  setParticulasActivas,
  cursorActivo,
  setCursorActivo,
}: {
  mostrarIntro: boolean
  terminarIntro: () => void
  particulasActivas: boolean
  setParticulasActivas: (v: boolean) => void
  cursorActivo: boolean
  setCursorActivo: (v: boolean) => void
}) {
  const { pathname } = useLocation()
  const esPresentacion = pathname === '/presentacion'

  return (
    <>
      {cursorActivo && !esPresentacion && <CustomCursor />}
      {mostrarIntro && !esPresentacion && <Intro onTerminado={terminarIntro} />}
      {particulasActivas && !esPresentacion && <ParticleBackground />}
      {!esPresentacion && <ChatIA />}

      {!esPresentacion && (
        <Navbar
          particulasActivas={particulasActivas}
          setParticulasActivas={setParticulasActivas}
          cursorActivo={cursorActivo}
          setCursorActivo={setCursorActivo}
        />
      )}

      <PageTransition>
        <Routes>
          <Route path="/"             element={<Home />} />
          <Route path="/filosofia"    element={<Filosofia />} />
          <Route path="/bostrom"      element={<Bostrom />} />
          <Route path="/ciencia"      element={<Ciencia />} />
          <Route path="/grinberg"     element={<Grinberg />} />
          <Route path="/debate"       element={<Debate />} />
          <Route path="/quiz"         element={<Quiz />} />
          <Route path="/presentacion" element={<Presentacion />} />
          <Route path="/encuesta"     element={<Encuesta />} />
          <Route path="/estadisticas" element={<Estadisticas />} />
          <Route path="/proyecto"     element={<Proyecto />} />
          <Route path="/kahoot"       element={<Kahoot />} />
          <Route path="/equipo"       element={<Equipo />} />
        </Routes>
      </PageTransition>
    </>
  )
}

export default function App() {
  const [mostrarIntro, setMostrarIntro] = useState(true)
  const [particulasActivas, setParticulasActivas] = useState(true)
  const [cursorActivo, setCursorActivo] = useState(true)

  useEffect(() => {
    const visto = sessionStorage.getItem('introVista')
    if (visto) setMostrarIntro(false)
  }, [])

  function terminarIntro() {
    sessionStorage.setItem('introVista', 'true')
    setMostrarIntro(false)
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-neutral-950 text-white">
        <Inner
          mostrarIntro={mostrarIntro}
          terminarIntro={terminarIntro}
          particulasActivas={particulasActivas}
          setParticulasActivas={setParticulasActivas}
          cursorActivo={cursorActivo}
          setCursorActivo={setCursorActivo}
        />
      </div>
    </BrowserRouter>
  )
}