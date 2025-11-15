import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    proxy: {
      '/airflow': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/airflow/, ''),
      },
      '/smtp': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/smtp/, ''),
      },
    },
  },
})