import React from 'react'
import { CategoryCard } from './CategoryCard'
import { CiForkAndKnife } from "react-icons/ci";


export const CategorySection = () => {
  return (
    <div>
        <CategoryCard icon={CiForkAndKnife} category={"Food & Drinks"} amount={20}/>
    </div>
  )
}
