const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Enable CORS for both local development and deployed S3 application

const corsOptions = {
  origin: 'https://your-angular-app.render.com',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
const apiEndpoint = 'https://api.xiteit.co';
const apiProxy = createProxyMiddleware('/api', { target: apiEndpoint, changeOrigin: true });
app.use('/api', apiProxy);

const port = process.env.RAILWAY_PORT || 3000;
app.listen(port, () => {
  console.log(`Express server is running on http://localhost:${port}`);
});
