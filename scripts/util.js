var fs = require('fs');

function cp(src, dest, cb) {
  var cbCalled = false;
  var r = fs.createReadStream(src);
  var w = fs.createWriteStream(dest);

  function done(e) {
    if (!cbCalled) {
      cbCalled = true;
      cb(e);
    }
  }

  r.on('error', done);
  w.on('error', done);
  w.on('close', done);
  r.pipe(w);
}

module.exports = {
  cp: cp
};
