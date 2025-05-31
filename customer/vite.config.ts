import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import path from 'path'

export default defineConfig(({ mode }) => {

  const env = loadEnv(mode, process.cwd())
  const CUSTOMER_PORT = Number(env.VITE_CUSTOMER_PORT) || 3001

  return {
    server: {
      port: CUSTOMER_PORT,
    },
    preview: {
      port: CUSTOMER_PORT,
    },
    plugins: [
      react(),
      federation({
        name: "customer",
        filename: "customer.js",
        exposes: {
          "./App": "./src/App.tsx",
        },
        shared: ["react"],
      }),
    ],
    build: {
      modulePreload: false,
      target: 'esnext',
      minify: false,
      cssCodeSplit: false,
    },
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
  }
})
