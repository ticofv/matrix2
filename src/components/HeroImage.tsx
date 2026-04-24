interface Props {
  imagen: string
  titulo: string
  subtitulo: string
  color?: string
}

export default function HeroImage({ imagen, titulo, subtitulo, color = 'text-green-400' }: Props) {
  return (
    <div className="relative h-72 md:h-96 overflow-hidden mb-16">

      {/* Imagen de fondo semitransparente */}
      <img
        src={imagen}
        alt={titulo}
      className="absolute inset-0 w-full h-full object-cover object-[center_30%] opacity-20"
      />

      {/* Gradiente encima de la imagen */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/60 to-neutral-950" />

      {/* Texto encima */}
      <div className="relative z-10 h-full flex flex-col justify-end px-6 pb-8 max-w-3xl mx-auto">
        <h1 className={`text-4xl md:text-5xl font-light ${color}`}>
          {titulo}
        </h1>
        <p className="text-neutral-400 mt-2 font-mono text-xs tracking-widest">
          {subtitulo}
        </p>
      </div>

    </div>
  )
}