import http from 'http';

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  // 添加 CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 处理 OPTIONS 预检请求
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.url === '/api/ping') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'pong' }));
    return;
  }

  if (req.url === '/api/chat' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        console.log('转发请求到智谱 AI');
        console.log('请求体:', body);

        const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer c6be26a198a44ac88cc3336ffd230344.UAN4faq8ureEWbik'
          },
          body: body
        });

        console.log('智谱 AI 响应状态:', response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error('智谱 AI 错误:', errorText);
          res.writeHead(response.status);
          res.end(errorText);
          return;
        }

        // 设置流式响应头
        res.writeHead(200, {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive'
        });

        // 直接转发流式响应
        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value);
          console.log('转发 chunk:', chunk);
          res.write(chunk);
        }

        res.end();
        console.log('响应完成');
      } catch (err) {
        console.error('代理错误:', err);
        res.writeHead(500);
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  res.writeHead(404);
  res.end('NOT_FOUND');
});

server.listen(3001, () => {
  console.log('代理服务器运行在 http://localhost:3001');
});