const express = require("express");
const cors = require("cors");
require("dotenv/config");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 5000;

// <-- FIX: START
// We will define specific options for CORS
const corsOptions = {
  // We are telling the server to allow requests ONLY from our React app
  origin: "http://localhost:3000", 
  optionsSuccessStatus: 200 // For legacy browser support
};

// Use the cors middleware with our specific options
app.use(cors(corsOptions));

// Add this line to explicitly handle the browser's "preflight" OPTIONS requests
// This will respond to the preflight check with the headers defined above
app.options('*', cors(corsOptions)); 
// <-- FIX: END

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello to Fitness Tracker API");
});

mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
  () => console.log("Database connected")
);

const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");

app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});