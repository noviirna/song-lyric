function addToFavorites(i){
    // let data = $(this).data()
    // console.log(`adding to favorite`)
    // console.log($(this).text())
    // console.log(`this should be the data`,data)
    console.log(`this will be the post data`)
    console.log(TRACKS[i])
    // let {idTrack} = TRACKS[i]
    $.ajax({
        method: 'POST',
        url: `http://localhost:3000/tracks`,
        data: TRACKS[i]
      })
      .done(data => {
        console.log('favorite should be added already');
        TRACKS[i].favorited = true;
        //should reload from array of TRACKS
      })
      
}