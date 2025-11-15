import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    proxy: {
      '/airflow': {
        target: 'http://localhost:5174',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/airflow/, '/airflow'),
      },
      '/smtp': {
        target: 'http://localhost:5174',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/smtp/, '/smtp'),
      },
    },
  },
})