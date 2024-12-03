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
  }

  preprocessMarkdown(markdown) {
    // 修复标题格式
    let processed = markdown
      // 移除开头的空白行
      .trim()
      // 确保标题格式正确（## 标题）
      .replace(/^(#+)([^\s#])/gm, '$1 $2')
      // 修复多重标题（# 标题 ## 标题2）
      .replace(/(#+ [^#\n]+)#+\s/g, '$1\n\n')
      // 确保段落之间有空行
      .replace(/\n(?!\n)/g, '\n\n')
      // 移除多余的空行
      .replace(/\n{3,}/g, '\n\n')
      // 修复图片前后的换行
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '\n\n![$1]($2)\n\n')
      // 修复标题前的换行
      .replace(/([^\n])(\n#+\s)/g, '$1\n\n$2');

    return processed;
  }

  postprocessHtml(html, theme) {
    let processed = html
      // 移除多余的段落标签
      .replace(/<p><p>/g, '<p>')
      .replace(/<\/p><\/p>/g, '</p>')
      // 修复标题格式
      .replace(/<h(\d)>([^<]+)<\/h\1>/g, (match, level, content) => {
        const titleContent = content.split(/#+\s*/g).pop() || content;
        return `<h${level}>${titleContent.trim()}</h${level}>`;
      })
      // 处理图片
      .replace(/<p>(<img[^>]+>)<\/p>/g, (match, img) => {
        if (theme === 'wechat') {
          return `<p style="text-align: center;">${img}</p>`;
        }
        return `<section class="img-wrapper">${img}</section>`;
      })
      // 修复段落间距
      .replace(/<\/p>\s*<p>/g, '</p>\n<p>')
      // 移除空段落
      .replace(/<p>\s*<\/p>/g, '')
      // 修复列表格式
      .replace(/<\/(ol|ul)>\s*<(ol|ul)>/g, '</\$1>\n<\$2>')
      // 修复代码块格式
      .replace(/<pre><code>/g, '<pre class="code-block"><code>')
      // 移除多余的换行和空格
      .replace(/\n\s+/g, '\n')
      .trim();

    return processed;
  }

  convert(markdown, options = {}) {
    try {
      // 预处理 Markdown
      const processedMarkdown = this.preprocessMarkdown(markdown);
      
      // 转换 Markdown 为 HTML
      let html = this.md.render(processedMarkdown);
      
      // 后处理 HTML
      html = this.postprocessHtml(html, options.theme);
      
      // 获取主题样式
      const theme = this.getTheme(options.theme);
      
      // 组合 HTML 和样式
      const styledHtml = this.applyTheme(html, theme);
      
      // 计算元数据
      const meta = this.calculateMeta(processedMarkdown);
      
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
    // 为微信公众号优化的输出
    if (theme.name === '微信公众号') {
      return `<section class="markdown-body">
        <style>
          ${theme.styles}
          .markdown-body {
            font-family: -apple-system, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
            font-size: 16px;
            line-height: 1.8;
            word-wrap: break-word;
            padding: 1em;
            background: #fff;
            color: #333;
          }
          .markdown-body img {
            max-width: 100%;
            height: auto;
            display: block;
            margin: 20px auto;
          }
          .markdown-body pre {
            background-color: #f8f8f8;
            border-radius: 3px;
            padding: 16px;
            overflow: auto;
            line-height: 1.45;
            margin: 1em 0;
          }
          .markdown-body code {
            background-color: rgba(27,31,35,.05);
            border-radius: 3px;
            font-size: 85%;
            margin: 0;
            padding: 0.2em 0.4em;
          }
          .markdown-body pre > code {
            background: transparent;
            padding: 0;
          }
        </style>
        ${html}
      </section>`;
    }

    // 其他主题的输出
    return `<!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        ${theme.styles}
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
