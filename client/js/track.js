var hasilfilter = [];
function translate(lang) {
  let text = $("#origin").html();
  $.ajax({
    url: `http://localhost:3000/3rdparty/translate/` + lang,
    method: `post`,
    data: { text },
    headers: {
      token: localStorage.getItem("token")
    }
  })
    .done(function(response) {
      $("#translation").html(`
      ${response.translate}
      `);
    })
    .fail(function(jqXHR, textStatus) {
      console.log(JSON.stringify(jqXHR, null, 2));
      swal("google auth error", "please login using regular login", "error");
    });
}

function findAlbumOrSong() {
  const artist = $("#search-artist").val();
  const song = $("#search-track").val();
  let params = `artist=${artist}`;
  if (song) params += `&song=${song}`;
  $("#search-result").html(`
  <div class="col mt-3">
    <img
      class="mx-auto d-block p-5"
      src="https://media1.giphy.com/media/10kTz4r3ishQwU/200w.webp?cid=790b76115cff09635466326f4d4419ea&rid=200w.webp"
      style="max-width: 200px; height: auto; margin: auto;"
      ><br>
      <center>Please Wait . . .</center>
  </div>
  `);
  console.log("disini");
  $.ajax({
    method: "GET",
    url: `http://localhost:3000/3rdparty/findbyparam?${params}`
  })
    .done(data => {
      $("#search-result").empty();
      if (data.album == null && data.track == null) {
        $("#search-result").html(`
      <div class="col mt-3">
      <img
        class="mx-auto d-block"
        style="max-width: 200px;"
        src="https://www.desicomments.com/wp-content/uploads/2018/09/Im-So-So-So-So-So-Sorry.jpg"
        style="max-width: 100%; height: auto; margin: auto;"
        >
        <center>Sorry! The data isn't available on our database.</center>
        </div>   
          `);
      } else {
        if (!song) {
          hasilfilter = data.album;
          data.album.forEach(album => {
            if (
              album.strAlbumThumb == "" ||
              album.strAlbumThumb == null ||
              album.strAlbumThumb == "null"
            ) {
              $("#search-result").append(`
              <div class="card mx-2 my-2" style="max-width: 200px; display: inline-block">
              <div class="p-auto">
              <img src="https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fsupport.apple.com%2Fcontent%2Fdam%2Fedam%2Fapplecare%2Fimages%2Fen_US%2Fitunes%2Ffeatured-contetn-itunes-icon_2x.jpg&f=1" style="max-width: 200px;" class="card-img-top">
              <div class="card-boy">
              <p class="card-text">${album.strAlbum}</p>
              <a href="##lyric" onclick='getTrack("${
                album.idAlbum
              }")'>List Song</a>
              </div>
              </div>
              </div>
            `);
            } else {
              $("#search-result").append(`
            <div class="card mx-2 my-2" style="max-width: 200px; display: inline-block">
            <div class="p-auto">
            <img src="${
              album.strAlbumThumb
            }/preview" style="max-width: 200px;" class="card-img-top">
            <div class="card-boy">
            <p class="card-text">${album.strAlbum}</p>
            <a href="#lyric" onclick='getTrack("${
              album.idAlbum
            }")'>List Song</a>
            </div>
            </div>
            </div>
          `);
            }
          });
        } else {
          hasilfilter = data.track;
          data.track.forEach(track => {
            $("#search-result").append(`
            <div class="card mx-2 my-2" style="max-width: 200px; display: inline-block">
            <div class="p-auto">
            <img src="${
              track.strAlbumThumb
            }/preview" style="max-width: 200px;" class="card-img-top">
            <div class="card-boy">
            <p class="card-text">${track.strArtist} ~ ${track.strTrack}</p>
            <a href="##lyric" id="${track.idTrack}">List Song</a>
            </div>
            </div>
            </div>
          `);
          });
        }
      }
    })
    .fail(function(jqXHR, textStatus) {
      $("#search-result").html(`
    <div class="col mt-3">
    <img
      class="mx-auto d-block"
      style="max-width: 200px;"
      src="https://www.desicomments.com/wp-content/uploads/2018/09/Im-So-So-So-So-So-Sorry.jpg"
      style="max-width: 100%; height: auto; margin: auto;"
      >
      <center>Sorry! The data isn't available on our database.</center>
      </div>   
        `);
    });
}

function getTrack(idAlbum) {
  let target = "http://localhost:3000/3rdparty/tracklist?idAlbum=" + idAlbum;
  $("#origin").html("");
  $("#translation").html("");
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
      $("#track-list").html(``);
      $("#track-list").append(`<h5>
        ${response.track[0].strAlbum} by ${response.track[0].strArtist} 
      </h5>
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
            ${
              response.track[i].intTrackNumber
            }. <a href="#origin" onclick="getLyric('${
            response.track[i].strArtist
          }', '${response.track[i].strTrack}')">${
            response.track[i].strTrack
          }</a>
            </li>
          </ul>
        `);
        } else {
          $("#track-list").append(`
          <ul class="list-group my-1">
            <li class="list-group-item list-group-item-light">
            <div id="${response.track[i].idTrack}">
            a
            </div>
            ${
              response.track[i].intTrackNumber
            }. <a href="#origin" onclick="getLyric('${
            response.track[i].strArtist
          }', '${response.track[i].strTrack}')">${
            response.track[i].strTrack
          }</a>
            <a href="#${response.track[i].idTrack}" onclick="watchVideo('${
            response.track[i].idTrack
          }','${
            response.track[i].strMusicVid
          }')"><i class="fa fa-youtube-play" aria-hidden="true"></i></a>
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

function watchVideo(divid, url) {
  url = url.replace(/watch\?v=/g, "embed/");
  $(`#${divid}`).html(`
  <center>
    <iframe
      width="420"
      height="315"
      src="${url}">
    </iframe>
  </center>
  `);
}

function getLyric(artist, title) {
  $.ajax({
    url: `http://localhost:3000/3rdparty/lyric/${artist}/${title}`,
    method: "get"
  })
    .done(function(response) {
      console.log(response)
      $("#songdetail").html("");
      $("#origin").html("");
      $("#translation").html("");
      $("#songdetail").html(`
      <center class="my-3">
      <h1>${title} by ${artist}</h1>
      <a href="#translation" onclick="translate('id'); return false">Bahasa Indonesia</a>
      <a href="#translation" onclick="translate('jw'); return false">Bahasa Jawa</a>
      </center>
      `);
      $("#origin").html(`
      ${response}
      `);
    })
    .fail(function(jqXHR, textStatus) {
      $("#songdetail").html("");
      $("#origin").html("");
      $("#translation").html("");
      $("#songdetail").html(`
        <div class="col mt-3">
        <img
        class="mx-auto d-block"
        style="max-width: 200px;"
        src="https://www.desicomments.com/wp-content/uploads/2018/09/Im-So-So-So-So-So-Sorry.jpg"
        style="max-width: 100%; height: auto; margin: auto;"
        >
        <center>Sorry! The data isn't available on our database.</center>
        </div>
      `);
      swal(
        "Sorry!",
        "Lyric does not exist in our database :( We will fix it as soon as possible!",
        "error"
      );
      console.log(JSON.stringify(jqXHR));
    });
}
