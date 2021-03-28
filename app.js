//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require("lodash");

const homeStartingContent = "Hi, My Name is Kartik. I am a Web Developer and Web Designer. This is a random Project of NodeJS with ExpressJS to create a Journal which pulls the post created dynamically from the server. Tap the Compose button down below to create posts in your Journal";
const aboutContent = "I am a Freelance Web Developer and Web Designer. I am a Full Stack Web Developer. I can code in Front-edn using HTML, CSS, and Javascript. I am also familiar with the famous libraries and frameworks such as Bootstrap, React, Jquery and JSON";
const contactContent = "You can contact me on LinkedIn, Github, and Gmail. Or Follow my Social Media for More.";

const app = express();

let posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
  res.render("home", {
    homeContent: homeStartingContent,
    // console.log(posts);
    postContent: posts
  });

});

app.get("/about", function(req, res){
  res.render("about", {

    aboutContent: aboutContent,

  });
});

app.get("/contact", function(req, res){
  res.render("contact", {

    contactContent: contactContent,

  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
const post = { //Using most restrictive type
  title: req.body.postTitle,
  content: req.body.postBody
};
posts.push(post);
res.redirect("/");
});

app.get("/posts/:postName", function(req,res){
  const requestedTitle = _.lowerFirst([string= req.params.postName]);

  posts.forEach(function(post){
     const storedTitle = _.lowerFirst(post.title);
    // const storedTitle = _.lowerFirst([string= post.title]);
    // const storedContent = post.content;


    if(storedTitle === requestedTitle){
      res.render("post", {
        storedTitle: post.title,
        storedContent: post.content
      });
    }
  });

  });

// });










app.listen(3000, function() {
  console.log("Server started on port 3000");
});
