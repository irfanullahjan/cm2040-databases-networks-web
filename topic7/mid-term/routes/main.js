module.exports = function (app) {
  app.get("/", function (req, res) {
    res.render("index.html", {
      title: "Dynamic title 2"
    });
  });
  app.get("/search", function (req, res) {
    res.render("search.html");
  });
  app.get("/search-result", function (req, res) {
    //searching in the database 
    res.send(req.query);
  });
  app.get("/register", function (req, res) {
    res.render("register.html");
  });
  app.post("/registered", function (req, res) {
    // saving data in database
    res.send(req.body)
  });
  app.get("/list", function(req, res) { 
    // query database to get all the books
    let sqlquery = "SHOW DATABASES";
    // execute sql query
    db.query(sqlquery, (err, result) => { 
    if (err) { 
    res.redirect("/"); 
    } 
    res.send(result)
    });
   });
}