import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Profile } from '../types';
import { 
  PixelCloud, 
  QuestionBlock, 
  BrickBlock, 
  Floor, 
  PixelMadai, 
  ShenzhenSkyline, 
  PixelLakitu, 
  ShenzhenBayBridge,
  DJIDrone
} from './PixelArt';

interface HeroProps {
  profile: Profile;
}

const PixelCoin = ({ className = "" }: { className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 12 12" className={`${className} animate-bounce`} xmlns="http://www.w3.org/2000/svg">
    <path fill="#000" d="M4 1h4v1h1v1h1v6H9v1H8v1H4V9H3V8H2V3h1V2h1V1z"/>
    <path fill="#FFD700" d="M4 2h4v1h1v6H8v1H4V9H3V3h1V2z"/>
    <path fill="#FFF" d="M4 3h1v2H4V3zM5 2h1v1H5V2z"/>
  </svg>
);

const Hero: React.FC<HeroProps> = ({ profile }) => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Progress bar animation: Run from 0 to 100
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsLoaded(true);
          return 100;
        }
        return prev + 1; // Speed of running
      });
    }, 30);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col justify-center overflow-hidden py-20 bg-gradient-to-b from-[#3b82f6] to-[#60a5fa]">
      
      {/* Dynamic Clouds & Shenzhen Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-[-100px] animate-[cloud-move_25s_linear_infinite] opacity-80"><PixelCloud /></div>
        <div className="absolute top-32 left-[-200px] animate-[cloud-move_35s_linear_infinite] opacity-60 scale-75"><PixelCloud /></div>
        <div className="absolute top-5 right-[-150px] animate-[cloud-move_40s_linear_infinite_reverse] opacity-60 scale-50"><PixelCloud /></div>
        
        {/* Floating Coins in Background */}
        <div className="absolute top-20 left-1/4 animate-bounce delay-100 opacity-80"><PixelCoin className="w-8 h-8" /></div>
        <div className="absolute top-40 right-1/3 animate-bounce delay-300 opacity-80"><PixelCoin className="w-6 h-6" /></div>
        <div className="absolute top-10 right-10 animate-bounce delay-500 opacity-80"><PixelCoin className="w-8 h-8" /></div>

        {/* Shenzhen Skyline Background - Unified & Realistic */}
        <div className="absolute bottom-20 left-0 w-full flex justify-center items-end opacity-90 pointer-events-none">
          <ShenzhenSkyline className="w-full max-w-6xl h-auto min-w-[800px]" />
        </div>

        {/* Shenzhen Bay Bridge - Spanning across */}
        <div className="absolute bottom-20 left-0 w-full opacity-80 pointer-events-none">
          <ShenzhenBayBridge className="w-full h-24 md:h-32" />
        </div>

        {/* Pixel Lakitu (Cloud Guy) */}
        <div className="absolute top-20 right-1/4 animate-bounce opacity-90">
          <PixelLakitu className="w-12 h-12" />
        </div>
        <div className="absolute bottom-40 left-1/4 animate-pulse opacity-80 scale-75">
          <PixelLakitu className="w-10 h-10" />
        </div>

        {/* DJI Drones */}
        <div className="absolute top-1/4 left-1/4 opacity-80"><DJIDrone /></div>
        <div className="absolute top-1/3 right-1/3 opacity-60 scale-75"><DJIDrone /></div>
      </div>

      <div className={`max-w-xl mx-auto px-4 w-full relative z-10 transition-all duration-500 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}>
        {/* Windows 95 Container */}
        <div className="bg-[#c0c0c0] md:p-1 shadow-none md:shadow-retro border-y-2 md:border-2 border-white outline-none md:outline md:outline-1 md:outline-black">
          {/* Title Bar */}
          <div className="bg-[#000080] p-1 flex justify-between items-center mb-1 cursor-default">
            <span className="text-white font-bold text-[10px] md:text-xs pl-2 font-pixel tracking-wider">Madai_World_1-1.exe</span>
            <div className="flex gap-1">
              <div className="w-4 h-4 md:w-5 md:h-5 bg-[#c0c0c0] border-t border-l border-white border-b border-r border-black flex items-center justify-center text-[8px] md:text-[10px] cursor-pointer hover:bg-gray-300">_</div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsVisible(false);
                }}
                className="w-4 h-4 md:w-5 md:h-5 bg-[#c0c0c0] border-t border-l border-white border-b border-r border-black flex items-center justify-center text-[10px] md:text-xs cursor-pointer hover:bg-red-500 hover:text-white transition-colors z-50"
                aria-label="Close"
              >
                X
              </button>
            </div>
          </div>

          <div className="bg-white border-t-2 md:border-2 border-gray-500 p-2 md:p-3 flex flex-col md:flex-row items-center gap-2 md:gap-3 relative overflow-hidden">
            
            {/* Floating Mario Blocks - Hidden on small screens */}
            <div className="absolute top-2 right-2 md:top-6 md:right-8 flex gap-1 animate-bounce-pixel scale-50 md:scale-100">
              <BrickBlock />
              <QuestionBlock />
              <BrickBlock />
            </div>

            {/* Avatar Section - Show earlier on mobile */}
            <div className="flex-shrink-0 order-first md:order-last">
              <div className="relative w-32 h-32 md:w-48 md:h-48 bg-y2k-pink p-1 border-4 border-black shadow-[4px_4px_0_0_#000] md:shadow-[6px_6px_0_0_#000] transform rotate-2 md:rotate-3 hover:rotate-0 transition-transform duration-300">
                <img src={profile.photoUrl} alt={profile.name} className="w-full h-full object-cover border-2 border-white transition-all duration-500" />
              </div>
            </div>

            {/* Text Content */}
            <div className="flex-1 text-center md:text-left z-10 w-full">
              <h1 className="text-xl md:text-3xl font-black text-black mb-1 tracking-tighter flex flex-wrap items-center justify-center md:justify-start gap-2">
                {profile.name}
                <PixelCoin className="w-4 h-4 md:w-5 md:h-5 mb-1" />
              </h1>
              
              {/* Running Pixel Madai Progress Bar */}
              <div className="w-full max-w-[240px] mb-3 relative mx-auto md:mx-0">
                <div className="flex justify-between text-[7px] font-bold mb-0.5 font-mono">
                  <span>BOOT_SEQUENCE...</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-3 w-full bg-gray-200 border-2 border-black relative overflow-visible">
                   {/* Green Fill */}
                   <div 
                     className="h-full bg-[#00AA00] transition-all duration-75 ease-linear" 
                     style={{width: `${progress}%`}}
                   ></div>
                   
                   {/* Running Pixel Madai Character */}
                   <div 
                     className="absolute top-[-14px] transition-all duration-75 ease-linear"
                     style={{ left: `calc(${progress}% - 12px)` }}
                   >
                     <div className={progress < 100 ? "animate-bounce" : ""}>
                        <PixelMadai className="w-6 h-6 drop-shadow-md" />
                     </div>
                   </div>
                </div>
              </div>

              <p className="text-[10px] md:text-sm text-gray-700 font-bold bg-cyan-50 inline-block p-1 border-2 border-black shadow-[2px_2px_0_0_#000] w-full md:w-auto mb-2">
                "{profile.bio}"
              </p>

              <div className="flex justify-center md:justify-start">
                {isLoaded && (
                  <Link to="/chat" className="bg-black text-y2k-lime px-2 py-1 text-[10px] md:text-xs font-pixel border border-y2k-lime hover:bg-y2k-lime hover:text-black transition-colors shadow-[2px_2px_0_0_#000]">
                    [ ENTER FINANCE AI ]
                  </Link>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
      
      {!isVisible && (
        <button 
          onClick={() => setIsVisible(true)}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black text-black font-bold shadow-retro hover:bg-white active:border-t-black active:border-l-black active:border-b-white active:border-r-white transition-none font-pixel text-xs"
        >
          [ RESTART Madai_World_1-1.exe ]
        </button>
      )}

      {/* Ground Floor */}
      <div className="absolute bottom-0 w-full z-0">
        <Floor />
      </div>
    </div>
  );
};

export default Hero;