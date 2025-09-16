import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const apiKey = ""; // your OpenWeather API key

// GET route
app.get("/", (req, res) => {
  res.render("index.ejs");
});

// POST route
app.post("/", async (req, res) => {
  const city = req.body.city;

  try {
    // ✅ Use current weather API with city name
    const result = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    console.log(result.data); // logs weather JSON to server console

    res.render("index.ejs", { weather: result.data, error: null });
  } catch (error) {
    console.error(error.message);

    // if city not found (404), show friendly message
    let msg = "Error, please try again";
    if (error.response && error.response.status === 404) {
      msg = "City not found, please check the spelling";
    }

    res.render("index.ejs", { weather: null, error: msg });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
