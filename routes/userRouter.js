// In this router we will get some user info and return it to the request if the token is provided
var express = require('express'),
middlewareAuth = require('../app/middleware'),
jwt = require('jsonwebtoken'),
config = require('../config'),
sql = require('../app/database');
var user = require('../models/user/User')
var userRoutes = function(){

    var userRouter = express.Router();

    userRouter.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization,X-Access-Token');
        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization,X-Access-Token');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
            return res.status(200).json({});
        };
        next();
    });


    userRouter.use(middlewareAuth); //Require Token for all Routes on this Router

    // GET: /api/users
    userRouter.route('/')
        .get(function(req,res){


            sql.execute({  
                query: sql.fromFile( "../sql/user/getUsers" )
            }).then( function( results ) {
                if(results.length > 0){
                    res.json(results);
                } else {
                    res.send("No Users Found");
                }              
            }, function( err ) {
                console.log( "Something bad happened:", err );
            });


            
        });

     
        // GET: /api/users/bsmith
    userRouter.route('/getUserProfile')
    .get(function(req,res){
    
       
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        
        var payload = jwt.decode(token);
     
        user.getProfileByUsername(payload.code).then(function(result){
            res.json({
                success: true,
                message: 'Enjoy your profile !',
                data:result              
            });
        }).catch(function(err){
            res.json({
                success: false,
                message: err       
            });
        });
        
            
    });
        
    return userRouter;
}

module.exports = userRoutes;