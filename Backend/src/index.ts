// imports
import express from "express";
import cors from "cors";

const app = express();

// middleware
app.use(cors());
app.use(express.json());

app.get("/signup", (req, res) => {
  res.send("Hello");
});

app.listen(3000, () => {
  console.log("running");
});
