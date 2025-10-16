import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/maskinovervakning-frontend/',  // 👈 legg inn repo-navnet her nøyaktig som på GitHub
  build: {
    sourcemap: false
  }
})
