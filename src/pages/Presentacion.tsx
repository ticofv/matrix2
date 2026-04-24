import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const slides = [
  {
    titulo: '¿Es la realidad una simulación?',
    subtitulo: 'Investigación filosófica y científica',
    contenido: 'Una exploración desde Platón hasta la física cuántica moderna.',
    color: '#22c55e',
    imagen: '/4.jpg',
  },
  {
    titulo: 'Platón',
    subtitulo: 'Alegoría de la Cueva · 400 a.C.',
    contenido: 'Prisioneros en una cueva solo ven sombras. Para ellos, las sombras son la realidad. ¿Somos nosotros esos prisioneros?',
    color: '#a78bfa',
    imagen: '/2.jpg',
  },
  {
    titulo: 'René Descartes',
    subtitulo: 'El Genio Maligno · 1641',
    contenido: '"Cogito, ergo sum." Una entidad podría manipular todos nuestros sentidos. Su genio maligno es indistinguible de un supercomputador.',
    color: '#60a5fa',
    imagen: '/3.jpg',
  },
  {
    titulo: 'Nick Bostrom',
    subtitulo: 'El Trilema · Oxford 2003',
    contenido: 'Si civilizaciones avanzadas simulan universos, habría miles de simulaciones por cada realidad base. Estadísticamente, ya somos simulados.',
    color: '#22c55e',
    imagen: '/5.jpg',
  },
  {
    titulo: 'Física Cuántica',
    subtitulo: 'Evidencia indirecta',
    contenido: 'Las partículas no tienen estado hasta ser observadas. El principio holográfico. La velocidad de la luz como límite de procesamiento.',
    color: '#22d3ee',
    imagen: '/1.jpg',
  },
  {
    titulo: 'Jacobo Grinberg',
    subtitulo: 'Teoría Sintérgica · 1994',
    contenido: 'El cerebro no percibe la realidad — la construye. Existe un campo sintérgico universal del que nuestra mente extrae la experiencia.',
    color: '#fbbf24',
    imagen: '/6.jpg',
  },
  {
    titulo: 'Conclusión',
    subtitulo: 'Liceo Daniel Oduber Quirós · 11-2',
    contenido: 'La hipótesis es filosóficamente válida, matemáticamente interesante y científicamente no comprobada. La pregunta sigue abierta.',
    color: '#ffffff',
    imagen: '/4.jpg',
  },
]

export default function Presentacion() {
  const [actual, setActual] = useState(0)
  const [corriendo, setCorriendo] = useState(true)
  const [visible, setVisible] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (!corriendo) return
    const intervalo = setInterval(() => {
      cambiarSlide((actual + 1) % slides.length)
    }, 5000)
    return () => clearInterval(intervalo)
  }, [corriendo, actual])

  function cambiarSlide(index: number) {
    setVisible(false)
    setTimeout(() => {
      setActual(index)
      setVisible(true)
    }, 300)
  }

  function anterior() {
    setCorriendo(false)
    cambiarSlide((actual - 1 + slides.length) % slides.length)
  }

  function siguiente() {
    setCorriendo(false)
    cambiarSlide((actual + 1) % slides.length)
  }

  const slide = slides[actual]

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: '#000',
      zIndex: 99999,
      overflow: 'hidden',
    }}>

      {/* Imagen de fondo */}
      <img
        key={slide.imagen}
        src={slide.imagen}
        alt=""
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          opacity: visible ? 0.25 : 0,
          transition: 'opacity 0.8s ease',
          zIndex: 1,
        }}
      />

      {/* Gradiente */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.85) 100%)',
        zIndex: 2,
      }} />

      {/* Contenido central */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '2rem',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
      }}>

        <p style={{
          fontFamily: 'monospace',
          fontSize: '0.7rem',
          color: '#6b7280',
          letterSpacing: '0.2em',
          marginBottom: '1.5rem',
        }}>
          {actual + 1} / {slides.length}
        </p>

        <h1 style={{
          fontWeight: 300,
          fontSize: 'clamp(2.5rem, 8vw, 5rem)',
          lineHeight: 1.1,
          color: slide.color,
          marginBottom: '1rem',
          transition: 'color 0.4s ease',
        }}>
          {slide.titulo}
        </h1>

        <p style={{
          fontFamily: 'monospace',
          fontSize: '0.7rem',
          color: '#6b7280',
          letterSpacing: '0.2em',
          marginBottom: '2rem',
        }}>
          {slide.subtitulo}
        </p>

        <p style={{
          color: '#d1d5db',
          fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
          fontWeight: 300,
          lineHeight: 1.7,
          maxWidth: '640px',
        }}>
          {slide.contenido}
        </p>

      </div>

      {/* Controles abajo */}
      <div style={{
        position: 'absolute',
        bottom: '2rem',
        left: 0, right: 0,
        zIndex: 4,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 2rem',
      }}>

        <button
          onClick={anterior}
          style={{
            fontFamily: 'monospace',
            fontSize: '0.7rem',
            color: '#6b7280',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            letterSpacing: '0.1em',
            padding: '0.5rem',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={e => (e.currentTarget.style.color = '#6b7280')}
        >
          ← ANTERIOR
        </button>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCorriendo(false); cambiarSlide(i) }}
              style={{
                width: '8px', height: '8px',
                borderRadius: '50%',
                background: i === actual ? '#fff' : '#404040',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'background 0.3s',
              }}
            />
          ))}
        </div>

        <button
          onClick={siguiente}
          style={{
            fontFamily: 'monospace',
            fontSize: '0.7rem',
            color: '#6b7280',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            letterSpacing: '0.1em',
            padding: '0.5rem',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={e => (e.currentTarget.style.color = '#6b7280')}
        >
          SIGUIENTE →
        </button>

      </div>

      {/* Botón salir */}
      <button
        onClick={() => navigate('/')}
        style={{
          position: 'absolute',
          top: '1rem', right: '1rem',
          zIndex: 5,
          fontFamily: 'monospace',
          fontSize: '0.7rem',
          color: '#fff',
          background: 'rgba(20,20,20,0.9)',
          border: '1px solid #404040',
          padding: '0.5rem 1rem',
          borderRadius: '0.5rem',
          cursor: 'pointer',
          letterSpacing: '0.1em',
          touchAction: 'manipulation',
        }}
      >
        ✕ SALIR
      </button>

      {/* Barra de progreso */}
      {corriendo && (
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0,
          height: '2px',
          background: '#22c55e',
          zIndex: 4,
          width: `${((actual + 1) / slides.length) * 100}%`,
          transition: 'width 0.3s ease',
        }} />
      )}

    </div>
  )
}