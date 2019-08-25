exports.number = function (value) {
    return typeof value === 'number' && !isNaN(value) && value < Infinity && value > -Infinity;
}

exports.string = function (value) {
    return typeof value === 'string';
}

exports.function = function (value) {
    return typeof value === 'function';
}

exports.array = function (value) {
    return Array.isArray(value);
}

exports.object = function (value) {
    return value && typeof value == 'object';
}