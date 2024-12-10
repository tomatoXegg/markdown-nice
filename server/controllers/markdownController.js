const converter = require('../utils/converter');
const config = require('../config/config'); // 确保路径正确

class MarkdownController {
  convert = async (req, res) => {
    try {
      const { markdown, theme = 'wechat' } = req.body;

      if (!markdown) {
        return res.status(400).json({
          success: false,
          message: 'Markdown content is required'
        });
      }

      // 验证主题名称
      if (theme && !config.themes[theme]) {
        return res.status(400).json({
          success: false,
          message: `Invalid theme: ${theme}`
        });
      }

      // 转换 Markdown 为 HTML
      const result = converter.convert(markdown, { theme });

      // 返回结果
      return res.json({
        success: true,
        data: result.html,
        theme: result.theme,
        meta: result.meta
      });

    } catch (error) {
      console.error('Markdown conversion error:', error);
      return res.status(500).json({
        success: false,
        message: error.message || 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  };
}

module.exports = new MarkdownController();
