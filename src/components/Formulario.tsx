import { useForm } from 'react-hook-form'
import { useState } from 'react'

interface FormData {
  nombre: string
  comentario: string
}

export default function Formulario() {
  const [enviado, setEnviado] = useState(false)
  const [enviando, setEnviando] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>()

  async function onSubmit(data: FormData) {
    setEnviando(true)

    await fetch('https://formspree.io/f/mkokzbwb', { // ← cambiá esto por tu URL
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: data.nombre,
        comentario: data.comentario,
      }),
    })

    setEnviando(false)
    setEnviado(true)
    reset()
  }

  return (
    <section>
      <p className="font-mono text-xs text-green-400 tracking-widest mb-6">
        DEJÁ TU COMENTARIO
      </p>

      {enviado ? (
        <div className="border border-green-800 bg-green-950/30 p-6 rounded-lg">
          <p className="text-green-400 font-mono text-sm">
            ✓ Comentario enviado. ¡Gracias!
          </p>
          <button
            onClick={() => setEnviado(false)}
            className="text-neutral-500 text-xs mt-3 hover:text-white transition-colors"
          >
            Enviar otro
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

          <div>
            <label className="font-mono text-xs text-neutral-500 block mb-2">
              NOMBRE
            </label>
            <input
              {...register('nombre', { required: 'El nombre es obligatorio' })}
              placeholder="Tu nombre"
              className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-green-500 transition-colors"
            />
            {errors.nombre && (
              <p className="text-red-400 text-xs mt-1">{errors.nombre.message}</p>
            )}
          </div>

          <div>
            <label className="font-mono text-xs text-neutral-500 block mb-2">
              COMENTARIO
            </label>
            <textarea
              {...register('comentario', {
                required: 'El comentario es obligatorio',
                minLength: { value: 10, message: 'Mínimo 10 caracteres' },
              })}
              placeholder="¿Qué pensás sobre la hipótesis?"
              rows={4}
              className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-green-500 transition-colors resize-none"
            />
            {errors.comentario && (
              <p className="text-red-400 text-xs mt-1">{errors.comentario.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={enviando}
            className="self-start bg-green-500 hover:bg-green-400 disabled:opacity-50 text-black font-mono text-xs tracking-widest px-6 py-3 rounded-lg transition-colors"
          >
            {enviando ? 'ENVIANDO...' : 'ENVIAR →'}
          </button>

        </form>
      )}
    </section>
  )
}