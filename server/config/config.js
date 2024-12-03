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
      styles: {
        root: {
          boxSizing: 'border-box',
          margin: '0',
          padding: '0',
          fontSize: '16px',
          fontFamily: 'Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, "PingFang SC", Cambria, Cochin, Georgia, Times, "Times New Roman", serif'
        },
        heading: {
          boxSizing: 'border-box',
          margin: '0',
          padding: '0',
          marginLeft: '0',
          color: 'black',
          fontSize: '24px',
          textAlign: 'left',
          fontWeight: 'bold',
          display: 'table',
          marginTop: '30px',
          marginBottom: '15px'
        },
        prefix: {
          boxSizing: 'border-box',
          margin: '0',
          padding: '0'
        },
        content: {
          boxSizing: 'border-box',
          margin: '0',
          padding: '0',
          fontSize: '24px'
        },
        suffix: {
          boxSizing: 'border-box',
          margin: '0',
          padding: '0'
        },
        figure: {
          boxSizing: 'border-box',
          padding: '0',
          margin: '0',
          marginTop: '10px',
          marginBottom: '10px'
        },
        image: {
          boxSizing: 'border-box',
          padding: '0',
          display: 'block',
          margin: '0 auto',
          width: 'auto',
          maxWidth: '100%'
        },
        figcaption: {
          boxSizing: 'border-box',
          margin: '0',
          padding: '0',
          marginTop: '5px',
          textAlign: 'center',
          color: '#888',
          fontSize: '14px'
        }
      }
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
