const
    Path = require('path'),
    Fs = require('fs'),
    _ = require("../tools"),
    _fileEnding = ".cyp";

Fs.readdirSync(__dirname)
    .filter(file => file.endsWith(_fileEnding) && file !== "index.js")
    .forEach(_loadCypher);

function _loadCypher(file) {
    let key = file.substr(0, file.length - _fileEnding.length);
    let value = _.normalizeStr(Fs.readFileSync(Path.join(__dirname, file)).toString());
    exports[key] = value;
}