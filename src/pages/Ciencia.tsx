import HeroImage from '../components/HeroImage'
import { useScrollReveal } from '../hooks/useScrollReveal'

const puntos = [
  {
    titulo: 'It from Bit — John Wheeler',
    texto: 'Wheeler propuso que toda entidad física deriva su existencia de información binaria. La realidad podría ser fundamentalmente informacional, no material.',
    tag: 'Física teórica',
  },
  {
    titulo: 'El principio holográfico',
    texto: 'Toda la información de un volumen 3D puede estar codificada en una superficie 2D — como un render. El universo podría funcionar igual.',
    tag: 'Cosmología',
  },
  {
    titulo: 'La velocidad de la luz como límite',
    texto: 'Nada puede moverse más rápido que la luz. Un programador diría que eso suena a un límite de procesamiento — la tasa máxima a la que el simulador actualiza el universo.',
    tag: 'Relatividad',
  },
  {
    titulo: 'Mecánica cuántica y render on demand',
    texto: 'Las partículas no tienen estado definido hasta ser observadas. Esto recuerda al render on demand de los videojuegos: solo se genera el detalle de lo que el jugador está mirando.',
    tag: 'Cuántica',
  },
]

export default function Ciencia() {
  const ref = useScrollReveal()

  return (
    <main>
      <HeroImage
        imagen="/1.jpg"
        titulo="¿Qué dice la física?"
        subtitulo="03 — BASE CIENTÍFICA"
        color="text-cyan-400"
      />

      <div ref={ref} className="max-w-3xl mx-auto px-6 pb-24">

        <p className="text-neutral-400 leading-relaxed mb-16 max-w-xl reveal opacity-0 translate-y-8 transition-all duration-700">
          No son pruebas — son coincidencias llamativas que hacen la hipótesis
          menos absurda de lo que parece.
        </p>

        <div className="flex flex-col gap-10">
          {puntos.map((punto, i) => (
            <div
              key={punto.titulo}
              className="reveal opacity-0 translate-y-8 transition-all duration-700 border-l-2 border-cyan-800 pl-6"
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <span className="font-mono text-xs text-cyan-600 tracking-widest">
                {punto.tag.toUpperCase()}
              </span>
              <h3 className="text-white text-lg font-light mt-1 mb-2">
                {punto.titulo}
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                {punto.texto}
              </p>
            </div>
          ))}
        </div>

      </div>
    </main>
  )
}