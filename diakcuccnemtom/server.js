const express = require("express");
const sql = require("mysql");
const fs = require("node:fs");
const PORT = 3000;
const app = express();

app.use(express.json());

app.listen(PORT, async () => {
  await connectToDatabase();
  console.log(`Server is running on http://localhost:${PORT}`);
});

let db;

async function connectToDatabase() {
  db = sql.createConnection({
    host: "localhost",
    user: "root",
  });

  db.connect((err) => {
    if (err) {
      console.log("Adatbázis kapcsolódási hiba:", err);
      return;
    }

    console.log("Csatlakozva!");

    db.query("CREATE DATABASE IF NOT EXISTS students", (err) => {
      if (err) {
        console.log("Adatbázis létrehozási hiba:", err);
        return;
      }

      db.query("USE students", (err) => {
        if (err) {
          console.log("Adatbázis kiválasztási hiba:", err);
          return;
        }

        console.log("Adatbázis kiválasztva!");
      });
    });
  });
}

app.get("/import", (req, res) => {
  db.query(
    "CREATE TABLE IF NOT EXISTS adatok (diak_id INT AUTO_INCREMENT PRIMARY KEY, vezeteknev TEXT, keresztnev TEXT, osztaly TEXT, szuletesi_datum DATE, varos TEXT, atlag REAL, osztondij INT, aktiv BOOL)",
    (err) => {
      if (err) return res.status(500).send(err.message);

      db.query("DELETE FROM adatok", (err) => {
        if (err) return res.status(500).send(err.message);

        const adatok = fs.readFileSync("diakok.csv", "utf8");
        const sorok = adatok.trim().split("\n");

        sorok.shift();

        const values = sorok.map((sor) => {
          const oszlopok = sor.split(";");

          return [
            oszlopok[1],
            oszlopok[2],
            oszlopok[3],
            oszlopok[4],
            oszlopok[5],
            parseFloat(oszlopok[6]),
            parseInt(oszlopok[7]),
            oszlopok[8] == "igen",
          ];
        });

        if (values.length === 0) {
          return res.send("Nincsenek importálható adatok!");
        }

        db.query(
          "INSERT INTO adatok (vezeteknev, keresztnev, osztaly, szuletesi_datum, varos, atlag, osztondij, aktiv) VALUES ?",
          [values],
          (err) => {
            if (err) return res.status(500).send(err.message);

            res.send("Adatok importálva!");
          },
        );
      });
    },
  );
});

app.get("/diakok", (req, res) => {
  db.query("SELECT * FROM adatok", (err, results) => {
    if (err) return res.status(500).send(err.message);
    res.json(results);
  });
});

app.get("/length", (req, res) => {
  db.query("SELECT * FROM adatok", (err, results) => {
    if (err) return res.status(500).send(err.message);
    res.json(results.length);
  });
});

app.get("/above", (req, res) => {
  const atlag = parseFloat(req.query.atlag);
  db.query("SELECT * FROM adatok WHERE atlag > ?", [atlag], (err, results) => {
    if (err) return res.status(500).send(err.message);
    res.json(results);
  });
});
