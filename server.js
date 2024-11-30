import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let data = [
  {
    id: 1,
    title: "Hello World",
    description: "This is a simple description",
    author: "John Doe",
    time: "10/02/2021",
  },
  {
    id: 2,
    title: "Hello World 2",
    description: "This is a simple description 2",
    author: "Max Mustermann",
    time: "15/05/2005",
  },
  {
    id: 3,
    title: "Hello World 3",
    description: "This is a simple description 3",
    author: "Alex Mustermann",
    time: "05/08/2003",
  },
];

app.get("/api/data", (req, res) => {
  res.json(data);
});

app.post("/api/newPost", (req, res) => {
  let data1 = req.body;
  let today = new Date();
  let year = today.getFullYear();
  let month = (today.getMonth() + 1).toString().padStart(2, "0");
  let day = today.getDate().toString().padStart(2, "0");
  let date = `${day}/${month}/${year}`;

  let post = {
    id: data.length + 1,
    title: data1.title,
    description: data1.description,
    author: data1.author,
    time: date,
  };
  data.push(post);
  res.sendStatus(200);
});

app.patch("/api/updatePost/:id", (req, res) => {
  let post = data.find((post) => post.id === parseInt(req.params.id));
  let newPost = {
    id: post.id,
    title: req.body.title || post.title,
    description: req.body.description || post.description,
    author: req.body.author || post.author,
    time: post.time,
  };
  data = data.map((post) =>
    post.id === parseInt(req.params.id) ? newPost : post
  );
  res.json(newPost);
});

app.delete("/api/deletePost/:id", (req, res) => {
  data = data.filter((post) => post.id !== parseInt(req.params.id));
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
