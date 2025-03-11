import React from 'react'

export const CategoryCard = ({ icon: Icon, category, amount }) => {

  return (
    <div className='border-2 border-[#F2F2F2] w-1/5 rounded-lg shadow-md h-24'>
        <div className='title flex items-center font-bold text-xl'>
            <Icon className="mr-2"/>
            <h1>{category}</h1>
        </div>
            <h3 className='font-bold'>${amount % 10 === 0 ? `${amount}.0` : `${amount}`}</h3>
    </div>
  )
}
