var parseOBJ = require('parse-wavefront-obj');
var fs = require('fs');
var buf = fs.readFileSync('../models/hookLogo.obj');
var mesh = parseOBJ(buf);
var out = '';

var positions = flatten(mesh.positions);
var cells = flatten(mesh.cells);

out += 'exports.positions=' + JSON.stringify(positions) + ';\n';
out += 'exports.cells=' + JSON.stringify(cells) + ';\n';

fs.writeFileSync('../app/models/hookLogo.js', out );

function flatten(arr) {
  var out = [];
  for (var i = 0; i < arr.length; i++) {
    var a = [];
    a.push(arr[i][0]);
    a.push(arr[i][1]);
    a.push(arr[i][2]);
    out.push(a);
  }
  return out;
}


