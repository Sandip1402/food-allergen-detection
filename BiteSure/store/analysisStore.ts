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

  result: AnalysisResult | null;

  isProcessing: boolean;

  setImage: (uri: string | null) => void;

  setProcessing: (value: boolean) => void;

  setResult: (result: AnalysisResult | null) => void;

  clear: () => void;
}

export const useAnalysisStore = create<analysisStore>((set) => ({
  imageUri: null,

  result: null,

  isProcessing: false,

  setImage: (uri) =>
    set({
      imageUri: uri,
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
      result: null,
      isProcessing: false,
    }),
}));