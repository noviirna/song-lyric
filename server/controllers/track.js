const Track = require(`../models/track`);
const { decodeToken } = require("../helpers/token");

class ControllerTrack {
  static create(req, res, next) {
    Track.create({...req.body,userId: req.user._id})
      .then(created => {
        res.status(201).json(created);
      })
      .catch(next);
  }

  static delete(req, res, next) {
    Track.findByIdAndDelete(req.params.id)
      .then(deleted => {
        res.status(200).json(deleted);
      })
      .catch(next);
  }

  static detail(req, res, next) {
    Track.findById(req.params.id)
      .then(found => {
        if (found) {
          res.status(200).json(found);
        } else {
          next({ code: 400,  message: `that is not exists` });
        }
      })
      .catch(next);
  }

  static all(req, res, next) {
    Track.find({ userId: decodeToken(req.headers.token)._id })
      .then(founds => {
        if (founds.length >= 1) {
          let asc = founds.sort((a, b) => {
            return a.createdAt - b.createdAt;
          });
          if (req.query.sort === "desc") {
            res.status(200).json(asc.reverse());
          } else {
            res.status(200).json(asc);
          }
        } else {
          res.status(200).json(founds);
        }
      })
      .catch(next);
  }
}

module.exports = ControllerTrack;
