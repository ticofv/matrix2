import AficheCard from '../components/AficheCard'
import { temas } from '../data/temas'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useNavigate } from 'react-router-dom'
import TypeWriter from '../components/TypeWriter'

export default function Home() {
  const ref = useScrollReveal()
  const navigate = useNavigate()

  return (
    <main>
      <div className="relative h-72 md:h-96 overflow-hidden mb-16">
        <img
          src="/4.jpg"
          alt="Simulación"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/60 to-neutral-950" />
        <div className="relative z-10 h-full flex flex-col justify-end px-6 pb-8 max-w-3xl mx-auto">
          <p className="font-mono text-xs text-green-400 tracking-widest mb-3">
            INVESTIGACIÓN · 11-2 LDOQ
          </p>
          <h1 className="text-4xl md:text-5xl font-light text-green-400">
            <TypeWriter texto="¿Es la realidad una simulación?" velocidad={60} />
          </h1>
        </div>
      </div>

      <div ref={ref} className="max-w-3xl mx-auto px-6 pb-24">
        <p className="text-neutral-500 text-lg mb-12 max-w-xl reveal opacity-0 translate-y-8 transition-all duration-700">
          Explorá cada teoría tocando los afiches.
        </p>

        <div className="flex flex-col gap-4">
          {temas.map((tema, i) => (
            <div
              key={tema.id}
              className="reveal opacity-0 translate-y-8 transition-all duration-700"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <AficheCard tema={tema} />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center reveal opacity-0 translate-y-8 transition-all duration-700">
          <button
            onClick={() => navigate('/presentacion')}
            className="font-mono text-xs tracking-widest border border-neutral-700 text-neutral-500 hover:text-white hover:border-neutral-500 px-6 py-3 rounded-lg transition-colors"
          >
            ▶ MODO PRESENTACIÓN
          </button>
        </div>

      </div>
    </main>
  )
}