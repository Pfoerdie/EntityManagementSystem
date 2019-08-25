module.exports = function (obj, key, value) {
    let writable = true;
    Object.defineProperty(obj, key, { value, writable });
};