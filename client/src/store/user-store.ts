import { create } from "zustand";
import { UserType } from "../interfaces";
const userGlobelStore = create((set) => ({
    currentUser : null,
    setCurrentUser: (user: UserType) => set({ currentUser: user }),
}));

export default userGlobelStore;

export interface UsersStoreType{
    currentUser: UserType | null,
    setCurrentUser: (user: UserType) => void;
}