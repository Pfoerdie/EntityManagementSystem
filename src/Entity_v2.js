const EMS = require("./index.js");
const { $name_tag, $species, $type, $ident_ts, $labels,
    assert, lockProp, time,
    isObject, isSubClassOf, isArray, isIdentifier, isTruthy } = require("./util.js");
const neo4j = require("./neo4j.js");
const readEntity = neo4j.requireQuery(__dirname, "readEntity.cyp");

module.exports = class Entity {

    static get name() { return "Entity"; }
    static get [$species]() { return Entity; };
    get [$name_tag]() { return this[$type].name; }

    /**
     * @param {Object} entity 
     * @param {String} entity.uid 
     * @param {Array<String>|string} entity.type 
     */
    constructor(entity) {
        assert(new.target !== Entity, Entity, "abstract class", Error);
        this[$type] = new.target;
        lockProp(this, $type);

        assert(isObject(entity), this, "invalid entity", TypeError);
        const { uid, type } = entity;

        assert(isIdentifier(uid), this, "invalid uid", TypeError);
        this.uid = uid;
        lockProp(this, "uid");

        if (!isArray(type)) type = [type];
        assert(Entity.name !== this[$type].name, "no overridden type", Error);
        assert(type.every(isIdentifier) && type.includes(this[$type].name), this, "invalid type", TypeError);
        if (!type.includes(Entity.name)) type.unshift(Entity.name);
        assert(type.includes(this[$type].name), this, "invalid type", Error);
        this.type = type;
        lockProp(this, "type");

        for (let key in entity) {
            if (!(key in this)) {
                this[key] = entity[key];
            }
        }

        /** @type {Number} */
        this[$ident_ts] = 0;
        /** @type {Array<String>} */
        this[$labels] = null;
    }

    get loaded() { return this[$ident_ts] > 0; }
    get deleted() { return this[$ident_ts] < 0; }
    get ts() { return Math.abs(this[$ident_ts]); }

    reset() {
        for (let key in this) {
            switch (key) {
                case "uid": break;
                case "type": this.type.splice(0, this.type.length, Entity.name, this[$type].name); break;
                default: delete this[key];
            }
        }
        this[$ident_ts] = 0;
        this[$labels] = null;
        return this;
    }

    async create() {
        assert(!this.loaded, this.create, "already loaded since " + this.ts, Error);
        // TODO
        // after successful create: this[$labels] = this.type.slice(0);
        // better, to remove duplicates: this[$labels] = Array.from(new Set(this.type));
    }

    async read() {
        assert(!this.deleted, this.read, "already deleted since " + this.ts, Error);
        // TODO
    }

    async update() {
        assert(!this.deleted, this.update, "already deleted since " + this.ts, Error);
        assert(this.loaded, this.update, "not loaded yet", Error);
        // TODO
        // + check if labels have changed
    }

    async delete() {
        assert(!this.deleted, this.delete, "already deleted since " + this.ts, Error);
        assert(this.loaded, this.delete, "not loaded yet", Error);
        // TODO
    }

};