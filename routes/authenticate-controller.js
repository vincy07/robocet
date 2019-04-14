var Cryptr = require('cryptr');
cryptr = new Cryptr('myTotalySecretKey');
 
var connection = require('./../config');
module.exports.authenticate=function(req,res){
    
    var email=req.body.email;
    var password=req.body.password;
    //var sql = "SELECT u.name,u.email,u.password,w.workshop from User u, Workshop w WHERE u.email = ? and u.email=c.email and u.name = c.name"
    
    connection.query("SELECT * from User WHERE email = ?",[email], function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:'there are some error with query'
            })
      }else{
       
        if(results.length >0){
            title = "Dashboard";
            name = results[0].name;
            decryptedString = cryptr.decrypt(results[0].password);
            if(password==decryptedString){
                /*res.json({
                    status:true,
                    message:'successfully authenticated'
                })*/
                //console.log(name);
                connection.query("Select * from Workshop where email = ?",[email],function(error,resul,fields){
                  if(error){
                    res.json({
                      status:false,
                      message:'there are some error with query'
                    })
                  }else{
                    if(resul.length > 0){
                      res.render("pages/dashboard.ejs",{
                        title:title,
                        email:email,
                        name:name,
                        results:resul
                      });
                    }
                    else{
                      resul=[];
                      res.render("pages/dashboard.ejs",{
                        title:title,
                        email:email,
                        name:name,
                        results:resul
                      });
                    }
                  }
                  
                });
                // res.render("pages/dashboard.ejs",{
                //   title: title,
                //   email:email,
                //   name: name,
                //   results: results
                //});
            }else{
                /*res.json({
                  status:false,
                  message:"Email and password does not match"
                 });*/
                 title="User Login"
                 res.render("pages/userlogin",{
                   title:title
                 });
            }
          
        }
        else{
          res.json({
            status:false,    
            message:"Email does not exits"
          });
        }
      }
    });
}