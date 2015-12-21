const React = require('react')
const DragImage = require('./drag_image')
const { append } = require('ramda')
const { preventDefault, Http } = require('./utils')
const { Photo, replacePhoto } = require('./model')

module.exports = React.createClass({
  displayName: 'Collage',

  // getInitialState :: { photos :: [Photo] }
  getInitialState() { return { photos: [] } },

  componentDidMount() { Http.get('/photos').fork(this.props.showError, this.updatePhotos) },

  updatePhotos(xs) { this.setState({photos: xs}) },

  onDrop({dataTransfer: dt, clientX: x, clientY: y, currentTarget: t}) {
    const offset = t.getBoundingClientRect().top
    const src = dt.getData('text')
    const photo = Photo(src, x, (y - offset))
    this.updatePhotos(replacePhoto(photo, this.state.photos))
  },

  // saveClicked :: Event -> State Photo
  saveClicked() { Http.post('/save', this.state.photos).fork(this.props.showError, this.updatePhotos) },

  render() {
    const imgs = this.state.photos.map(p => <DragImage src={p.src} style={{top: p.y, left: p.x}} />)
    return (
      <div>
        <button onClick={this.saveClicked}>Save</button>
        <div id="collage" onDrop={this.onDrop} onDragOver={preventDefault}>
          <div id="photos">{imgs}</div>
        </div>
      </div>
    );
  }
});

