/** 
 * @module EMS.context
 * @author Simon Petrac
 */

const
    _ = require("../tools"),
    _module = require(".");

/**
 * @name EMS~Context
 * @class
 * @private
 */
class Context {

    /**
     * @constructs Context
     * @param {Session} session 
     * @param {EMS~Request} param
     */
    constructor(session, param) {
        // TODO
    }

}

/**
 * @name EMS.context.create
 * @param {Session} session 
 * @param {EMS~Request} param 
 * @returns {EMS~Context}
 * @function
 * @public
 */
_.define(exports, 'create', function (session, param) {
    // TODO
    _.assert.object(param, "invalid request parameter");
    _.assert.string(param.action, "invalid request action");
    _.assert(_.is.string(param.target) || _.is.object(param.target), "invalid request target");
    // TODO
    return new Context(session, param);
});