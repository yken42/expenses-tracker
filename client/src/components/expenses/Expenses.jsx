import React from 'react';
import useTransactionStore from '../../store/useTransactionStore';
import { format } from 'date-fns'; // Install with: npm install date-fns

export const TransactionTable = () => {
  const transactions = useTransactionStore((state) => state.transactions);

  const formatAmount = (amount, type) => {
    const formattedAmount = Math.abs(amount).toFixed(2);
    return (
      <span className={`font-medium ${type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
        {type === 'income' ? '+' : '-'}${formattedAmount}
      </span>
    );
  };

  const getCategoryBadge = (category, type) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    const colorClasses = type === 'income' 
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";

    return (
      <span className={`${baseClasses} ${colorClasses}`}>
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.length > 0 ? (
              transactions.map((transaction, index) => (
                <tr 
                  key={index}
                  className="hover:bg-gray-50 transition-colors duration-150 ease-in-out"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(transaction.createdAt), 'MMM dd, yyyy')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {transaction.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getCategoryBadge(transaction.category, transaction.type)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {formatAmount(transaction.amount, transaction.type)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      transaction.type === 'income' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Optional Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing {transactions.length} transactions
        </div>
        {/* <div className="flex space-x-2">
          <button className="px-4 py-2 border rounded-md hover:bg-gray-50">
            Previous
          </button>
          <button className="px-4 py-2 border rounded-md hover:bg-gray-50">
            Next
          </button>
        </div> */}
      </div>
    </div>
  );
};