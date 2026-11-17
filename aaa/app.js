const express = require("express");
const app = express();
app.use(express.json());
const PORT = 6767;

const termekek = [
  {
    id: 101,
    name: "Gamer PC Csomag",
    price: 450000,
    currency: "HUF",
    category: "electronics",
    bundledProducts: [102, 103],
  },
  {
    id: 102,
    name: "Mechanikus Billentyűzet",
    price: 35000,
    currency: "HUF",
    category: "electronics",
    bundledProducts: null,
  },
  {
    id: 103,
    name: "Optikai Egér",
    price: 18000,
    currency: "HUF",
    category: "electronics",
    bundledProducts: null,
  },
  {
    id: 104,
    name: "Irodai Szett Premium",
    price: 500000,
    currency: "HUF",
    category: "office",
    bundledProducts: [101],
  },
];

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Csao");
});

app.get("/termekek", (req, res) => {
  res.json(termekek);
});

app.get("/termekek/:id", (req, res) => {
  const id = Number(req.params.id);
  res.json(termekek.find((p) => p.id === id));
});

app.post("/termekek", (req, res) => {
  const ujTermek = {
    id: termekek[termekek.length - 1].id + 1,
    name: req.body.name,
    price: req.body.price,
    currency: req.body.currency,
    category: req.body.category,
    bundledProducts: req.body.bundledProducts,
  };
  termekek.push(ujTermek);
  res.json(ujTermek);
});

app.put("/termekek/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = termekek.findIndex((i) => i.id == id);
  if (index === -1) return res.json("Nincs ilyen id");
  termekek[index] = {
    id,
    name: req.body.name,
    price: req.body.price,
    currency: req.body.currency,
    category: req.body.category,
    bundledProducts: req.body.bundledProducts,
  };
  res.json(termekek);
});

app.patch("/termekek/:id", (req, res) => {
  const id = Number(req.params.id);
  const product = termekek.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json("Nincs ilyen id!");
  }

  if (req.body.name !== undefined) {
    product.name = req.body.name;
  }

  if (req.body.price !== undefined) {
    product.price = req.body.price;
  }

  if (req.body.currency !== undefined) {
    product.currency = req.body.currency;
  }

  if (req.body.category !== undefined) {
    product.category = req.body.category;
  }

  if (req.body.bundledProducts !== undefined) {
    product.bundledProducts = req.body.bundledProducts;
  }

  res.json(product);
});

app.delete("/termekek/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = termekek.findIndex((i) => i.id == id);
  termekek.splice(index, 1);
  res.send("Ember törölve!");
});
