var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');
var async = require('async');
var util = require('./util');

console.log('### Running server');
async.series([
  function(done) {
    console.log('--- Cleaning up');
    rimraf.sync(path.join(__dirname, '../.www'));
    fs.mkdirSync(path.join(__dirname, '../.www'));
    done();
  },
  function(done) {
    console.log('--- Copy test.html => index.html');
    util.cp(path.join(__dirname, '../test.html'), path.join(__dirname, '../.www/index.html'), done);
  }
]);
