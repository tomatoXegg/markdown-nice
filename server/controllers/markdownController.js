const converter = require('../utils/converter');

class MarkdownController {
  // 将方法改为箭头函数，以保持 this 绑定
  convert = async (req, res) => {
    try {
      const { markdown, theme = 'wechat' } = req.body;

      if (!markdown) {
        return res.status(400).json({
          success: false,
          error: {
            message: 'Markdown content is required'
          }
        });
      }

      // 转换 Markdown
      const result = converter.convert(markdown, { theme });

      // 为微信公众号特别处理
      if (theme === 'wechat') {
        // 移除多余的 HTML 结构，只保留内容
        let html = result.html
          .replace(/<section[^>]*>([\s\S]*)<\/section>/i, '$1')  // 移除外层 section
          .replace(/<style>[\s\S]*?<\/style>/gi, '')  // 移除样式标签
          .replace(/\s+/g, ' ')  // 规范化空白字符
          .trim();

        return res.json({
          success: true,
          data: {
            html,
            meta: result.meta,
            theme: result.theme
          }
        });
      }

      // 其他主题返回完整 HTML
      return res.json({
        success: true,
        data: result
      });
    } catch (error) {
      console.error('Conversion error:', error);
      res.status(500).json({
        success: false,
        error: {
          message: error.message,
          details: process.env.NODE_ENV === 'development' ? error.stack : undefined
        }
      });
    }
  };
}

module.exports = new MarkdownController();
