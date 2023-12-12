const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Enable CORS for both local development and deployed S3 application
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


const apiEndpoint = 'https://api.xiteit.co';
const apiProxy = createProxyMiddleware('/api', { target: apiEndpoint, changeOrigin: true });
app.use('/api', apiProxy);

const port = 3000;
app.listen(port, () => {
  console.log(`Express server is running on http://localhost:${port}`);
});
