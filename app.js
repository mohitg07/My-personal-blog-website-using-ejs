//jshint esversion:6

// important NOTE - our all ejs files must be in folder named "views" and views folder must be at same hierarchical level as app.js
//                  there must be 1 folder named "public" in our project where all my static files will be stored

//     <%= =>     this is an ejs marker
// if I am writing some javascript logic in my ejs file then that must be written inside <% %>
// basically <% %> tag is called the scriptlet tag in ejs

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

// with this, I can use all the libraries of lodash module
const _ = require("lodash");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutStartingContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactStartingContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

// I have declared global array here where I will add all my post items one by one
let posts = [];

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


// when someone hits home route then in order to show home.ejs file, I have render that ejs file
// in render() function, I have assigned homeStartingContent to the homeContent and the same name i.e. homeContent is declared inside ejs marker in home.ejs file
app.get("/", function(req,res){
   res.render("home", {
     homeContent: homeStartingContent,
     allPosts: posts
   });
})


// when someone hits "about" route then I want to render about.ejs file to the user
// and passes aboutStartingContent to the variable named aboutContent which I have mentioned in about.ejs file too
app.get("/about", function(req,res){
   res.render("about", {aboutContent: aboutStartingContent});
})


// when someone hits "contact" route then I want to render contact.ejs file to the user
// and passes contactStartingContent to the variable named contactContent which I have mentioned in contact.ejs file too inside the marker
app.get("/contact", function(req,res){
   res.render("contact", {contactContent: contactStartingContent});
})


// when someone hits "compose" route then I want to render compose.ejs file to the user
app.get("/compose", function(req,res){
   res.render("compose");
})


// if a user clicks on Publish button inside compose.ejs file then I want to send post request to my "compose" route again
app.post("/compose", function(req, res){

  // here with the use of body-parser module, I have fetched the data which is entered by user in compose.ejs
  // the value which I have assigned to name attribute in input and textarea tags of compose.ejs file must match with the text written after body.

  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);

  // here I am redirecting to home route
  res.redirect("/");
})


// Route parameters are named URL segments that are used to capture the values specified at their position in the URL. The captured values are populated in the req.params object, with the name of the route parameter specified in the path as their respective keys.
// we able to use this route parameters just because of my EXPRESS module
// here postName is dynamic in nature as it takes value as per user enters in the URL
app.get("/posts/:postName", function(req,res){

  // _.lowercase() method comes from lodash module
  // it will basically convert the given string to pure lowercase letters without any dash, hiphen etc
  const requestedTitle = _.lowerCase(req.params.postName);

   posts.forEach(function(post){
     const storedTitle = _.lowerCase(post.title);

      if(storedTitle === requestedTitle){
        res.render("post",{
          postTitle: post.title,
          postContent: post.content
        });
      }
  });

});




app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
