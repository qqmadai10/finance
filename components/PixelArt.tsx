
import React from 'react';

export const PixelCloud = ({ className = "" }: { className?: string }) => (
  <svg width="64" height="32" viewBox="0 0 64 32" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path fill="#FFFFFF" d="M8 24h48v8H8z" /> {/* Bottom */}
    <path fill="#FFFFFF" d="M4 16h8v8H4z" />  {/* Left bottom */}
    <path fill="#FFFFFF" d="M52 16h8v8h-8z" /> {/* Right bottom */}
    <path fill="#FFFFFF" d="M12 8h12v8H12z" /> {/* Left Top */}
    <path fill="#FFFFFF" d="M24 0h24v16H24z" /> {/* Top */}
    <path fill="#FFFFFF" d="M48 8h8v8h-8z" />  {/* Right Mid */}
    <path fill="rgba(0,0,0,0.1)" d="M8 28h48v4H8z" /> {/* Shadow */}
  </svg>
);

export const QuestionBlock = ({ className = "" }: { className?: string }) => (
  <svg width="40" height="40" viewBox="0 0 16 16" className={`${className} drop-shadow-md`} xmlns="http://www.w3.org/2000/svg">
    <rect width="16" height="16" fill="#000000" />
    <rect x="1" y="1" width="14" height="14" fill="#F89300" /> {/* Orange border */}
    <rect x="2" y="2" width="12" height="12" fill="#FFD700" /> {/* Gold face */}
    {/* Question Mark */}
    <path fill="#000000" fillOpacity="0.1" d="M12 2H4v2h2v2h2v2H6v2h2v4h4V8h-2V6h2V2z" /> {/* Shadow */}
    <path fill="#A85300" d="M5 3h6v2h-2v2H7v2h2v2H7v-2h2V5H5V3zm2 7h2v2H7v-2z" /> {/* Mark */}
    {/* Bolts */}
    <rect x="2" y="2" width="1" height="1" fill="#000000" opacity="0.5" />
    <rect x="13" y="2" width="1" height="1" fill="#000000" opacity="0.5" />
    <rect x="2" y="13" width="1" height="1" fill="#000000" opacity="0.5" />
    <rect x="13" y="13" width="1" height="1" fill="#000000" opacity="0.5" />
  </svg>
);

export const BrickBlock = ({ className = "" }: { className?: string }) => (
  <svg width="40" height="40" viewBox="0 0 16 16" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="16" height="16" fill="#B22222" />
    <path fill="#000000" fillOpacity="0.2" d="M0 0h16v1H0zm0 8h16v1H0zM7 0h1v8H7zm8 8h1v8h-1z" />
    <rect x="1" y="1" width="6" height="6" fill="#CD5C5C" />
    <rect x="9" y="1" width="6" height="6" fill="#CD5C5C" />
    <rect x="1" y="9" width="14" height="6" fill="#CD5C5C" />
  </svg>
);

export const PixelMadai = ({ className = "" }: { className?: string }) => (
  <svg width="48" height="48" viewBox="0 0 12 12" className={className} xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
    {/* Hair (Long, Dark) */}
    <path fill="#2D1B0E" d="M3 0h6v1H3zM2 1h8v1H2zM1 2h1v5H1zM10 2h1v5h-1z" />
    
    {/* Red Bow */}
    <path fill="#FF0000" d="M4 0h1v1H4zM7 0h1v1H7z" />
    
    {/* Face */}
    <path fill="#FFE4C4" d="M2 2h8v3H2zM3 5h6v1H3z" />
    
    {/* Eyes */}
    <rect x="3" y="3" width="1" height="1" fill="black" />
    <rect x="8" y="3" width="1" height="1" fill="black" />
    
    {/* Pink Dress */}
    <path fill="#FF69B4" d="M3 6h6v3H3z" />
    <path fill="#FF1493" d="M2 9h8v1H2z" /> {/* Skirt ruffle */}
    
    {/* Arms */}
    <path fill="#FFE4C4" d="M2 6h1v2H2zM9 6h1v2H9z" />
    
    {/* Legs */}
    <path fill="#FFE4C4" d="M4 10h1v2H4zM7 10h1v2H7z" />
    
    {/* Shoes */}
    <path fill="#FF0000" d="M3 11h2v1H3zM7 11h2v1H7z" />
  </svg>
);

export const ShenzhenSkyline = ({ className = "" }: { className?: string }) => (
  <svg width="800" height="300" viewBox="0 0 400 150" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="skylineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.9" /> {/* Brighter Blue */}
        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.95" />
      </linearGradient>
      <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#a5f3fc" stopOpacity="0.6" /> {/* Cyan */}
        <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#a5f3fc" stopOpacity="0.6" />
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    {/* --- BACKGROUND BUILDINGS (Silhouette) --- */}
    <path fill="#93c5fd" d="M20 150V80h15v70H20zM50 150V90h20v60H50zM320 150v-50h25v50h-25zM100 150v-40h15v40h-15z" opacity="0.6" />

    {/* --- TENCENT BINHAI (Left) --- */}
    <g transform="translate(30, 40)">
      {/* South Tower */}
      <path fill="url(#skylineGrad)" d="M0 110V20h15v90H0z" />
      <rect x="2" y="22" width="11" height="86" fill="url(#glassGrad)" />
      {/* North Tower */}
      <path fill="url(#skylineGrad)" d="M25 110V10h18v100H25z" />
      <rect x="27" y="12" width="14" height="96" fill="url(#glassGrad)" />
      {/* Connecting Bridges */}
      <rect x="10" y="30" width="20" height="6" fill="#cbd5e1" />
      <rect x="10" y="60" width="20" height="6" fill="#cbd5e1" />
      <rect x="10" y="90" width="20" height="6" fill="#cbd5e1" />
    </g>

    {/* --- SPRING BAMBOO (Center Left) --- */}
    <g transform="translate(110, 30)">
      {/* Bullet Shape */}
      <path fill="url(#skylineGrad)" d="M0 120V30c0-15 10-30 15-30s15 15 15 30v90H0z" />
      {/* Glass Lines */}
      <path d="M15 0v120" stroke="#bae6fd" strokeWidth="0.5" opacity="0.5" />
      <path d="M0 30c0-10 15-20 15-20s15 10 15 20" stroke="#bae6fd" strokeWidth="0.5" opacity="0.5" fill="none" />
      <path d="M0 50c0-5 15-10 15-10s15 5 15 10" stroke="#bae6fd" strokeWidth="0.5" opacity="0.5" fill="none" />
      <path d="M0 70c0-5 15-10 15-10s15 5 15 10" stroke="#bae6fd" strokeWidth="0.5" opacity="0.5" fill="none" />
      <path d="M0 90c0-5 15-10 15-10s15 5 15 10" stroke="#bae6fd" strokeWidth="0.5" opacity="0.5" fill="none" />
    </g>

    {/* --- PING AN FINANCE CENTER (Center - Tallest) --- */}
    <g transform="translate(180, 10)">
      {/* Main Spire Body */}
      <path fill="url(#skylineGrad)" d="M10 140L15 0l5 140H10z" /> {/* Spire Tip */}
      <path fill="url(#skylineGrad)" d="M0 140h30v-90L25 20 15 10 5 20 0 50v90z" />
      {/* Structural Ribs */}
      <path d="M0 140L5 20M30 140L25 20" stroke="#cbd5e1" strokeWidth="1" />
      <rect x="12" y="20" width="6" height="120" fill="url(#glassGrad)" />
      {/* Lights */}
      <circle cx="15" cy="15" r="1" fill="#facc15" className="animate-pulse" />
    </g>

    {/* --- CIVIC CENTER (Center Right - Low) --- */}
    <g transform="translate(240, 100)">
      {/* Roof Wave */}
      <path fill="#3b82f6" d="M-20 20 Q 30 -10, 80 20 L 70 25 Q 30 5, -10 25 Z" />
      <path d="M-20 20 Q 30 -10, 80 20" stroke="#f472b6" strokeWidth="2" fill="none" opacity="0.8" />
      {/* Pillars */}
      <rect x="0" y="25" width="10" height="25" fill="#60a5fa" />
      <rect x="50" y="25" width="10" height="25" fill="#60a5fa" />
    </g>

    {/* --- WINDOW OF THE WORLD (Right) --- */}
    <g transform="translate(340, 60)">
      <path fill="none" stroke="#93c5fd" strokeWidth="2" d="M15 0 L 0 90 H 30 L 15 0 Z" />
      <path fill="none" stroke="#93c5fd" strokeWidth="1" d="M5 60 H 25 M 10 30 H 20" />
      <rect x="14" y="0" width="2" height="90" fill="#bfdbfe" opacity="0.5" />
    </g>

  </svg>
);

export const PixelLakitu = ({ className = "" }: { className?: string }) => (
  <svg width="40" height="40" viewBox="0 0 16 16" className={className} xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
    {/* Cloud */}
    <path fill="#FFFFFF" d="M2 10h12v4H2zM1 11h1v2H1zM14 11h1v2h-1zM3 9h2v1H3zM11 9h2v1h-2z" />
    <path fill="#E0E0E0" d="M3 13h10v1H3z" /> {/* Cloud Shadow */}
    
    {/* Lakitu Body (Turtle) */}
    <path fill="#FFD700" d="M6 6h4v3H6z" /> {/* Yellow Shell */}
    <path fill="#000000" d="M7 7h1v1H7zM9 7h1v1H9z" /> {/* Eyes */}
    <path fill="#FFA07A" d="M6 5h4v1H6z" /> {/* Face */}
    <path fill="#000000" d="M5 6h1v3H5zM10 6h1v3h-1z" /> {/* Shell Outline */}
    
    {/* Fishing Rod */}
    <path fill="#8B4513" d="M10 6h4v1h-4z" />
    <path fill="#C0C0C0" d="M13 7v4h1V7z" /> {/* Line */}
    <path fill="#FF0000" d="M12 11h3v2h-3z" /> {/* Bait/Mushroom */}
  </svg>
);

export const ShenzhenBayBridge = ({ className = "" }: { className?: string }) => (
  <svg width="100%" height="60" viewBox="0 0 400 60" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
    {/* Bridge Deck */}
    <path d="M0 40 Q 200 35, 400 40" stroke="#60a5fa" strokeWidth="4" fill="none" />
    <path d="M0 40 Q 200 35, 400 40" stroke="#bae6fd" strokeWidth="1" fill="none" opacity="0.8" strokeDasharray="5 5" />
    
    {/* Tower 1 */}
    <path d="M100 40 L 100 10" stroke="#93c5fd" strokeWidth="3" />
    <path d="M100 10 L 50 40 M 100 10 L 150 40" stroke="#bfdbfe" strokeWidth="0.5" opacity="0.8" />
    
    {/* Tower 2 */}
    <path d="M300 40 L 300 10" stroke="#93c5fd" strokeWidth="3" />
    <path d="M300 10 L 250 40 M 300 10 L 350 40" stroke="#bfdbfe" strokeWidth="0.5" opacity="0.8" />
  </svg>
);

export const DJIDrone = ({ className = "" }: { className?: string }) => (
  <svg width="32" height="32" viewBox="0 0 16 16" className={`${className} animate-pulse`} xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges">
    <path fill="#000" d="M7 7h2v2H7z" /> {/* Center body */}
    <path fill="#555" d="M4 4h2v1H4zM10 4h2v1h-2zM4 11h2v1H4zM10 11h2v1h-2z" /> {/* Arms */}
    <path fill="#AAA" d="M3 3h4v1H3zM9 3h4v1H9zM3 12h4v1H3zM9 12h4v1H9z" /> {/* Rotors */}
    <circle cx="8" cy="8" r="1" fill="#FF0000" className="animate-ping" />
  </svg>
);

export const Floor = () => (
  <div className="w-full h-24 bg-[#00AA00] border-t-4 border-[#006400] relative overflow-hidden">
    {/* Mario-style Checkerboard Floor */}
    <div className="absolute inset-0" style={{ 
      backgroundImage: `
        linear-gradient(45deg, #008000 25%, transparent 25%), 
        linear-gradient(-45deg, #008000 25%, transparent 25%), 
        linear-gradient(45deg, transparent 75%, #008000 75%), 
        linear-gradient(-45deg, transparent 75%, #008000 75%)
      `,
      backgroundSize: '20px 20px',
      backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
      opacity: 0.3
    }}></div>
    {/* Grass Top */}
    <div className="absolute top-0 left-0 w-full h-2 bg-[#32CD32] border-b-2 border-[#006400]"></div>
  </div>
);
