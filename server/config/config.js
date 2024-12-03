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
          padding: '30px 16px',
          fontSize: '16px',
          fontFamily: 'Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, "PingFang SC", Cambria, Cochin, Georgia, Times, "Times New Roman", serif',
          color: '#3f3f3f',
          lineHeight: '1.6',
          wordBreak: 'break-all'
        },
        heading: {
          boxSizing: 'border-box',
          margin: '80px 10px 40px 10px',
          padding: '0',
          textAlign: 'center',
          fontWeight: 'normal',
          color: '#3f3f3f',
          fontSize: '140%',
          lineHeight: '1.5'
        },
        prefix: {
          boxSizing: 'border-box',
          margin: '0',
          padding: '0',
          color: '#3f3f3f'
        },
        content: {
          boxSizing: 'border-box',
          margin: '0',
          padding: '0',
          fontSize: '24px',
          color: '#3f3f3f'
        },
        suffix: {
          boxSizing: 'border-box',
          margin: '0',
          padding: '0',
          color: '#3f3f3f'
        },
        paragraph: {
          margin: '10px 0',
          padding: '0',
          fontSize: '16px',
          color: '#3f3f3f',
          lineHeight: '1.6',
          wordSpacing: '3px',
          letterSpacing: '3px',
          textAlign: 'left'
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
          width: '80%',
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
          color: '#888',
          fontSize: '14px',
          fontStyle: 'italic'
        },
        blockquote: {
          margin: '20px 0',
          padding: '1px 0 1px 10px',
          backgroundColor: 'rgba(158, 158, 158, 0.1)',
          borderLeft: '3px solid rgb(158, 158, 158)',
          color: '#3f3f3f'
        },
        code: {
          backgroundColor: '#f8f5ec',
          color: '#ff3502',
          padding: '3px 5px',
          borderRadius: '2px',
          fontSize: '90%',
          fontFamily: 'Menlo, Monaco, Consolas, "Courier New", monospace'
        },
        pre: {
          margin: '16px 0',
          padding: '16px',
          backgroundColor: '#f8f5ec',
          borderRadius: '6px',
          overflow: 'auto',
          fontSize: '14px',
          lineHeight: '1.6',
          border: '1px solid #eee'
        },
        list: {
          margin: '10px 0',
          paddingLeft: '24px'
        },
        listItem: {
          margin: '5px 0',
          lineHeight: '1.6',
          color: '#3f3f3f'
        },
        link: {
          color: '#ff3502',
          textDecoration: 'none',
          borderBottom: '1px solid #ff3502'
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
    },
    cuizi: {
      name: '锤子',
      styles: {
        root: {
          boxSizing: 'border-box',
          margin: '0',
          padding: '10px 10px',
          fontSize: '16px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
          color: '#635753',
          backgroundColor: '#fbf7ee',
          wordBreak: 'break-all'
        },
        heading: {
          boxSizing: 'border-box',
          margin: '20px 0',
          padding: '0',
          color: '#635753',
          fontSize: '24px',
          fontWeight: 'bold',
          textAlign: 'left',
          lineHeight: '1.5'
        },
        prefix: {
          boxSizing: 'border-box',
          margin: '0',
          padding: '0',
          color: '#635753'
        },
        content: {
          boxSizing: 'border-box',
          margin: '0',
          padding: '0',
          color: '#635753'
        },
        suffix: {
          boxSizing: 'border-box',
          margin: '0',
          padding: '0',
          color: '#635753'
        },
        paragraph: {
          margin: '10px 0',
          padding: '0',
          fontSize: '16px',
          color: '#635753',
          lineHeight: '2',
          letterSpacing: '0.1em'
        },
        figure: {
          boxSizing: 'border-box',
          padding: '0',
          margin: '20px 0',
          textAlign: 'center'
        },
        image: {
          width: '100%',
          boxShadow: '14px 14px 28px #e6e6e6, -14px -14px 28px #fff',
          border: '9px solid #ffffff',
          outline: '1px solid #ebdfd5'
        },
        figcaption: {
          boxSizing: 'border-box',
          margin: '10px 0 0',
          padding: '0',
          textAlign: 'center',
          color: '#635753',
          fontSize: '14px',
          fontStyle: 'italic'
        },
        blockquote: {
          margin: '20px 0',
          padding: '15px 20px',
          backgroundColor: '#fbf7ee',
          borderLeft: '3px solid #ebdfd5',
          color: '#635753'
        },
        code: {
          backgroundColor: '#fbf7ee',
          color: '#635753',
          padding: '2px 5px',
          borderRadius: '3px',
          fontSize: '85%',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
        },
        pre: {
          margin: '16px 0',
          padding: '16px',
          backgroundColor: '#fbf7ee',
          borderRadius: '6px',
          overflow: 'auto',
          fontSize: '14px',
          lineHeight: '1.6',
          border: '1px solid #ebdfd5'
        },
        list: {
          margin: '16px 0',
          paddingLeft: '24px',
          color: '#635753'
        },
        listItem: {
          margin: '8px 0',
          lineHeight: '2',
          color: '#635753'
        },
        link: {
          color: '#635753',
          textDecoration: 'none',
          borderBottom: '1px solid #ebdfd5'
        },
        strong: {
          color: '#635753',
          fontWeight: 'bold'
        },
        em: {
          color: '#635753',
          fontStyle: 'italic'
        }
      }
    }
  },
  
  // CORS 配置
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }
};
