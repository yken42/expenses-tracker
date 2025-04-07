import React from 'react'

export const Progressbar = ({ percent, type }) => {
  const width = `${(percent * 100).toFixed(1)}%`;
  const barColor = type === 'income' ? 'bg-[#089767]' : 'bg-[#8f0329]';

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
      <div 
        className={`h-2.5 rounded-full ${barColor} transition-all duration-500 ease-out`}
        style={{ width }}
      />
    </div>
  );
}
