const express = require('express'); //start the server
const app = express(); //start the server
const dotenv = require(“dotenv”); //connect to the database
const mongoose = require("mongoose"); //Mongoose provides a straight-forward, schema-based solution to model your application data.
const TodoTask = require("./models/TodoTask"); //models

dotenv.config(); //connect to the database

app.use("/static", express.static("public"));

app.use(express.urlencoded({ extended: true })); //URLencoded allows data extraction from the form by adding it to the body property of the request

mongoose.set("useFindAndModify", false); //connection to db

//run server only after the connection is made
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
console.log("Connected to db!");


app.listen(3000, () => console.log("Server Up and running")); //tell express app to listen to port 3000
});


app.set("view engine", "ejs"); //view engine configuration


app.get('/',(req, res) => { //use GET to pass non-confidential information
    res.render('todo.ejs');
});


// app.post('/',(req, res) => {
//     console.log(req.body);
//     });

//POST METHOD
app.post('/',async (req, res) => {
    const todoTask = new TodoTask({
    content: req.body.content
    });
    try {
    await todoTask.save();
    res.redirect("/");
    } catch (err) {
    res.redirect("/");
    }
    });


//app.listen(3000, () => console.log("Server Up and running"));