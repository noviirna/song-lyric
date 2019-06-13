const bcrypt = require("bcryptjs");

module.exports = {
  hashPassword: function(str) {
    return bcrypt.hashSync(str, 5);
  },
  comparePassword: function(pass, hash) {
    return bcrypt.compareSync(pass, hash);
  }
};
