import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
var postId = 0;
const posts = [];


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req,res) => {
  res.render("index.ejs", {posts: posts});
});

app.get("/post/edit", (req,res)=> {
  res.render("editpost.ejs", {posts: posts});
});

app.get("/post/new", (req,res)=> {
  res.render("newpost.ejs");
});

app.post("/submit",(req,res)=>{
  var title = req.body["postTitle"];
  var body = req.body["postBody"];
  posts.push({title, body, postId});
  postId++;
  res.redirect("/");
});

app.listen(port, ()=> {
  console.log(`Server is running on ${port}`);
});

