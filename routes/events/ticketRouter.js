// In this router we will get some user info and return it to the request if the token is provided
var express = require('express');
var middlewareAuth = require('../../app/middleware');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var events = require('../../models/events/Events');
var eventForm = require('../../models/events/EventForm');
var eventTicket = require('../../models/events/EventTicket');
var eventTransaction = require('../../models/events/EventTransaction');
var config = require('../../config');

var ticketRoutes = function(){

    var ticketRouter = express.Router();

    ticketRouter.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization,X-Access-Token');
        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization,X-Access-Token');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
            return res.status(200).json({});
        };
        next();
    });

    //Require Token for all Routes on this Router
    ticketRouter.use(middlewareAuth); 
    
    // GET: /api/ticket
    ticketRouter.route('/FormByTicket')
        .get(function(req,res){     
           
            eventTicket.getTicketByIDActive(req.query.TicketID).then(function(resultTicket){
             
                if(resultTicket.length > 0){   

                    const plaintText = resultTicket[0].TicketID+resultTicket[0].Number;
                    console.log('plaintText:'+plaintText);

                    const hash = bcrypt.hashSync(plaintText, resultTicket[0].Salt);
                    console.log('hash:'+hash);
                 
                    if(hash === resultTicket[0].Hash){
                   
                        eventForm.getFormByTicketID(resultTicket[0].TicketID).then(function(resultForm){

                            if(resultForm.length>0){          

                                eventTransaction.listTransactionByEventID(resultTicket[0].EventID).then(function(resultTransaction){
                                    eventTransaction.listTransactionByEventID(resultTicket[0].EventID).then(function(resultTransaction){
                                        events.getEventByID(resultTicket[0].EventID).then(function(resultEvent){

                                            res.json({
                                                success: true,
                                                message: 'Enjoy your form !',
                                                data:{
                                                    resultForm:resultForm,
                                                    resultTicket:{
                                                        TicketID:resultTicket[0].TicketID,
                                                        Code:resultTicket[0].Code,
                                                        Number:resultTicket[0].Number,
                                                        Events:resultEvent
                                                    },
                                                    resultTransaction:resultTransaction
                                                }
                                            });

                                        });

                                    });
                                    

                                });
                            }else{
                                eventForm.createFormByTicketID(req.query.TicketID).then(function(){
                                    eventForm.getFormByTicketID(req.query.TicketID).then(function(resultForm){
                                        res.json({
                                            success: true,
                                            message: 'Enjoy your form !',
                                            data:resultForm              
                                        });
                                    }).catch(function(err){
                                        res.json({
                                            success: false,
                                            message: 'Cannot found form'      
                                        });
                                    });
                                }).catch(function(err){
                                    console.log(err);
                                    res.json({
                                        success: false,
                                        message: 'Cannot Create Form'        
                                    });
                                });
                            }
                        }).catch(function(err){      
                            console.log(err);                   
                            res.json({
                                success: false,
                                message: err       
                            });
                        });

                    }else{
                        res.json({
                            success: false,
                            message: 'ticket hash invalid !'              
                        });
                    }
                }else{
                    res.json({
                        success: false,
                        message: 'No ticket found !'              
                    });
                }
            }).catch(function(err){
                res.json({
                    success: false,
                    message: err        
                });
            });
                
        });
 
    ticketRouter.route('/list')            
        .get(function(req,res){       
            eventTicket.listTicketByEventID(req.query.EventID,req.decoded.code,req.query.Status).then(function(result){
                res.send(result);
            }).catch(function(err){              
                res.json({
                    success: false,
                    message: err    
                });
            });
               
        });  
 
    return ticketRouter;
}

module.exports = ticketRoutes;