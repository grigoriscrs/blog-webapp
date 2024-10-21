import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";

const app = express();
const port = 3000;
var postId = 0;
const posts = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req,res) => {
  res.render("index.ejs", {posts: posts});
});

app.get("/post/:id/edit", (req,res)=> {
  const id = req.params.id;
  const post = posts.find((post) => post.postId == id);
  res.render("editpost.ejs", {post});
});

app.get("/post/new", (req,res)=> {
  res.render("newpost.ejs");
});

app.put("/edit/:id", (req,res) =>{
  const id = req.params.id;
  const post = posts.find((post) => post.postId == id);

  post.title = req.body["postTitle"];
  post.body = req.body["postBody"];

  res.redirect("/");
});

app.delete("/post/:id", (req,res)=> {
  const id = req.params.id;
  const post = posts.find((post) => post.postId == id);

  const index = posts.indexOf(post);
  if(index > -1){
    posts.splice(index,1);
  }
  res.redirect("/");
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

