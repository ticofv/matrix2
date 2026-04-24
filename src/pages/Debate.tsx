import HeroImage from '../components/HeroImage'
import { useScrollReveal } from '../hooks/useScrollReveal'

const favor = [
  {
    titulo: 'El poder computacional crece exponencialmente',
    texto: 'La Ley de Moore muestra que la capacidad de procesamiento se duplica cada dos años. En algún punto será posible simular conciencias completas.',
  },
  {
    titulo: 'El universo tiene propiedades matemáticas perfectas',
    texto: 'Las constantes físicas son tan precisas que parecen diseñadas. Un universo simulado explicaría por qué las matemáticas describen la realidad tan bien.',
  },
  {
    titulo: 'La mecánica cuántica sugiere render on demand',
    texto: 'Las partículas no tienen estado definido hasta ser observadas — exactamente como un videojuego que solo renderiza lo que el jugador ve.',
  },
  {
    titulo: 'Ya creamos simulaciones cada vez más realistas',
    texto: 'Los videojuegos, la IA y la realidad virtual avanzan rápido. En el futuro, simular universos conscientes podría ser trivial.',
  },
]

const contra = [
  {
    titulo: 'El problema de recursos es insuperable',
    texto: 'Simular cada partícula del universo requeriría más energía y materia de la que existe. Ninguna civilización podría lograrlo.',
  },
  {
    titulo: 'Regresión infinita sin solución',
    texto: 'Si estamos en una simulación, ¿quién simula a los simuladores? La cadena no tiene fin lógico, lo que hace el argumento circular.',
  },
  {
    titulo: 'No es falsable fácilmente',
    texto: 'Una buena teoría científica debe poder ser refutada. Si vivimos en una simulación perfecta, cualquier "prueba" podría haber sido diseñada.',
  },
  {
    titulo: 'No predice nada nuevo',
    texto: 'La hipótesis no genera predicciones verificables que no pueda explicar la física convencional. Científicamente no agrega nada.',
  },
]

export default function Debate() {
  const ref = useScrollReveal()

  return (
    <main>
      <HeroImage
        imagen="/4.jpg"
        titulo="El Debate"
        subtitulo="¿SIMULACIÓN O REALIDAD?"
        color="text-white"
      />

      <div ref={ref} className="max-w-5xl mx-auto px-6 pb-24">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* A favor */}
          <div className="reveal opacity-0 translate-y-8 transition-all duration-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <h2 className="font-mono text-xs text-green-400 tracking-widest">A FAVOR</h2>
            </div>
            <div className="flex flex-col gap-4">
              {favor.map((item, i) => (
                <div
                  key={i}
                  className="border-l-2 border-green-800 pl-4 py-1"
                >
                  <h3 className="text-white text-sm font-light mb-1">{item.titulo}</h3>
                  <p className="text-neutral-500 text-xs leading-relaxed">{item.texto}</p>
                </div>
              ))}
            </div>
          </div>

          {/* En contra */}
          <div className="reveal opacity-0 translate-y-8 transition-all duration-700 delay-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <h2 className="font-mono text-xs text-red-400 tracking-widest">EN CONTRA</h2>
            </div>
            <div className="flex flex-col gap-4">
              {contra.map((item, i) => (
                <div
                  key={i}
                  className="border-l-2 border-red-900 pl-4 py-1"
                >
                  <h3 className="text-white text-sm font-light mb-1">{item.titulo}</h3>
                  <p className="text-neutral-500 text-xs leading-relaxed">{item.texto}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Conclusión */}
        <div className="reveal opacity-0 translate-y-8 transition-all duration-700 delay-300 mt-16 border border-neutral-800 p-8 rounded-lg text-center">
          <p className="font-mono text-xs text-neutral-500 mb-4 tracking-widest">VEREDICTO</p>
          <p className="text-neutral-300 text-lg font-light leading-relaxed max-w-xl mx-auto">
            La hipótesis es filosóficamente válida y matemáticamente interesante —
            pero científicamente no comprobada. La pregunta sigue abierta.
          </p>
        </div>

      </div>
    </main>
  )
}