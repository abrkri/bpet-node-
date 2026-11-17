const express = require("express");
const app = express();
const PORT = 3000;
app.use(express.json());

const books = [
  {
    id: 1,
    title: "A Gyűrűk Ura",
    author: "J.R.R. Tolkien",
    year: 1954,
    genre: "Fantasy",
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    year: 1949,
    genre: "Dystopian",
  },
  {
    id: 3,
    title: "A Pál utcai fiúk",
    author: "Molnár Ferenc",
    year: 1906,
    genre: "Ifjúsági regény",
  },
  {
    id: 4,
    title: "Egri csillagok",
    author: "Gárdonyi Géza",
    year: 1899,
    genre: "Történelmi regény",
  },
  {
    id: 5,
    title: "Dűne",
    author: "Frank Herbert",
    year: 1965,
    genre: "Sci-Fi",
  },
  {
    id: 6,
    title: "Harry Potter és a bölcsek köve",
    author: "J.K. Rowling",
    year: 1997,
    genre: "Fantasy",
  },
];

app.listen(PORT, () => {
  console.log(PORT);
});

app.get("/api/books", (req, res) => {
  res.send(books.map((e) => e.title));
});

app.get("/api/books/:id", (req, res) => {
  const id = Number(req.params.id);
  const book = books.find((p) => p.id === id);

  if (!book) {
    return res
      .status(404)
      .send("Not Found")
      .json({ message: "A könyv nem található!" });
  } else res.send(book);
});

app.post("/api/books", (req, res) => {
  const newBook = {
    id: books.at(-1).id + 1,
    title: req.body.title,
    author: req.body.author,
    year: req.body.year,
    genre: req.body.genre,
  };
  books.push(newBook);
  res.json(newBook);
});

app.put("/api/books/:id", (req, res) => {
  const id = req.params.id;
  const index = Number(books.indexOf((i) => i.id == id));
  books[index] = {
    id,
    title: req.body.title,
    author: req.body.author,
    year: req.body.year,
    genre: req.body.genre,
  };
  res.json(books);
});

app.patch("/api/books/:id", (req, res) => {
  const id = Number(req.params.id);
  const book = books.find((i) => i.id == id);

  if (!book) {
    return res
      .status(404)
      .send("Not Found")
      .json({ message: "A könyv nem található!" });
  }

  if (req.body.title !== undefined) book.title = req.body.title;

  if (req.body.author !== undefined) book.author = req.body.author;

  if (req.body.year !== undefined) book.year = req.body.year;

  if (req.body.genre !== undefined) book.genre = req.body.genre;

  res.json(book);
});

app.delete("/api/books/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = books.findIndex((i) => i.id == id);

  if (index === -1)
    return res
      .status(204)
      .send("No Content")
      .json({ message: "A könyv nem található!" });
  else {
    books.splice(index, 1);
    res.send("Deleted successfully");
  }
});
