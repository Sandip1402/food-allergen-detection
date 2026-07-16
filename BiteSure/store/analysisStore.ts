import { create } from "zustand";

export interface AnalysisResult {
  status: "safe" | "warning" | "danger";

  foodName: string;

  allergens: string[];

  confidence: number;

  ingredients: string[];
}

export interface analysisStore {
  imageUri: string | null;

  mode: "food" | "ingredient";

  setMode: (mode: "food" | "ingredient") => void;

  result: AnalysisResult | null;

  isProcessing: boolean;

  setImage: (uri: string | null) => void;

  setProcessing: (value: boolean) => void;

  setResult: (result: AnalysisResult | null) => void;

  clear: () => void;
}

export const useAnalysisStore = create<analysisStore>((set) => ({
  imageUri: null,

  mode: "food",

  result: null,

  isProcessing: false,

  setImage: (uri) =>
    set({
      imageUri: uri,
    }),

  setMode: (mode) =>
    set({
      mode,
    }),

  setProcessing: (value) =>
    set({
      isProcessing: value,
    }),

  setResult: (result) =>
    set({
      result,
    }),

  clear: () =>
    set({
      imageUri: null,
      mode: "food",
      result: null,
      isProcessing: false,
    }),
}));