import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
const port = 3000;
const Api_url = 'http://localhost:4000/api';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// backend routes

app.get('/', async(req, res) => {
  let data = await axios.get(`${Api_url}/data`);
  res.render('index.ejs', { data: data.data });
});

app.post('/newPost', async(req, res) => {
  let data = await axios.post(`${Api_url}/newPost`, req.body);
  res.redirect("/");
});

app.post('/updatePost/:id', async(req, res) => {
  let data = await axios.patch(`${Api_url}/updatePost/${req.params.id}`, req.body);
  res.redirect("/");
});

app.get('/deletePost/:id', async(req, res) => {
  let data = await axios.delete(`${Api_url}/deletePost/${req.params.id}`);
  res.redirect("/");
});


// frontend routes

app.get('/newPost', (req, res) => {
  res.render('newPost.ejs');
});

app.get("/editPost/:id", async(req, res) => {
  let id = req.params.id;
  let data = await axios.get(`${Api_url}/data`);
  let post = data.data.find((post) => post.id === parseInt(id));
  res.render('editPost.ejs', { post: post }); 
});


app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});