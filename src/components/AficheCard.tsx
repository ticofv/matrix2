import { useState } from 'react'

interface Tema {
  id: string
  titulo: string
  subtitulo: string
  resumen: string
  detalle: string
  color: string
}

interface Props {
  tema: Tema
}

export default function AficheCard({ tema }: Props) {
  const [abierto, setAbierto] = useState(false)

  return (
    <div
      onClick={() => setAbierto(!abierto)}
      className={`cursor-pointer border-l-4 ${tema.color} bg-neutral-900 hover:bg-neutral-800 transition-all duration-500 p-6 rounded-r-lg`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-white text-xl font-light">{tema.titulo}</h3>
          <p className="text-neutral-500 text-xs font-mono mt-1">{tema.subtitulo}</p>
        </div>
        <span className="text-neutral-500 text-2xl font-thin ml-4">
          {abierto ? '×' : '+'}
        </span>
      </div>
      <p className="text-neutral-400 text-sm mt-3 leading-relaxed">
        {tema.resumen}
      </p>
      <div className={`overflow-hidden transition-all duration-500 ${abierto ? 'max-h-96 mt-4' : 'max-h-0'}`}>
        <div className="border-t border-neutral-700 pt-4">
          <p className="text-neutral-300 text-sm leading-relaxed">
            {tema.detalle}
          </p>
        </div>
      </div>
    </div>
  )
}