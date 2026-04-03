import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'vite.svg'],
      manifest: {
        name: 'Grace Early Learning - MAF',
        short_name: 'GraceLearn',
        description: 'Gamified learning for kids aged 3-10',
        theme_color: '#4D96FF',
        icons: []
      }
    })
  ],
})
