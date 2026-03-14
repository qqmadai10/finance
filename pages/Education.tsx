import React from 'react';
import { PROFILE_DATA } from '../constants';

const PixelScroll = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-amber-700">
    <path d="M4 2H18V4H20V20H18V22H4V20H2V4H4V2Z" fill="#FCD34D" stroke="currentColor" strokeWidth="2"/>
    <path d="M6 6H16" stroke="currentColor" strokeWidth="2" strokeLinecap="square"/>
    <path d="M6 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="square"/>
    <path d="M6 14H12" stroke="currentColor" strokeWidth="2" strokeLinecap="square"/>
  </svg>
);

const PixelHat = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-slate-900">
    <path d="M2 10L12 5L22 10L12 15L2 10Z" fill="#4ADE80" stroke="currentColor" strokeWidth="2"/>
    <path d="M6 12V17C6 17 8 19 12 19C16 19 18 17 18 17V12" stroke="currentColor" strokeWidth="2"/>
    <path d="M22 10V18" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const Education: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-12 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-16 animate-[fadeIn_0.5s_ease-out]">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 font-pixel flex items-center justify-center gap-3">
          <span className="text-y2k-pink">★</span> 
          教育
          <span className="text-y2k-pink">★</span>
        </h1>
        <div className="h-2 w-40 bg-slate-900 mx-auto border-2 border-white shadow-[2px_2px_0px_0px_#000]"></div>
        
        {/* Student ID Card */}
        <div className="mt-8 flex justify-center">
          <div className="bg-white border-4 border-slate-900 p-2 shadow-retro transform -rotate-1 hover:rotate-0 transition-transform">
            <div className="bg-slate-100 border-2 border-slate-300 p-4 flex gap-4 items-center">
              <div className="w-24 h-32 bg-slate-800 border-2 border-slate-900 overflow-hidden">
                <img 
                  src="https://pub-141831e61e69445289222976a15b6fb3.r2.dev/Image_to_url_V2/3e1bebe0f24ba7c79136c2520a845cad-imagetourl.cloud-1772006532129-gqcv3i.jpg" 
                  alt="ID Photo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left font-mono">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest">Student ID Card</p>
                <p className="text-lg font-bold text-slate-900">乔蓝莹</p>
                <p className="text-xs text-blue-600 font-bold">打工艺术家</p>
                <div className="mt-2 w-20 h-1 bg-slate-900"></div>
                <div className="mt-1 w-12 h-1 bg-slate-900"></div>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-8 text-slate-500 font-mono">Loading academic history...</p>
      </div>

      <div className="relative ml-4 md:ml-8 space-y-16">
        {/* Dashed Line */}
        <div className="absolute left-[22px] top-8 bottom-8 w-1 bg-slate-300" style={{backgroundImage: 'linear-gradient(to bottom, #000 50%, transparent 50%)', backgroundSize: '4px 20px'}}></div>

        {PROFILE_DATA.education.map((edu, index) => (
          <div key={index} className="relative pl-16 group">
            {/* Pixel Icon Marker */}
            <div className="absolute left-0 top-0 w-12 h-12 bg-white border-4 border-slate-900 shadow-retro flex items-center justify-center z-10 group-hover:scale-110 transition-transform">
              {index === 0 ? <PixelScroll /> : <PixelHat />}
            </div>
            
            {/* Retro Card */}
            <div className="bg-[#fffbeb] border-4 border-slate-900 p-6 relative shadow-retro hover:shadow-retro-hover transition-all hover:-translate-y-1">
              {/* Corner decors */}
              <div className="absolute top-1 left-1 w-2 h-2 bg-slate-900"></div>
              <div className="absolute top-1 right-1 w-2 h-2 bg-slate-900"></div>
              <div className="absolute bottom-1 left-1 w-2 h-2 bg-slate-900"></div>
              <div className="absolute bottom-1 right-1 w-2 h-2 bg-slate-900"></div>

              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 border-b-2 border-slate-200 pb-4 border-dashed">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-pixel text-sm md:text-base">
                    {edu.school}
                  </h3>
                  <p className="text-primary-700 font-bold mt-2 bg-primary-100 inline-block px-2 py-1 border border-slate-900 text-xs shadow-[2px_2px_0px_0px_#000]">
                    {edu.college} · {edu.degree}
                  </p>
                </div>
                <span className="inline-block mt-4 md:mt-0 px-3 py-1 bg-slate-900 text-y2k-lime font-pixel text-[10px]">
                  {edu.period}
                </span>
              </div>
              <p className="text-slate-700 leading-relaxed font-medium font-mono text-sm">
                {edu.details}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;