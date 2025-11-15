import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

// Credenciais do Airflow (defina AF_USER e AF_PASS nas envs ao iniciar)
const AF_USER = process.env.AF_USER || 'airflow';
const AF_PASS = process.env.AF_PASS || 'airflow';

// Proxy para Airflow API
app.use('/airflow', createProxyMiddleware({
  target: 'http://localhost:8080',
  changeOrigin: true,
  pathRewrite: { '^/airflow': '' },
  onProxyReq: (proxyReq) => {
    const basic = Buffer.from(`${AF_USER}:${AF_PASS}`).toString('base64');
    proxyReq.setHeader('Authorization', `Basic ${basic}`);
  },
}));

// Proxy para smtp4dev
app.use('/smtp', createProxyMiddleware({
  target: 'http://localhost:5001',
  changeOrigin: true,
  pathRewrite: { '^/smtp': '' },
}));

const PORT = process.env.PORT || 5174;
app.listen(PORT, () => {
  console.log(`Proxy dev rodando em http://localhost:${PORT} (airflow, smtp)`);
});