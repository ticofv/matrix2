import { useEffect, useState } from 'react'

interface Props {
  texto: string
  velocidad?: number
  className?: string
}

export default function TypeWriter({ texto, velocidad = 50, className = '' }: Props) {
  const [mostrado, setMostrado] = useState('')
  const [indice, setIndice] = useState(0)

  useEffect(() => {
    if (indice >= texto.length) return
    const timer = setTimeout(() => {
      setMostrado(prev => prev + texto[indice])
      setIndice(prev => prev + 1)
    }, velocidad)
    return () => clearTimeout(timer)
  }, [indice, texto, velocidad])

  return (
    <span className={className}>
      {mostrado}
      {indice < texto.length && (
        <span className="animate-pulse text-green-400">|</span>
      )}
    </span>
  )
}