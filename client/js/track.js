function translate(){
  let lang = "jw"
  console.log("disini")
  $.ajax({
    url: `http://localhost:3000/3rdparty/translate/` + lang,
    method: `get`,
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(function(response) {
      console.log("sampai sini")
      console.log(response)
    })
    .fail(function(jqXHR, textStatus) {
      console.log(JSON.stringify(jqXHR, null, 2));
      swal("google auth error", "please login using regular login", "error");
    });
}

function findAlbumOrSong() {
  const artist = $("#search-artist").val()
  const song = $("#search-track").val()
  let params = `artist=${artist}`
  if (song) params +=`&song=${song}`
  $.ajax({
    method: 'GET',
    url: `http://localhost:3000/3rdparty/findbyparam?${params}`
  })
  .done(data => {
    $('#search-result').empty()
    $('#search-result').append('<hr>')
    console.log(song)
    console.log(data)
    if (!song) {
      data.album.forEach(album => {
        $('#search-result').append(`
          <div class="card mr-1 mb-4" style="width: 10%;  display: inline-block">
            <img src="${album.strAlbumThumb}/preview" class="card-img-top">
            <div class="card-body">
            <p class="card-text">${album.strAlbum}</p>
            <a href="#" class="btn btn-primary list-song" id="${album.idAlbum}" onclick="listSong()">List Song</a>
            </div>
          </div>
        `)
      })
    }
    else {
      data.track.forEach(track => {
        $('#search-result').append(`
          <div class="card mr-1 mb-4" style="width: 30%;  display: block">
            <div class="card-body">
            <p class="card-text">${track.strArtist} ~ ${track.strTrack}</p>
            <a href="#" class="btn btn-primary add-to-fav" id="${track.idTrack}">Add to Fav</a>
            </div>
          </div>
        `)
      })
    }
    
  })
}

function listSong() {
  $('#search-result').on('click', '.list-song', function(event) {
    event.preventDefault()
    const idAlbum = this.id
    $.ajax({
      method: 'GET',
      url: `http://localhost:3000/3rdparty/tracklist?idAlbum=${idAlbum}`
    })
    .done(function (data){
      $('#track-list').empty()
      $('#track-list').append('<hr>')
      data.track.forEach(track => {
        $('#search-result').append(`
          <div class="card mr-1 mb-4" style="width: 30%;  display: block">
            <div class="card-body">
            <p class="card-text">${track.strArtist} ~ ${track.strTrack}</p>
            <a href="#" class="btn btn-primary add-to-fav" id="${track.idTrack}">Add to Fav</a>
            </div>
          </div>
        `)
      })
    })
  })
}
