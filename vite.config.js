import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Compounds_Naming_Formula_App/',
  build: {
    outDir: 'docs',
  },
})
