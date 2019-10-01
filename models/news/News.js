var sql = require('../../app/database');

getByID = (NewsID) => new Promise((resolve, reject) => {     
    sql.execute({  
        query: sql.fromFile( "../../sql/news/getByID" ),
        params: {
            NewsID: {
                type: sql.Int,
                val: NewsID
            }
        }  
    }).then( function( results) {        
        resolve(results);       
    }, function( err ) {    
        reject(err);
    });    
});


listNewsByActive = () => new Promise((resolve, reject) => {     
    sql.execute({  
        query: sql.fromFile( "../../sql/news/listNewsByActive" )
    }).then( function( results) {        
        resolve(results);       
    }, function( err ) {    
        reject(err);
    });    
});


listCategory = () => new Promise((resolve, reject) => {     
    sql.execute({  
        query: sql.fromFile( "../../sql/news/listCategory" )
    }).then( function( results) {        
        resolve(results);       
    }, function( err ) {    
        reject(err);
    });    
});


listTag = () => new Promise((resolve, reject) => {     
    sql.execute({  
        query: sql.fromFile( "../../sql/news/listTag" )
    }).then( function( results) {        
        resolve(results);       
    }, function( err ) {    
        reject(err);
    });    
});



 

// The code below export the above functios so it can be used in other files.
module.exports = {
    listNewsByActive,listCategory,listTag,getByID
};