const express = require("express");
const app = express();
const PORT = 3000;
app.use(express.json());
let persons = [
  { id: 1, name: "Zsolt", age: 18, gender: "male", kids: [2, 3] },
  { id: 2, name: "Frotty", age: 67, gender: "male", kids: null },
  { id: 3, name: "Protty", age: 420, gender: "female", kids: [] },
  { id: 4, name: "Grotty", age: 76, gender: "female", kids: [1] },
];

app.get("/", (req, res) => {
  res.send("<h1>csao</h1>");
});

app.get("/persons/:id", (req, res) => {
  let id = req.params.id;
  const p = persons.find((p) => p.id == id);
  res.json(p);
});

app.get("/persons/:id/kids", (req, res) => {
  let id = req.params.id;
  const p = persons.find((p) => p.id == id);
  let kolkok = [];
  p.kids.forEach((k) => {
    kolkok.push(persons.find((e) => e.id == k).name);
  });
  res.json(kolkok.join(", "));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get("/persons", (req, res) => {
  res.json(persons);
});

// persons[persons.length - 1].id + 1

app.post("/persons", (req, res) => {
  const newPerson = {
    id: persons[persons.length - 1].id + 1,
    name: req.body.name,
    age: req.body.age,
    gender: req.body.gender,
    kids: req.body.kids,
  };

  persons.push(newPerson);
  res.json(newPerson);
});

app.put("/persons/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = persons.findIndex((i) => i.id == id);
  if (index === -1) return res.json("Nincs ilyen id");
  persons[index] = {
    id,
    name: req.body.name,
    age: req.body.age,
    gender: req.body.gender,
    kids: req.body.kids,
  };
  res.json(persons);
});

app.patch("/persons/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = persons.findIndex((i) => i.id == id);
  if (index === -1) return res.json("Nincs ilyen id");
  persons[index] = {
    id,
    name: req.body.name,
    age: req.body.age,
    gender: req.body.gender,
    kids: req.body.kids,
  };
  res.json(persons);
});

app.delete("/persons/:id", (req, res) => {
  const id = Number(req.params.id);

  persons = persons.filter((f) => f.id !== id);

  res.json({
    message: "Ember törölve!",
  });
});

app.get("/persons/:id/family", (req, res) => {
  const id = Number(req.params.id);

  function Fa(personId, szint = 0) {
    const person = persons.find((p) => p.id == personId);

    if (!person) {
      return "";
    }
    let result = "";
    result += `<div style="margin-left: ${szint * 30}px">${person.name} (${person.age})</div>`;

    if (person.kids && person.kids.length > 0) {
      person.kids.forEach((kidId) => {
        result += `${Fa(kidId, szint + 1)}`;
      });
    }

    return result;
  }
  const fa = Fa(id);

  if (!fa) res.status(404).send("lucsok");

  res.send(fa);
});
