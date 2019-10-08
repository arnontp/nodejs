var express = require('express'),
    jwt = require('jsonwebtoken'),
    config = require('../config');
    var user = require('../models/user/User');

    var redis = require('redis');
   
    var client = redis.createClient(6379,'127.0.0.1');
    client.on('connect', function() {
        console.log('Redis client connected');
    });
    client.on('error', function (err) {
        return {
        status:false,
        data:err
      }
    });

// route middleware to verify a token
function  middlewareAuthorizationProvider (req, res, next) {

    // baseUrl: '/api/ticket',
    // originalUrl: '/api/ticket/test',
    // Url /test
    
    var url = req.baseUrl+req._parsedUrl.pathname;
   
    var urlPublic = ['/','/api/ticket/FormByTicket','/api/ticket/test'];

    // public allow all
    if(urlPublic.indexOf(url) > -1){
      next();
    }else{
      var token = req.body.token || req.query.token || req.headers['x-access-token'];  
      // token 
      if(token){

        jwt.verify(token, config.secret, function(err, decoded) {      
          if (err) {                   
            // invalid token
            return res.status(500).send({ 
                success: false, 
                message: 'No token provided.' 
            });  
          } else {
              // valid token        
              // redis  
              client.hmget(decoded.code,['token','change'], function (error, result) {
              
                if (error) {            
                  return res.status(500).send({ 
                    success: false, 
                    message: error
                  });  
                }
                
                if(result == null){
                  
                  user.getProfileByUsername(decoded.code).then(function(resultUser){
                    if(resultUser.length>0){
                      if(resultUser[0].Active == 1){
                         
                        user.createToken(resultUser[0].Code).then(function(newToken){
                          // clear redis
                          client.del(decoded.code);
                          // create redis
                          client.hmset([decoded.code,'token', newToken,'change',0], redis.print);
                          // check authorization
                          req.decoded = decoded;
                          next();
                        }).catch(function(err){      
                                           
                          return res.status(500).send({ 
                            success: false, 
                            message: 'Cannot Create Token'
                          });  
                      });
                      }else{
                        return res.status(200).send({ 
                          success: false, 
                          message: 'ผู้ใช้ถูกระงับ'
                      });  
                      }
                    }else{
                      return res.status(200).send({ 
                          success: false, 
                          message: 'ไม่พบข้อมูล'
                      });  
                    }
                  }).catch(function(err){
                    return res.status(500).send({ 
                        success: false, 
                        message: err
                    });   
                  });     
                
                }else{
                 
                  if(result[1]==0){   
                    req.decoded = decoded;       
                    next();
                  }else{
                    // change       
                    user.getProfileByUsername(decoded.code).then(function(resultUser){
                      if(resultUser.length>0){
                        if(resultUser[0].Active == 1){
                          user.createToken(resultUser[0].Code).then(function(newToken){

                            client.del(decoded.code);
                            client.hmset([decoded.code,'token', newToken,'change',0], redis.print);
                            req.decoded = decoded;
                            next();
                          }).catch(function(err){                                                
                            return res.status(500).send({ 
                              success: false, 
                              message: 'Cannot Create Token'
                            });  
                          });
                        }else{
                            return res.status(200).send({ 
                              success: false, 
                              message: 'ผู้ใช้ถูกระงับ'
                          });  
                          }
                        }else{
                          return res.status(200).send({ 
                              success: false, 
                              message: 'ไม่พบข้อมูล'
                          });  
                        }
                      }).catch(function(err){
                        return res.status(500).send({ 
                            success: false, 
                            message: err
                        });   
                      });   
 
                  }
               
                }
             
              });
          
            }
       
        });
         
      }else{
        // token null
        return res.status(200).send({ 
            success: false, 
            message: 'token null.' 
        });   
      }
    }
}




  
module.exports = middlewareAuthorizationProvider;