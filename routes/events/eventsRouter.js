// In this router we will get some user info and return it to the request if the token is provided
var express = require('express'),
middlewareAuth = require('../../app/middleware'),
sql = require('../../app/database');
var events = require('../../models/events/Events')

var eventsRoutes = function(){

    var eventsRouter = express.Router();

    eventsRouter.use((req, res, next) => {
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

    // GET: /api/events 
    // 13.7224148,100.5325895
    // 13.9121331,100.5531457
    // lat 1 , lat 2 , long 1 , long 2
 
    eventsRouter.route('/')
        .get(function(req,res){
            var lat = req.query.lat==undefined?null:req.query.lat;
            var long = req.query.lat==undefined?null:req.query.long;

            events.listByActive(lat,long).then(function(results){
                if(results.length > 0){
                  
                    res.json({
                        success: true,
                        message: 'Enjoy your events!',
                        data:results                        
                      });

                } else {
                    res.send("No Events Found");
                }    
            }).catch(function(err){
                res.json({
                    success: false,
                    message: err        
                });
            });

             
        });




        
        eventsRouter.route('/getByID')
        .get(function(req,res){  
            sql.execute({  
                query: sql.fromFile( "../../sql/events/getByID" ),
                params: {
                    lat: {
                        type: sql.Float,
                        val: req.query.lat==undefined?null:req.query.lat
                    },long: {
                        type: sql.Float,
                        val: req.query.long==undefined?null:req.query.long
                    },EventID: {
                        type: sql.Int,
                        val: req.query.EventID
                    }
                }
            }).then( function( results ) {
                if(results.length > 0){
                  
                    res.json({
                        success: true,
                        message: 'Enjoy your events!',
                        data:results                        
                      });

                } else {
                    res.send("No Events Found");
                }              
            }, function( err ) {
                console.log( "Something bad happened:", err );
            });
        });

        return eventsRouter;


        
}

module.exports = eventsRoutes;