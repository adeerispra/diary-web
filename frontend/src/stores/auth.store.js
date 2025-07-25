import { create } from "zustand";

const initialName = localStorage.getItem("username") || "";
const useAuthStore = create((set) => ({
  username: initialName,
  setUsername: (newUsername) => {
    localStorage.setItem("username", newUsername);
    set({ username: newUsername });
  },
  clearAuth: () => {
    localStorage.removeItem("username");
    set({ username: "" });
  },
}));

export default useAuthStore;
