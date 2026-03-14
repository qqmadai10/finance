interface ChatHistoryItem {
  role: 'user' | 'model';
  text: string;
}

export const sendMessageToAIStream = async (
  userMessage: string,
  history: ChatHistoryItem[],
  onChunk: (chunk: string) => void,
  thinkingEnabled: boolean = true,
  customSystemInstruction?: string,
  signal?: AbortSignal
): Promise<void> => {
  try {
    // 构造 messages 数组（符合智谱 AI 格式）
    const messages = [
      ...history.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.text
      })),
      { role: 'user', content: userMessage }
    ];

    console.log('Sending messages:', messages);

    // 直接请求固定 API 文件
    const response = await fetch('https://qqmadai10.github.io/qqmadai/api-worker.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
      signal
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch response');
    }

    const reader = response.body?.getReader();
    if (!reader) throw new Error('Response body is missing');

    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.trim() === '') continue;
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') return;

          try {
            // 直接透传流数据
            onChunk(data);
          } catch (e) {
            console.error('Error parsing chunk:', e);
          }
        }
      }
    }
  } catch (error: any) {
    if (error.name === 'AbortError') {
      console.log('Generation stopped by user');
      onChunk('\n\n*[已停止生成]*');
      return;
    }
    console.error('AI Service Error:', error);
    onChunk('\n\n思维连接中断了，请检查网络连接。');
  }
};