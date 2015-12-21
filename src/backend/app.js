const express = require('express');
const path = require('path');
const server = require('./server');
const bodyParser = require('body-parser');
const {sync} = require('./db');
const Task = require('data.task')

const app = express();

app.set('port', 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, 'public')));

const main = sync.chain(() => {
  return new Task((rej, res) => {
    server(app)
    app.listen(3000, () => res('Express: listening on 3000'))
  })
})

main.fork(console.log, console.log)
