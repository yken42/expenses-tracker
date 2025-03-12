import React from 'react'
import { WelcomeCard } from './WelcomeCard';
import { AmountBox } from './AmountBox';
import { Category } from './Category';
import { History } from './History';


export const Overview = () => {


  return (
    <div className="bg-[#F7F7F8] w-full">
      <div className="m-4">
        <h1 className="text-5xl font-bold tracking-wide font-dm ">
          {" "}
          Hello, Yair <span>&#128075;</span>
        </h1>
        <hr className="mt-4 opacity-25" />
      </div>
      <WelcomeCard />
      <div className='mx-4 grid grid-cols-3 gap-4'>
        <AmountBox type={"income"} amount={"4,500"}/>
        <AmountBox type={"outcome"} amount={"-3,500"}/>
        <AmountBox type={"total"} amount={"1,000"}/>
      </div>
      <div className='mt-2 categories mx-4 grid grid-cols-2 gap-4'>
        <Category type={"income"} />
        <Category type={"expense"} />
      </div>
      <div className='history mt-2 mx-4'>
        <History />
      </div>
    </div>
  );
}
