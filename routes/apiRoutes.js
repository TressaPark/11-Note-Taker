// const does NOT define a constant value. It defines a constant reference to a value.
// Because of this, we cannot change constant primitive values, but we can change the properties of constant objects.
// const dbjson = require ("../db/db.json");
const dbjson = require ("../db/db.json");

// I want to use the initial file but be able to add new information to the same file.
const fs = require('fs');

// A Version 4 UUID is a universally unique identifier that is generated using random numbers.
// const { v4:uuidv4 } = require ("./node_modules/uuid");
// uuidv4();

module.exports = function(app) {
  
  // Should read the `db.json` file and return all saved notes as JSON.
  app.get("/api/notes", function(req, res) {
    res.send(dbjson)
  });

  // Should receive a new note to save on the request body, add it to the `db.json` file, 
  // and then return the new note to the client.
  app.post("/api/notes", function(req, res) {
    //in the db.json keeping track of the ID by the length of th array
    //let noteId = dbjson.length;
    // console.log("inside post request");
    let newNote = {
      id: dbjson.length,
      title: req.body.title,
      text: req.body.text
    }
    console.log(newNote);
    dbjson.push(newNote);
  
    // The readFile function reads file data in an asynchronous manner. When a readFile function is called, 
    // the file reading process starts and immediately the control shifts to next line executing the remaining lines of code. 
    // Once the file data has been loaded, this function will call the callback function provided to it. 
    // This way you aren't blocking code execution while waiting for the operating system to get back to you with data.
    // fs.readFile("../db/db.json", "utf8", (err, data) => {

    //   // If the value is wrong, an exception (err) is thrown. // The exception (err) is caught by the catch statement and a custom error message is displayed.
    //   if (err) throw error
    //   const allNotes = JSON.parse(data)
    //   allNotes.push(newNote)

    // // The writeFile method writes data to a file in an asynchronous way, which means code is not blocked while data is written to the file.
    // // The JSON. stringify method converts a JavaScript value into a JSON string. It is typically used to convert JavaScript arrays or objects to JSON, 
    // // although it can also be used with simple data types like strings and numbers.
    // fs.writeFile("../db/db.json", JSON.stringify(dbjson, null, 2), function(err) {
      
    fs.writeFile("./db/db.json", JSON.stringify(dbjson, null, 2), function(err) {

      if (err) {
        return console.log(err);
      }
    
      console.log("Success!");
    res.send(dbjson)
    });
    
    
    // fs.writeFile("../db/db.json", JSON.stringify(dbjson, null, 2), err => {
    //   if (err) throw error

    //   console.log("Note Made")
    // });
    // });
    });

  // Should receive a query parameter containing the id of a note to delete.
  app.delete("/api/notes/:id", function (req, res) {
    let noteId = req.params.id
    // fs.readFile("./db/db.json", "utf8", (err, data) => {
      fs.readFile("./db/db.json", "utf8", (err, data) => {  
      if (err) throw error
      const allNotes = JSON.parse(data)
      console.log("noteID: "+noteId)
      console.log("data "+ allNotes)
      const updatedNotes = allNotes.filter(note => note.id!=noteId)
      console.log(updatedNotes)
      
    fs.writeFile("./db/db.json", JSON.stringify(updatedNotes, null, 2), err => {
        if (err) throw error

        //  res.redirect("/")
        console.log("Note Deleted")  
       
    });
  });  
  });
};
