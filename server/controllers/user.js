const User = require(`../models/user`);
const { comparePassword } = require(`../helpers/password`);
const { generateToken } = require(`../helpers/token`);
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);

class ControllerUser {
  static register(req, res, next) {
    User.create(req.body)
      .then(created => {
        res.status(201).json(created);
      })
      .catch(next);
  }

  static login(req, res, next) {
    User.findOne({ email: req.body.email })
      .then(found => {
        if (found) {
          if (comparePassword(req.body.password, found.password) === true) {
            let token = generateToken(found._id, found.email);
            let user = found._id;
            res.status(200).json({ token, user });
          } else {
            next({ code: 400, message: `password / email wrong` });
          }
        } else {
          next({ code: 400, message: `password / email wrong` });
        }
      })
      .catch(next);
  }

  static logingoogle(req, res, next) {
    var newEmail = "";
    client
      .verifyIdToken({
        idToken: req.headers.token,
        audience: process.env.CLIENT_ID
      })
      .then(ticket => {
        console.log("1")
        console.log(ticket.getPayload(), "disini");
        newEmail = ticket.getPayload().email;
        return User.findOne({
          email: newEmail
        });
      })
      .then(userLogin => {
        if (!userLogin) {
          return User.create({
            email: newEmail,
            password: "password"
          });
        } else {
          return userLogin;
        }
      })
      .then(newUser => {
        let token = generateToken(newUser._id, newUser.email);
        let obj = {
          token,
          user: newUser._id
        };
        res.status(200).json(obj);
      })
      .catch(next);
  }
}

module.exports = ControllerUser;
