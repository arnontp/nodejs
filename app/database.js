var sql = require('seriate');

var connectDatabase = function(){
    var config = {  
    "server": "localhost",
    "user": "sa",
    "password": "Bar@cuda",
    "database": "STARTER"
    };
    sql.setDefaultConfig( config );
    return sql;
}

module.exports = connectDatabase();