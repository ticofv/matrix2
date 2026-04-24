import HeroImage from '../components/HeroImage'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Grinberg() {
  const ref = useScrollReveal()

  return (
    <main>
      <HeroImage
        imagen="/6.jpg"
        titulo="Jacobo Grinberg"
        subtitulo="04 — TEORÍA SINTÉRGICA"
        color="text-amber-400"
      />

      <div ref={ref} className="max-w-3xl mx-auto px-6 pb-24">

        <div className="reveal opacity-0 translate-y-8 transition-all duration-700 mb-12">
          <p className="text-neutral-400 leading-relaxed mb-4">
            Jacobo Grinberg-Zylberbaum fue un neurocientífico mexicano que desarrolló
            la <strong className="text-white">Teoría Sintérgica</strong> — una de las propuestas más radicales
            sobre la naturaleza de la conciencia y la realidad.
          </p>
          <p className="text-neutral-400 leading-relaxed">
            Desapareció misteriosamente en 1994, dejando una obra que hoy resuena
            fuertemente con la hipótesis de la simulación.
          </p>
        </div>

        <div className="reveal opacity-0 translate-y-8 transition-all duration-700 delay-100 mb-12">
          <h2 className="text-2xl font-light text-white mb-4">La Teoría Sintérgica</h2>
          <p className="text-neutral-400 leading-relaxed mb-4">
            Grinberg propuso que el cerebro no <em>percibe</em> la realidad directamente —
            sino que <strong className="text-white">construye</strong> una "lattice neuronal", un campo
            electromagnético que interactúa con lo que él llamaba el
            <strong className="text-white"> campo sintérgico</strong> del universo.
          </p>
          <p className="text-neutral-400 leading-relaxed">
            En otras palabras: lo que experimentamos como "realidad" es una
            interpretación que genera nuestro cerebro, no el mundo externo en sí mismo.
          </p>
        </div>

        <blockquote className="reveal opacity-0 translate-y-8 transition-all duration-700 delay-200 border-l-2 border-amber-500 pl-6 my-10">
          <p className="text-white text-lg font-light italic">
            "La conciencia no está en el cerebro. El cerebro es solo el instrumento
            que permite que la conciencia se manifieste en este nivel de realidad."
          </p>
          <p className="text-neutral-500 text-sm mt-3">— Jacobo Grinberg</p>
        </blockquote>

        <div className="reveal opacity-0 translate-y-8 transition-all duration-700 delay-300 mb-12">
          <h2 className="text-2xl font-light text-white mb-4">Conexión con la simulación</h2>
          <p className="text-neutral-400 leading-relaxed mb-4">
            Si el cerebro construye la realidad a partir de un campo externo de información,
            eso es funcionalmente idéntico a lo que propone la hipótesis de la simulación:
            existe una "fuente" de datos externa y nuestra mente genera la experiencia
            subjetiva a partir de esos datos.
          </p>
          <p className="text-neutral-400 leading-relaxed">
            Grinberg llegó a esta conclusión desde la neurociencia experimental,
            no desde la filosofía — lo que hace su propuesta especialmente interesante.
          </p>
        </div>

        <div className="reveal opacity-0 translate-y-8 transition-all duration-700 delay-400 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-neutral-900 p-6 rounded-lg border-l-4 border-amber-500">
            <p className="font-mono text-xs text-amber-400 mb-2">DATO</p>
            <p className="text-neutral-300 text-sm">Publicó más de 50 libros y 150 artículos científicos antes de desaparecer a los 45 años.</p>
          </div>
          <div className="bg-neutral-900 p-6 rounded-lg border-l-4 border-amber-500">
            <p className="font-mono text-xs text-amber-400 mb-2">EXPERIMENTO</p>
            <p className="text-neutral-300 text-sm">Sus experimentos de "transferencia de potenciales evocados" entre cerebros aislados siguen sin explicación convencional.</p>
          </div>
        </div>

      </div>
    </main>
  )
}