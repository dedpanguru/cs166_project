import create from "zustand";

const useStore = create((set) => ({
  username: "",
  setUsername: (username) => set({ username }),
  password: "",
  setPassword: (password) => set({ password }),
  token: "",
  setToken: (token) => set({ token }),
}));

export default useStore;
