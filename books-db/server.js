const express = require("express");
const mysql = require("mysql");
const app = express();
const PORT = 3000;

app.use(express.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "books",
});

connection.connect();

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get("/books", (req, res) => {
  connection.query("SELECT * FROM books", (error, rows) => {
    if (error) return res.status(500).json({ error: error.message });
    res.json(rows);
  });
});

app.get("/book", (req, res) => {
  const id = req.query.id;

  connection.query("SELECT * FROM books WHERE id = ?", [id], (error, rows) => {
    if (error) return res.status(500).json({ error: error.message });
    res.json(rows[0] || null);
  });
});

app.get("/books/first", (req, res) => {
  connection.query("SELECT * FROM books LIMIT 1", (error, rows) => {
    if (error) return res.status(500).json({ error: error.message });
    res.json(rows);
  });
});

app.get("/books/pagination", (req, res) => {
  const limit = parseInt(req.query.limit);
  const offset = parseInt(req.query.offset);
  connection.query(
    "SELECT * FROM books LIMIT ? OFFSET ?",
    [limit, offset],
    (error, rows) => {
      if (error) return res.status(500).json({ error: error.message });
      res.json(rows);
    },
  );
});

app.get("/books/title", (req, res) => {
  const title = req.query.title;

  connection.query(
    "SELECT * FROM books WHERE title = ?",
    [title],
    (error, rows) => {
      if (error) return res.status(500).json({ error: error.message });
      res.json(rows);
    },
  );
});

app.get("/books/year", (req, res) => {
  const year = req.query.year;

  connection.query(
    "SELECT * FROM books WHERE year = ?",
    [year],
    (error, rows) => {
      if (error) return res.status(500).json({ error: error.message });
      res.json(rows);
    },
  );
});

app.get("/books/author", (req, res) => {
  const author = req.query.author;

  connection.query(
    "SELECT * FROM books WHERE author = ?",
    [author],
    (error, rows) => {
      if (error) return res.status(500).json({ error: error.message });
      res.json(rows);
    },
  );
});

app.get("/books/genre", (req, res) => {
  const genre = req.query.genre;

  connection.query(
    "SELECT * FROM books WHERE genre = ?",
    [genre],
    (error, rows) => {
      if (error) return res.status(500).json({ error: error.message });
      res.json(rows);
    },
  );
});

app.post("/books", (req, res) => {
  const { title, author, year, genre } = req.query;

  connection.query(
    "INSERT INTO books (title, author, year, genre) VALUES (?, ?, ?, ?)",
    [title, author, year, genre],
    (error, result) => {
      if (error) return res.status(500).json({ error: error.message });

      res.json({
        id: result.insertId,
        title,
        author,
        year,
        genre,
      });
    },
  );
});

app.delete("/books", (req, res) => {
  const id = req.query.id;

  connection.query("DELETE FROM books WHERE id = ?", [id], (error, result) => {
    if (error) return res.status(500).json({ error: error.message });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Nincs ilyen könyv." });
    }

    res.send("Torolve");
  });
});

// connection.query("SELECT * FROM books", (error, rows) => {
//   if (error) return console.error(error);
//   console.log(rows);
// });
