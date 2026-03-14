console.log('========== 调试信息 ==========');
console.log('ZHIPU_API_KEY 是否存在:', !!process.env.ZHIPU_API_KEY);
console.log('ZHIPU_API_KEY 长度:', process.env.ZHIPU_API_KEY ? process.env.ZHIPU_API_KEY.length : 0);
console.log('所有环境变量:', Object.keys(process.env).filter(key => key.includes('ZHIPU')).join(', '));
console.log('==============================');

const fs = require('fs');
const path = require('path');

// 检查环境变量
const apiKey = process.env.ZHIPU_API_KEY;
if (!apiKey) {
  console.error('错误: ZHIPU_API_KEY 环境变量未设置');
  process.exit(1);
}

// API 函数代码
const apiFunctionCode = `
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;
    
    const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.ZHIPU_API_KEY
      },
      body: JSON.stringify({
        model: 'glm-4-flash',
        messages: messages,
        stream: true
      })
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    res.setHeader('Content-Type', 'text/event-stream');
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(decoder.decode(value));
    }
    
    res.end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
`;

// 写入 dist 目录
const distDir = path.join(__dirname, '../dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// 使用固定文件名，确保与前端一致
const apiFileName = 'api.js';

// 写入 API 文件
fs.writeFileSync(path.join(distDir, apiFileName), apiFunctionCode);
console.log(`✅ API 函数已生成到 dist/${apiFileName}`);

// 删除其他旧的动态文件（避免混乱）
try {
  const files = fs.readdirSync(distDir);
  files.forEach(file => {
    if (file.startsWith('api-') && file.endsWith('.js') && file !== apiFileName) {
      fs.unlinkSync(path.join(distDir, file));
      console.log(`🗑️ 删除旧文件: ${file}`);
    }
  });
} catch (err) {
  console.log('清理旧文件时出错:', err.message);
}

// 可选：生成一个简单的加载器（如果前端需要）
const loaderCode = `
export async function callAPI(messages) {
  const response = await fetch('https://qqmadai10.github.io/qqmadai/api.js', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages })
  });
  return response;
}
`;
fs.writeFileSync(path.join(distDir, 'api-loader.js'), loaderCode);
console.log(`✅ API 加载器已生成到 dist/api-loader.js`);