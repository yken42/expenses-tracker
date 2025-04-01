import React, { useState } from 'react'
import { FaCirclePlus } from "react-icons/fa6";
import { FaMinusCircle } from "react-icons/fa";
import ExpenseModal from '../modal/ExpenseModal';

export const WelcomeCard = () => {
  const [open, setOpen] = useState(false);
  const [isIncome, setIsIncome] = useState(false);

  const handleOpenIncomeModal = () => {
    setIsIncome(true);
    setOpen(true);
  };

  const handleOpenExpenseModal = () => {
    setIsIncome(false);
    setOpen(true);
  };

  return (
    <div className="m-4">
      <div className='flex justify-between'>
        <h1 className="text-black font-medium text-4xl flex items-center justify-center ">
          Overview
        </h1>
        <div className='add-expense flex text-white w-1/3 text-lg'>
            <div 
              className='new-income bg-[#089767] border-1 border-[#00ffaa] rounded-lg flex justify-center items-center mx-2 w-1/2 hover:cursor-pointer p-2 text-center'
              onClick={handleOpenIncomeModal}
            >
                <h3 className='mx-2'>New Income</h3>
                <FaCirclePlus className='text-4xl'/>
            </div>
            <div 
              className='new-expense bg-[#8f0329] border-1 border-[#fe1050] rounded-lg flex justify-center items-center mx-2 w-1/2 hover:cursor-pointer p-2 text-center'
              onClick={handleOpenExpenseModal}
            >
                <h3 className='mx-2'>New Expense</h3>
                <FaMinusCircle className='text-4xl'/>   
            </div>
        </div>
      </div>
      <ExpenseModal 
        open={open} 
        setOpen={setOpen} 
        isIncome={isIncome}
      />
    </div>
  );
}
