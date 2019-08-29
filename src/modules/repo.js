/** 
 * @module EMS.repo
 * @author Simon Petrac
 * 
 * {@link https://www.w3.org/TR/odrl-model/#infoModel Param Information Model}
 */

const
    Neo4j = require('neo4j-driver').v1,
    _ = require("../tools"),
    _queries = require("../cypher");

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
     * @name Param.find
     * @param {*} param 
     * @returns {Param}
     * @async
     */
    static async find(param) {
        _.assert(_.is.object(param) && Object.keys(param).length > 0, "no search parameter");
        let result = await _requestNeo4j(_query.find, { param });
        _.assert(result.length === 1, result.length > 1 ? "no unique result" : "nothing found");
        return result[0];
    }

    /**
     * @name Param.create
     * @param {*} param 
     * @returns {Param}
     * @async
     */
    static async create(param) {
        _.assert(false, "not implemented");
        _.assert(_.is.object(param) && _.is.string(param.uid) && _.is.string(param.type), "invalid search parameter");
        let result = await _requestNeo4j(_query.find);
        console.log(result);
        // TODO
    }

    /**
     * @constructs Param
     * @param {*} param 
     */
    constructor(param) {
        _.assert(new.target != exports.Param, "Param is an abstract class");
        _.assert(_.is.object(param) && _.is.string(param.uid) && _.is.string(param.type), "invalid construction parameter");
        Object.assign(this, param);
    }

    /**
     * @name Param#construct
     * @param {*} param 
     * @returns {Param}
     */
    construct(param) {
        _.assert(_.is.object(param) && _.is.string(param.uid) && _.is.string(param.type), "invalid construction parameter");
        // TODO
    }

    /**
     * @name Param#update
     * @returns {boolean}
     * @async
     */
    async update() {
        _.assert(false, "not implemented");
    }

    /**
     * @name Param#delete
     * @returns {boolean}
     * @async
     */
    async delete() {
        // TODO
    }

});


/**
 * @name EMS.repo.Asset
 * @extends EMS.repo.Param
 * @class
 */
_.define(exports, 'Asset', class extends exports.Param {

    static async find(param) {
        let result = await exports.Param.find(param);
        _.assert(result.labels.includes("Asset"), "invalid data");
        return new exports.Asset(result.param);
    }

    static async create(param) {
        _.assert(_.is.object(param) && _.is.string(param.uid) && _.is.string(param.type), "invalid search parameter");
        let result = await _requestNeo4j(_query.find);
        console.log(result);
        // TODO
    }

    /**
     * @constructs Asset
     * @param {*} param 
     */
    constructor(param) {
        _.assert(param);
        throw new Error("not implemented jet");
        super(param);
    }

});

/**
 * @name EMS.repo.AssetCollection
 * @extends EMS.repo.Asset
 * @class
 */
_.define(exports, 'AssetCollection', class extends exports.Asset {

    /**
     * @constructs AssetCollection
     * @param {*} param 
     */
    constructor(param) {
        _.assert(param);
        throw new Error("not implemented jet");
        super(param);
    }

});

/**
 * @name EMS.repo.Party
 * @extends EMS.repo.Param
 * @class
 */
_.define(exports, 'Party', class extends exports.Param {

    /**
     * @constructs Party
     * @param {*} param 
     */
    constructor(param) {
        _.assert(param);
        throw new Error("not implemented jet");
        super(param);
    }

});

/**
 * @name EMS.repo.PartyCollection
 * @extends EMS.repo.Party
 * @class
 */
_.define(exports, 'PartyCollection', class extends exports.Party {

    /**
     * @constructs PartyCollection
     * @param {*} param 
     */
    constructor(param) {
        _.assert(param);
        throw new Error("not implemented jet");
        super(param);
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
     * @param {*} param 
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
     * @param {*} param 
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
     * @param {*} param 
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
     * @param {*} param 
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
     * @param {*} param 
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
     * @param {*} param 
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
     * @param {*} param 
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
     * @param {*} param 
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
     * @param {*} param 
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
     * @param {*} param 
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
     * @param {*} param 
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
     * @param {*} param 
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
     * @param {*} param 
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
     * @param {*} param 
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
     * @param {*} param 
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
 * @param {Object} [param=null]
 * @returns {Array<Record>|Array<Array<Record>>}
 * @private
 */
async function _requestNeo4j(query, param = null) {
    _.assert(_driver, "not connected");

    if (Array.isArray(query)) {
        _.assert(query.every(entry => Array.isArray(entry) && typeof entry[0] === 'string' && (!entry[1] || typeof entry[1] === 'object')));
        let
            session = _driver.session(),
            result = await Promise.all(query.map(([query, param = null]) => session.run(query, param)));

        session.close();
        return result.map(result => result['records'].map(record => new Record(record)));
    } else {
        _.assert(typeof query === 'string');
        _.assert(typeof param === 'object');

        let
            session = _driver.session(),
            result = await session.run(query, param);

        session.close();
        return result['records'].map(record => new Record(record));
    }
}

/**
 * @function _findRequest
 * @returns {Array<Param>}
 * @private
 */
async function _findRequest(action, target, assignee = null, assigner = null) {
    _.assert(_driver, "not connected");
    _.assert(_.is.string(action), "invalid action");
    _.assert(_.is.string(target) || _.is.object(target), "invalid target");
    _.assert(assignee === null || _.is.string(assignee), "invalid assignee");
    _.assert(assigner === null || _.is.string(assigner), "invalid assigner");
    // TODO
}