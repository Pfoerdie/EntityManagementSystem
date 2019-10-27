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
 * @name EMS.service.socket_io
 * @type {SocketIO~IO}
 * @public
 */
_.enumerate(exports, "socket_io", function () {
    if (_cache.io) return _cache.io;

    const
        SocketIO = require('socket.io');

    _cache.io = SocketIO(/* TODO param */);
    // TODO
    return _cache.io;
});