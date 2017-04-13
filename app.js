var express = require('express');
var bodyparser = require('body-parser');
var path = require('path');
var mongojs = require('mongojs');
//var db = mongojs('customerapp', ['users']);
var db = mongojs('mongodb://edureka:edureka123@ds149820.mlab.com:49820/employee');
var ObjectId = mongojs.ObjectId;

//mongodb://<dbuser>:<dbpassword>@ds149820.mlab.com:49820/employee

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
        title : "Employee Database"
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

app.put("/users/update/:id/:name/:age/:email/:dept/:gender/:dob", function(req,res){
    
    console.log(req.params);
    db.users.update({_id : ObjectId(req.params.id)}, {
        name : req.params.name,
        age : req.params.age,
        email : req.params.email,
        department : req.params.dept,
        gender : req.params.gender,
        dob : req.params.dob
    },{
        upsert : true
    })
    
});


app.post("/users/add", function(req,res){
    console.log(req.body);
    var newUser = {
        name : req.body.firstname,
        age : req.body.age,
        email : req.body.email,
        department : req.body.department,
        gender : req.body.gender,
        dob : req.body.dob
    }
    db.users.insert(newUser, function(err,result){
        if(err){
            console.log(err);
        }else{
            res.redirect('/');
        }
    })
})

var port = process.env.PORT || 3000;

app.listen(port, function(){
    console.log("Server started on port 3030....");
});