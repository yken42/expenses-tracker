import { create } from 'zustand';

const useTransactionStore = create((set, get) => ({
  transactions: [],
  
  addTransaction: async (transaction) => {
    try {
      const response = await fetch(`http://localhost:3000/api/expenses/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transaction),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to add transaction');
      }

      const savedTransaction = await response.json();
      
      set((state) => ({
        transactions: Array.isArray(state.transactions) 
          ? [...state.transactions, savedTransaction.newExpense]
          : [savedTransaction.newExpense]
      }));

      return true;
    } catch (error) {
      console.error('Error adding transaction:', error);
      return false;
    }
  },

  getAllExpenses: async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/expenses/user/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch expenses');
      }
      
      const data = await response.json();
      console.log("RESPONSE _>>>>>>>", data)
      
      set({ transactions: Array.isArray(data.data) ? data.data : [] });
      
      return data;
    } catch (error) {
      console.error('Error fetching expenses:', error);
      set({ transactions: [] });
      return [];
    }
  },

  // Calculate total income
  getTotalIncome: () => {
    const transactions = get().transactions;
    if (!Array.isArray(transactions)) return 0;
    
    return transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((total, transaction) => total + transaction.amount, 0);
  },

  // Calculate total expenses
  getTotalExpenses: () => {
    const transactions = get().transactions;
    if (!Array.isArray(transactions)) return 0;
    
    return transactions
      .filter(transaction => transaction.type === 'expense')
      .reduce((total, transaction) => total + Math.abs(transaction.amount), 0);
  },

  // Calculate net total (income - expenses)
  getNetTotal: () => {
    const totalIncome = get().getTotalIncome();
    const totalExpenses = get().getTotalExpenses();
    return totalIncome - totalExpenses;
  },

  // Optional: Add a clear function
  clearTransactions: () => set({ transactions: [] }),
}));

export default useTransactionStore;