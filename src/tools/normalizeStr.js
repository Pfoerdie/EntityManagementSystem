module.exports = function (str) {
    return str
        .replace(/^\s*\/\/.*\n/mg, "") // remove comments
        .replace(/\s+/g, " ") // shrink whitespaces
        .trim();
};