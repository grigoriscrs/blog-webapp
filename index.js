import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req,res) => {
  res.render("index.ejs");
});

app.get("/about", (req,res)=> {
  res.render("about.ejs");
});

app.get("/newpost", (req,res)=> {
  res.render("newpost.ejs");
});

app.post("/submit",(req,res)=>{
  const postTitle = req.body["postTitle"];
  const postBody = req.body["postBody"];
  console.log(postTitle);
  res.render("index.ejs", {
    title: postTitle,
    body: postBody
  });
});

app.listen(port, ()=> {
  console.log(`Server is running on ${port}`);
});

