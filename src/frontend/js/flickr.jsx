const React = require('react')
const DragImage = require('./drag_image')
const { flickrSearch } = require('./model')

module.exports = React.createClass({
  displayName: 'Flickr',

  // getInitialState :: {term :: String, results :: [Photo] }
  getInitialState() { return {term: "", results: []} },

  // termChanged :: Event -> State Term
  termChanged(e) { this.setState({term: e.currentTarget.value}) },

  // updateResults :: [Url] -> State Results
  updateResults(xs) { this.setState({results: xs}) },

  // searchClicked :: Event -> State Results
  searchClicked(e) { flickrSearch(this.state.term).fork(this.props.showError, this.updateResults) },

  render() {
    const imgs = this.state.results.map(p => <DragImage src={p.src} />)
    return (
      <div id="flickr">
        <input onChange={this.termChanged} />
        <button onClick={this.searchClicked}>Search</button>
        <div id="results">{imgs}</div>
      </div>
    );
  }
});

