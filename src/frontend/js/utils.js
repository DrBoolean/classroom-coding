const Task = require('data.task')
const {getJSON, post} = require('jquery')
const {curry} = require('ramda')
const {Just, Nothing} = require('data.maybe')

// preventDefault :: Event -> _
const preventDefault = (e) => e.preventDefault()

const Http = {
  // get :: Url -> Task Error JSON
  get: (url) => new Task((rej, res) => getJSON(url).error(rej).done(res)),

  // post :: Url -> {} -> Task Error JSON
  post: curry((url, params) => new Task((rej, res) => post(url, JSON.stringify(params)).error(rej).done(res)))
}

// indexOf :: a -> [a] -> Maybe Number
const indexOf = curry((x, xs) => {
  const idx = xs.indexOf(x)
  return idx < 0 ? Nothing() : Just(idx)
})

module.exports = { preventDefault, Http, indexOf }
