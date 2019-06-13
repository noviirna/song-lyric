function onSignIn(googleUser) {
  const idToken = googleUser.getAuthResponse().id_token;
  $.ajax({
    url: `http://localhost:3000/logingoogle`,
    method: `POST`,
    headers: {
      token: idToken
    }
  })
    .done(function(response) {
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", response.user)
      checkLogin();
      swal("Logged In", `success log in!`, "success");
    })
    .fail(function(jqXHR, textStatus) {
      console.log(JSON.stringify(jqXHR, null, 2));
      swal("google auth error", "please login using regular login", "error");
    });
}

function register() {
  if ($("#email").val() === "" || $("#password").val() === "") {
    swal("please complete the form!");
  } else {
    let input = {
      email: $("#email").val(),
      password: $("#password").val()
    };

    $.ajax({
      url: "http://localhost:3000/register",
      method: `POST`,
      data: input
    })
      .done(function(response) {
        if (response.email) {
          loadloginpage();
          $("#email").val(response.email);
        } else {
          loadregisterpage();
        }
      })
      .fail(function(jqXHR, textStatus) {
        console.log(JSON.stringify(jqXHR));
        swal("Sorry!", jqXHR.responseJSON.message, "error");
      });
  }
}

function signIn() {
  if ($("#email").val() === "" || $("#password").val() === "") {
    swal("please complete the form!");
  } else {
    let input = {
      email: $("#email").val(),
      password: $("#password").val()
    };
    $.ajax({
      url: "http://localhost:3000/login",
      method: `POST`,
      data: input
    })
      .done(function(response) {
        if (response.token) {
          localStorage.setItem("token", response.token),
            localStorage.setItem("user", response.user);
          checkLogin();
        } else {
          swal("Sorry", "something went wrong", "error");
          setTimeout(function(){loadloginpage();}, 1000)
        }
      })
      .fail(function(jqXHR, textStatus) {
        console.log(JSON.stringify(jqXHR));
        swal("Sorry!", jqXHR.responseJSON.message, "error");
      });
  }
}


function signOut() {
  gapi.auth2.getAuthInstance().signOut()
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  checkLogin();
  swal("Logged Out", `success logged out!`, "success");
}

