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
     * @name Param._find
     * @param {*} param 
     * @returns {Param}
     */
    static async _find(param) {
        _.assert(_.is.object(param) && _.is.string(param.uid) && _.is.string(param.type), "invalid search parameter");
        let result = await _requestNeo4j(_query.find);
        console.log(result);
        // TODO
    }

    /**
     * @name Param._find
     * @param {*} param 
     * @returns {boolean}
     */
    static async _delete(uid) {
        // TODO
    }

    /**
     * @constructs Param
     * @param {*} param 
     */
    constructor(param) {
        _.assert(new.target != exports.Param, "Param is an abstract class");
        _.assert(_.is.object(param) && _.is.string(param.uid), "invalid construction parameter");
        Object.assign(this, param);
        this._touch();
    }

    /**
     * @name Param#_touch
     * @returns {undefined}
     * @private
     */
    _touch() {
        _.set(this, '_ts', Date.now());
    }

});


/**
 * @name EMS.repo.Asset
 * @extends EMS.repo.Param
 * @class
 */
_.define(exports, 'Asset', class extends exports.Param {

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
 * @function _requestNeo4j
 * @param {string|string[]} query 
 * @param {Object} [param=null]
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