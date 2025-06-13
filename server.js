const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const path = require("path"); 

const app = express();

app.use(cors());
app.use(express.json());

const api = require("./routes/apis");
app.use("/api", api);

const port = process.env.PORT || 3000;

// Serve uploaded files
app.use("/uploads", express.static("uploads"));
app.use("/public", express.static(path.join(__dirname, "public"))); // ✅ Now will work

// MongoDB connection
mongoose
  .connect(process.env.ATLASH_DB)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Error occurred while connecting to database", err);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
