import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ variant = 'light', size = 'md' }) => {
  const isDark = variant === 'dark';

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-14 h-14',
  };

  const titleSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <div className="flex items-center gap-3 select-none">
      {/* Brand Icon: Golden Heart embraced by Navy Arms with 4-square cross inside */}
      <div 
        className={`relative ${iconSizes[size]} rounded-full ${
          isDark 
            ? 'bg-gradient-to-br from-white/10 to-white/5 border border-white/20' 
            : 'bg-gradient-to-br from-[#0e223d] to-[#16365c]'
        } flex items-center justify-center shadow-md shrink-0`}
      >
        {/* Heart shape */}
        <svg 
          className="w-[58%] h-[58%] text-amber-400" 
          viewBox="0 0 24 24" 
          fill="currentColor"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>

        {/* 4-pane cross/window in center */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-2.5 h-2.5 bg-white rounded-[1px] grid grid-cols-2 gap-[1px] p-[1.5px] shadow-xs">
            <div className="bg-[#0e223d]"></div>
            <div className="bg-[#0e223d]"></div>
            <div className="bg-[#0e223d]"></div>
            <div className="bg-[#0e223d]"></div>
          </div>
        </div>
      </div>

      {/* Typography */}
      <div className="flex flex-col leading-tight">
        <div className="flex items-baseline gap-1">
          <span className={`${titleSizes[size]} font-extrabold ${isDark ? 'text-white' : 'text-[#0e223d]'} tracking-tight`}>
            Chichi<span className="text-amber-500">Tlc</span>
          </span>
          <span className={`text-xs font-bold ${isDark ? 'text-slate-300' : 'text-[#0e223d]'}`}>Ltd</span>
        </div>
        <span className={`text-[10px] sm:text-xs font-bold tracking-wide ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          Care Staffing Solutions
        </span>
        <span className={`text-[8px] sm:text-[9px] font-semibold tracking-wider uppercase ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
          Right People • When You Need Them
        </span>
      </div>
    </div>
  );
};
