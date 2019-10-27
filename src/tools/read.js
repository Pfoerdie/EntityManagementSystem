const
    Fs = require("fs");

exports.sync = function (path) {
    return Fs.readFileSync(path).toString();
};

exports.async = function (path) {
    return new Promise((resolve, reject) => Fs.readFile(path, (err, result) => err ? reject(err) : resolve(result.toString())));
};