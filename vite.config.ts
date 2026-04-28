import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Hipótesis de la Simulación',
        short_name: 'Simulación',
        description: 'Investigación filosófica y científica — 11-2 LDOQ',
        theme_color: '#22c55e',
        background_color: '#0a0a0a',
        display: 'standalone',
        icons: [
          {
            src: '/xd.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/xd.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
})