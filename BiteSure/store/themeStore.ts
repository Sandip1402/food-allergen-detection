import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type ThemeMode = "light" | "dark" | "system";

interface ThemeState {
    themeMode: ThemeMode;

    setThemeMode: (mode: ThemeMode) => void;

    resetTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set) => ({
            themeMode: "system",

            setThemeMode: (mode) =>
                set({
                    themeMode: mode,
                }),

            resetTheme: () =>
                set({
                    themeMode: "system",
                }),
        }),
        {
            name: "theme-storage",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);