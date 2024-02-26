import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface UserState {
  name: string;
  picture: string;
}

type UserEvents = {
  updateUser: (params: Partial<UserState>) => void;
};

export const useUserStore = create<UserState & UserEvents>()(
  persist(
    (set) => ({
      name: "Usuario",
      picture:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp0xKoXUryp0JZ1Sxp-99eQiQcFrmA1M1qbQ&usqp=CAU",
      updateUser(params) {
        set(params);
      },
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
