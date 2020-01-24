var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

const notes = [];
const id = 0;

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
    console.log(newNote);
    notes.push(newNote);

    res.end();
});

app.delete("/api/notes/:id", function(req, res){
    var chosenID = req.params.id;

    for (var i = 0; i < notes.length; i++){
        if(notes[i].id === chosenID){
            notes.splice(i, 1);
        }
    }

    res.end();
});

app.listen(PORT, function(){
    console.log("App listening on PORT " + PORT);
});