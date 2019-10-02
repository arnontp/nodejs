//TODO: Authenticate User Against DB Instead of Hardcoded User in /app/user.js
var express = require('express'),
  jwt = require('jsonwebtoken'),
  config = require('../config'),
  { check, validationResult } = require('express-validator/check'),
  sql = require('../app/database'),
  bcrypt = require('bcrypt')
app = express();


var authenticateRouter = function () {

  var authRouter = express.Router();

  authRouter.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization,X-Access-Token');
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization,X-Access-Token');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
      return res.status(200).json({});
    };
    next();
  });

  // POST: /api/authenticate/  -- authenticates the user and returns token
  authRouter.post('/', [
    check('username').not().isEmpty(),
    check('password').not().isEmpty()
  ], function (req, res) {
 
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(200).json(
        {
          success: false,
          message: 'input invalid',
          data: {
            errors: errors.array()
          }
        }
      );
    }

    // query user
    sql.execute({
      query: sql.fromFile("../sql/user/getUserByLogin"),
      params: {
        username: {
          type: sql.NVARCHAR,
          val: req.body.username
        }
      }
    }).then(async function (results) {
 
      bcrypt.hash(req.body.password, results[0].Salt, (err, hash) => {
        if (err) {
          res.json({ success: false });
        }

        if (hash == results[0].Password) {

          var token = jwt.sign(
            {
              id: results[0].UserID,
              code: results[0].Username,
              fname: results[0].FirstName,
              lname: results[0].LastName,
            }, config.secret,
            {
              expiresIn: '30m' // token expires in 30 minutes, can be days like 100d, etc.
            });
 
          return res.status(200).send({
            success: true,
            data: token,
            message: 'success'
          });

        } else {
          return res.status(200).send({
            success: false,   
            message: 'password invalid'
          });
        }
 
      });
  
    }, function (err) {
      return res.status(200).send({
        success: false,   
        message: err
      });
    });
  });

  return authRouter;
}


module.exports = authenticateRouter;