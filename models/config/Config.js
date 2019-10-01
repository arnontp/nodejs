var sql = require('../../app/database');

getAgreement = () => new Promise((resolve, reject) => {     
    sql.execute({  
        query: sql.fromFile( "../../sql/config/getAgreement" ) 
    }).then( function( results) {        
        resolve(results);       
    }, function( err ) {    
        reject(err);
    });    
});


// The code below export the above functios so it can be used in other files.
module.exports = {
    getAgreement
};