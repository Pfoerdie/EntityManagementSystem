const
    Path = require('path'),
    Fs = require('fs'),
    _fileEnding = ".js";

Fs.readdirSync(__dirname)
    .filter(file => file.endsWith(_fileEnding) && file !== "index.js")
    .forEach(_loadCypher);

function _loadCypher(file) {
    let key = file.substr(0, file.length - _fileEnding.length);
    let value = require(Path.join(__dirname, file));
    exports[key] = value;
}