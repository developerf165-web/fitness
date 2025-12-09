import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/pages'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@features': path.resolve(__dirname, 'src/features'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@components': path.resolve(__dirname, 'src/components'),
    },
  },

  server: {
    host: '0.0.0.0',

    port: 5173,

    strictPort: true,

    proxy: {
      '/api': {
        target: 'http://84.54.31.36:8081',

        changeOrigin: true,
        secure: false,
      }
    },

    hmr: {
      host: 'localhost'
    }
  }
})