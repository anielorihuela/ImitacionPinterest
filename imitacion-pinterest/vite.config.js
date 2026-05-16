import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // Opción 1: Silencia advertencias de archivos dentro de node_modules
        quietDeps: true,
        
        // Opción 2: Especifica qué advertencias nuevas de Sass quieres mutear por ahora
        silenceDeprecations: ['import', 'global-builtin', 'color-functions', 'if-function'],
      },
    },
  },
});