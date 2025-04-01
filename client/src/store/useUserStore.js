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
      },
    }),
    {
      name: 'user-storage',
    }
  )
);

export default useUserStore;

