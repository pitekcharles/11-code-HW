var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

let notes = [];
let id = 0;

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "public/notes.html"))
});

app.get("/api/notes", function(req, res){
    return res.json(notes);
});

app.post("/api/notes/", function(req, res){
    var newNote = req.body;

    newNote.id = id;
    id++;
    // console.log(newNote);
    notes.push(newNote);

    res.end();
});

app.delete("/api/notes/:id", function(req, res){
    var chosenID = req.params.id;
    console.log(chosenID);
    // console.log(notes);

    for (var i = 0; i < notes.length; i++){
        console.log(notes);
        if(notes[i].id == chosenID){
            notes.splice(i, 1);
            console.log("you made it to the if loop");
            console.log(notes);
        }
    }

    res.end();
});

app.listen(PORT, function(){
    console.log("App listening on PORT " + PORT);
});