function populateWiki(query) {
    if (query) {
        $.ajax({
            method: 'GET',
            url: `http://localhost:3000/details/${query + ' ' + 'music'}`
        })
            .done(response => {
                $('#wiki').html('')
                response.forEach(entry => {
                    $('#wiki').append(`
                  <div class="col-4">
                        <div class="card" >
                        <!-- <img class="card-img-top" src="..." alt="Card image cap"> -->
                            <div class="card-body">
                            <h5 class="card-title">${entry.title}</h5>
                            <p class="card-text text-overflow">${entry.text}</p>
                        <a href="https://en.wikipedia.org/?curid=${entry.pageid}" class="btn btn-primary">see wikipedia</a>
                        </div>
                    </div>
                    </div>
                  `)
                })
            })
            .fail((jqXHR, textStatus) => {
                $('#wiki').html('')
            })

    }
}