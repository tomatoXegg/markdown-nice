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
  },
  
  // 主题配置
  themes: {
    default: {
      name: 'Default',
      styles: `
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; }
        h1, h2, h3 { color: #2c3e50; }
        code { background: #f8f9fa; padding: 2px 4px; border-radius: 4px; }
        pre code { display: block; padding: 1em; }
      `
    },
    github: {
      name: 'GitHub',
      styles: `
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; }
        h1, h2, h3 { border-bottom: 1px solid #eaecef; padding-bottom: 0.3em; }
        code { background-color: rgba(27,31,35,.05); border-radius: 3px; padding: 0.2em 0.4em; }
        pre code { display: block; padding: 16px; overflow: auto; }
      `
    },
    wechat: {
      name: '微信公众号',
      styles: `
        /* 微信公众号样式 */
        section {
          font-family: -apple-system-font,BlinkMacSystemFont,"Helvetica Neue","PingFang SC","Hiragino Sans GB","Microsoft YaHei UI","Microsoft YaHei",Arial,sans-serif;
          font-size: 16px;
          color: #3f3f3f;
          line-height: 1.8;
          padding: 0 16px;
        }
        /* 标题 */
        h1 {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 20px;
          color: #1a1a1a;
          text-align: center;
        }
        h2 {
          font-size: 20px;
          font-weight: bold;
          margin: 30px 0 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid #f0f0f0;
          color: #1a1a1a;
        }
        h3 {
          font-size: 18px;
          font-weight: bold;
          margin: 20px 0 15px;
          color: #1a1a1a;
        }
        /* 段落 */
        p {
          margin: 0 0 1em;
          line-height: 1.8;
        }
        /* 引用 */
        blockquote {
          margin: 1em 0;
          padding: 15px;
          background: #f5f5f5;
          border-left: 4px solid #07c160;
          color: #666;
        }
        /* 代码 */
        code {
          background: #f8f8f8;
          padding: 2px 5px;
          border-radius: 2px;
          color: #e96900;
          font-family: Consolas, Inconsolata, Courier, monospace;
        }
        pre {
          margin: 1em 0;
          padding: 16px;
          background: #f8f8f8;
          border-radius: 4px;
          overflow: auto;
        }
        pre code {
          padding: 0;
          background: none;
          color: #333;
          font-size: 14px;
        }
        /* 列表 */
        ul, ol {
          margin: 10px 0;
          padding-left: 20px;
        }
        li {
          margin: 5px 0;
        }
        /* 图片 */
        img {
          max-width: 100%;
          margin: 10px auto;
          display: block;
          border-radius: 4px;
        }
        /* 表格 */
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 1em 0;
        }
        th, td {
          border: 1px solid #e8e8e8;
          padding: 8px;
          text-align: left;
        }
        th {
          background: #f8f8f8;
          font-weight: bold;
        }
        /* 链接 */
        a {
          color: #07c160;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
      `
    },
    elegant: {
      name: 'Elegant',
      styles: `
        body { font-family: Georgia, serif; line-height: 1.6; }
        h1, h2, h3 { font-family: 'Helvetica Neue', Arial, sans-serif; color: #1a1a1a; }
        code { background: #f5f5f5; font-family: Consolas, monospace; }
        blockquote { border-left: 4px solid #ccc; margin: 1em 0; padding: 0 1em; }
      `
    },
    dark: {
      name: 'Dark Mode',
      styles: `
        body { background: #1a1a1a; color: #e0e0e0; font-family: system-ui, -apple-system, sans-serif; }
        h1, h2, h3 { color: #fff; }
        code { background: #2d2d2d; color: #e0e0e0; border-radius: 4px; }
        pre code { display: block; padding: 1em; }
        blockquote { border-left: 4px solid #404040; background: #2d2d2d; }
      `
    }
  },
  
  // CORS 配置
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }
};
