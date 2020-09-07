var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://alok:alok@programmers.cckh1.mongodb.net/programmers?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected!!!");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const progSchema = new mongoose.Schema({
  name: String,
  country: String,
  stack: String,
  experience: String,
  mail: String,
  github: String,
});

const programmers = mongoose.model("programmers", progSchema);

app.get("/", (req, res) => {
  res.render("landing.ejs");
});

app.get("/programmers", (req, res) => {
  programmers.find({}, (err, allprogrammers) => {
    if (err) {
      console.log(err);
    } else {
      res.render("programmers.ejs", { programmer: allprogrammers });
    }
  });
});

app.get("/programmers/new", (req, res) => {
  res.render("form.ejs");
});

app.post("/programmers", (req, res) => {
  var name = req.body.name;
  var country = req.body.country;
  var stack = req.body.stack;
  var experience = req.body.experience;
  var mail = req.body.mail;
  var github = req.body.github;

  programmers.create(
    {
      name: name,
      country: country,
      stack: stack,
      experience: experience,
      mail: mail,
      github: github,
    },
    function (err, programmer) {
      if (err) {
        console.log(err);
      } else {
        console.log("done!!!");
        console.log(programmer);
      }
    }
  );

  res.redirect("/programmers");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("server running!!!");
});
