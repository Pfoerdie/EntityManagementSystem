const EMS = require("./index.js");
const assert = require("assert");
const is = require("./is.js");

class Asset extends EMS.Entity {

    #partOf;
    #hasPolicy;

    // #data;

    async load() {
        assert(this instanceof Asset, "This is not an Asset.");
        const { props, rels, types } = await super.load({ props: true, rels: true, types: true });
        // TODO 
        // assert(types.includes("Asset"), "The types do not include Asset.");
        // this.#partOf = rels.partOf || [];
        // this.#hasPolicy = rels.hasPolicy || [];
        // this.#data = props;
    }

}

module.exports = Asset;