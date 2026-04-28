import { useEffect, useState } from 'react'
import { db } from '../firebase'
import { collection, onSnapshot, orderBy, query, limit } from 'firebase/firestore'

interface Toast {
  id: string
  mensaje: string
}

export default function ToastNotification() {
  const [toasts, setToasts] = useState<Toast[]>([])
  const primeraCarga = useState(true)

  useEffect(() => {
    let primera = true
    const q = query(collection(db, 'encuestas'), orderBy('fecha', 'desc'), limit(1))

    const unsub = onSnapshot(q, snap => {
      if (primera) { primera = false; return }
      snap.docChanges().forEach(change => {
        if (change.type === 'added') {
          const data = change.doc.data()
          const id = Math.random().toString(36).slice(2)
          const mensaje = `${data.nombre} de ${data.seccion} respondió la encuesta`
          setToasts(prev => [...prev, { id, mensaje }])
          setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id))
          }, 4000)
        }
      })
    })

    return () => unsub()
  }, [])

  return (
    <div className="fixed bottom-24 left-6 z-[8990] flex flex-col gap-2">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className="bg-neutral-900 border border-green-500/30 px-4 py-3 rounded-lg shadow-lg animate-fadeIn max-w-xs"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" />
            <p className="font-mono text-xs text-neutral-300">{toast.mensaje}</p>
          </div>
        </div>
      ))}
    </div>
  )
}