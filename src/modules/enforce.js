/** 
 * @module EMS.enforce
 * @author Simon Petrac
 */

const
    Express = require('express'),
    _ = require("../tools"),
    _module = require(".");

/** 
 * @name EMS.enforce.request
 * @returns {*}
 * @function
 * @public
 * @async
 */
_.enumerate(exports, "request", function async() {
    // TODO
});

/** 
 * @name EMS.enforce.express
 * @type {Express~Router}
 * @public
 */
_.enumerate(exports, "express", Express.Router());