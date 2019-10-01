// In this router we will get some user info and return it to the request if the token is provided
var express = require('express');
var news = require('../../models/news/News');
var conf = require('../../models/config/Config');
 

var newsRoutes = function(){

    var newsRouter = express.Router();

    newsRouter.use((req, res, next) => {
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
    newsRouter.route('/')
        .get(function(req,res){
            news.listNewsByActive(/*params*/).then(function(result){
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

    newsRouter.route('/filter')
        .get(function(req,res){            
            news.listCategory().then(function(resultCategory){
                news.listTag().then(function(resultTag){
                    res.json({
                        success: true,
                        message: 'Enjoy your filter !',
                        data:{
                            'category':resultCategory,
                            'tag':resultTag
                        }              
                    });
                }).catch(function(err){
                    res.json({
                        success: false,
                        message: err       
                    });
                });                  
            }).catch(function(err){
                res.json({
                    success: false,
                    message: err       
                });
            });        
        }); 
        
        

        newsRouter.route('/getByID')
        .get(function(req,res){
            news.getByID(req.query.NewsID).then(function(result){
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

 

        return newsRouter;
}

module.exports = newsRoutes;