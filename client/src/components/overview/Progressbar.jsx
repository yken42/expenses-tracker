import React from 'react'

export const Progressbar = ({ percent, type }) => {
    
    const barColor = type === "income" ? "bg-green-600" : "bg-red-600";

  return (
    <div className="bg-gray-300 h-4 rounded-full mx-2 mb-2">
      <div
        className={`${barColor} rounded-full text-xs flex justify-center items-center text-white`}
        style={{ width: `${Math.round(percent * 100)}%` }}
      >
        {Math.round(percent * 100)}%
      </div>
    </div>
  );
}
