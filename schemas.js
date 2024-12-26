export const singleRecipeSchema = {
  type: "object",
  properties: {
    title: {
      type: "string",
      description: "The title of the recipe",
    },
    ingredients: {
      type: "array",
      description:
        "List of ingredients with item names, amounts, and units, cloves or loafs, butter, plants, yogurts, seasonings (salt, pepper etc), cheese or powders must be preferrably in grams or kilograms or milligrams and other times in pieces, teaspoons, tablespoons, cups, liters and milliliters, drops are reserved for liquids",
      items: {
        type: "object",
        properties: {
          item: {
            type: "string",
            description: "Ingredient name",
          },
          amount: {
            type: "number",
            description:
              "The numerical amount of the ingredient (e.g., 2, 1.5)",
          },
          unit: {
            type: "string",
            description:
              "The unit of measurement for the ingredient. Whole pieces only should be measured in pieces, like Chicken or Sheep etc",
            enum: [
              "grams",
              "kilograms",
              "liters",
              "milliliters",
              "cups",
              "tablespoons_solids_plants_powders",
              "teaspoons_solids_plants_powders",
              "tablespoons",
              "teaspoons",
              "drops",
              "pieces",
            ],
          },
        },
        required: ["item", "amount", "unit"],
      },
    },
    instructions: {
      type: "array",
      description: "Step-by-step instructions for the recipe",
      items: {
        type: "string",
      },
    },
    estimatedCookingTime: {
      type: "integer",
      description: "Cooking time in minutes",
    },
    servings: {
      type: "integer",
      description: "Number of servings",
    },
  },
  required: [
    "title",
    "ingredients",
    "instructions",
    "estimatedCookingTime",
    "servings",
  ],
  additionalProperties: false,
};

export const multipleRecipesSchema = {
  type: "object",
  description: "An object containing an array of recipes",
  properties: {
    recipes: {
      type: "array",
      description: "An array of recipe objects",
      items: singleRecipeSchema,
    },
  },
  required: ["recipes"],
  additionalProperties: false,
};

export const randomQuoteSchema = {
  type: "object",
  properties: {
    quote: {
      type: "string",
      description: "A random quote about cooking",
    },
  },
  required: ["quote"],
  additionalProperties: false,
};
