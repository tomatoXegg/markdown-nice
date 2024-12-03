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

      // 转换 Markdown 为 HTML
      const html = converter.convert(markdown, { theme });

      // 返回结果
      return res.json({
        success: true,
        data: { html }
      });

    } catch (error) {
      console.error('Markdown conversion error:', error);
      return res.status(500).json({
        success: false,
        error: {
          message: error.message || 'Internal server error'
        }
      });
    }
  };
}

module.exports = new MarkdownController();
