const express = require('express');
const sql = require('mysql');
const app = express();
const PORT = 3000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on  http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

const db = sql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'mbt'
});

db.connect();

app.get("/telkek", (req, res) => {
  db.query("SELECT * FROM telek", (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
});

app.get("/telek", (req, res) => {
  const id = req.query.id;
  db.query("SELECT * FROM telek WHERE id = ?", [id], (err, rows) => {
    if (err) throw err;
    res.json(rows);
  })
})

// 2. feladat

app.get("/telepules", (req, res) => {
  const allapot = req.query.allapot;
  db.query("SELECT tlepules, muvkod FROM telek WHERE allapot = ? ORDER BY muvkod, tlepules", [allapot], (err, rows) => {
    if (err) throw err;
    res.json(rows);
  })
})

// 3. feladat

app.get("/fed", (req, res) => {
  const fedoszint = Number(req.query.fedoszint);
  db.query("SELECT nyersanyag.nev FROM nyersanyag INNER JOIN nyersanyag ON kapcsolo.nyersanyagid = nyersanyag.id INNER JOIN kapcsolo ON telek.id = kapcsolo.telekid WHERE telek.fedoszint < ?", [fedoszint], (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
});


app.post("/telkek", (req, res) => {
  const { tlepules, muvkod, allapot, fedoszint, fekuszint } = req.body;
  db.query("INSERT INTO telek (tlepules, muvkod, allapot, fedoszint, fekuszint) VALUES (?, ?, ?, ?, ?)", [ tlepules, muvkod, allapot, fedoszint, fekuszint], (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});