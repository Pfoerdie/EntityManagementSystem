/** 
 * @module EMS.info
 * @author Simon Petrac
 */

const
    Fs = require('fs'),
    _ = require("../tools"),
    _module = require(".");

_.define(exports, "Entity", class {

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

});

_.enumerate(exports, "File", class extends exports.Entity {

    static get name() {
        return "File";
    }

    constructor(param) {
        super(param);
        _.assert.string(param.path);
    }

    read() {
        return _.promify(Fs.readFile, this.param.path);
    }

    write(buffer) {
        _.assert(buffer instanceof Buffer, "use a Buffer for write operations");
        return _.promify(Fs.writeFile, this.param.path);
    }

});