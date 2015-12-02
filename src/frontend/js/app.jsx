const React = require('react')

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
      </div>
    );
  }
});

