var express=require("express");
var connection = require('./../config');
 
module.exports.register=function(req,res){
    sess = req.session;
    email = req.body.email;
    var today = new Date();
    var user={
        "name":req.body.name,
        "college":req.body.college,
        "mobile":req.body.mobile,
        "email":req.body.email,
        "workshop":req.body.workshop,
        "created at":today,
        "updated at":today
    }
    connection.query('INSERT INTO Workshop SET ?',user, function (error, results, fields) {
      if (error) {
        errno = error.errno;
        if(errno = 1062){
            message="Already Registered!!"
        }
        else{
            message="Something wrong with this query!!"
        }
        // res.json({
        //     status:false,
        //     message: message
        // })
        sess.message = message;
        console.log(sess);
        res.redirect('/wsreg');
      }else{
        //   res.json({
        //     status:true,
        //     data:results,
        //     message:'user registered sucessfully'
        // })
        //console.log(sess);
        connection.query("Select * from Workshop where email = ?",[email],function(error,resul,fields){
          if(error){
            res.json({
              status:false,
              message:'there are some error with query'
            })
          }else{
            if(resul.length > 0){
              sess.results = resul;
              // res.render("pages/dashboard.ejs",{
              //   title:title,
              //   email:email,
              //   name:name,
              //   college:college,
              //   sem:sem,
              //   dept:dept,
              //   results:resul
              // });
              res.redirect("/dashboard");
            }
            else{
              resul=[];
              sess.results = resul;
              //console.log(sess);
            //   res.render("pages/dashboard.ejs",{
            //     title:title,
            //     email:email,
            //     name:name,
            //     results:resul
            //   });
              console.log("aano");
              res.redirect("/dashboard");
            }
          }
        });
        //res.redirect("/dashboard");
      }
    });
}