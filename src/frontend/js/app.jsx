const React = require('react')
const Flickr = require('./flickr')
const Collage = require('./collage')

module.exports = React.createClass({
  displayName: 'App',

  // getInitialState :: {error :: String}
  getInitialState() { return {error: ""} },

  // showError :: String -> State Error
  showError(s) { this.setState({error: s}); },

  render() {
    return (
      <div id="app">
        { this.state.error ? <p>{this.state.error}</p> : null }
        <Flickr showError={this.showError} />
        <Collage showError={this.showError} />
      </div>
    );
  }
});

