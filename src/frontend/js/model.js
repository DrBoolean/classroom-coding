const Task = require('data.task')
const {getJSON} = require('jquery')
const {compose, replace, prop, map} = require('ramda')
const Url = String

const Http = {
  // get :: Url -> Task Error JSON
  get: (url) => new Task((rej, res) => getJSON(url).error(rej).done(res))
}


const baseUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=14c4ebab40155d8c54dacb0642f46d68&tags={TAGS}&extras=url_s&format=json&jsoncallback=?'

// makeUrl :: String -> Url
const makeUrl = (t) => replace("{TAGS}", t, baseUrl)

// extractUrls :: JSON -> [Url]
const extractUrls = compose(map(prop('url_s')), prop('photo'), prop('photos'))

// flickrSearch :: Term -> Task Error JSON
const flickrSearch = compose(map(extractUrls), Http.get, makeUrl)

module.exports = { flickrSearch }

