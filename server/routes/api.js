const express = require('express');
const router = express.Router();
const markdownController = require('../controllers/markdownController');

// 测试路由
router.get('/test', (req, res) => {
  res.json({ message: 'API is working' });
});

// Markdown 转换接口
router.post('/convert', (req, res) => {
  console.log('Received convert request:', req.body); // 添加日志
  return markdownController.convert(req, res);
});

module.exports = router;
