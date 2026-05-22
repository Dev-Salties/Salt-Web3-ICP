import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'url'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // Point to auto-generated declarations from `dfx generate`
      'declarations': fileURLToPath(new URL('../../declarations', import.meta.url)),
    },
  },
  define: {
    // DFX network env vars injected at dev time
    'process.env.DFX_NETWORK':          JSON.stringify(process.env.DFX_NETWORK ?? 'local'),
    'process.env.CANISTER_ID_BACKEND':  JSON.stringify(process.env.CANISTER_ID_BACKEND ?? ''),
    'process.env.CANISTER_ID_UPLOADS':  JSON.stringify(process.env.CANISTER_ID_UPLOADS ?? ''),
    'process.env.CANISTER_ID_FRONTEND': JSON.stringify(process.env.CANISTER_ID_FRONTEND ?? ''),
  },
  server: {
    proxy: {
      // Proxy ICP replica calls in local dev
      '/api': {
        target: 'http://127.0.0.1:4943',
        changeOrigin: true,
      },
    },
  },
})