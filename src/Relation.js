const EMS = require("./index.js");
const { $species, $iterator, $name_tag, $ident_ts, $source, $target, $source_species, $target_species,
    assert, isClassOf, lockProp, time } = require("./util.js");
const $target_ts = Symbol("targetTs"), $ident_target = Symbol("lastTarget");

module.exports = class Relation {

    get [$name_tag]() { return "Relation"; }
    static get [$species]() { return Relation; }
    static get [$source_species]() { return EMS.Entity; }
    get [$target_species]() { return EMS.Entity; }

    get [$iterator]() {
        return this[$target].values();
    }

    /**
     * @param {Entity} source 
     */
    constructor(source) {
        assert(new.target !== Relation, Relation, "abstract class", Error);
        assert(source instanceof new.target[$source_species], this, "invalid source", TypeError);
        assert(!(source[this[$name_tag]] instanceof Relation), this, "the source already has this relation", Error);
        /** @type {Entity} */
        this[$source] = source;
        lockProp(this, $source);
        /** @type {Map<Entity#uid, Entity} */
        this[$target] = new Map();
        /** @type {WeakMap<Entity, Number>} */
        this[$target_ts] = new WeakMap();
        lockProp(this, $target);
        source[this[$name_tag]] = this;
        lockProp(source, this[$name_tag]);
        /** @type {Number} */
        this[$ident_ts] = 0;
        this[$ident_target] = null;
    }

    // add(target) {
    //     // TODO maybe do async and make a clever method
    //     assert(target instanceof this[$target_species], this.add, "invalid target", TypeError);
    //     if (this[$target].has(target.uid)) {
    //         assert(this[$target].get(target.uid) === target, this.add, "target error", Error);
    //         return this;
    //     }
    //     this[$target].set(target.uid, target);
    //     this[$target_ts].set(target, 0);
    // }

};