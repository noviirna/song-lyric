$("a").click(function(event) {
  event.preventDefault();
});

$("button").click(function(event) {
  event.preventDefault();
});

$(document).ready(function() {
  checkLogin();
});

function checkLogin() {
  if (localStorage.getItem("token")) {
    loadmainpage();
  } else {
    loadloginpage();
  }
}