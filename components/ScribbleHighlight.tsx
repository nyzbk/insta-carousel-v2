
import React from 'react';

interface ScribbleHighlightProps {
  children: React.ReactNode;
  className?: string;
  colorClass?: string;
}

export const ScribbleHighlight: React.FC<ScribbleHighlightProps> = ({ children, className = '', colorClass = 'text-orange-500' }) => {
  return (
    <div className={`relative inline-block ${className}`}>
      <svg
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[150%] ${colorClass}`}
        viewBox="0 0 160 50"
        fill="currentColor"
        xmlns="http://www.w.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path d="M3.482,23.411c2.836-1.213,11.246-4.63,22.759-6.043c12.24-1.504,27.136,0.301,42.246,0.803 c16.946,0.561,33.393-0.28,47.88-3.01c10.453-1.97,20.24-5.018,28.601-5.918c3.48-0.37,5.56,2.27,5.49,4.45 c-0.12,3.87-4.14,7.45-8.22,9.39c-11.44,5.43-26.63,8.44-42.27,8.81c-17.38,0.41-34.58-1.5-50.62-4.01 c-13.88-2.17-26.75-5.32-38.33-9.52C4.122,33.511,1.157,30.361,1.042,27.3C0.926,24.239,1.758,24.111,3.482,23.411z" />
      </svg>
      <span className="relative z-10">{children}</span>
    </div>
  );
};
