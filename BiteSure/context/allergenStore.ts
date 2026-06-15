import { create } from "zustand";

export interface Allergen {
  id: string;
  name: string;
  severity: "low" | "medium" | "high";
  description: string;
}

export interface ScanResult {
  id: string;
  imageUri: string;
  detectedAllergens: Allergen[];
  confidence: number;
  timestamp: string;
  productName?: string;
  notes?: string;
}

export interface UserPreferences {
  allergies: Allergen[];
  notificationsEnabled: boolean;
  darkMode: boolean;
}

interface AllergenStore {
  // User data
  userPreferences: UserPreferences;
  setUserPreferences: (prefs: UserPreferences) => void;
  updateUserAllergies: (allergies: Allergen[]) => void;

  // Scan history
  scanHistory: ScanResult[];
  addScanResult: (result: ScanResult) => void;
  removeScanResult: (id: string) => void;
  clearHistory: () => void;

  // Current scan
  currentScan: ScanResult | null;
  setCurrentScan: (scan: ScanResult | null) => void;

  // UI state
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

export const useAllergenStore = create<AllergenStore>((set) => ({
  // Initial user preferences
  userPreferences: {
    allergies: [],
    notificationsEnabled: true,
    darkMode: false,
  },

  setUserPreferences: (prefs) => set({ userPreferences: prefs }),

  updateUserAllergies: (allergies) =>
    set((state) => ({
      userPreferences: { ...state.userPreferences, allergies },
    })),

  // Scan history
  scanHistory: [],

  addScanResult: (result) =>
    set((state) => ({
      scanHistory: [result, ...state.scanHistory],
    })),

  removeScanResult: (id) =>
    set((state) => ({
      scanHistory: state.scanHistory.filter((item) => item.id !== id),
    })),

  clearHistory: () => set({ scanHistory: [] }),

  // Current scan
  currentScan: null,
  setCurrentScan: (scan) => set({ currentScan: scan }),

  // UI state
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),

  error: null,
  setError: (error) => set({ error }),
}));
