import React from 'react'
import increaseIcon from '../../../src/images/increase.png';
import decreaseIcon from '../../../src/images/decrease.png';
import totalIcon from '../../../src/images/cash.png';
import useTransactionStore from '../../store/useTransactionStore';

const iconMap = {
    income: increaseIcon,
    outcome: decreaseIcon,
    total: totalIcon
}

export const AmountBox = ({ type }) => {
  const getTotalIncome = useTransactionStore((state) => state.getTotalIncome);
  const getTotalExpenses = useTransactionStore((state) => state.getTotalExpenses);
  const getNetTotal = useTransactionStore((state) => state.getNetTotal);

  const getAmount = () => {
    switch (type) {
      case 'income':
        return getTotalIncome();
      case 'outcome':
        return getTotalExpenses();
      case 'total':
        return getNetTotal();
      default:
        return 0;
    }
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getBoxStyle = () => {
    switch (type) {
      case 'income':
        return 'bg-[#089767] text-white';
      case 'outcome':
        return 'bg-[#8f0329] text-white';
      case 'total':
        return 'bg-[#1a1a1a] text-white';
      default:
        return '';
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'income':
        return 'Total Income';
      case 'outcome':
        return 'Total Expenses';
      case 'total':
        return 'Net Balance';
      default:
        return '';
    }
  };

  const getComparisonText = () => {
    const amount = getAmount();
    const total = getAmount();
    const comparison = total - amount;
    if (comparison > 0) {
      return `+${formatAmount(comparison)}`;
    } else if (comparison < 0) {
      return formatAmount(comparison);
    } else {
      return 'No change';
    }
  };

  return (
    <div className={`
      rounded-xl p-6 transition-all duration-200
      ${type === 'income' 
        ? 'bg-green-50 border-green-100' 
        : type === 'outcome' 
          ? 'bg-red-50 border-red-100'
          : 'bg-white border-gray-100'
      }
      border hover:shadow-md
    `}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-600 font-medium">
          {type === 'income' 
            ? 'Total Income' 
            : type === 'outcome' 
              ? 'Total Expenses' 
              : 'Net Balance'
          }
        </h3>
        <span className={`
          text-2xl
          ${type === 'income' 
            ? 'text-green-600' 
            : type === 'outcome' 
              ? 'text-red-600' 
              : 'text-gray-900'
          }
        `}>
          {formatAmount(getAmount())}
        </span>
      </div>
      <div className="flex items-center text-sm">
        <span className={`
          ${type === 'income' 
            ? 'text-green-600' 
            : type === 'outcome' 
              ? 'text-red-600' 
              : 'text-gray-600'
          }
        `}>
          {getComparisonText()}
        </span>
      </div>
    </div>
  );
}
