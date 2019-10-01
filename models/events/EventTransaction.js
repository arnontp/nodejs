var sql = require('../../app/database');

listTransactionByEventID = (EventID) => new Promise((resolve, reject) => {     
    sql.execute({  
        query: sql.fromFile( "../../sql/event_transaction/listTransactionByEventID" ),
        params: {
            EventID: {
                type: sql.Int,
                val: EventID
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
    listTransactionByEventID
};