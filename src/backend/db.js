const Sequelize = require('sequelize');
const sequelize = new Sequelize('collagr', 'brian', 'root', {dialect: 'postgres'});
const Task = require('data.task')
const {curry} = require('ramda')

const Photo = sequelize.define('Photo', {
  src: Sequelize.STRING,
  x: Sequelize.INTEGER,
  y: Sequelize.INTEGER
});


// sync :: Task Error Conn
const sync = new Task((rej, res) => sequelize.sync().then(res).catch(rej))

// create :: Table -> {} -> Task Error Record
const create = curry((table, attrs) => new Task((rej, res) => table.create(attrs).then(res).catch(rej)))

// all :: Table -> {} -> Task Error [Record]
const all = curry((table, query) => new Task((rej, res) => table.findAll(query).then(res).catch(rej)))

module.exports = {sync, create, all, Photo}
