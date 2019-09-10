const _ = require(".");

function assert(value, errMsg, errType = Error) {
    if (!value) {
        let err = (errMsg instanceof Error) ? errMsg : null;
        if (!err) {
            err = new errType(errMsg);
            Error.captureStackTrace(err, assert);
        }
        throw err;
    }
}

assert.number = function (value, errMsg) {
    return assert(_.is.number(value), errMsg, TypeError);
}

assert.string = function (value, errMsg) {
    return assert(_.is.string(value), errMsg, TypeError);
}

assert.function = function (value, errMsg) {
    return assert(_.is.function(value), errMsg, TypeError);
}

assert.object = function (value, errMsg) {
    return assert(_.is.object(value), errMsg, TypeError);
}

module.exports = assert;