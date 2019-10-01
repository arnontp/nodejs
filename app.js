var express = require('express'),
    bodyParser = require('body-parser'),
    appRootDir = require('app-root-dir').get(),
    path = require('path');
 

    var app = express();
    var port = process.env.port || 9000;

    app.use(function(req, res, next) {
       
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', '*');
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);
        // Pass to next layer of middleware
        next();
    });
  
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());

    // Setup Routes
    authenticateRouter = require('./routes/authenticateRouter')();
    helpRouter = require('./routes/helpRouter')();
    userRouter = require('./routes/userRouter')();
    

    app.use('/authenticate', authenticateRouter);
    app.use('/api/help', helpRouter);
    app.use('/api/users', userRouter);
   
   

    // Default API Landing Page
    app.get ('/', function(req, res){       
        res.sendFile(path.join(appRootDir + '/views/index.html'));
    });
 

    app.listen(port, function(){
        console.log('Gulp is Running on port :' + port);
    });