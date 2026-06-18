import React from 'react';

interface MomentumRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
}

const MomentumRing: React.FC<MomentumRingProps> = ({ 
  percentage, 
  size = 44, 
  strokeWidth = 4 
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (Math.min(percentage, 100) / 100) * circumference;
  const isHigh = percentage >= 75;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          className="text-slate-800"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress circle */}
        <circle
          className={`transition-all duration-500 ease-out ${isHigh ? 'text-amber-400 momentum-glow' : 'text-indigo-500'}`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <span className={`absolute text-[10px] font-bold tracking-tighter ${isHigh ? 'text-amber-400' : 'text-indigo-400'}`}>
        {Math.round(percentage)}%
      </span>
    </div>
  );
};

export default MomentumRing;