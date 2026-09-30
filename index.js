import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
app.set("view engine", "ejs");

// Serve static files from the public folder.
app.use(express.static("public"));

// Fetch a random cocktail and render the homepage.
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://www.thecocktaildb.com/api/json/v1/1/random.php",
      { timeout: 10000 },
    );

    console.log(response.data);
    const cocktail = response.data.drinks?.[0];

    if (!cocktail) {
      throw new Error("The API returned no cocktail.");
    }

    res.render("index.ejs", {
      title: "Cocktail Explorer",
      cocktail: cocktail,
      error: null,
    });
  } catch (error) {
    console.error("Failed to load cocktail:", error.message);

    res.status(502).render("index.ejs", {
      title: "Cocktail Explorer",
      cocktail: null,
      error: "We couldn't load a cocktail. Please try again.",
    });
  }
});

// Running Server.
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
