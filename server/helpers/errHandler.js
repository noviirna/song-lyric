module.exports = function(err, req, res, next) {
  console.log(JSON.stringify(err, null, 4));
  if (err.code) {
    res.status(err.code).json({ message: err.message });
  } else if (err.name === "ValidationError") {
    res.status(400).json({ message: `"${err.message}"` });
  } else if(err.response.status) {
    res.status(err.response.status).json({message : err.response.statusText})
  } else {
    res.status(500).json({ message: "internal server error" });
  }
};