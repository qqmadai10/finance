import React from 'react';
import { PROFILE_DATA } from '../constants';

const HobbyGallery: React.FC<{ hobby: any, index: number, getRandomRotation: (i: number) => string }> = ({ hobby, index, getRandomRotation }) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative group/gallery">
      {/* Navigation Buttons */}
      <button 
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-30 w-10 h-10 bg-white border-2 border-slate-900 shadow-retro flex items-center justify-center hover:bg-y2k-cyan transition-colors active:shadow-none active:translate-y-[-48%]"
        aria-label="Previous"
      >
        <span className="font-pixel text-xl">{"<"}</span>
      </button>
      
      <button 
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-30 w-10 h-10 bg-white border-2 border-slate-900 shadow-retro flex items-center justify-center hover:bg-y2k-cyan transition-colors active:shadow-none active:translate-y-[-48%]"
        aria-label="Next"
      >
        <span className="font-pixel text-xl">{">"}</span>
      </button>

      <div 
        ref={scrollRef}
        className="flex gap-8 p-4 overflow-x-auto pb-12 scrollbar-hide snap-x snap-mandatory"
      >
        {hobby.images.map((img: string, imgIdx: number) => (
          <div 
            key={imgIdx} 
            className={`relative flex-shrink-0 group bg-white p-3 pb-14 border border-slate-300 shadow-lg transition-all duration-300 hover:z-10 hover:scale-105 hover:shadow-2xl snap-center ${hobby.name.includes("摄影") ? 'w-[80vw] sm:w-64 md:rotate-0' : 'w-[80vw] sm:w-80'} ${hobby.name.includes("摄影") ? '' : getRandomRotation(imgIdx + index)}`}
          >
            {/* "Tape" effect */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-yellow-200/80 border-l border-r border-white/60 rotate-2 shadow-sm z-20 opacity-80"></div>

            <div className={`overflow-hidden bg-slate-900 border-2 border-slate-200 ${hobby.name.includes("摄影") ? 'aspect-[4/5]' : 'aspect-[4/3]'}`}>
              <img
                src={img}
                alt={`${hobby.name} ${imgIdx}`}
                className="w-full h-full object-cover filter contrast-125 hover:sepia transition-all duration-500"
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  ((e.target as HTMLElement).nextSibling as HTMLElement).style.display = 'flex';
                }}
              />
              <div className="absolute inset-0 hidden items-center justify-center bg-slate-800 text-green-500 font-pixel text-xs p-4 text-center flex-col gap-2">
                <span>[NO SIGNAL]</span>
                <div className="w-full h-1 bg-green-500/50 animate-pulse"></div>
              </div>
            </div>
            
            {/* Handwriting Font Caption */}
            <div className="absolute bottom-4 left-0 w-full text-center">
              <span className="font-retro text-slate-600 text-lg bg-yellow-100 px-2 py-0.5 transform -rotate-2 inline-block border border-slate-200">
                {hobby.name} #{imgIdx + 1}
              </span>
            </div>
            
            {/* Shiny Sticker */}
            {imgIdx % 2 === 0 && (
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-tr from-y2k-pink to-purple-500 rounded-full border-2 border-white shadow-md z-20"></div>
            )}
          </div>
        ))}
      </div>
      
      {/* PC Scroll Hint */}
      <div className="hidden md:flex absolute -bottom-4 left-1/2 -translate-x-1/2 items-center gap-2 text-slate-400 font-pixel text-[10px] opacity-0 group-hover/gallery:opacity-100 transition-opacity">
        <span>SCROLL TO EXPLORE</span>
        <div className="w-12 h-0.5 bg-slate-300 relative overflow-hidden">
          <div className="absolute inset-0 bg-slate-900 animate-[walk_2s_linear_infinite]"></div>
        </div>
      </div>
    </div>
  );
};

const Hobbies: React.FC = () => {
  const getRandomRotation = (index: number) => {
    const rotations = ['rotate-1', '-rotate-1', 'rotate-2', '-rotate-2', 'rotate-3', '-rotate-3'];
    return rotations[index % rotations.length];
  };

  return (
    <div className="min-h-screen pt-32 pb-12 px-4 max-w-6xl mx-auto overflow-hidden">
      <div className="text-center mb-16 animate-[fadeIn_0.5s_ease-out]">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 font-pixel flex items-center justify-center gap-3">
          <span className="text-y2k-pink">★</span>
          多元生活
          <span className="text-y2k-pink">★</span>
        </h1>
        <div className="h-2 w-40 bg-slate-900 mx-auto border-2 border-white shadow-[2px_2px_0px_0px_#000]"></div>

      </div>

      <div className="space-y-24">
        {PROFILE_DATA.hobbies.map((hobby, index) => (
          <div key={hobby.id} className="relative">
            {/* Section Title with pixel styling */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-slate-900 text-y2k-lime font-pixel flex items-center justify-center text-sm shadow-retro border-2 border-white">
                0{index + 1}
              </div>
              <h2 className="text-xl font-bold text-slate-900 font-pixel uppercase tracking-tighter bg-y2k-cyan/20 px-4 py-1 transform -skew-x-12">
                {hobby.name}
              </h2>
            </div>

            <div className="flex flex-col lg:flex-row gap-12 relative">
              {/* Text Description */}
              <div className="lg:w-1/3 relative z-10">
                {/* Fake Winamp Player for Music Hobby */}
                {hobby.name.includes("声音") && (
                  <div className="mb-6 bg-[#2d2d2d] p-2 rounded-t-md border-b-4 border-slate-900 shadow-xl w-full max-w-xs mx-auto lg:mx-0">
                    <div className="bg-[#464646] h-4 mb-2 flex justify-between px-2 items-center">
                      <span className="text-[8px] text-white font-pixel">WINAMP</span>
                      <div className="flex gap-1"><div className="w-2 h-2 bg-white"></div><div className="w-2 h-2 bg-white"></div></div>
                    </div>
                    <div className="bg-black p-2 mb-2 border-2 border-[#686868] inset-2">
                      <p className="text-green-500 font-pixel text-[10px] animate-pulse">01. 麻袋 - 独家记忆.mp3</p>
                      <div className="mt-1 text-green-500 font-pixel text-[8px]">02:34 ___|----|___</div>
                    </div>
                    <div className="flex justify-between items-center px-2 pb-2">
                      <div className="text-white font-pixel text-[8px]">128kbps</div>
                      <div className="flex gap-2 text-white">
                        <span>◄◄</span><span>►</span><span>■</span><span>►►</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-white border-4 border-slate-900 p-6 shadow-retro sticky top-28">
                  <p className="text-slate-800 leading-relaxed font-medium font-retro text-base">
                    {hobby.details}
                  </p>
                  <div className="mt-4 flex gap-2 border-t-2 border-slate-100 pt-4">
                    {['#FF00FF', '#00FFFF', '#FFFF00'].map(color => (
                      <span key={color} className="w-4 h-4 border-2 border-slate-900" style={{backgroundColor: color}}></span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Polaroid Gallery */}
              <div className="lg:w-2/3 relative">
                
                {/* Y2K Stickers Background */}
                <div className="absolute top-0 right-0 text-6xl opacity-20 rotate-12 pointer-events-none hidden md:block">✨</div>
                <div className="absolute bottom-0 left-10 text-6xl opacity-20 -rotate-12 pointer-events-none hidden md:block">💿</div>

                <HobbyGallery hobby={hobby} index={index} getRandomRotation={getRandomRotation} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hobbies;