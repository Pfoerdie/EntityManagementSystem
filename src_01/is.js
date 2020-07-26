const EMS = require("./index.js");

exports.number = function (value) {
    return typeof value === 'number' && !isNaN(value);
};

exports.number.finite = function (value) {
    return exports.number(value) && value < Infinity && value > -Infinity;
};

exports.number.integer = function (value) {
    return typeof value === 'number' && value === parseInt(value);
};

exports.string = function (value) {
    return typeof value === 'string';
};

exports.string.nonempty = function (value) {
    return typeof value === 'string' && value.length > 0;
};

exports.symbol = function (value) {
    return typeof value === 'symbol';
};

exports.array = function (value) {
    return Array.isArray(value);
};

exports.array.nonempty = function (value) {
    return Array.isArray(value) && value.length > 0;
};

exports.object = function (value) {
    return typeof value === 'object';
};

exports.object.nonnull = function (value) {
    return typeof value === 'object' && value !== null;
};

exports.function = function (value) {
    return typeof value === 'function';
};

exports.instance = function (value) {
    return value instanceof Object;
}

exports.instance.Entity = function (value) {
    return value instanceof EMS.Entity;
}

exports.instance.Asset = function (value) {
    return value instanceof EMS.Asset;
}

exports.instance.Party = function (value) {
    return value instanceof EMS.Party;
}

exports.instance.Policy = function (value) {
    return value instanceof EMS.Policy;
}