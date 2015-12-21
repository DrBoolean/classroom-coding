const { all, create, Photo } = require('./db')
const { traverse } = require('pointfree-fantasy')
const Task = require('data.task')


// savePhoto :: {} -> Task Error Record
const savePhoto = create(Photo)

module.exports = (app) => {

  app.get('/', (req, res) => res.render('app', {}))

  app.get('/photos', (req, res) => all(Photo, {}).fork((err) => res.json(err),
                                                       (ps) => res.json(ps)))

  app.post('/save', (req, res) =>
    traverse(savePhoto, Task.of, req.body).fork((err) => res.json(err),
                                                (ps) => res.json(ps)))
}
