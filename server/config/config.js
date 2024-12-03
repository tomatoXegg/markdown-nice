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
          padding: '0 16px',
          fontSize: '16px',
          fontFamily: 'Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, "PingFang SC", Cambria, Cochin, Georgia, Times, "Times New Roman", serif',
          color: '#3f3f3f',
          lineHeight: '1.75'
        },
        heading: {
          boxSizing: 'border-box',
          margin: '0',
          padding: '0',
          marginLeft: '0',
          color: '#48b378',
          fontSize: '24px',
          textAlign: 'left',
          fontWeight: '600',
          display: 'table',
          marginTop: '40px',
          marginBottom: '20px',
          borderBottom: '1px solid rgba(72, 179, 120, 0.2)',
          paddingBottom: '8px',
          width: '100%',
          letterSpacing: '0.5px'
        },
        prefix: {
          boxSizing: 'border-box',
          margin: '0',
          padding: '0',
          color: '#48b378'
        },
        content: {
          boxSizing: 'border-box',
          margin: '0',
          padding: '0',
          fontSize: '24px',
          color: '#48b378'
        },
        suffix: {
          boxSizing: 'border-box',
          margin: '0',
          padding: '0',
          color: '#48b378'
        },
        paragraph: {
          margin: '0 0 16px',
          padding: '0',
          fontSize: '16px',
          color: '#3f3f3f',
          lineHeight: '1.75',
          letterSpacing: '0.1px'
        },
        figure: {
          boxSizing: 'border-box',
          padding: '0',
          margin: '20px 0',
          textAlign: 'center'
        },
        image: {
          boxSizing: 'border-box',
          padding: '0',
          display: 'block',
          margin: '0 auto',
          width: 'auto',
          maxWidth: '100%',
          borderRadius: '6px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          border: '1px solid rgba(0,0,0,0.05)'
        },
        figcaption: {
          boxSizing: 'border-box',
          margin: '0',
          padding: '0',
          marginTop: '8px',
          textAlign: 'center',
          color: '#999',
          fontSize: '14px',
          fontStyle: 'italic'
        },
        blockquote: {
          margin: '16px 0',
          padding: '16px',
          backgroundColor: 'rgba(72, 179, 120, 0.1)',
          borderLeft: '4px solid #48b378',
          borderRadius: '0 4px 4px 0',
          color: '#666'
        },
        code: {
          backgroundColor: '#f8f8f8',
          color: '#e96900',
          padding: '2px 6px',
          borderRadius: '4px',
          fontSize: '14px',
          fontFamily: 'Menlo, Monaco, Consolas, "Courier New", monospace'
        },
        pre: {
          margin: '16px 0',
          padding: '16px',
          backgroundColor: '#f8f8f8',
          borderRadius: '6px',
          overflow: 'auto',
          fontSize: '14px',
          lineHeight: '1.6',
          border: '1px solid #eee'
        },
        list: {
          margin: '16px 0',
          paddingLeft: '24px'
        },
        listItem: {
          margin: '8px 0',
          lineHeight: '1.75',
          color: '#3f3f3f'
        },
        link: {
          color: '#48b378',
          textDecoration: 'none',
          borderBottom: '1px solid rgba(72, 179, 120, 0.3)'
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
