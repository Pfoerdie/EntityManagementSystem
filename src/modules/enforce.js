/** 
 * @module EMS.enforce
 * @author Simon Petrac
 */

const
    _ = require("../tools"),
    _module = require("."),
    _ext = {};

/** 
 * @name EMS.enforce.request
 * @param {Object} param 
 * @param {string} param.action
 * @param {string|Object} param.target
 * @returns {*}
 * @function
 * @public
 * @async
 */
_.enumerate(exports, "request", async function (param) {
    _.assert.object(param, "invalid request parameter");
    _.assert.string(param.action, "invalid request action");
    _.assert(_.is.string(param.target) || _.is.object(param.target), "invalid request target");
    // TODO
});
