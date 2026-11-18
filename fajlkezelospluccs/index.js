const fs = require("node:fs");
const express = require("express");
const sql = require("mysql");
const app = express();
const PORT = 3000;

app.use(express.json());

const db = sql.createConnection({
  host: "localhost",
  user: "root",
  database: "cntunnels",
});

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await csvFeltoltes();
});

var adatok = [];

async function csvFeltoltes() {
  try {
    const data = fs.readFileSync("CNtunnels.csv", "utf8");
    adatok = data.trim().split("\n").splice(1);

    await db.query("DROP TABLE IF EXISTS tunnels", (err, result) => {
      if (err) throw err;
      else console.log("Tablazat sikeresen torolve");
    });

    await db.query(
      "CREATE TABLE IF NOT EXISTS tunnels (nev TEXT, hossz INT, ev TEXT, tartomany TEXT)",
      (err, result) => {
        if (err) throw err;
        else console.log("Tablazat sikeresen letrehozva");
      },
    );

    for (const sor of adatok) {
      const [nev, hossz, ev, tartomany] = sor.split(";");

      await db.query(
        "INSERT INTO tunnels (nev, hossz, ev, tartomany) VALUES (?, ?, ?, ?)",
        [nev, hossz, ev, tartomany],
        (err, result) => {
          if (err) throw err;
        },
      );
    }
    console.log("Sikeresen feltoltve");
  } catch (err) {
    console.log(err);
  }
}
