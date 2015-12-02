const React = require('react')
const { flickrSearch } = require('./model')

module.exports = React.createClass({
  displayName: 'Flickr',

  // getInitialState :: {term :: String, results :: [Url] }
  getInitialState() { return {term: "", results: []} },

  // termChanged :: Event -> State Term
  termChanged(e) { this.setState({term: e.currentTarget.value}) },

  // updateResults :: [Url] -> State Results
  updateResults(xs) { this.setState({results: xs}) },

  // searchClicked :: Event -> _
  searchClicked(e) { flickrSearch(this.state.term).fork(this.props.showError, this.updateResults) },

  render() {
    const imgs = this.state.results.map(src => <img src={src} key={src} />)
    return (
      <div id="flickr">
        <input onChange={this.termChanged} />
        <button onClick={this.searchClicked}>Search</button>
        <div id="results">{imgs}</div>
      </div>
    );
  }
});

