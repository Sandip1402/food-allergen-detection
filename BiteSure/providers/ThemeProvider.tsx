import {
    createContext,
    ReactNode,
    useContext,
    useMemo,
} from "react";
import { useColorScheme } from "react-native";

import {
    ThemeMode,
    useThemeStore,
} from "@/store/themeStore";

interface ThemeContextValue {
    theme: "light" | "dark";
    themeMode: ThemeMode;
    setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext =
    createContext<ThemeContextValue | null>(null);

interface Props {
    children: ReactNode;
}

export function ThemeProvider({
    children,
}: Props) {

    const systemTheme =
        useColorScheme() ?? "light";

    const {
        themeMode,
        setThemeMode,
    } = useThemeStore();

    const theme =
        themeMode === "system"
            ? systemTheme
            : themeMode;

    const value = useMemo(
        () => ({
            theme,
            themeMode,
            setThemeMode,
        }),
        [
            theme,
            themeMode,
            setThemeMode,
        ]
    );

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useAppTheme() {

    const context =
        useContext(ThemeContext);

    if (!context) {
        throw new Error(
            "useAppTheme must be used inside ThemeProvider"
        );
    }

    return context;
}