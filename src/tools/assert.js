const _ = require(".");
module.exports = assert;

function assert(value, errMsg, errType = Error) {
    if (!value) {
        let err = errMsg instanceof Error ? errMsg : new errType(errMsg);
        Error.captureStackTrace(err, assert);
        throw err;
    }
}

assert.number = function (value, errMsg) {
    return exports.assert(_.is.number(value), errMsg, TypeError);
}

assert.string = function (value, errMsg) {
    return exports.assert(_.is.string(value), errMsg, TypeError);
}

assert.function = function (value, errMsg) {
    return exports.assert(_.is.function(value), errMsg, TypeError);
}

assert.object = function (value, errMsg) {
    return exports.assert(_.is.object(value), errMsg, TypeError);
}