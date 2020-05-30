var path = require("path")
module.exports = function(app) {
//need to create notes.html file 
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });
  //need to retrieve index.html file
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
}