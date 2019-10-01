var sql = require('../../app/database');
var config = require('../../config');
getTicketByIDActive = (TicketID) => new Promise((resolve, reject) => {     
    sql.execute({  
        query: sql.fromFile( "../../sql/ticket/getTicketByIDActive" ),
        params: {
            TicketID: {
                type: sql.Int,
                val: TicketID
            }
        }
    }).then( function( results) {        
        resolve(results);       
    }, function( err ) {    
        reject(err);
    });    
});

listTicketByEventID = (EventID,Code,Status) => new Promise((resolve, reject) => {  
    console.log(EventID,Code,Status);   
    sql.execute({  
        query: sql.fromFile( "../../sql/ticket/listTicketByEventID" ),
        params: {
            EventID: {
                type: sql.Int,
                val: EventID
            },Url: {
                type: sql.String,
                val: config.baseUrl+'/api/ticket/FormByTicket'
            },Code: {
                type: sql.String,
                val: Code
            },Status: {
                type: sql.String,
                val: Status
            }
            
        }
    }).then( function( results) {        
        resolve(results);       
    }, function( err ) {    
        reject(err);
    });    
});





// The code below export the above functios so it can be used in other files.
module.exports = {
    getTicketByIDActive,listTicketByEventID
};