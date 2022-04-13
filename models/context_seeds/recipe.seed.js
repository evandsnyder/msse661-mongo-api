import Recipe from "../recipe.model";

export const seed_db = () => {
    let recipes = [
        new Recipe({
            name: "Vanilla Cream Ale",
            grains: ["American Pale 2-Row", "America Pale 6-Row", "America White Wheat", "Flaked Corn", "American Caramel/Crystal 20L", "American Carapils(Dextrine Malt)", "Flaked Barley", "Honey"],
            hops: ["Cascade (60m Boil)", "Cascade (20m Boil)", "Czech Saaz (5m Boil)"],
            yeast: "Wyeast - Kölsch 2565",
            process: "Mash at 150F for 75mins, bring to boil for 60. Produces 5 Gallons",
        }),
        new Recipe({
            name: "Mango Habanero IPA",
            grains: ["American Pale 2-Row", "American Carame/Crystal 20L", "Flaked Wheat", "Rolled Oats"],
            hops: ["Magnum (60m Boil)","Centennial (30m Boil)","Centennial (10m Boil)","Citra (1m Boil)","Zythos (1m Boil)","Centennial (0d Dry Hop)","Citra (0d Dry Hop)","Zythos (0d Dry Hop)"],
            yeast: "White Labs - California Ale Yeast WLP001",
            process: "Strike water to 160F. Mash at 150F 60m. Sparge at 170F for 15m. Target 9.5% ABV"
        }),
        new Recipe({
            name: "Mango Habanero IPA Clone 1",
            grains: ["American Pale 2-Row", "American Carame/Crystal 20L", "Flaked Wheat", "Rolled Oats"],
            hops: ["Magnum (60m Boil)","Centennial (30m Boil)","Centennial (10m Boil)","Citra (1m Boil)","Zythos (1m Boil)","Centennial (0d Dry Hop)","Citra (0d Dry Hop)","Zythos (0d Dry Hop)"],
            yeast: "Safale US-04",
            process: "Strike water to 160F. Mash at 150F 60m. Sparge at 170F for 15m. Target 9.5% ABV"
        }),
        new Recipe({
            name: "Vanilla Cream Ale Clone 1",
            grains: ["American Pale 2-Row", "America Pale 6-Row", "America White Wheat", "Flaked Corn", "American Caramel/Crystal 20L", "American Carapils(Dextrine Malt)", "Flaked Barley", "Honey"],
            hops: ["Cascade (60m Boil)", "Cascade (20m Boil)", "Czech Saaz (5m Boil)"],
            yeast: "Voss Kveik",
            process: "Mash at 150F for 75mins, bring to boil for 60. Produces 5 Gallons"
        })
    ]
}