import React from 'react'
import increaseIcon from '../../../src/images/increase.png';
import decreaseIcon from '../../../src/images/decrease.png';
import totalIcon from '../../../src/images/cash.png';

const iconMap = {
    income: increaseIcon,
    outcome: decreaseIcon,
    total: totalIcon
}

export const AmountBox = ({ type, amount }) => {
    
  return (
    <div className="w-full bg-[#F7F7F8] shadow-md rounded-lg border-1 border-gray-300">
      <div className="content flex items-center m-2">
        <div className="graph">
            <img src={iconMap[type]} alt={type} className='w-16 h-16'/>
        </div>
        <div className="pl-4">
          <h3 className="text-gray-700 text-md">{type}</h3>
          <p className="text-xl">{amount}$</p>
        </div>
      </div>
    </div>
  );
}
