import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'

export default function BotonCompartir() {
  const [abierto, setAbierto] = useState(false)
  const [copiado, setCopiado] = useState(false)
  const url = 'https://matrix2-ldoq.vercel.app'

  function copiarLink() {
    navigator.clipboard.writeText(url)
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2000)
  }

  return (
    <>
      <button
        onClick={() => setAbierto(true)}
        className="fixed bottom-6 left-6 z-[9000] bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-400 hover:text-white font-mono text-xs tracking-widest px-4 py-3 rounded-lg transition-all duration-300 flex items-center gap-2"
        style={{ boxShadow: '0 0 20px rgba(0,0,0,0.4)' }}
      >
        <span>⤴</span>
        <span className="hidden sm:inline">COMPARTIR</span>
      </button>

      {abierto && (
        <div
          className="fixed inset-0 z-[9500] flex items-center justify-center px-6"
          onClick={() => setAbierto(false)}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div
            className="relative z-10 w-full max-w-sm bg-neutral-950 border border-neutral-700 rounded-xl p-6 text-center"
            onClick={e => e.stopPropagation()}
          >
            <p className="font-mono text-xs text-green-400 tracking-widest mb-6">
              COMPARTIR INVESTIGACIÓN
            </p>
            <div className="bg-white p-4 rounded-xl inline-block mb-6">
              <QRCodeSVG
                value={url}
                size={180}
                bgColor="#ffffff"
                fgColor="#000000"
                level="H"
              />
            </div>
            <p className="text-neutral-500 text-xs mb-6 font-mono">
              Escaneá para abrir en tu celular
            </p>
            <div className="flex gap-2 mb-6">
              <div className="flex-1 bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-left">
                <p className="font-mono text-xs text-neutral-400 truncate">{url}</p>
              </div>
              <button
                onClick={copiarLink}
                className="bg-green-500 hover:bg-green-400 text-black font-mono text-xs px-4 py-2 rounded-lg transition-colors shrink-0"
              >
                {copiado ? '✓' : '⎘'}
              </button>
            </div>
            <button
              onClick={() => window.open('https://wa.me/?text=Investigación+simulación+' + url, '_blank')}
              className="w-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-400 hover:text-white font-mono text-xs tracking-widest py-3 rounded-lg transition-colors mb-3"
            >
              COMPARTIR EN WHATSAPP →
            </button>
            <button
              onClick={() => setAbierto(false)}
              className="font-mono text-xs text-neutral-600 hover:text-neutral-400 transition-colors"
            >
              CERRAR
            </button>
          </div>
        </div>
      )}
    </>
  )
}