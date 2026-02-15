const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "computer",
  database: "askout"
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL ✅");
  }
});

// API to save name
app.post("/yes", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name required" });
  }

  const sql = "INSERT INTO responses (name) VALUES (?)";
  db.query(sql, [name], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Database error" });
    }

    res.json({ message: "Saved successfully ❤️" });
  });
});

// API to see all names
app.get("/responses", (req, res) => {
  db.query("SELECT * FROM responses ORDER BY id DESC", (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching data" });
    }
    res.json(results);
  });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000 🚀");
});
