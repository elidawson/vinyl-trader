import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:5555",
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\//, ""),
      },
    }
  },
  plugins: [react()],
})
