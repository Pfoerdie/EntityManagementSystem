/** 
 * @module EMS.info
 * @author Simon Petrac
 */

const
    Fs = require('fs'),
    _ = require("../tools"),
    _module = require(".");

/**
 * @name EMS.info.Entity
 * @class
 * @private
 * @abstract
 */
_.define(exports, "Entity", class {

    /**
     * @name Entity.name
     * @type {string}
     * @getter
     */
    static get name() {
        return "Entity";
    }

    /**
     * @constructs Entity
     * @param {EMS.repo.Param} param 
     */
    constructor(param) {
        _.assert(new.target != exports.Entity, "Entity is an abstract class");
        _.assert(param instanceof _module.repo.Entity, "invalid construction parameter");
        _.assert(param.type === new.target.name, "invalid parameter type");
        _.define(this, 'param', param);
    }

    async update() {
        // TODO update the Asset/Party/etc param
    }

    /**
     * @name Entity#toJSON
     * @returns {JSON}
     */
    toJSON() {
        return Object.assign({}, this.param);
    }

    /**
     * @name Entity#toString
     * @returns {String<JSON>}
     */
    toString() {
        return JSON.stringify(this);
    }

});

_.enumerate(exports, "File", class extends exports.Entity {

    static get name() {
        return "File";
    }

    constructor(param) {
        super(param);
        _.assert(param instanceof _module.repo.Asset, "invalid parameter class");
        _.assert.string(param.path, "invalid path parameter");
    }

    async read() {
        let buffer = await _.promify(Fs.readFile, this.param.path);
        return buffer;
    }

    async write(buffer) {
        _.assert(buffer instanceof Buffer, "use a Buffer for write operations");
        await _.promify(Fs.writeFile, this.param.path, buffer);
    }

});

_.enumerate(exports, "User", class extends exports.Entity {

    static get name() {
        return "User";
    }

    constructor(param) {
        super(param);
        _.assert(param instanceof _module.repo.Party, "invalid parameter class");
        _.assert.string(param.username, "invalid username parameter");
        _.assert.string(param.password, "invalid password parameter");
    }

    async setUsername() {
        // TODO
    }

    async setPassword() {
        // TODO
    }

});