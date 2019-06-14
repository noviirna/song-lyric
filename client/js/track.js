function translate(lang) {
  console.log("disini");
  let text = $("#origin").html()
  $.ajax({
    url: `http://localhost:3000/3rdparty/translate/` + lang,
    method: `post`,
    data : {text},
    headers: {
      token: localStorage.getItem("token")
    }
  })
    .done(function(response) {
      console.log("sampai sini");
      $("#translation").html(`
      ${response.translate}
      `)
    })
    .fail(function(jqXHR, textStatus) {
      console.log(JSON.stringify(jqXHR, null, 2));
      swal("google auth error", "please login using regular login", "error");
    });
}

function findAlbum() {
  const artist = $("#search-artist").val();
  const song = $("#search-track").val();
  let params = `artist=${artist}`;
  if (song) params += `&song${song}`;
  $.ajax({
    method: "GET",
    url: `http://localhost:3000/3rdparty/findbyparam?${params}`
  }).done(data => {
    $("#search-result").empty();
    $("#search-result").append("<hr>");
    console.log(song);
    if (!song) {
      data.album.forEach(album => {
        $("#search-result").append(`
          <div class="card mr-1 mb-4" style="width: 30%;  display: inline-block">
            <img src="${album.strAlbumThumb}/preview" class="card-img-top">
            <div class="card-boy">
            <p class="card-text">${album.strAlbum}</p>
            <a href="#" class="btn btn-primary add-to-fav" id="${
              album.idAlbum
            }">List Song</a>
            </div>
          </div>
        `);
      });
    } else {
      data.track.forEach(track => {
        $("#search-result").append(`
          <div class="card mr-1 mb-4" style="width: 30%;  display: inline-block">
            <div class="card-boy">
            <p class="card-text">${track.strArtist} ~ ${track.strTrack}</p>
            <a href="#" class="btn btn-primary add-to-fav" id="${
              track.idTrack
            }">Add to Fav</a>
            </div>
          </div>
        `);
      });
    }
  });
}

function getTrackList() {
  let target =
    "http://theaudiodb.com/api/v1/json/195003/track.php?m=" + "2109614";

  $("#track-list").html(`
  <div class="col mt-3">
  <img
  class="mx-auto d-block"
  src="https://media1.giphy.com/media/10kTz4r3ishQwU/200w.webp?cid=790b76115cff09635466326f4d4419ea&rid=200w.webp"
  style="max-width: 100%; height: auto; margin: auto;"
  ><br>
  <center>Please Wait . . .</center>
  </div>
  `);
  $.ajax({
    url: target,
    method: "get"
  })
    .done(function(response) {
      $("#albumname").html(`
    <div>
      ${
        response.track[0].strAlbum
      } <br><small>${response.track[0].strArtist}</small>
    </div>
    `);
      $("#track-list").html(``);
      $("#track-list").append(`<h5>Song's list</h5>
    <small>
    <a class="float-right" href="" onclick="closeAlbumDetail();return false;">Close Album Details</a>
    </small><br>`);
      for (let i = 0; i < response.track.length; i++) {
        if (
          response.track[i].strMusicVid === "" ||
          response.track[i].strMusicVid === null ||
          response.track[i].strMusicVid === "null"
        ) {
          $("#track-list").append(`
          <ul class="list-group my-1">
            <li class="list-group-item list-group-item-light">
            ${response.track[i].intTrackNumber}. <a href="#" onclick="getLyric('${response.track[i].strArtist}', '${response.track[i].strTrack}')">${response.track[i].strTrack}</a>
            </li>
          </ul>
        `);
        } else {
          $("#track-list").append(`
          <ul class="list-group my-1">
            <li class="list-group-item list-group-item-light">
            ${response.track[i].intTrackNumber}. <a href="#" onclick="getLyric('${response.track[i].strArtist}', '${response.track[i].strTrack}')">${response.track[i].strTrack}</a>
            <a href="${
              response.track[i].strMusicVid
            }" target="_blank" rel="noopener noreferrer"><i class="fa fa-youtube-play" aria-hidden="true"></i></a>
            </li>
          </ul>
        `);
        }
      }
    })
    .fail(function(jqXHR, textStatus) {
      swal(
        "Sorry!",
        "Problem occured in our server, try again later!",
        "error"
      );
      console.log(JSON.stringify(jqXHR));
    });
}


function getLyric(artist, title){
  console.log("disini")
  $.ajax({
    url: `http://localhost:3000/3rdparty/lyric/${artist}/${title}`,
    method: "get"
  })
    .done(function(response) {
      $("#songdetail").html(`
      <center class="my-3">
      <h1>${title} by ${artist}</h1>
      </center>
      <div class="input-group mb-3">
          <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Lihat Arti Lirik</button>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#" onclick="translate('id'); return false">Bahasa Indonesia</a>
            <div role="separator" class="dropdown-divider"></div>
            <a class="dropdown-item" href="#" onclick="translate('jw'); return false">Bahasa Jawa</a>
          </div>
      </div>
      `)
      $("#origin").html(`
      ${response}
      `)
     console.log(response)
    
    })
    .fail(function(jqXHR, textStatus) {
      swal(
        "Sorry!",
        "Problem occured in our server, try again later!",
        "error"
      );
      console.log(JSON.stringify(jqXHR));
    });

}