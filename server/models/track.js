const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TrackSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  strAlbum: String,
  strAlbumThumb: String,
  strTrack: String,
  strArtist: String,
  idTrack: String,  
  idArtist: String
  
}, );

const Track = mongoose.model("Track", TrackSchema);
module.exports = Track;