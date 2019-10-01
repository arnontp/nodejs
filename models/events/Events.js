var sql = require('../../app/database');

getEventByID = (EventID) => new Promise((resolve, reject) => {     
    sql.execute({  
        query: sql.fromFile( "../../sql/events/getEventByID" ),
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


listByActive = (lat,long) => new Promise((resolve, reject) => {     
    sql.execute({  
        query: sql.fromFile( "../../sql/events/listByActive" ),
        params: {
            lat: {
                type: sql.Float,
                val: lat
            },long: {
                type: sql.Float,
                val: long
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
    getEventByID,listByActive
};