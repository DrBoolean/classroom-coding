const { getJSON, post } = require('jquery')
const { curry } = require('ramda')
const Task = require('data.task')

const Http = {
  // get :: Url -> Task Error JSON
  get: (url) => {
    return new Task((rej, res) => getJSON(url).done(res).error(rej))
  },

  // post :: Url -> Task Error JSON
  post: curry((url, params) => {
    return new Task((rej, res) => post(url, JSON.stringify(params)).done(res).error(rej))
  })
}

// log :: a -> a
const log = (x) => { console.log(x); return x }

// preventDefault :: Event -> Event
const preventDefault = (e) => { e.preventDefault(); return e }

module.exports = { Http, preventDefault, log }

