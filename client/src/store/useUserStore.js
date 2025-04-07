import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      user: { name: "Guest", id: null},
      setUser: (user) => set({ user }),
      logout: () => {
        localStorage.removeItem('token');
        set({ user: { name: "Guest" } });
        document.cookie = "isAuth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        return { success: true };
      },
    }),
    {
      name: 'user-storage',
    }
  )
);

export default useUserStore;

