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