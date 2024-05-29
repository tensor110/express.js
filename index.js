const express = require("express")
const app = express()

// ejs set-up 
app.set("view engine", "ejs")

// Setting static files environment 
app.use(express.static('./public'))

// Middleware 
app.use(function(req, res, next){
    console.log("Middleware running")
    next();
})

app.get('/', function(req, res){
    res.send("Hello World")
})

// Routing 
app.get('/profile', function(req, res){
    res.send("Hello from profile")
})

// Dynamic Routing 
app.get('/profile/:username', function(req, res){
    res.send(`Hello from ${req.params.username}`)
})

// Template Engines 
app.get('/template', function(req, res){
    res.render("index")    //write without .ejs
})

// Error Handling 
app.get('/error', function(req, res, next){
    throw Error("Something went wrong")
})

app.use(function errorHandler (err, req, res, next) {
    if (res.headersSent) {
      return next(err)
    }
    res.status(500)
    res.render('error', { error: err })
  })

app.listen(3000, ()=>{
    console.log("Running on port 3000")
})