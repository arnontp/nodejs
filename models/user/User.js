var sql = require('../../app/database');
var jwt = require('jsonwebtoken');
var config = require('../../config');
getProfileByUsername = (username) => new Promise((resolve, reject) => {     
    sql.execute({  
        query: sql.fromFile( "../../sql/user/getUserProfile" ),
        params: {
            username: {
                type: sql.String,
                val: username
            }
        }  
    }).then( function( results) {        
        resolve(results);       
    }, function( err ) {    
        reject(err);
    });    
});

getByID = (UserID) => new Promise((resolve, reject) => {     
    sql.execute({  
        query: sql.fromFile( "../../sql/user/getUserByID" ),
        params: {
            UserID: {
                type: sql.Int,
                val: UserID
            }
        }  
    }).then( function( results) {        
        resolve(results);       
    }, function( err ) {    
        reject(err);
    });    
});


getByID = (UserID) => new Promise((resolve, reject) => {     
    sql.execute({  
        query: sql.fromFile( "../../sql/user/getUserByID" ),
        params: {
            UserID: {
                type: sql.Int,
                val: UserID
            }
        }  
    }).then( function( results) {        
        resolve(results);       
    }, function( err ) {    
        reject(err);
    });    
});

createToken = (username) => new Promise((resolve, reject) => {     
    sql.execute({  
        query: sql.fromFile( "../../sql/user/getUserByLogin" ),
        params: {
            username: {
                type: sql.String,
                val: username
            }
        }  
    }).then( function( results) {        

        var token = jwt.sign(
            {
              id:results[0].UserID,
              code:results[0].Code,
              fname:results[0].fname,
              lname:results[0].lname,
              type:results[0].Type
            }, config.secret, 
            {
            expiresIn: '1m' // token expires in 30 minutes, can be days like 100d, etc.
          });
        
          resolve(token);    

    }, function( err ) {    
        reject(err);
    });    



});


// The code below export the above functios so it can be used in other files.
module.exports = {
    getProfileByUsername,getByID,createToken
};