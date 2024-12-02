const MarkdownIt = require('markdown-it');
const hljs = require('highlight.js');
const config = require('../config/config');

class MarkdownConverter {
  constructor() {
    this.md = new MarkdownIt({
      ...config.markdown,
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
    
    // 可以在这里添加更多插件
  }

  convert(markdown, options = {}) {
    try {
      // 转换 Markdown 为 HTML
      const html = this.md.render(markdown);
      
      // 计算元数据
      const meta = this.calculateMeta(markdown);
      
      return {
        html,
        meta
      };
    } catch (error) {
      throw new Error(`Markdown conversion failed: ${error.message}`);
    }
  }

  calculateMeta(markdown) {
    return {
      wordCount: markdown.length,
      readingTime: Math.ceil(markdown.length / 500), // 粗略估计阅读时间（分钟）
      // 可以添加更多元数据
    };
  }
}

module.exports = new MarkdownConverter();
