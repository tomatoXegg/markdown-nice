const MarkdownIt = require('markdown-it');
const hljs = require('highlight.js');
const config = require('../config/config');

class MarkdownConverter {
  constructor() {
    this.md = new MarkdownIt({
      ...config.markdown,
      html: true,         // 启用 HTML 标签
      breaks: true,       // 转换换行符为 <br>
      linkify: true,      // 将类似 URL 的文本转换为链接
      typographer: true,  // 启用一些语言中性的替换和引号美化
      highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(lang, str).value;
          } catch (__) {}
        }
        return ''; // 使用默认的转义
      }
    });

    // 添加插件
    this.md.use(require('markdown-it-katex')); // 数学公式

    // 自定义图片渲染规则
    this.md.renderer.rules.image = (tokens, idx, options, env, self) => {
      const token = tokens[idx];
      const srcIndex = token.attrIndex('src');
      const titleIndex = token.attrIndex('title');
      const alt = token.content || '';
      
      let src = token.attrs[srcIndex][1];
      const title = titleIndex >= 0 ? token.attrs[titleIndex][1] : '';

      // 处理相对路径的图片
      if (!src.startsWith('http') && !src.startsWith('data:')) {
        // 如果是相对路径，可以根据需要添加基础URL
        // src = `${baseUrl}${src}`;
      }

      // 添加图片样式和响应式支持
      return `<figure class="markdown-image">
        <img src="${src}" alt="${alt}" title="${title}" style="max-width: 100%; height: auto; display: block; margin: 1em auto;">
        ${title ? `<figcaption style="text-align: center; color: #666; font-size: 0.9em;">${title}</figcaption>` : ''}
      </figure>`;
    };
  }

  convert(markdown, options = {}) {
    try {
      // 确保换行符正确
      const normalizedMarkdown = markdown.replace(/\\n/g, '\n');
      
      // 转换 Markdown 为 HTML
      const html = this.md.render(normalizedMarkdown);
      
      // 获取主题样式
      const theme = this.getTheme(options.theme);
      
      // 组合 HTML 和样式
      const styledHtml = this.applyTheme(html, theme);
      
      // 计算元数据
      const meta = this.calculateMeta(normalizedMarkdown);
      
      return {
        html: styledHtml,
        meta,
        theme: theme.name
      };
    } catch (error) {
      throw new Error(`Markdown conversion failed: ${error.message}`);
    }
  }

  getTheme(themeName = 'default') {
    const theme = config.themes[themeName];
    if (!theme) {
      console.warn(`Theme '${themeName}' not found, using default theme`);
      return config.themes.default;
    }
    return theme;
  }

  applyTheme(html, theme) {
    return `<!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        ${theme.styles}
        /* 基础样式 */
        .markdown-body {
          box-sizing: border-box;
          min-width: 200px;
          max-width: 980px;
          margin: 0 auto;
          padding: 45px;
        }
        @media (max-width: 767px) {
          .markdown-body {
            padding: 15px;
          }
        }
        /* 图片样式 */
        .markdown-image {
          margin: 1.5em 0;
        }
        .markdown-image img {
          max-width: 100%;
          height: auto;
          display: block;
          margin: 0 auto;
          border-radius: 4px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .markdown-image figcaption {
          margin-top: 0.5em;
          text-align: center;
          color: #666;
          font-size: 0.9em;
        }
      </style>
    </head>
    <body class="markdown-body">
      ${html}
    </body>
    </html>`;
  }

  calculateMeta(markdown) {
    return {
      wordCount: markdown.length,
      readingTime: Math.ceil(markdown.length / 500), // 粗略估计阅读时间（分钟）
    };
  }
}

module.exports = new MarkdownConverter();
