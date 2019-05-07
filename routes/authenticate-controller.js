var Cryptr = require('cryptr');
cryptr = new Cryptr('myTotalySecretKey');
 
var connection = require('./../config');
module.exports.authenticate=function(req,res){
    sess = req.session;
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
            // title = "Dashboard";
            // name = results[0].name;
            // sess.name = results[0].name;
            // college = results[0].college;
            // sess.college = results[0].college;
            // dept = results[0].department;
            // sess.dept = results[0].department;
            // sem = results[0].semester;
            // sess.sem = results[0].semester;
            decryptedString = cryptr.decrypt(results[0].password);
            if(password==decryptedString){
              title = "Dashboard";
              sess.email = email;
              name = results[0].name;
              sess.name = results[0].name;
              college = results[0].college;
              sess.college = results[0].college;
              dept = results[0].department;
              sess.dept = results[0].department;
              sem = results[0].semester;
              sess.sem = results[0].semester;
                /*res.json({
                    status:true,
                    message:'successfully authenticated'
                })*/
                //console.log(name);
                console.log(password);
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
                console.log("here");
                title="User Login";
                console.log(title);
                res.redirect('/userlogin');
                //alert("Please enter correct user name and password.")
                
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