export function normalizeAllergen(
    allergen: string
) {
    return allergen
        .toLowerCase()
        .trim()
        .replace(/s$/, "");
}

type DetectedAllergen = {
    id: string;
    name: string;
    severity: string;
    description: string;
};

export function matchUserAllergies(
    detectedAllergens: DetectedAllergen[],
    userAllergies: string[]
) {

    const normalizedUserAllergies =
        userAllergies.map(normalizeAllergen);


    const matches =
        detectedAllergens.filter(
            (allergen) =>
                normalizedUserAllergies.includes(
                    normalizeAllergen(allergen.name)
                )
        );


    const others =
        detectedAllergens.filter(
            (allergen) =>
                !normalizedUserAllergies.includes(
                    normalizeAllergen(allergen.name)
                )
        );


    return {
        hasMatch: matches.length > 0,

        matches,

        others,
    };
}