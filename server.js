const express = require("express");
const app = express();
const port = 4000;
const methodOverride = require("method-override");
// Controller
const fruitsController = require("./controllers/fruits");

// Models - Database stuff
const models = require("./models/Fruits");

const fruits = models.fruits;

// controllers - routes
// views - EJS files (EJS is literally just HTML and JS)

// Middleware req -> middleware -> res
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); //parse JSON data in the request body
app.use(methodOverride("_method"));
// without urlencoded we get req.body undefined

app.use((req, res, next) => {
  console.log("this is my own middleware");
  // middleware does something
  // next tells server to do the next thing in the cycle
  next();
});

// Routes
// Hungry for more to create my own API, and APIs always should be in JSON
app.get("/api", (req, res) => {
  res.json({
    models,
    status: 200,
  });
});

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.use("/fruits", fruitsController);

app.get("/*", (req, res) => {
  res.render("404.ejs");
});

// Listen at the bottom
app.listen(port, () => {
  console.log(`🏝️ Server is listening to PORT ${port} 🎧`);
});
