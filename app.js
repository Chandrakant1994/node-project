var express = require('express');
var bodyparser = require('body-parser');
var path = require('path');
var mongojs = require('mongojs');
var db = mongojs('customerapp', ['users']);
var ObjectId = mongojs.ObjectId;

var app = express();

/* var logger = function(req,res,next){
    console.log("logging ....!!!!");
    next();
}

app.use(logger);
*/


// view engine
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));

//body parser middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

//locating static directory to store static resources
app.use(express.static(path.join(__dirname,'public')));

app.get("/", function(req,res){

    db.users.find(function(err,docs){
        
    res.render("index", {
        users : docs,
        title : "Customers"
    })
})
})

app.delete("/users/delete/:id",function(req,res){
    db.users.remove({_id : ObjectId(req.params.id)},function(err){
        if(err){
            console.log(err);
        }
        else{
            res.send('/');
        }
    });
})

app.put("/users/update/:id/:name/:age/:email", function(req,res){
    
    console.log(req.params);
    db.users.update({_id : ObjectId(req.params.id)}, {
        name : req.params.name,
        age : req.params.age,
        email : req.params.email
    },{
        upsert : true
    })
    
});


app.post("/users/add", function(req,res){
    var newUser = {
        name : req.body.firstname,
        age : req.body.age,
        email : req.body.email
    }
    db.users.insert(newUser, function(err,result){
        if(err){
            console.log(err);
        }else{
            res.redirect('/');
        }
    })
})

app.listen(3030, function(){
    console.log("Server started on port 3030....");
});