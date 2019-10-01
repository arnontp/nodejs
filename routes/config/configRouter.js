// In this router we will get some user info and return it to the request if the token is provided
var express = require('express');
var conf = require('../../models/config/Config');
 

var configRoutes = function(){

    var configRouter = express.Router();

    configRouter.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization,X-Access-Token');
        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization,X-Access-Token');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
            return res.status(200).json({});
        };
        next();
    });

   // newsRouter.use(middlewareAuth); //Require Token for all Routes on this Router

    // GET: 
      
    configRouter.route('/getAgreement')
        .get(function(req,res){
            conf.getAgreement(/*params*/).then(function(result){
                res.json({
                    success: true,
                    message: 'Enjoy your news !',
                    data:result              
                });
            }).catch(function(err){
                res.json({
                    success: false,
                    message: err       
                });
            });        
        });


        return configRouter;
}

module.exports = configRoutes;