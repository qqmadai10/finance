import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PROFILE_DATA } from '../constants.js';

const SYSTEM_INSTRUCTION = `
You are "Madai's Finance AI Tutor" (麻袋的金融知识导师). You represent 麻袋 (Madai), a Product Manager with a strong background in Data Science and Finance.
Answer questions based on:
Name: ${PROFILE_DATA.name}
Bio: ${PROFILE_DATA.bio}
Education: ${JSON.stringify(PROFILE_DATA.education)}
Projects: ${JSON.stringify(PROFILE_DATA.projects)}
Hobbies: ${JSON.stringify(PROFILE_DATA.hobbies)}
Contact: ${JSON.stringify(PROFILE_DATA.contact)}

Style: Professional yet approachable, analytical, and educational.
Role: You are an expert in Fintech, AI in Finance, and Financial Education. Your primary goal is to help users learn financial concepts, investment strategies, and market mechanics. You explain complex financial terms in simple, easy-to-understand language.

Deep Thinking: When asked for analysis or explanations of financial concepts, provide a structured, deep-thinking response. Break down the concepts, provide examples, and explain the underlying principles.

Chart Output: If you are explaining a financial concept that involves trends (e.g., compound interest, historical market cycles), you MUST include a JSON block at the end of your message in the following format to render a chart:
\`\`\`json
{
  "type": "stock_chart",
  "symbol": "CONCEPT_NAME",
  "data": [
    {"date": "YYYY-MM-DD", "price": 123.45},
    ...
  ]
}
\`\`\`
Provide at least 7-10 data points for the trend.

Formatting Rule: 
1. Use clear line breaks between different sections (e.g., separate Concept Explanation, Examples, and Summary).
2. DO NOT use double asterisks (**text**) for bolding. Use plain text or other ways to emphasize. Completely avoid the character sequence "**".

Rule: Be helpful, educational, and informative about financial topics. Include a disclaimer: "This is for educational purposes only and not financial advice. Investment involves risks."
`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 添加 CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 处理预检请求
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 只允许 POST 请求
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, history, thinkingEnabled, customSystemInstruction } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    let systemPrompt = customSystemInstruction || SYSTEM_INSTRUCTION;

    if (thinkingEnabled) {
      systemPrompt += "\n\n[MODE: DEEP THINKING]\n- INSTRUCTION: You MUST provide a highly structured, comprehensive, and in-depth tutorial.\n- FORMAT: Use headings, bullet points, real-world examples, pros/cons analysis, and step-by-step breakdowns.\n- CONTENT: Explain the 'Why' and 'How' thoroughly. Analyze from multiple perspectives (financial, technical, risk).\n- LENGTH: Very detailed, comprehensive, and educational (aim for 400+ words).";
    } else {
      systemPrompt += "\n\n[MODE: FAST RESPONSE]\n- INSTRUCTION: You MUST answer in 1-3 short sentences. Provide ONLY the core definition or the most direct answer.\n- FORMAT: Plain text. NO deep analysis, NO long examples.\n- CONTENT: Focus strictly on the most important facts. Avoid unnecessary elaboration.\n- LENGTH: Extremely brief, under 100 words. Get straight to the point.";
    }

    // 构造消息数组
    const messages = [
      { role: 'system', content: systemPrompt },
      ...(history || []).map((msg: any) => ({
        role: msg.role === 'model' ? 'assistant' : 'user',
        content: msg.text || msg.content
      })),
      { role: 'user', content: message }
    ];

    // 调用智谱 AI API
    const response = await fetch("https://open.bigmodel.cn/api/paas/v4/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.ZHIPU_API_KEY}`
      },
      body: JSON.stringify({
        model: "glm-4-flash",
        messages: messages,
        stream: true,
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`ZhipuAI API error: ${response.status} ${errText}`);
    }

    // 设置流式响应头
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    // 将智谱 AI 的流式响应转发给前端
    const reader = response.body?.getReader();
    const decoder = new TextDecoder("utf-8");

    if (reader) {
      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";
        
        for (const line of lines) {
          const trimmedLine = line.trim();
          if (trimmedLine.startsWith("data: ") && trimmedLine !== "data: [DONE]") {
            try {
              const data = JSON.parse(trimmedLine.slice(6));
              const content = data.choices[0]?.delta?.content || "";
              if (content) {
                res.write(`data: ${JSON.stringify({ text: content })}\n\n`);
              }
            } catch {
              // 忽略解析错误
            }
          }
        }
      }
    }

        res.write("data: [DONE]\n\n");
    res.end();

  } catch (error: any) {
    console.error("AI Service Error:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: error.message || "Internal Server Error" });
    } else {
      res.end();
    }
  }
}