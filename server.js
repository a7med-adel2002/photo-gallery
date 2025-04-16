const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors()); // Allow frontend to access backend
app.use(express.json());

const API_KEY = process.env.PEXELS_API_KEY;

app.get("/api/images", async (req, res) => {
  const { page = 1, per_page = 15, query } = req.query;
  let url = `https://api.pexels.com/v1/curated?page=${page}&per_page=${per_page}`;
  if (query) {
    url = `https://api.pexels.com/v1/search?query=${query}&page=${page}&per_page=${per_page}`;
  }

  try {
    // Dynamically import node-fetch
    const { default: fetch } = await import("node-fetch");
    const response = await fetch(url, {
      headers: { Authorization: API_KEY },
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ error: "Failed to fetch images" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
