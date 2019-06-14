const axios = require('axios')
const $ = require('cheerio')
var h2p = require('html2plaintext')
const WIKIPEDIA = `https://en.wikipedia.org/w/api.php`

const functions = {
    getDetailAbout: (req, res, next) => {
        let toSearch = req.params.search

        axios
            .get(WIKIPEDIA, {
                // ?action=parse&page=${search}&format=json
                params: { action: 'query', list: 'search', srsearch: toSearch, format: 'json' }
                //search first
                // https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=German%20sheperd&format=json


            })
            .then(searchResult => {
                let searched = searchResult.data.query.search
                    .slice(0, 3)
                    .map(el => el.pageid)
                // res.send(result.data.parse.text['*'])
                // res.json(searched)
                // return axios.get(WIKIPEDIA, { params: { action: 'parse', pageid: searched[0], prop: 'text', section: 2, format: 'json' } })
                return Promise.all(searched.map(id => {
                    return axios.get(WIKIPEDIA, { params: { action: 'parse', pageid: id, section: 0, prop: 'text', format: 'json' } })
                }))
            }).then(contents => {
                console.log(contents.length, contents.map(c => c.status).join())
                let cleaned = contents.map(c => c.data.parse)
                cleaned.forEach(data => {
                    //     // console.log(typeof data.text)
                    //     // data.processed  = []

                    let texts = ($('div.mw-parser-output > p', data.text['*']).text())

                    //     // .each((i,el)=>{
                    //     //     console.log(`~~~~~~~~`)
                    //     //     console.log(el)
                    //     //     console.log(`~~~~~~~~`)
                    //     // })
                    //     // console.log(Object.keys($('div.mw-parser-output > p', data.text['*'])))
                    data.text = h2p(texts)
                    data.textLength = data.text.length
                })

                // let filtered = cleaned.filter(data => data.textLength > 30 && data.textLength < 100)
                // console.log(filtered.length)
                // if (filtered.length == 0) filtered = [cleaned[0]]
                // console.log(filtered.length)
                // res.json(filtered)
                res.json(cleaned)
            })
            .catch(error => res.status(500).json(error))
        // req.params.search
    }
}

module.exports = functions