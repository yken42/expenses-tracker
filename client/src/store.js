import create from 'zustand';

const useStore = create((set) => ({
  user: {
    name: '',
    isAuthenticated: false,
  },
  setUser: (user) => set(() => ({ user: { ...user, isAuthenticated: true } })),
  logout: () => set(() => ({ user: { name: '', isAuthenticated: false } })),
}));

export default useStore;