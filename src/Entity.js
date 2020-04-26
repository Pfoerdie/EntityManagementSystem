const EMS = require("./index.js");
const assert = require("assert");
const is = require("./is.js");

class Entity {

    static #entities = new Map();

    #uid;
    #ready = false;
    #cleared = false;

    constructor(uid) {
        assert(is.string.nonempty(uid), "The uid must be a non empty string.");
        assert(!Entity.#entities.has(uid), "This uid is already used by another Entity.");
        Entity.#entities.set(uid, this);
        this.#uid = uid;
    }

    get uid() {
        return this.#uid;
    }

    clear() {
        assert(this instanceof Entity, "This is not an Entity.");
        if (!this.#cleared) {
            this.#cleared = true;
            Entity.#entities.delete(this.#uid);
        }
    }

    async load() {
        assert(this instanceof Entity, "This is not an Entity.");
        // TODO retrieve from database and just return
        // dont change any attributes. that is for the inheriting classes
    }

    static async load(uid) {
        // TODO return from entities or create one and load
        // Maybe just an interface
    }

}

module.exports = Entity;