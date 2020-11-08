import create from 'zustand';

export const useStore = create((set) => ({
  currentUser: undefined,
  setUser: (user) => set(() => ({ currentUser: user })),
  resetUser: () => set(() => ({ currentUser: null })),
}));
