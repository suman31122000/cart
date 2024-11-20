import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://cartbackend-1.onrender.com/',  // Your backend API URL
        changeOrigin: true, // This ensures that the origin of the request is rewritten to the target
        rewrite: (path) => path.replace(/^\/api/, ''), // This removes the `/api` part from the request path
      },
    },
  },
  plugins: [react()],
})
