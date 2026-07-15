export function normalizeAllergen(
    allergen: string
) {
    return allergen
        .toLowerCase()
        .trim()
        .replace(/s$/, "");
}


export function matchUserAllergies(
    detectedAllergens: string[],
    userAllergies: string[]
) {

    const normalizedUserAllergies =
        userAllergies.map(normalizeAllergen);


    const matches =
        detectedAllergens.filter(
            (allergen) =>
                normalizedUserAllergies.includes(
                    normalizeAllergen(allergen)
                )
        );


    const others =
        detectedAllergens.filter(
            (allergen) =>
                !normalizedUserAllergies.includes(
                    normalizeAllergen(allergen)
                )
        );


    return {
        hasMatch: matches.length > 0,

        matches,

        others,
    };
}