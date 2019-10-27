/** 
 * @module EMS.enforce
 * @author Simon Petrac
 */

const
    _ = require("../tools"),
    _module = require("."),
    _ext = {};

/**
 * @typedef {Object} EMS~Request
 * @property {string} action
 * @property {string|Object} target
 */

/**
 * @typedef {*} EMS~Response 
 */

/** 
 * @name EMS.enforce.request
 * @param {EMS~Request} param 
 * @returns {EMS~Response}
 * @function
 * @public
 * @async
 */
_.enumerate(exports, "request", async function (param) {
    let context = _module.context.create(null, param);
    // TODO
});
