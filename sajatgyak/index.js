const express = require("express");
const mysql = require("mysql");
const app = express();
const PORT = 3000;
app.use(express.json());

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("csaocsaocsao");
});

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "books",
});
connection.connect();

app.get("/books", (req, res) => {
  connect.query("SELECT * FROM books", (error, rows) => {
    if (error) throw error;
    res.json(rows);
  });
});

app.get("/book", (req, res) => {
  const id = req.query.id;
  connection.query("SELECT * FROM books WHERE id == ?", [id], (error, rows) => {
    if (error) throw error;
    res.json(rows);
  });
});
