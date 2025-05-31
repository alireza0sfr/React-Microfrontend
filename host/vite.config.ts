import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import path from 'path'

export default defineConfig(({ mode }) => {

  const env = loadEnv(mode, process.cwd())
  const HOST_PORT = Number(env.VITE_HOST_PORT) || 3000
  const CUSTOMER_PORT = Number(env.VITE_CUSTOMER_PORT) || 3001

  return {
    server: {
      port: HOST_PORT,
    },
    preview: {
      port: HOST_PORT,
    },
    plugins: [
      react(),
      federation({
        name: 'host-app',
        remotes: {
          customer: `http://localhost:${CUSTOMER_PORT}/assets/customer.js`,
        },
        shared: ['react'],
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
