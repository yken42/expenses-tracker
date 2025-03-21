import { create } from 'zustand';
import axios from 'axios';

const useStore = create((set) => ({
  user: {
    name: '',
    isAuthenticated: false,
  },
  setUser: (user) => set(() => ({ user: { ...user, isAuthenticated: true } })),
  logout: async () => {
    try {
      // Make the API call to logout
      await axios.post('http://localhost:3000/api/users/logout', {}, { 
        withCredentials: true 
      });
      
      // Reset the store state
      set(() => ({ 
        user: { 
          name: '', 
          isAuthenticated: false 
        } 
      }));

      return { success: true };
    } catch (error) {
      console.error('Logout failed:', error);
      // Still reset the state even if API call fails
      set(() => ({ 
        user: { 
          name: '', 
          isAuthenticated: false 
        } 
      }));
      return { success: false, error };
    }
  },
}));

export default useStore;