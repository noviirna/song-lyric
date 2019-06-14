
function loadmainpage() {
  $("#app").html(`
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <a class="navbar-brand" href="#">Pahami Liriknya</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarColor01">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <a class="nav-link" href="#" onclick="signOut()">Log Out<span class="sr-only">(current)</span></a>
        </li>
      </ul>
    </div>
  </nav>

  <div class="container-fluid mt-3 h-100">
    <div class="row justify-content-md-center">
      <div class="col-md-auto">
        <form class="form-inline" id="search-form" onsubmit="findAlbumOrSong()" >
          <input type="search" class="form-control mb-2 mr-sm-2" id="search-artist" placeholder="artist">
          <input type="search" class="form-control mb-2 mr-sm-2" id="search-track" placeholder="song">
          <button type="submit" class="btn btn-primary mb-2" >Submit</button>
        </form>
      </div>
    </div>
    
    <div id="search-result">
      
    </div>
    <div id="player">
    
    </div>

    <div id="track-list">
    
    </div>

    <div id="lyric">
      <h1 id="songdetail" class="my-5"> </h1>
      <div class="row">
      <div class="col-1"> </div>
      <div id="origin" class="col-5">

      </div>
      <div id="translation" class="col-5">

      </div>
      <div class="col-1"> </div>
      </div>
    </div>

    <div id="track-list">
    
    </div>

  </div>
    `);
    getFavorites()
  gapi.load("auth2", function() {
    gapi.auth2.init();
  });
}

function loadloginpage() {
  $("#app").html(`
  <div class="h-100" style="display: flex; align-items:center;">
    <div class="container">
      <div class="col-sm-12 col-md-12 mb-5">
      <center>
        <i class="fa fa-music fa-5x mb-3" aria-hidden="true"></i>
        <h1 onclick="translate()">Pahami Liriknya</h1>
      </center>
      </div>
      <div class="col-md-3"></div>
      <div class="col-md-6 p-5 border mb-5">
        <form class="form-signin" onsubmit="signIn();return false">
          <center><h2 class="form-signin-heading mb-5">MASUK DENGAN AKUN TERDAFTAR</h2></center>
          <input type="email" id="email" class="form-control mb-3" placeholder="Email address" required="" autofocus="">
          <input type="password" id="password" class="form-control mb-4" placeholder="Password" required="">
          <button class="btn btn-lg btn-primary btn-block mb-4" type="submit">MASUK<i class="fa fa-sign-in" aria-hidden="true"></i></button>
          <div class="row" style="display: flex; align-items:center; justify-content:center;">
            <div class="col"><h5 class="pull-right">Atau masuk dengan akun Google mu</h5></div>
            <div id="g-signin2" class="col"></div>
          </div>
        </form>
        <center class="mt-4">Mau daftar? Klik <a href="#" onclick="loadregisterpage()">disini</a></center>
      </div>
      <div class="col-md-3"></div>
    </div>
  </div>
    `);
  gapi.signin2.render("g-signin2", {
    scope: "profile email",
    longtitle: true,
    theme: "light",
    onsuccess: onSignIn
    // 'onfailure': onFailure
  });
}

function loadregisterpage() {
  $("#app").html(`
  <div class="h-100" style="display: flex; align-items:center;">
    <div class="container">
      <div class="col-sm-12 mb-5">
      <center>
        <i class="fa fa-music fa-5x mb-3" aria-hidden="true"></i>
        <h1>Pahami Liriknya</h1>
      </center>
      </div>
      <div class="col-md-3"></div>
      <div class="col-md-6 p-5 border mb-5">
        <form class="form-signin" onsubmit="register();return false">
          <center><h2 class="form-signin-heading mb-5">DAFTAR AKUN BARU</h2></center>
          <input type="email" id="email" class="form-control mb-3" placeholder="Email address" required="" autofocus="">
          <input type="password" id="password" class="form-control mb-4" placeholder="Password" required="" >
          <button class="btn btn-lg btn-primary btn-block mb-3" type="submit">DAFTAR</button>
        </form>
        <center class="mt-4">Sudah daftar? Atau, punya akun Google? Login <a href="#" onclick="loadloginpage()">disini</a> aja</center>
      </div>
      <div class="col-md-3"></div>
    </div>
  </div>
    `);
}
