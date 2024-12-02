require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development',
  
  // Markdown 转换配置
  markdown: {
    html: true,
    linkify: true,
    typographer: true,
    breaks: true,
    // 可以在这里添加更多 markdown-it 的配置选项
  },
  
  // CORS 配置
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }
};
