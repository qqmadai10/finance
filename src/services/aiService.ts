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

    // 直接调用智谱 AI API（注意：API Key 会暴露）
    const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 1e8360bcdcf54462ad6cd0556123e366.bvHGLeI6vRQXDNFm'
      },
      body: JSON.stringify({
        model: 'glm-4-flash',
        messages: messages,
        stream: true
      }),
      signal
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || 'Failed to fetch response');
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
            const parsed = JSON.parse(data);
            if (parsed.choices && parsed.choices[0] && parsed.choices[0].delta && parsed.choices[0].delta.content) {
              onChunk(parsed.choices[0].delta.content);
            }
          } catch (e) {
            console.error('Error parsing chunk:', e);
          }
        }
      }
    }
  } catch (error: any) {
    console.error('AI Service Error:', error);
    onChunk('\n\n思维连接中断了，请检查网络连接。');
  }
};