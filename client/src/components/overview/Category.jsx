import React from 'react'
import { Progressbar } from './Progressbar';


export const Category = ({ type, source, amount, total }) => {
  return (
    <div className="p-2 w-full bg-[#F7F7F8] shadow-md rounded-lg border-1 border-gray-300">
      <h2 className="text-xl font-roboto font-medium">{type} by category</h2>
      {type === "income" ? (
        <div className=''>
          <div className="sub-cat flex justify-between mx-2">
            <h3>Salary</h3>
            <p>2,700$</p>
          </div>
          <Progressbar percent={2700/4500} type={"income"}/>
          <div className="sub-cat flex justify-between mx-2">
            <h3>Freelance income</h3>
            <p>1300$</p>
          </div>
          <Progressbar percent={1300/4500} type={"income"}/>

          <div className="sub-cat flex justify-between mx-2">
            <h3>Investments</h3>
            <p>500$</p>
          </div>
          <Progressbar percent={500/4500} type={"income"}/>

        </div>
        
      ) : (
        <div className=''>
          <div className="sub-cat flex justify-between mx-2">
            <h3>Housing</h3>
            <p>1,100$</p>
          </div>
          <Progressbar percent={1100/3500} type={"outcome"}/>


          <div className="sub-cat flex justify-between mx-2">
            <h3>Healthcare</h3>
            <p>305$</p>
          </div>
          <Progressbar percent={305/3500} type={"outcome"}/>

          <div className="sub-cat flex justify-between mx-2">
            <h3>Food and groceries</h3>
            <p>480$</p>
          </div>
          <Progressbar percent={480/3500} type={"outcome"}/>

          <div className="sub-cat flex justify-between mx-2">
            <h3>Transportaion</h3>
            <p>200$</p>
          </div>
          <Progressbar percent={200/3500} type={"outcome"}/>

          <div className="sub-cat flex justify-between mx-2">
            <h3>Entertainments</h3>
            <p>660$</p>
          </div>
          <Progressbar percent={660/3500} type={"outcome"}/>

        </div>
      )}
    </div>
  );
}
