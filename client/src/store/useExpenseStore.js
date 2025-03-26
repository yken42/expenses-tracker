import { create } from 'zustand';

const useExpenseStore = create((set) => ({
  expenses: [],
  addExpense: async (newExpense) => {
    try {
      // Send to your database
      const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newExpense),
      });

      if (!response.ok) {
        throw new Error('Failed to add expense');
      }

      const savedExpense = await response.json();
      
      // Update local state
      set((state) => ({
        expenses: [...state.expenses, savedExpense],
      }));

      return true;
    } catch (error) {
      console.error('Error adding expense:', error);
      return false;
    }
  },
}));

export default useExpenseStore; 