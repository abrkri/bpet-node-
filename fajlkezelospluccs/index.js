const mysql = require("mysql");
const fs = require("node:fs");
const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

let db;

async function adatbazisKapcsolat() {
  db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
  });

  db.connect((err) => {
    if (err) {
      console.log("Adatbázis kapcsolódási hiba:", err);
      return;
    }

    console.log("Csatlakozva!");

    db.query("CREATE DATABASE IF NOT EXISTS cntunnels", (err) => {
      if (err) {
        console.log("Adatbázis létrehozási hiba:", err);
        return;
      }

      db.query("USE cntunnels", (err) => {
        if (err) {
          console.log("Adatbázis kiválasztási hiba:", err);
          return;
        }

        console.log("Adatbázis kiválasztva!");
      });
    });
  });
}

app.listen(PORT, async () => {
  await adatbazisKapcsolat();
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get("/import", async (req, res) => {
  db.query(
    "CREATE TABLE IF NOT EXISTS tunnels (id INT AUTO_INCREMENT PRIMARY KEY, nev TEXT, hossz INT, ev TEXT, tartomany TEXT)",
    (err) => {
      if (err) return res.status(500).send(err.message);

      const data = fs.readFileSync("CNtunnels.csv", "utf8");
      const adatok = data.trim().split("\n");

      adatok.shift();

      let feldolgozva = 0;

      for (const sor of adatok) {
        const oszlopok = sor.split(";");

        db.query(
          "INSERT INTO tunnels (nev, hossz, ev, tartomany) VALUES (?, ?, ?, ?)",
          [oszlopok[0], Number(oszlopok[1]), oszlopok[2], oszlopok[3]],
          (err) => {
            if (err) {
              console.log(err);
            }
            console.log("Adat beszúrva!");
            feldolgozva++;

            if (feldolgozva === adatok.length) {
              console.log("Összes adat feltöltve!");
              res.send("Adatok feltöltve!");
            }
          },
        );
      }

      if (adatok.length === 0) {
        res.send("Nincs feltöltendő adat!");
      }
    },
  );
});

app.get("/tunnels", (req, res) => {
  db.query("SELECT * FROM tunnels", (err, results) => {
    if (err) {
      return res.status(500).send(err.message);
    }

    res.json(results);
  });
});
