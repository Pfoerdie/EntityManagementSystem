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
_.enumerate(exports, "express", function () {
    if (_ext.express) return _ext.express;

    const
        Express = require('express');

    _ext.express = Express.Router();
    // TODO
    return _ext.express;
});

/** 
 * @name EMS.enforce.socket
 * @type {*}
 * @public
 */
_.enumerate(exports, "socket", function () {
    if (_ext.socket) return _ext.socket;

    const
        SocketIO = require('socket.io');

    _ext.socket = null;
    // TODO
    return _ext.socket;
});