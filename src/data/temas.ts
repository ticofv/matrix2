export interface Tema {
  id: string
  titulo: string
  subtitulo: string
  resumen: string
  detalle: string
  color: string
}

export const temas: Tema[] = [
  {
    id: 'platon',
    titulo: 'Platón',
    subtitulo: 'La Alegoría de la Cueva · 400 a.C.',
    resumen: 'Prisioneros en una cueva que solo ven sombras y creen que son la realidad.',
    detalle: 'Platón imaginó personas encadenadas incapaces de girarse. Frente a ellos solo hay sombras proyectadas en una pared. Para ellos, esas sombras son la realidad completa. La analogía moderna es directa: nosotros podríamos estar percibiendo solo una representación computacional de algo que existe en otro nivel.',
    color: 'border-purple-500',
  },
  {
    id: 'descartes',
    titulo: 'Descartes',
    subtitulo: 'El Genio Maligno · 1641',
    resumen: 'Una entidad podría estar manipulando todos nuestros sentidos completamente.',
    detalle: 'En sus Meditaciones Metafísicas, Descartes propone la posibilidad de un "genio maligno" que controla toda nuestra percepción. Su única certeza fue "Cogito ergo sum" — pienso, luego existo. Este genio es conceptualmente indistinguible de un supercomputador generando nuestra experiencia.',
    color: 'border-blue-500',
  },
  {
    id: 'bostrom',
    titulo: 'Nick Bostrom',
    subtitulo: 'El Trilema · Oxford 2003',
    resumen: 'Si las civilizaciones avanzadas simulan universos, estadísticamente ya vivimos en uno.',
    detalle: 'Bostrom formalizó el argumento: si civilizaciones post-humanas pueden y quieren simular universos conscientes, habría miles de simulaciones por cada realidad base. La probabilidad de estar en la realidad original tiende a cero. Al menos una de tres opciones debe ser verdad: extinción temprana, desinterés, o ya somos simulados.',
    color: 'border-green-500',
  },
  {
    id: 'fisica',
    titulo: 'Física cuántica',
    subtitulo: 'Evidencia indirecta',
    resumen: 'El universo tiene propiedades que recuerdan a un sistema computacional.',
    detalle: 'Wheeler propuso "It from Bit": la realidad deriva de información binaria. El principio holográfico sugiere que el universo 3D está codificado en una superficie 2D — como un render. La mecánica cuántica muestra que las partículas no tienen estado definido hasta ser observadas, similar al "render on demand" de los videojuegos.',
    color: 'border-cyan-500',
  },
  {
  id: 'grinberg',
  titulo: 'Jacobo Grinberg',
  subtitulo: 'Teoría Sintérgica · México 1994',
  resumen: 'El cerebro no percibe la realidad — la construye a partir de un campo de información universal.',
  detalle: 'Grinberg propuso que existe un campo sintérgico universal y que el cerebro genera una lattice neuronal que interactúa con él. Lo que llamamos realidad es una interpretación subjetiva, no el mundo externo. Desapareció misteriosamente en 1994.',
  color: 'border-amber-500',
},
]