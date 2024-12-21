import OpenAI from "openai";
import express from "express";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

// JSON Schema for a Single Recipe
const singleRecipeSchema = {
  type: "object",
  properties: {
    title: { type: "string", description: "The title of the recipe" },
    ingredients: {
      type: "array",
      description: "List of ingredients with item names and quantities",
      items: {
        type: "object",
        properties: {
          item: { type: "string", description: "Ingredient name" },
          quantity: {
            type: "string",
            description: "Quantity of the ingredient",
          },
        },
        required: ["item", "quantity"],
      },
    },
    instructions: {
      type: "array",
      description: "Step-by-step instructions for the recipe",
      items: { type: "string" },
    },
    estimatedCookingTime: {
      type: "integer",
      description: "Cooking time in minutes",
    },
    servings: { type: "integer", description: "Number of servings" },
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

// JSON Schema for Multiple Recipes (Encapsulated in an Object)
const multipleRecipesSchema = {
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

// Route to Get Recipes
app.post("/getRecipes", async (req, res) => {
  const devKey = req.headers.devKey;

  if (devKey !== process.env.SECRET_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const query = req.query.recipeQuery;
  const numberOfRecipes = parseInt(req.query.numberOfRecipes) || 5; // Default to 5 recipes

  if (!query) {
    return res
      .status(400)
      .json({ error: "Query parameter 'recipeQuery' is required" });
  }

  try {
    // Request recipe generation with structured JSON schema
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a recipe generator." },
        {
          role: "user",
          content: `Generate ${numberOfRecipes} recipes for "${query}" strictly following the given schema.`,
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "multiple_recipes_schema",
          schema: multipleRecipesSchema,
        },
      },
    });

    // Parse and Return the Structured Recipe Response
    const recipes = JSON.parse(completion.choices[0].message.content);
    res.json(recipes);
  } catch (error) {
    console.error(
      "Error fetching recipes:",
      error.response?.data || error.message
    );
    res.status(500).json({
      error: "Failed to fetch recipes. Please try again later.",
      details: error.response?.data || error.message,
    });
  }
});

// Start the Server
app.listen(port, () => {
  console.log(`Recipe server running at http://localhost:${port}`);
});
