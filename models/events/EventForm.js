var sql = require('../../app/database');

 
getFormByTicketID = (TicketID) => new Promise((resolve, reject) => {
    sql.execute({  
        query: sql.fromFile( "../../sql/event_form/getFormByTicketID" ),
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

 createFormByTicketID = (TicketID) => new Promise((resolve, reject) => {
     //create form
    sql.execute({  
        query: sql.fromFile( "../../sql/event_form/createFormByTicketID" ),
        params: {
            TicketID: {
                type: sql.Int,
                val: TicketID
            }
        }
    }).then( function( results ) {   
        console.log('success');  
        resolve(results);       
    }, function( err ) {    
        console.log('err');  
        console.log(err);  
        
        reject(err);
    });   
 });

 
  

// The code below export the above functios so it can be used in other files.
module.exports = {  
    getFormByTicketID,
    createFormByTicketID
};