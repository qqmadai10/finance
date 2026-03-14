import { Profile } from './types.js';

export const PROFILE_DATA: Profile = {
  name: "麻袋",
  title: "金融助手",
  bio: "生逢其时当奋斗其时",
  birthdate: "秋天出生哒，是一个收获的季节！",
  photoUrl: "https://image2url.com/r2/default/images/1773160295273-0db44e75-815b-4975-be93-5be9aeb39a8e.jpg",
  contact: {
    email: "lanyingqiao@link.cuhk.edu.cn",
    github: "https://github.com/qiaomadai"
  },
  education: [
    {
      period: "2025.9 - 2027.7",
      school: "香港中文大学（深圳）",
      college: "数据科学学院",
      degree: "硕士",
      details: "主修课程：机器学习、最优化、随机过程、投资科学、金融数据分析、信用模型与产品、算法交易等"
    },
    {
      period: "2021.9 - 2025.6",
      school: "华中科技大学",
      college: "管理学院",
      degree: "本科",
      details: "主修课程：财务管理、SQL、风险管理、管理经济学、Python、数学建模"
    }
  ],
  projects: [
    {
      id: 0,
      company: "快手",
      role: "AI产品（用户产品方向）",
       period: "2025年10月 - 2026年3月",  
      description: "聚焦创作场景，以提升快手短视频优质供给为核心目标，针对C端创作者进行AI功能设计。"
    },
    {
      id: 1,
      company: "百度——度小满",
      role: "AI产品（客服语音产品方向）",
      period: "2024年9月 - 2024年12月",  
      description: "聚焦AI贷后催收场景，设计“语音输入—ASR—NLP(意图识别、策略回复）—TTS”端到端流程，覆盖转写准确度、语音模型MOS打分、用户满意度等多个AI宏微观考评维度。"
    },
    {
      id: 2,
      company: "招商证券",
      role: "宏观总量研究组实习生",
      period: "2024年07月 - 2024年10月",
      description: "用logistic回归模型评估关键经济数据意外对美股市场的短期影响，量化评估不同经济数据“意外”对市场影响的相对重要性。"
    }
  ],
  hobbies: [
    {
      id: 1,
      name: "运动与活力",
      details: "每周3-4次50分钟高强度有氧（跑步机爬坡），无氧偶尔会做一下。运动带来的多巴胺让思维保持清晰。",
      images: [
        "https://pub-141831e61e69445289222976a15b6fb3.r2.dev/Image_to_url_V2/0f5e61d93e91f4f6d201e2efcfcc5408-imagetourl.cloud-1772011765609-qzyv40.jpg",
        "https://pub-141831e61e69445289222976a15b6fb3.r2.dev/Image_to_url_V2/8151b8835568cb859f9419ab86feaf96-imagetourl.cloud-1772011760682-jk9s2u.jpg"
      ]
    },
    {
      id: 3,
      name: "历史与阅读",
      details: "最喜欢的历史人物是谢道韫，最爱磕的历史CP是“婉平之交”和“诸葛亮司马懿”。阅读历史让我理解时代脉络。",
      images: [
        "https://pub-141831e61e69445289222976a15b6fb3.r2.dev/Image_to_url_V2/08da0c82bc315b0bb68ca55d4941f98e-imagetourl.cloud-1772011770324-681o68.jpg",
        "https://pub-141831e61e69445289222976a15b6fb3.r2.dev/Image_to_url_V2/----_20260225171137_112_1-imagetourl.cloud-1772011998889-z4clwj.jpg"
      ]
    },
    {
      id: 4,
      name: "摄影艺术",
      details: "捕捉瞬间的永恒，记录生活中的光影。摄影不仅是记录，更是一种观察世界的视角。",
      images: [
        "https://pub-141831e61e69445289222976a15b6fb3.r2.dev/Image_to_url_V2/2ce7fb01ada832f4c2b7eb1d73679ec9-imagetourl.cloud-1772010485683-j8kuy5.jpg",
        "https://pub-141831e61e69445289222976a15b6fb3.r2.dev/Image_to_url_V2/ba2898561e456afdb2589da4d127ac1f-imagetourl.cloud-1772011698761-m7fb6u.jpg",
        "https://pub-141831e61e69445289222976a15b6fb3.r2.dev/Image_to_url_V2/964ec1f8c624a497c39d311f176a036b-imagetourl.cloud-1772011748447-5336wl.jpg",
        "https://pub-141831e61e69445289222976a15b6fb3.r2.dev/Image_to_url_V2/964d29a6dca997558df003b96ac5d15a-imagetourl.cloud-1772011755452-7896rs.jpg"
      ]
    }
  ]
};