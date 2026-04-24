import Formulario from '../components/Formulario'

// Cambiá los nombres por los reales del grupo
const estudiantes = [
  { nombre: 'Jimena Guzman', rol: 'Investigacion', iniciales: 'E1' },
  { nombre: 'Britany Loaiza', rol: 'Documentacion', iniciales: 'E2' },
  { nombre: 'Jimena Vasquez', rol: 'Analisis de proyecto',      iniciales: 'E3' },
]

export default function Equipo() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-24">

      <p className="font-mono text-xs text-green-400 tracking-widest mb-6">
        05 — INVESTIGADORES
      </p>

      <h1 className="text-4xl font-light mb-2">
        Equipo <em className="italic text-green-400">11-2</em>
      </h1>
      <p className="text-neutral-500 mb-16">
        Liceo Daniel Oduber Quirós · Costa Rica · Cartago
      </p>

      {/* Grid de tarjetas del equipo */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-neutral-800 border border-neutral-800 mb-24">
        {estudiantes.map(e => (
          <div key={e.nombre} className="bg-neutral-950 p-6 text-center hover:bg-neutral-900 transition-colors">

            {/* Avatar con iniciales — reemplazá por <img> si tenés fotos */}
            <div className="w-16 h-16 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center mx-auto mb-4">
              <span className="font-mono text-sm text-neutral-400">{e.iniciales}</span>
            </div>

            <p className="text-white text-sm">{e.nombre}</p>
            <p className="font-mono text-xs text-neutral-600 mt-1">{e.rol}</p>
          </div>
        ))}
      </div>

      {/* Formulario de comentarios */}
      <Formulario />

    </main>
  )
}