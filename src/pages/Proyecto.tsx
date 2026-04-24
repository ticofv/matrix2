import HeroImage from '../components/HeroImage'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Proyecto() {
  const ref = useScrollReveal()

  return (
    <main>
      <HeroImage
        imagen="/4.jpg"
        titulo="Proyecto de Investigación"
        subtitulo="11-2 · LICEO DANIEL ODUBER QUIRÓS"
        color="text-green-400"
      />

      <div ref={ref} className="max-w-3xl mx-auto px-6 pb-24">

        {/* Sección 1: Desarrollo del proyecto */}
        <section className="mb-24 reveal opacity-0 translate-y-8 transition-all duration-700">

          <p className="font-mono text-xs text-green-400 tracking-widest mb-4">
            01 — DESARROLLO DEL PROYECTO
          </p>

          <h2 className="text-3xl font-light text-white mb-8">
            ¿El cerebro construye la realidad que percibimos?
          </h2>

          <p className="text-neutral-400 leading-relaxed mb-6">
            Esta investigación nació de una pregunta aparentemente simple pero filosóficamente
            profunda: ¿lo que llamamos "realidad" es verdaderamente real, o es una construcción
            que nuestra mente elabora a partir de señales e información? Para responderla, el
            equipo recorrió un camino que va desde la antigua Grecia hasta los laboratorios de
            neurociencia del siglo XXI, pasando por la física cuántica y la filosofía moderna.
          </p>

          <p className="text-neutral-400 leading-relaxed mb-6">
            El punto de partida fue reconocer que los seres humanos no percibimos la realidad
            directamente. Nuestros sentidos capturan señales del entorno — luz, sonido, presión,
            temperatura — y el cerebro las interpreta, las organiza y construye con ellas una
            experiencia subjetiva coherente. Lo que vemos no es el mundo tal como es, sino una
            representación que el cerebro genera en tiempo real. Esta idea, que parece abstracta,
            tiene consecuencias enormes: si la realidad que experimentamos es una construcción
            neurológica, entonces la frontera entre "mundo real" y "simulación" se vuelve mucho
            más difusa de lo que creemos.
          </p>

          <h3 className="text-xl font-light text-white mt-10 mb-4">
            Percepción humana y simulaciones tecnológicas
          </h3>

          <p className="text-neutral-400 leading-relaxed mb-6">
            Una de las comparaciones más reveladoras que surgió durante el análisis fue la
            similitud entre el proceso perceptivo humano y el funcionamiento de las simulaciones
            computacionales modernas. En un videojuego de mundo abierto, el motor gráfico no
            renderiza todo el entorno simultáneamente — solo genera con detalle lo que el jugador
            está mirando en ese momento. El resto del mundo existe como datos, pero no se
            "construye" visualmente hasta que se necesita. Esta técnica, conocida como
            "render on demand", tiene un paralelo sorprendente con la mecánica cuántica: las
            partículas subatómicas no poseen propiedades definidas hasta que son observadas.
            Antes de la medición, existen en superposición de estados posibles. El universo
            parece comportarse, a nivel fundamental, de una manera similar a una simulación
            que solo genera detalle donde hay un observador.
          </p>

          <p className="text-neutral-400 leading-relaxed mb-6">
            Esta comparación no es meramente poética. El físico John Archibald Wheeler la
            formalizó con su concepto "It from Bit", proponiendo que toda entidad física
            deriva su existencia de respuestas a preguntas binarias — de información. Si la
            realidad es fundamentalmente informacional, entonces la distinción entre un universo
            "físico real" y uno "computacionalmente simulado" podría ser irrelevante desde
            adentro. Ambos serían funcionalmente idénticos para cualquier observador que exista
            dentro de ellos.
          </p>

          <h3 className="text-xl font-light text-white mt-10 mb-4">
            Análisis teórico de la realidad simulada
          </h3>

          <p className="text-neutral-400 leading-relaxed mb-6">
            El análisis teórico del equipo se centró en tres tradiciones intelectuales que,
            desde ángulos muy distintos, convergen en una misma intuición: la realidad que
            percibimos podría no ser la realidad última. Desde la filosofía, Platón ya advertía
            en su Alegoría de la Cueva que los seres humanos podríamos estar confundiendo
            sombras con verdades. Descartes llevó esta duda más lejos, proponiendo que un
            "genio maligno" podría estar manipulando toda nuestra experiencia sensorial —
            una imagen que hoy resulta conceptualmente indistinguible de un supercomputador
            generando una simulación perfecta.
          </p>

          <p className="text-neutral-400 leading-relaxed mb-6">
            En 2003, el filósofo de Oxford Nick Bostrom formalizó esta intuición en un
            argumento probabilístico: si civilizaciones tecnológicamente avanzadas pueden
            y quieren simular universos conscientes, entonces el número de simulaciones
            existentes superaría enormemente al número de realidades base. En ese escenario,
            la probabilidad estadística de que cualquier ser consciente esté en la realidad
            original tiende a cero. No es una afirmación de que vivimos en una simulación —
            es un argumento de que no podemos descartar que lo hagamos, y que las probabilidades
            podrían inclinar la balanza en esa dirección.
          </p>

          <p className="text-neutral-400 leading-relaxed mb-6">
            Jacobo Grinberg-Zylberbaum llegó a conclusiones similares desde la neurociencia.
            Su Teoría Sintérgica propone que el cerebro no percibe la realidad sino que la
            construye activamente a partir de un campo de información universal que él llamó
            "campo sintérgico". La conciencia, en su modelo, no está contenida en el cerebro
            — el cerebro es el instrumento que permite que la conciencia se manifieste en
            este nivel de la existencia. Esta perspectiva coloca a la mente humana no como
            un receptor pasivo de la realidad, sino como un generador activo de experiencia.
          </p>

          <h3 className="text-xl font-light text-white mt-10 mb-4">
            Mente, tecnología y experiencia humana
          </h3>

          <p className="text-neutral-400 leading-relaxed mb-6">
            La relación entre mente, tecnología y experiencia humana fue quizás el hilo
            más rico que apareció durante la investigación. La tecnología no solo avanza
            en potencia computacional — avanza en su capacidad para generar experiencias
            subjetivas convincentes. Los videojuegos modernos, la realidad virtual y la
            inteligencia artificial generativa ya producen mundos que pueden ser
            indistinguibles de lo real para los sentidos humanos en contextos controlados.
            Si esta tendencia continúa, llegará un punto en que la experiencia dentro de
            una simulación sea cualitativamente idéntica a la experiencia "fuera" de ella.
          </p>

          <p className="text-neutral-400 leading-relaxed mb-6">
            Esto plantea preguntas que van más allá de la física o la filosofía y entran
            en territorio ético y existencial: si una conciencia simulada experimenta amor,
            dolor, alegría y pérdida de manera idéntica a como lo hace una conciencia en
            la "realidad base", ¿tiene menor valor? ¿Es menos real? El filósofo David
            Chalmers argumenta que no — que la experiencia subjetiva es lo que hace real
            a algo, independientemente del sustrato que la genera. En ese sentido, la
            hipótesis de la simulación no amenaza el significado de la existencia humana;
            lo reencuadra en términos más amplios.
          </p>

          <h3 className="text-xl font-light text-white mt-10 mb-4">
            Proceso de investigación
          </h3>

          <p className="text-neutral-400 leading-relaxed mb-6">
            El proceso que siguió el equipo para desarrollar esta investigación combinó
            varias etapas complementarias. La primera fue una exploración filosófica
            histórica, rastreando el origen de estas ideas desde Platón y Descartes hasta
            los argumentos contemporáneos de Bostrom y Tegmark. La segunda etapa implicó
            una inmersión en conceptos de física cuántica y cosmología — áreas que
            inicialmente parecían ajenas al tema pero que resultaron fundamentales para
            entender por qué la hipótesis de la simulación no es simplemente ciencia ficción.
          </p>

          <p className="text-neutral-400 leading-relaxed mb-6">
            La tercera etapa fue el análisis de la obra de Jacobo Grinberg, cuyo trabajo
            representa un puente entre la neurociencia experimental y las preguntas más
            profundas sobre la naturaleza de la conciencia. Finalmente, el equipo sintetizó
            todo en un debate estructurado entre los argumentos a favor y en contra de la
            hipótesis, llegando a una conclusión que reconoce su valor filosófico y
            matemático sin afirmar más de lo que la evidencia permite. El resultado es
            esta investigación — no una respuesta definitiva, sino una exploración honesta
            de una de las preguntas más fascinantes que puede hacerse un ser consciente.
          </p>

        </section>

        {/* Divisor */}
        <div className="border-t border-neutral-800 mb-24" />

        {/* Sección 2: Logros obtenidos */}
        <section className="reveal opacity-0 translate-y-8 transition-all duration-700">

          <p className="font-mono text-xs text-green-400 tracking-widest mb-4">
            02 — LOGROS OBTENIDOS
          </p>

          <h2 className="text-3xl font-light text-white mb-8">
            Lo que esta investigación nos dejó
          </h2>

          <p className="text-neutral-400 leading-relaxed mb-6">
            Cuando comenzamos a explorar la hipótesis de la simulación, la mayoría del
            equipo la asociaba con ciencia ficción — con películas como Matrix o con
            especulaciones de tecnólogos excéntricos. Lo que descubrimos fue algo muy
            distinto: una tradición filosófica de más de dos mil años, respaldada por
            argumentos matemáticos rigurosos y por fenómenos físicos que aún no tienen
            explicación satisfactoria dentro del paradigma convencional. Esa fue la
            primera transformación: pasar de ver este tema como entretenimiento a
            reconocerlo como una pregunta científica y filosófica legítima.
          </p>

          <p className="text-neutral-400 leading-relaxed mb-6">
            Lo que comprendimos sobre el cerebro y la percepción cambió fundamentalmente
            nuestra relación con la experiencia cotidiana. Entender que el cerebro no
            es una cámara que registra la realidad objetiva, sino un sistema que
            construye activamente una representación coherente del mundo a partir de
            señales parciales e incompletas, tiene consecuencias profundas. Significa
            que dos personas pueden experimentar el mismo evento de maneras radicalmente
            distintas y que ambas experiencias son igualmente "reales" para quien las vive.
            Significa también que lo que llamamos "percepción" es en realidad una forma
            de creación — el cerebro llena vacíos, interpola información, corrige errores
            y genera la ilusión de continuidad y coherencia que llamamos realidad.
          </p>

          <p className="text-neutral-400 leading-relaxed mb-6">
            La forma en que entendemos la relación entre ciencia, conciencia y tecnología
            también cambió durante este proceso. Antes de la investigación, estas tres
            áreas parecían relativamente separadas. La ciencia estudia el mundo externo,
            la conciencia es un asunto de psicología o filosofía, y la tecnología es una
            herramienta práctica. Lo que encontramos es que las tres están profundamente
            entrelazadas: la ciencia más avanzada — la física cuántica — encuentra que
            el observador no puede separarse del fenómeno observado. La tecnología más
            sofisticada avanza hacia la creación de experiencias subjetivas. Y la
            conciencia resulta ser el terreno común donde todo esto converge, el fenómeno
            que ninguna disciplina ha logrado explicar completamente pero que todas
            necesitan para funcionar.
          </p>

          <p className="text-neutral-400 leading-relaxed mb-6">
            En términos de habilidades, esta investigación exigió y desarrolló capacidades
            que van más allá de la memorización de datos. El pensamiento crítico fue
            esencial desde el principio — no para rechazar ideas incómodas, sino para
            evaluarlas con honestidad, distinguir entre argumentos sólidos y especulación,
            y reconocer los límites de lo que podemos saber. La capacidad de análisis
            se fortaleció al tener que conectar conceptos de disciplinas muy distintas:
            física, filosofía, neurociencia, matemáticas y ética. La síntesis — tomar
            ideas complejas y comunicarlas de manera accesible sin perder rigor — fue
            quizás el desafío más constante y el que más crecimiento generó.
          </p>

          <p className="text-neutral-400 leading-relaxed mb-6">
            Pero más allá de las habilidades intelectuales, lo que esta investigación
            dejó fue algo más difícil de medir: una disposición diferente ante la
            incertidumbre. Vivimos en una cultura que valora las respuestas definitivas
            y la certeza. Este proyecto nos enseñó a estar cómodos con preguntas que
            no tienen respuesta confirmada, a encontrar valor en la exploración misma
            y no solo en las conclusiones, y a reconocer que algunas de las preguntas
            más importantes que puede hacerse un ser humano — ¿qué es real?, ¿qué soy?,
            ¿por qué existe algo en lugar de nada? — siguen abiertas después de miles
            de años de pensamiento humano, y que eso no es una falla sino una invitación.
          </p>

          <blockquote className="border-l-2 border-green-500 pl-6 my-10">
            <p className="text-white text-lg font-light italic leading-relaxed">
              "La pregunta no es si vivimos en una simulación. La pregunta es qué significa
              para nosotros que esa posibilidad no pueda descartarse — y qué hacemos con
              esa incertidumbre."
            </p>
            <p className="text-neutral-500 text-sm mt-3">— Equipo 11-2, LDOQ</p>
          </blockquote>

        </section>

      </div>
    </main>
  )
}