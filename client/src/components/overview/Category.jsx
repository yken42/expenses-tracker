import React, { useEffect, useState } from 'react';
import { Progressbar } from './Progressbar';
import useTransactionStore from '../../store/useTransactionStore';

export const Category = ({ type }) => {
  const transactions = useTransactionStore((state) => state.transactions);

  // Define all possible categories and their display names
  const categoryConfig = type === 'income' ? {
    salary: 'Salary',
    freelancing: 'Freelance Income',
    investments: 'Investments',
    other: 'Other'
  } : {
    food: 'Food and Groceries',
    transportation: 'Transportation',
    utilities: 'Utilities',
    entertainment: 'Entertainment',
    other: 'Other'
  };

  // Calculate totals and categories
  const calculateCategoryTotals = () => {
    if (!Array.isArray(transactions)) return { categoryTotals: {}, totalAmount: 0 };

    // Filter transactions by type
    const filteredTransactions = transactions.filter(
      (t) => t.type === (type === 'income' ? 'income' : 'expense')
    );

    // Calculate total amount
    const totalAmount = filteredTransactions.reduce(
      (sum, t) => sum + Math.abs(t.amount), 
      0
    );

    // Initialize all categories with 0
    const categoryTotals = Object.keys(categoryConfig).reduce((acc, category) => {
      acc[category] = 0;
      return acc;
    }, {});

    // Sum up actual transactions
    filteredTransactions.forEach((t) => {
      if (categoryTotals.hasOwnProperty(t.category)) {
        categoryTotals[t.category] += Math.abs(t.amount);
      }
    });

    return { categoryTotals, totalAmount };
  };

  const { categoryTotals, totalAmount } = calculateCategoryTotals();

  return (
    <div className="p-2 w-full bg-[#F7F7F8] shadow-md rounded-lg border-1 border-gray-300">
      <h2 className="text-xl font-roboto font-medium">{type} by category</h2>
      <div className='space-y-3 mt-4'>
        {Object.entries(categoryConfig).map(([category, displayName]) => (
          <div key={category}>
            <div className="sub-cat flex justify-between mx-2">
              <h3 className="text-sm font-medium">{displayName}</h3>
              <p className="text-sm font-medium">
                ${categoryTotals[category]?.toFixed(2) || '0.00'}
              </p>
            </div>
            <Progressbar 
              percent={totalAmount ? categoryTotals[category] / totalAmount : 0} 
              type={type === 'income' ? 'income' : 'outcome'}
            />
          </div>
        ))}

        {totalAmount === 0 && (
          <div className="text-center text-gray-500 py-2 text-sm">
            No {type} transactions yet
          </div>
        )}
      </div>
    </div>
  );
};
