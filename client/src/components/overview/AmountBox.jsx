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

  return (
    <div className={`rounded-lg p-4 ${getBoxStyle()}`}>
      <h2 className="text-xl font-semibold mb-2">{getTitle()}</h2>
      <p className="text-2xl font-bold">
        {formatAmount(getAmount())}
      </p>
    </div>
  );
}
