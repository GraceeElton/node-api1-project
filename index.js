const express = require("express");

const server = express();

server.use(express.json());

const PORT = 3000;

server.listen(PORT, () =>
  console.log(`\n ** API running on nodemon http:localhost:${PORT} **\n`)
);

// make sure it is running on postman

server.get("/", (req, res) => {
  res.status(200).json({ api: "running" });
});

let users = [
  {
    id: 1,
    name: "Intrucduction To GRacee!",
    bio: "She is kinda nice + a smartass",
  },
  {
    id: 2,
    name: "Intrucduction To APril",
    bio: "She is a great cook! ANd i may be in love with her",
  },
];

// it works YAY

/// work on readme stuff

// get --- all users!(array)

server.get("/api/users", function (req, res) {
  res.json(users);
});

// post add new user

server.post("/api/users", function (req, res) {
  const userInfo = req.body;
  users.push(userInfo);

  res.status(201).json(users);
});

// get ---- Returns the user object with the specified id.

server.get("/api/users/:id", function (req, res) {
  const id = req.params.id;
  const user = users.find((user) => user.id == id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ errorMessage: "404 Specified User ID Not Found" });
  }
});

// working!

//delete --
server.delete("/api/users/:id", function (req, res) {
  const id = req.params.id;
  // const filterUsers =
  users.filter((user) => {
    if (Number(user.id) === Number(id)) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ errorMessage: "404 Specified User ID Not Found" });
    }
  });
});
