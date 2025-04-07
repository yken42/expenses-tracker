import { create } from 'zustand';

const useTransactionStore = create((set, get) => ({
  transactions: [],
  
  addTransaction: async (transaction) => {
    try {
      console.log('Sending transaction to backend:', transaction); // Debug log

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
      console.log('Received from backend:', savedTransaction); // Debug log

      set((state) => ({
        transactions: [...state.transactions, {
          ...savedTransaction.newExpense,
          name: transaction.name, // Explicitly include name
        }]
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

  // Fetch all transactions
  fetchTransactions: async () => {
    try {
      const response = await fetch('http://localhost:3000/api/expenses', {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }

      const data = await response.json();
      set({ transactions: data });
    } catch (error) {
      console.error('Error fetching transactions:', error);
      set({ transactions: [] });
    }
  },

  // Add updateTransaction function
  updateTransaction: async (updatedTransaction) => {
    try {
      const response = await fetch(`http://localhost:3000/api/expenses/${updatedTransaction._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...updatedTransaction,
          // Ensure amount sign matches type
          amount: updatedTransaction.type === 'expense' 
            ? -Math.abs(updatedTransaction.amount)
            : Math.abs(updatedTransaction.amount)
        }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to update transaction');
      }

      const updated = await response.json();

      // Update the transaction in the local state
      set((state) => ({
        transactions: state.transactions.map((t) => 
          t._id === updatedTransaction._id ? updated : t
        ),
      }));

      return true;
    } catch (error) {
      console.error('Error updating transaction:', error);
      return false;
    }
  },
}));

export default useTransactionStore;