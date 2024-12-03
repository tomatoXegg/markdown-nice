const MarkdownIt = require('markdown-it');
const hljs = require('highlight.js');
const config = require('../config/config');

class MarkdownConverter {
  constructor() {
    this.md = new MarkdownIt({
      ...config.markdown,
      html: true,
      breaks: true,
      linkify: true,
      typographer: true,
      highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(lang, str).value;
          } catch (__) {}
        }
        return '';
      }
    });

    this.md.use(require('markdown-it-katex'));
  }

  // 将对象样式转换为内联样式字符串
  styleObjectToString(styleObj) {
    return Object.entries(styleObj)
      .map(([key, value]) => {
        // 转换驼峰命名为连字符命名
        const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        return `${cssKey}: ${value}`;
      })
      .join('; ');
  }

  // 处理微信公众号的特殊格式
  processWechatContent(content, styles) {
    // 处理图片
    content = content.replace(/<img([^>]*)>/g, (match, attrs) => {
      return `<figure style="${this.styleObjectToString(styles.figure)}">
        <img${attrs} class="image" style="${this.styleObjectToString(styles.image)}">
        <figcaption style="${this.styleObjectToString(styles.figcaption)}"></figcaption>
      </figure>`;
    });

    // 处理标题
    content = content.replace(/<h1([^>]*)>(.*?)<\/h1>/g, (match, attrs, inner) => {
      return `<h1 style="${this.styleObjectToString(styles.heading)}">
        <span class="prefix" style="${this.styleObjectToString(styles.prefix)}"></span>
        <span class="content" style="${this.styleObjectToString(styles.content)}">${inner}</span>
        <span class="suffix" style="${this.styleObjectToString(styles.suffix)}"></span>
      </h1>`;
    });

    return content;
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
      
      // 获取主题
      const theme = this.getTheme(options.theme);

      // 如果是微信公众号主题，使用特殊处理
      if (theme.name === '微信公众号') {
        html = this.processWechatContent(html, theme.styles);
        html = `<section id="md-root" class="themes chengxin fonts-cx" style="${this.styleObjectToString(theme.styles.root)}">${html}</section>`;
      } else {
        // 其他主题使用普通样式
        html = `<div class="markdown-body">${html}</div>`;
      }

      // 计算元数据
      const meta = {
        wordCount: processedMarkdown.length,
        readingTime: Math.ceil(processedMarkdown.length / 500)
      };

      return {
        html,
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
}

module.exports = new MarkdownConverter();
