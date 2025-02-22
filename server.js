import OpenAI from "openai";
import express from "express";
import dotenv from "dotenv";
import { multipleRecipesSchema, randomQuoteSchema } from "./schemas.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

// Route to Get Recipes
app.get("/getRecipes", async (req, res) => {
  const query = req.query.recipeQuery;
  const numberOfRecipes = parseInt(req.query.numberOfRecipes) || 5; // Default to 5 recipes

  if (!query) {
    return res
      .status(400)
      .json({ error: "Query parameter 'recipeQuery' is required" });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o", // your specialized GPT-4 model
      messages: [
        { role: "system", content: "You are a recipe generator." },
        {
          role: "user",
          content: `Generate ${numberOfRecipes} recipes for "${query}" strictly following the given schema. All ingredient names must be lowercase.`,
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

    const messageContent = completion.choices[0].message.content;

    const parsedJson = JSON.parse(messageContent);

    res.json(parsedJson);
  } catch (error) {
    console.error("ERROR:", error.response?.data || error.message);
    res.status(500).json({ error: "Something went wrong." });
  }
});

app.get("/randomQuote", async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a renown chef and philosopher." },
        {
          role: "user",
          content: `Generate a random quote about cooking strictly following the given schema.`,
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "random_quote_schema",
          schema: randomQuoteSchema,
        },
      },
    });

    const quote = JSON.parse(completion.choices[0].message.content);
    res.json(quote);
  } catch (error) {
    console.error(
      "Error fetching random quote:",
      error.response?.data || error.message
    );
    res.status(500).json({
      error: "Failed to fetch random quote. Please try again later.",
      details: error.response?.data || error.message,
    });
  }
});

// Start the Server
app.listen(port, () => {
  console.log(`Recipes Provider server running at port:${port}`);
});
