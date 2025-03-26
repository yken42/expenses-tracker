import { create } from 'zustand';

const useIncomeStore = create((set) => ({
  incomes: [],
  addIncome: async (newIncome) => {
    try {
      const response = await fetch('/api/incomes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newIncome),
      });

      if (!response.ok) {
        throw new Error('Failed to add income');
      }     

      const savedIncome = await response.json();

      set((state) => ({
        incomes: [...state.incomes, savedIncome],
      }));      

      return true;
    } catch (error) {
      console.error('Error adding income:', error);
      return false;
    }
  }
}));

export default useIncomeStore;