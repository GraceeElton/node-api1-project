const express = require("express");

const server = express();

server.use(express.json());

const PORT = process.env.PORT || 5000;
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
    name: "Intrucduction To Lou!",
    bio: "She is kinda nice",
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
    res.status(201).json(user);
  } else {
    res.status(404).json({ errorMessage: "404 Specified User ID Not Found" });
  }
});

// working!

//delete --
server.delete("/api/users/:id", function (req, res) {
  const id = req.params.id;
  const findUser = users.find((user) => user.id == id);
  if (findUser) {
    user = users.filter((user) => user.id != id);
    res.status(200).json({ message: "the user was deleted " });
  } else if (!findUser) {
    res.status(404).json({
      message: "404 Specified User ID Not Found",
    });
  } else {
    res.status(500).json({
      message: "NOTHING",
    });
  }
});

// PUT	/api/users/:id	Updates the user with the specified id using data from the request body. Returns the modified user

server.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const user = users.find((user) => user.id == id);
  const { name, bio } = req.body;
  console.log(user);
  if (!name || !bio) {
    res.status(400).json({ errorMessage: "Please enter info!" });
  } else if (user) {
    user = users.map((user) => {
      if (user.id == id) {
        return { ...req.body, id: id };
      } else {
        return user;
      }
    });
    res.status(201).json(user);
  } else if (!user) {
    res.status(404).json({ errorMessage: "404 Specified User ID Not Found" });
  } else {
    res.status(500).json({ errorMessage: "nothing is Found" });
  }
});
