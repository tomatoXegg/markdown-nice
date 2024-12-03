const converter = require('../utils/converter');

class MarkdownController {
  // 将方法改为箭头函数，以保持 this 绑定
  convert = async (req, res) => {
    try {
      const { markdown, theme = 'default' } = req.body;
      
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
      
      // 返回结果
      res.json({
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
