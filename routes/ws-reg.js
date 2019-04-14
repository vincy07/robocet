var express=require("express");
var connection = require('./../config');
 
module.exports.register=function(req,res){
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
            message="Dupes!!"
        }
        else{
            message="Something wrong with this query!!"
        }
        res.json({
            status:false,
            message: message
        })
      }else{
          res.json({
            status:true,
            data:results,
            message:'user registered sucessfully'
        })
      }
    });
}