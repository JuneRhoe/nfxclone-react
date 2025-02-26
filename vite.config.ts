import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import checker from 'vite-plugin-checker'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      checker({
        typescript: true,
      }),
    ],
    server: {
      port: 3333 // change here
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      },
    },
    define: {
      'process.env': {...process.env, ...loadEnv(mode, process.cwd(), '')}
    }
  }
})
