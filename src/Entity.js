const EMS = require("./index.js");
const { $iterator, $name_tag, $species, $ident_ts,
    assert, isObject, isIdentifier, lockProp, time } = require("./util.js");
const neo4j = require("./neo4j.js");
const readEntity = neo4j.requireQuery(__dirname, "readEntity.cyp");

/** @type {Map<Entity#uid, Entity} */
const entites = new Map();

module.exports = class Entity {

    get [$name_tag]() { return "Entity"; }
    static get [$species]() { return Entity; };

    constructor(record) {
        assert(new.target !== Entity, Entity, "abstract class", Error);
        assert(isObject(record) && isIdentifier(record.uid), this, "invalid record", TypeError);
        for (let key in record) {
            try {
                this[key] = record[key];
            } catch (err) { }
        }
        this.uid = record.uid;
        lockProp(this, "uid");
        assert(!entities.has(this.uid), this, "uid already in use", Error);
        entites.set(this.uid, this);
        /** @type {Number} */
        this[$ident_ts] = 0;
    }

    // Create Read Update Delete (List)
    // static create
    // read
    // update
    // delete
    // static list

    // static async get(uid) {
    //     // TODO maybe something better
    //     assert(isIdentifier(uid), this.get, "invalid uid", TypeError);
    //     if (entities.has(uid)) {
    //         return entites.get(uid);
    //     } else {
    //         const records = await readEntity({ uid });
    //         const ts = time();
    //         if (records.length === 0) {
    //             return null;
    //         } else {
    //             const entity = new this[$species](records[0]);
    //             entity[$ident_ts] = ts;
    //         }
    //     }
    // }

};