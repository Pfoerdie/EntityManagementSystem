/** 
 * @module EMS.service
 * @author Simon Petrac
 */

const
    _ = require("../tools"),
    _module = require("."),
    _cache = {};

/** 
 * @name EMS.service.express
 * @type {Express~Router}
 * @public
 */
_.enumerate(exports, "express", function () {
    if (_cache.express) return _cache.express;

    const
        Express = require('express');

    _cache.express = Express.Router();
    // TODO
    return _cache.express;
});

/** 
 * @name EMS.service.socket
 * @type {*}
 * @public
 */
_.enumerate(exports, "socket", function () {
    if (_cache.socket) return _cache.socket;

    const
        SocketIO = require('socket.io');

    _cache.socket = null;
    // TODO
    return _cache.socket;
});