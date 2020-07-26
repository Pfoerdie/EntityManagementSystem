const EMS = require("./index.js");
const assert = require("assert");
const is = require("./is.js");
const uuid = require("uuid/v4");

class Entity {

    static #entities = new Map();

    #uid;
    #removed = false;

    constructor(uid) {
        assert(new.target !== Entity, "Entity is an abstract class.");
        assert(is.string.nonempty(uid), "The uid must be a non empty string.");
        assert(!Entity.#entities.has(uid), "This uid is already used by another Entity.");
        Entity.#entities.set(uid, this);
        this.#uid = uid;
    }

    get uid() {
        return this.#uid;
    }

    remove() {
        // NOTE removing entities could be very bad without care,
        //      because other processes might depend on them.
        assert(this instanceof Entity, "This is not an Entity.");
        if (!this.#removed) {
            this.#removed = true;
            Entity.#entities.delete(this.#uid);
        }
    }

    async load({ props = true, rels = false, types = false } = {}) {
        assert(this instanceof Entity, "This is not an Entity.");
        assert(!this.#removed, "This Entity instance got removed.");
        // TODO retrieve from database and just return
        // dont change any attributes. that is for the inheriting classes
        // return null if not found
    }

    async update({ props = null, rels = null, types = null } = {}) {
        assert(this instanceof Entity, "This is not an Entity.");
        assert(!this.#removed, "This Entity instance got removed.");
        // TODO update data of props, rels and types individually
    }

    async delete(confirm = false) {
        assert(this instanceof Entity, "This is not an Entity.");
        assert(!this.#removed, "This Entity instance got removed.");
        assert(confirm === true, "The deletion must be confirmed with a true.");
        // TODO detach delete this
        this.remove();
    }

    // static async create({ props = { uid: uuid() }, rels = {}, types = ["Entity"] } = {}) {
    //     assert(this === Entity, "This is not the Entity class.");
    //     // TODO asserts and extract for transmission
    //     // TODO create only if uid is not blocked
    // }

    static async load(uid) {
        assert(Entity.isPrototypeOf(this), "This is not a subclass of Entity.");
        if (Entity.#entities.has(uid)) {
            return Entity.#entities.get(uid);
        } else {
            const entity = new this(uid);
            assert(entity instanceof Entity, "That is not an instance of Entity.");
            await entity.load();
            return entity;
        }
    }

}

module.exports = Entity;