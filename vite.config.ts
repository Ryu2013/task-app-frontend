import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // コンテナ外(WSL/ホストのブラウザ)からアクセスできるようにする
    proxy: {
      '/api': {
        target: 'http://api:3000', // composeのサービス名
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
