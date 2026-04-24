import HeroImage from '../components/HeroImage'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Bostrom() {
  const ref = useScrollReveal()

  const trilema = [
    {
      num: '01',
      titulo: 'Extinción temprana',
      texto: 'Casi todas las civilizaciones avanzadas se extinguen antes de poder simular universos conscientes.',
    },
    {
      num: '02',
      titulo: 'Desinterés',
      texto: 'Las civilizaciones avanzadas no tienen interés en crear simulaciones de civilizaciones ancestrales.',
    },
    {
      num: '03',
      titulo: 'Ya somos simulados',
      texto: 'Casi con certeza, ya vivimos dentro de una simulación creada por una civilización post-humana.',
    },
  ]

  return (
    <main>
      <HeroImage
        imagen="/5.jpg"
        titulo="Nick Bostrom y el Trilema"
        subtitulo="02 — EL ARGUMENTO MODERNO"
        color="text-green-400"
      />

      <div ref={ref} className="max-w-3xl mx-auto px-6 pb-24">

        <p className="text-neutral-400 leading-relaxed mb-12 reveal opacity-0 translate-y-8 transition-all duration-700">
          En 2003, el filósofo de Oxford Nick Bostrom transformó la especulación
          filosófica en un argumento formal. Si civilizaciones avanzadas pueden y
          quieren simular universos conscientes, la lógica probabilística lleva
          a un dilema incómodo: al menos una de estas tres debe ser verdad.
        </p>

        <div className="flex flex-col gap-1 mb-16">
          {trilema.map((item, i) => (
            <div
              key={item.num}
              className="reveal opacity-0 translate-y-8 transition-all duration-700 bg-neutral-900 p-6 rounded-lg"
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <span className="font-mono text-4xl text-green-400 opacity-30">
                {item.num}
              </span>
              <h3 className="text-white text-lg font-light mt-2 mb-2">
                {item.titulo}
              </h3>
              <p className="text-neutral-500 text-sm leading-relaxed">
                {item.texto}
              </p>
            </div>
          ))}
        </div>

        <div className="reveal opacity-0 translate-y-8 transition-all duration-700 border border-neutral-800 p-6 rounded-lg">
          <p className="font-mono text-xs text-green-400 mb-3">CONCLUSIÓN PROBABILÍSTICA</p>
          <p className="text-neutral-300 leading-relaxed">
            Si las opciones 1 y 2 son falsas, habría miles de simulaciones por cada
            realidad base. La probabilidad de estar en la realidad original
            tiende a <strong className="text-white">cero</strong>.
          </p>
        </div>

      </div>
    </main>
  )
}