import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AllergyState {
    selectedAllergies: string[];

    toggleAllergy: (allergy: string) => void;

    isSelected: (allergy: string) => boolean;

    clearAllergies: () => void;

    setAllergies: (allergies: string[]) => void;
}

export const useAllergyStore = create<AllergyState>()(
    persist(
        (set, get) => ({
            selectedAllergies: [],

            toggleAllergy: (allergy) => {
                const current = get().selectedAllergies;

                if (current.includes(allergy)) {
                    set({
                        selectedAllergies: current.filter(
                            (item) => item !== allergy
                        ),
                    });
                } else {
                    set({
                        selectedAllergies: [...current, allergy],
                    });
                }
            },

            isSelected: (allergy) =>
                get().selectedAllergies.includes(allergy),

            clearAllergies: () =>
                set({
                    selectedAllergies: [],
                }),

            setAllergies: (allergies) =>
                set({
                    selectedAllergies: allergies,
                }),
        }),
        {
            name: "allergy-storage",

            storage: createJSONStorage(
                () => AsyncStorage
            ),
        }
    )
);