const EMS = require("./index.js");

exports.$name_tag = Symbol.toStringTag;
exports.$iterator = Symbol.iterator;
exports.$species = Symbol.species;
exports.$source_species = Symbol("sourceSpecies");
exports.$target_species = Symbol("targetSpecies");
exports.$source = Symbol("source");
exports.$target = Symbol("target");
exports.$ident_ts = Symbol("identTs");

exports.time = function time() {
    return Date.now();
};

/** 
 * @param {Object} obj 
 * @param {String|Symbol} key 
 */
exports.lockProp = function lockProp(obj, key) {
    Object.defineProperty(obj, key, { configurable: false });
};

/**
 * @param {*} value 
 * @param {Object|Function|String} [source] 
 * @param {String} [errMsg=""] 
 * @param {Class<Error>} [errType=Error] 
 * @throws {Error}
 */
exports.assert = function assert(value, source, errMsg = "", errType = Error) {
    if (!value) {
        if (source) {
            if (exports.isObject(source)) {
                errMsg = `${source[exports.$name_tag] || ""}<${source.uid || source.id || ""}> : ` + errMsg;
            } else if (exports.isFunction(source) && source.name) {
                errMsg = `${source.name || "Function"} : ${errMsg}`;
            } else if (exports.isString(source)) {
                errMsg = `${source} : ` + errMsg;
            }
        }
        const err = new errType(errMsg);
        Error.captureStackTrace(err, assert);
        throw err;
    }
};

exports.isString = function isString(value) {
    return typeof value === "string";
};

const RE_isIdentifier = /^\S+$/;
exports.isIdentifier = function isIdentifier(value) {
    return RE_isIdentifier.test(value);
};

exports.isFunction = function isFunction(value) {
    return typeof value === "function";
};

exports.isClass = function isClass(value) {
    return typeof value === "function" && value.prototype && !value.arguments;
};

exports.isClassOf = function isClassOf(topLvlClass) {
    return function isClass(value) {
        return value === topLvlClass || topLvlClass.isPrototypeOf(value);
    };
};

exports.isObject = function isObject(value) {
    return value && typeof value === "object";
};

exports.isArray = function isArray(value) {
    return Array.isArray(value);
};

exports.isEntity = function isEntity(value) {
    return value instanceof EMS.Entity;
};

Object.freeze(exports);