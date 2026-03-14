import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, GraduationCap, Briefcase, Heart, MessageSquare } from 'lucide-react';

const MobileNav: React.FC = () => {
  const location = useLocation();

  const navLinks = [
    { path: '/', label: '首页', icon: Home },
    { path: '/education', label: '教育', icon: GraduationCap },
    { path: '/projects', label: '项目', icon: Briefcase },
    { path: '/hobbies', label: '兴趣', icon: Heart },
    { path: '/chat', label: 'AI', icon: MessageSquare },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t-2 border-slate-900 z-50 px-2 py-1 flex justify-around items-center h-16 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
      {navLinks.map((link) => {
        const Icon = link.icon;
        const isActive = location.pathname === link.path;
        return (
          <Link
            key={link.path}
            to={link.path}
            className={`flex flex-col items-center justify-center w-full h-full transition-all duration-200 ${
              isActive ? 'text-slate-900' : 'text-slate-400'
            }`}
          >
            <div className={`p-1.5 rounded-xl transition-all ${isActive ? 'bg-y2k-cyan border-2 border-slate-900 shadow-[2px_2px_0_0_#000]' : ''}`}>
              <Icon size={20} strokeWidth={isActive ? 3 : 2} />
            </div>
            <span className={`text-[10px] mt-1 font-bold ${isActive ? 'opacity-100' : 'opacity-70'}`}>
              {link.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

export default MobileNav;
