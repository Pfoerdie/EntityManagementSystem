/** 
 * @module EMS.repo
 * @author Simon Petrac
 * 
 * {@link https://www.w3.org/TR/odrl-model/#infoModel Param Information Model}
 */

const
    Neo4j = require('neo4j-driver').v1,
    _ = require("../tools"),
    _query = require("../cypher");

/**
 * @name _driver
 * @type {Neo4j~driver}
 * @private
 */
let _driver = null;

/** 
 * @name EMS.repo.connect
 * @param {string} [hostname="localhost"]
 * @param {string} [username="neo4j"]
 * @param {string} [password="neo4j"]
 * @function
 * @public
 */
_.enumerate(exports, 'connect', function (hostname = "localhost", username = "neo4j", password = "neo4j") {
    _.assert(!_driver, "already connected");
    _.assert(_.is.string(hostname) && _.is.string(username) && _.is.string(password), "invalid arguments");
    _driver = Neo4j.driver("bolt://" + hostname, Neo4j.auth.basic(username, password));
});

/** 
 * @name EMS.repo.ping
 * @returns {Neo4j~ServerInfo}
 * @function
 * @async
 * @public
 */
_.enumerate(exports, 'ping', async function () {
    _.assert(_driver, "not connected");
    let session = _driver.session();
    try {
        let result = await session.run("RETURN null");
        session.close();
        return result.summary.server;
    } catch (err) {
        session.close();
        throw err;
    }
});

_.enumerate(exports, 'wipeData', async function (confirm = false) {
    // TODO temporary - remove after testing
    _.assert(!confirm, "not confirmed");
    _.assert(_driver, "not connected");
    await _requestNeo4j("MATCH (n) DETACH DELETE n");
});

/**
 * @name EMS.repo.Param
 * @class
 * @private
 * @abstract
 */
_.define(exports, 'Param', class {

    /**
     * @constructs Param
     * @param {Object} param 
     */
    constructor(param) {
        _.assert(new.target != exports.Param, "Param is an abstract class");
        _.assert(_.is.object(param) && _.is.string(param.uid), "invalid construction parameter");
        Object.assign(this, param);
        _.enumerate(this, "uid", param.uid);
    }

});


/**
 * @name EMS.repo.Asset
 * @extends EMS.repo.Param
 * @class
 */
_.define(exports, 'Asset', class extends exports.Param {

    /**
     * @name Asset.find
     * @param {{...*}} param 
     * @returns {Asset}
     * @async
     */
    static async find(param) {
        _.assert(_.is.object(param), "invalid search parameter");
        let result = await _requestNeo4j(_query["Asset.find"], { param });
        _.assert(result.length === 1, result.length > 1 ? "no unique result" : "nothing found");
        return new exports.Asset(result[0].param, result[0].partOf);
    }

    /**
     * @name Asset.create
     * @param {{uid: string, ...*}} param 
     * @returns {boolean}
     * @async
     */
    static async create(param) {
        _.assert(_.is.object(param) && _.is.string(param.uid), "invalid creation parameter");
        let result = await _requestNeo4j(_query["Asset.create"], { param });
        _.assert(result.length === 1, "nothing created");
        return result[0].created;
    }

    /**
     * @constructs Asset
     * @param {Object} param 
     * @param {Array<string>} [partOf=[]] 
     */
    constructor(param, partOf = []) {
        _.assert(_.is.array(partOf) && partOf.every(_.is.string), "invalid creation parameter");
        super(param);
        _.define(this, "partOf", partOf);
    }

    /**
     * @name Asset#update
     * @returns {boolean}
     * @async
     */
    async update() {
        _.assert(false, "not implemented");
        // TODO
    }

    /**
     * @name Asset#delete
     * @returns {boolean}
     * @async
     */
    async delete() {
        _.assert(false, "not implemented");
        // TODO
    }

});

/**
 * @name EMS.repo.AssetCollection
 * @extends EMS.repo.Asset
 * @class
 */
_.define(exports, 'AssetCollection', class extends exports.Asset {

    /**
     * @name AssetCollection.find
     * @param {{...*}} param 
     * @returns {AssetCollection}
     * @async
     */
    static async find(param) {
        _.assert(_.is.object(param), "invalid search parameter");
        let result = await _requestNeo4j(_query["AssetCollection.find"], { param });
        _.assert(result.length === 1, result.length > 1 ? "no unique result" : "nothing found");
        return new exports.AssetCollection(result[0].param, result[0].partOf);
    }

    /**
     * @name AssetCollection.create
     * @param {{ uid: string, ...*}} param 
     * @returns {boolean}
     * @async
     */
    static async create(param) {
        _.assert(_.is.object(param) && _.is.string(param.uid), "invalid creation parameter");
        let result = await _requestNeo4j(_query["AssetCollection.create"], { param });
        _.assert(result.length === 1, "nothing created");
        return result[0].created;
    }

    /**
     * @constructs AssetCollection
     * @param {Object} param 
     * @param {Array<string>} [partOf=[]] 
     */
    constructor(param, partOf = []) {
        super(param, partOf);
    }

    /**
     * @name AssetCollection#update
     * @returns {boolean}
     * @async
     */
    async update() {
        _.assert(false, "not implemented");
        // TODO
    }

    /**
     * @name AssetCollection#delete
     * @returns {boolean}
     * @async
     */
    async delete() {
        _.assert(false, "not implemented");
        // TODO
    }

});

/**
 * @name EMS.repo.Party
 * @extends EMS.repo.Param
 * @class
 */
_.define(exports, 'Party', class extends exports.Param {

    /**
     * @name Party.find
     * @param {{...*}} param 
     * @returns {Party}
     * @async
     */
    static async find(param) {
        _.assert(_.is.object(param), "invalid search parameter");
        let result = await _requestNeo4j(_query["Party.find"], { param });
        _.assert(result.length === 1, result.length > 1 ? "no unique result" : "nothing found");
        return new exports.Party(result[0].param, result[0].partOf);
    }

    /**
     * @name Party.create
     * @param {{uid: string, ...*}} param 
     * @returns {boolean}
     * @async
     */
    static async create(param) {
        _.assert(_.is.object(param) && _.is.string(param.uid), "invalid creation parameter");
        let result = await _requestNeo4j(_query["Party.create"], { param });
        _.assert(result.length === 1, "nothing created");
        return result[0].created;
    }

    /**
     * @constructs Party
     * @param {Object} param 
     * @param {Array<string>} [partOf=[]] 
     */
    constructor(param, partOf = []) {
        _.assert(_.is.array(partOf) && partOf.every(_.is.string), "invalid creation parameter");
        super(param);
        _.define(this, "partOf", partOf);
    }

    /**
     * @name Party#update
     * @returns {boolean}
     * @async
     */
    async update() {
        _.assert(false, "not implemented");
        // TODO
    }

    /**
     * @name Party#delete
     * @returns {boolean}
     * @async
     */
    async delete() {
        _.assert(false, "not implemented");
        // TODO
    }

});

/**
 * @name EMS.repo.PartyCollection
 * @extends EMS.repo.Party
 * @class
 */
_.define(exports, 'PartyCollection', class extends exports.Party {

    /**
     * @name PartyCollection.find
     * @param {{...*}} param 
     * @returns {AssetCollection}
     * @async
     */
    static async find(param) {
        _.assert(_.is.object(param), "invalid search parameter");
        let result = await _requestNeo4j(_query["PartyCollection.find"], { param });
        _.assert(result.length === 1, result.length > 1 ? "no unique result" : "nothing found");
        return new exports.PartyCollection(result[0].param, result[0].partOf);
    }

    /**
     * @name PartyCollection.create
     * @param {{uid: string, ...*}} param 
     * @returns {boolean}
     * @async
     */
    static async create(param) {
        _.assert(_.is.object(param) && _.is.string(param.uid), "invalid creation parameter");
        let result = await _requestNeo4j(_query["PartyCollection.create"], { param });
        _.assert(result.length === 1, "nothing created");
        return result[0].created;
    }

    /**
     * @constructs PartyCollection
     * @param {Object} param 
     * @param {Array<string>} [partOf=[]] 
     */
    constructor(param, partOf = []) {
        super(param, partOf);
    }

    /**
     * @name PartyCollection#update
     * @returns {boolean}
     * @async
     */
    async update() {
        _.assert(false, "not implemented");
        // TODO
    }

    /**
     * @name PartyCollection#delete
     * @returns {boolean}
     * @async
     */
    async delete() {
        _.assert(false, "not implemented");
        // TODO
    }

});

/**
 * @name EMS.repo.Action
 * @extends EMS.repo.Param
 * @class
 */
_.define(exports, 'Action', class extends exports.Param {

    /**
     * @constructs Action
     * @param {Object} param 
     */
    constructor(param) {
        _.assert(param);
        throw new Error("not implemented jet");
        super(param);
    }

});

/**
 * @name EMS.repo.Policy
 * @extends EMS.repo.Param
 * @class
 */
_.define(exports, 'Policy', class extends exports.Param {

    /**
     * @constructs Policy
     * @param {Object} param 
     */
    constructor(param) {
        _.assert(new.target !== Policy, "Policy is an abstract class.");
        _.assert(param);
        throw new Error("not implemented jet");
        super(param);
    } // Policy#constructor

});

/**
 * @name EMS.repo.Set
 * @extends EMS.repo.Policy
 * @class
 */
_.define(exports, 'Set', class extends exports.Policy {

    /**
     * @constructs Set
     * @param {Object} param 
     */
    constructor(param) {
        _.assert(param);
        throw new Error("not implemented jet");
        super(param);
    }

});

/**
 * @name EMS.repo.Offer
 * @extends EMS.repo.Policy
 * @class
 */
_.define(exports, 'Offer', class extends exports.Policy {

    /**
     * @constructs Offer
     * @param {Object} param 
     */
    constructor(param) {
        _.assert(param);
        throw new Error("not implemented jet");
        super(param);
    }

});

/**
 * @name EMS.repo.Agreement
 * @extends EMS.repo.Policy
 * @class
 */
_.define(exports, 'Agreement', class extends exports.Policy {

    /**
     * @constructs Agreement
     * @param {Object} param 
     */
    constructor(param) {
        _.assert(param);
        throw new Error("not implemented jet");
        super(param);
    }

});

/**
 * @name EMS.repo.ConflictTerm
 * @extends EMS.repo.Param
 * @class
 */
_.define(exports, 'ConflictTerm', class extends exports.Param {

    /**
     * @constructs ConflictTerm
     * @param {Object} param 
     */
    constructor(param) {
        _.assert(param);
        throw new Error("not implemented jet");
        super(param);
    }

});

/**
 * @name EMS.repo.Rule
 * @extends EMS.repo.Param
 * @class
 */
_.define(exports, 'Rule', class extends exports.Param {

    /**
     * @constructs Rule
     * @param {Object} param 
     */
    constructor(param) {
        _.assert(new.target !== Rule, "Rule is an abstract class.");
        _.assert(param);
        throw new Error("not implemented jet");
        super(param);
    }

});

/**
 * @name EMS.repo.Permission
 * @extends EMS.repo.Rule
 * @class
 */
_.define(exports, 'Permission', class extends exports.Rule {

    /**
     * @constructs Permission
     * @param {Object} param 
     */
    constructor(param) {
        _.assert(param);
        throw new Error("not implemented jet");
        super(param);
    }

});

/**
 * @name EMS.repo.Prohibition
 * @extends EMS.repo.Rule
 * @class
 */
_.define(exports, 'Prohibition', class extends exports.Rule {

    /**
     * @constructs Prohibition
     * @param {Object} param 
     */
    constructor(param) {
        _.assert(param);
        throw new Error("not implemented jet");
        super(param);
    }

});

/**
 * @name EMS.repo.Duty
 * @extends EMS.repo.Rule
 * @class
 */
_.define(exports, 'Duty', class extends exports.Rule {

    /**
     * @constructs Duty
     * @param {Object} param 
     */
    constructor(param) {
        _.assert(param);
        throw new Error("not implemented jet");
        super(param);
    }

});

/**
 * @name EMS.repo.Contraint
 * @extends EMS.repo.Param
 * @class
 */
_.define(exports, 'Contraint', class extends exports.Param {

    /**
     * @constructs Contraint
     * @param {Object} param 
     */
    constructor(param) {
        _.assert(param);
        throw new Error("not implemented jet");
        super(param);
    }

});

/**
 * @name EMS.repo.LogicalContraint
 * @extends EMS.repo.Param
 * @class
 */
_.define(exports, 'LogicalContraint', class extends exports.Param {

    /**
     * @constructs LogicalContraint
     * @param {Object} param 
     */
    constructor(param) {
        _.assert(param);
        throw new Error("not implemented jet");
        super(param);
    }

});

/**
 * @name EMS.repo.Operator
 * @extends EMS.repo.Param
 * @class
 */
_.define(exports, 'Operator', class extends exports.Param {

    /**
     * @constructs Operator
     * @param {Object} param 
     */
    constructor(param) {
        _.assert(param);
        throw new Error("not implemented jet");
        super(param);
    }

});

/**
 * @name EMS.repo.LeftOperand
 * @class
 */
_.define(exports, 'LeftOperand', class extends exports.Param {

    /**
     * @constructs LeftOperand
 * @extends EMS.repo.Param
     * @param {Object} param 
     */
    constructor(param) {
        _.assert(param);
        throw new Error("not implemented jet");
        super(param);
    }

});

/**
 * @name EMS.repo.RightOperand
 * @extends EMS.repo.Param
 * @class
 */
_.define(exports, 'RightOperand', class extends exports.Param {

    /**
     * @constructs RightOperand
     * @param {Object} param 
     */
    constructor(param) {
        _.assert(param);
        throw new Error("not implemented jet");
        super(param);
    }

});

/**
 * @name Record
 * @param {Neo4j~Record} record 
 * @constructor
 * @private
 */
function Record(record) {
    _.assert(new.target === Record, "Record is a constructor");
    for (let key of record['keys']) {
        _.enumerate(this, key, record['_fields'][record['_fieldLookup'][key]]);
    }
}

/**
 * @function _requestNeo4j
 * @param {string|string[]} query 
 * @param {Object|Object[]} [param=null]
 * @returns {Array<Record>|Array<Array<Record>>}
 * @private
 */
async function _requestNeo4j(query, param = null) {
    _.assert(_driver, "not connected");

    if (Array.isArray(query)) {
        _.assert(query.every(_.is.string));
        if (Array.isArray(param)) {
            _.assert(query.length === param.length && param.every(param => param === null || _.is.object(param)));
        } else {
            _.assert(param === null || _.is.object(param));
            param = new Array(query.length).fill(param);
        }
        let
            session = _driver.session(),
            result = await Promise.all(query.map((query, index) => session.run(query, param[index])));

        session.close();
        return result.map(result => result['records'].map(record => new Record(record)));
    } else {
        _.assert.string(query);
        _.assert(param === null || _.is.object(param));

        let
            session = _driver.session(),
            result = await session.run(query, param);

        session.close();
        return result['records'].map(record => new Record(record));
    }
}