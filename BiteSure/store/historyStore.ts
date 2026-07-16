import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import {
  persist,
  createJSONStorage,
} from "zustand/middleware";

import { ScanResult } from "@/context/allergenStore";

interface HistoryState {
  scans: ScanResult[];

  addScan: (scan: ScanResult) => void;

  deleteScan: (id: string) => void;

  clearHistory: () => void;
}

export const useHistoryStore =
  create<HistoryState>()(
    persist(
      (set) => ({
        scans: [],

        addScan: (scan) =>
          set((state) => ({
            scans: [
              scan,
              ...state.scans,
            ],
          })),

        deleteScan: (id) =>
          set((state) => ({
            scans: state.scans.filter(
              (scan) => scan.id !== id
            ),
          })),

        clearHistory: () =>
          set({
            scans: [],
          }),
      }),
      {
        name: "scan-history",

        storage: createJSONStorage(
          () => AsyncStorage
        ),
      }
    )
  );