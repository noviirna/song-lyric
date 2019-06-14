const User = require(`../models/user`);
const Track = require(`../models/track`);
const jwt = require(`jsonwebtoken`);
const { decodeToken } = require(`../helpers/token`);


module.exports = {
  authentication: function(req, res, next) {
    try {
      let decoded = jwt.verify(req.headers.token, process.env.SECRET_JWT);
      User.findById(decoded._id)
      .then(found=>{
        if(found){
          req.user = found          
          next();
        }
      })
      .catch(next)
    } catch (err) {
      next({
        code: 401,
        message: `login first!`
      });
    }
  },
  authorization: function(req, res, next) {
    let condition = {
      _id: req.params.id,
      userId: decodeToken(req.headers.token)._id
    };

    Track.findOne(condition)
      .then(result => {
        if (result) {
          next();
        } else {
          next({
            code: 401,
            message: `access not allowed!`
          });
        }
      })
      .catch(err => {
        next({
          code: 500,
          message: `internal server error!`
        });
      });
  },
};
