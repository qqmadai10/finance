import React from 'react';
import { PROFILE_DATA } from '../constants';

const Projects: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-12 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-16 animate-[fadeIn_0.5s_ease-out]">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 font-pixel flex items-center justify-center gap-3">
          <span className="text-y2k-pink">★</span>
          个人项目
          <span className="text-y2k-pink">★</span>
        </h1>
        <div className="h-2 w-40 bg-slate-900 mx-auto border-2 border-white shadow-[2px_2px_0px_0px_#000]"></div>

      </div>

      <div className="grid gap-12">
        {PROFILE_DATA.projects.map((project) => (
          <div key={project.id} className="bg-[#c0c0c0] p-1 shadow-retro border-2 border-white outline outline-2 outline-slate-900">
            
            {/* Win95 Header */}
            <div className="bg-[#000080] px-2 py-1 flex justify-between items-center mb-1">
              <span className="text-white font-bold font-pixel text-xs tracking-wider truncate">
                {project.company} - Mission_ID_{project.id}.exe
              </span>
              <div className="flex gap-1">
                <button className="w-4 h-4 bg-[#c0c0c0] border-t border-l border-white border-b border-r border-slate-700 flex items-center justify-center text-[10px] font-bold shadow-sm active:border-t-slate-700 active:border-l-slate-700">_</button>
                <button className="w-4 h-4 bg-[#c0c0c0] border-t border-l border-white border-b border-r border-slate-700 flex items-center justify-center text-[10px] font-bold shadow-sm active:border-t-slate-700 active:border-l-slate-700">□</button>
                <button className="w-4 h-4 bg-[#c0c0c0] border-t border-l border-white border-b border-r border-slate-700 flex items-center justify-center text-[10px] font-bold shadow-sm active:border-t-slate-700 active:border-l-slate-700">×</button>
              </div>
            </div>

            <div className="bg-white border-2 border-slate-500 p-6 md:p-8 shadow-[inset_2px_2px_0px_0px_#000000]">
              <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6 border-b-2 border-slate-900 pb-4 border-dashed">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 font-sans">{project.company}</h2>
                  <p className="text-base text-blue-700 font-bold font-mono mt-1">ROLE: {project.role}</p>
                </div>
                <span className="px-4 py-1 bg-slate-900 text-y2k-lime font-pixel text-[10px]">
                  {project.period}
                </span>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold bg-slate-200 inline-block px-2 py-1 mb-2 border border-slate-900 font-pixel">MISSION BRIEF</h4>
                  <p className="text-sm text-slate-700 leading-relaxed font-medium font-mono">
                    {project.description}
                  </p>
                </div>
              </div>
              
              {/* Footer Status Bar */}
              <div className="mt-6 pt-2 border-t border-slate-300 flex justify-between text-xs text-slate-500 font-mono">
                <span>Status: COMPLETED</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;