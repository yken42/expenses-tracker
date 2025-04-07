import React, { useEffect } from 'react'
import { WelcomeCard } from './WelcomeCard';
import { AmountBox } from './AmountBox';
import { Category } from './Category';
import { TransactionTable } from '../expenses/Expenses';
import useUserStore from '../../store/useUserStore';
import useTransactionStore from '../../store/useTransactionStore';


export const Overview = () => {  
  const user = useUserStore((state) => state.user);
  const getAllExpenses = useTransactionStore((state) => state.getAllExpenses);
  const transactions = useTransactionStore((state) => state.transactions);
  
  useEffect(() => {
    const userId = user.id;
    console.log(user)
    getAllExpenses(userId);
  }, [user]);
  useEffect(() => {
    console.log('Current expenses:', transactions);
  }, [transactions]);

  return (
    <div className="bg-[#F7F7F8] w-full">
      <div className="m-4">
        <h1 className="text-5xl font-bold tracking-wide font-dm">
          Hello, {user.name} <span>&#128075;</span>
        </h1>
        <hr className="mt-4 opacity-25" />
      </div>
      <WelcomeCard />
      <div className='mx-4 grid grid-cols-3 gap-4'>
        <AmountBox type="income" />
        <AmountBox type="outcome" />
        <AmountBox type="total" />
      </div>
      <div className='mt-2 categories mx-4 grid grid-cols-2 gap-4'>
        <Category type={"income"} />
        <Category type={"expense"} />
      </div>
      <div className='mx-4'>
        <TransactionTable />
      </div>
    </div>
  );
}
