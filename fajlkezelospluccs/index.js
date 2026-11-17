const fs = require("node:fs");
const express = require("express");
const sql = require("mysql");
const app = express();
const PORT = 3000;

app.use(express.json());

const db = sql.createConnection({
  host: "localhost",
  user: "root",
  database: "china_tunnels",
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

var adatok = [];
try {
  const data = fs.readFileSync("CNtunnels.csv", "utf8");
  adatok = data.trim().split("\n").splice(1);

  console.log(adatok);
} catch (err) {
  console.log(err);
}

// var count = 0;
// for (var i = 0; i < adatok.length; i++) {
//   if (adatok[i] == "UC") count++;
// }
// console.log(count);

// var maxlength = 0;
// for (var i = 0; i < adatok.length; i++) {
// }
