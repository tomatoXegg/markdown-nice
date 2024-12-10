const MarkdownIt = require('markdown-it');
const hljs = require('highlight.js');
const config = require('../config/config');

class MarkdownConverter {
  constructor() {
    this.md = new MarkdownIt({
      ...config.markdown,
      html: true,
      breaks: false,  // 禁用自动换行转换
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

    // 自定义图片渲染规则，移除 alt 文本
    this.md.renderer.rules.image = (tokens, idx) => {
      const token = tokens[idx];
      const src = token.attrGet('src');
      return `<img src="${src}">`;  // 不在这里添加样式
    };

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
    const elementStyles = {
      p: styles.paragraph,
      h1: styles.heading,
      h2: styles.h2,
      blockquote: styles.blockquote,
      pre: styles.pre,
      code: styles.code,
      ul: styles.list,
      ol: styles.list,
      li: styles.listItem,
      a: styles.link
    };

    // 使用单个正则表达式处理所有基本标签
    content = content.replace(
      new RegExp(`<(${Object.keys(elementStyles).join('|')})([^>]*)>(.*?)</\\1>`, 'g'),
      (match, tag, attrs, inner) => {
        const style = this.styleObjectToString(elementStyles[tag]);
        return `<${tag} style="${style}">${inner}</${tag}>`;
      }
    );

    // 处理图片
    content = content.replace(/<img([^>]*)>/g, (match, attrs) => {
      const src = attrs.match(/src="([^"]*)"/);
      const srcAttr = src ? ` src="${src[1]}"` : '';
      const imageStyles = {
        display: 'block',
        margin: '0 auto',
        maxWidth: '100%'
      };
      return `<img${srcAttr} style="${this.styleObjectToString(imageStyles)}">`;
    });

    // 处理列表（嵌套情况）
    content = content.replace(/<([uo])l([^>]*)>(.*?)<\/\1l>/g, (match, type, attrs, inner) => {
      const listStyle = this.styleObjectToString(styles.list);
      const itemStyle = this.styleObjectToString(styles.listItem);
      const processedInner = inner.replace(/<li([^>]*)>(.*?)<\/li>/g, (m, a, i) => `<li style="${itemStyle}">${i}</li>`);
      return `<${type}l style="${listStyle}">${processedInner}</${type}l>`;
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
      // 移除多余的空行
      .replace(/\n{3,}/g, '\n\n')
      // 修复图片前后的换行
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '![$1]($2)')
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
      .replace(/<p>(<img[^>]+>)<\/p>/g, '$1')  // 只移除包裹的段落标签，不添加样式
      // 修复段落间距
      .replace(/<\/p>\s*<p>/g, '</p><p>')
      // 移除空段落
      .replace(/<p>\s*<\/p>/g, '')
      // 修复列表格式
      .replace(/<\/(ol|ul)>\s*<(ol|ul)>/g, '</$1><$2>')
      // 修复代码块格式
      .replace(/<pre><code>/g, '<pre class="code-block"><code>')
      // 移除多余的换行和空格
      .replace(/\n\s+/g, '')
      .trim();

    return processed;
  }

  convert(markdown, options = {}) {
    try {
      // 预处理 Markdown
      const processedMarkdown = this.preprocessMarkdown(markdown);
      
      // 获取主题
      const theme = this.getTheme(options.theme);
      
      // 转换 Markdown 为 HTML
      let html = this.md.render(processedMarkdown);
      
      // 后处理 HTML
      html = this.postprocessHtml(html, theme);

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
    // 验证主题样式是否完整
    const requiredStyles = ['root', 'paragraph', 'heading', 'h2', 'blockquote', 'code', 'pre', 'list', 'listItem', 'link'];
    const missingStyles = requiredStyles.filter(style => !theme.styles[style]);
    if (missingStyles.length > 0) {
      console.warn(`Theme '${themeName}' is missing required styles: ${missingStyles.join(', ')}`);
      // 使用默认主题的缺失样式进行补充
      missingStyles.forEach(style => {
        theme.styles[style] = config.themes.default.styles[style];
      });
    }
    return theme;
  }
}

module.exports = new MarkdownConverter();
