const Neo4j = require("neo4j-driver").v1;
const { join: joinPath } = require("path");
const { promisify } = require("util");
const FS = require("fs");
const readFileSync = promisify(FS.readFileSync);
const { assert, isString, isObject } = require("./util.js");
/** @type {Neo4j~Driver} */
let driver = null;

// TODO temp
driver = Neo4j.driver("bolt://localhost:7687", Neo4j.auth.basic("neo4j", "odrl"));

class Record {
    static from(record) { return new Record(record); }
    /** @param {Neo4j~Record} */
    constructor(record) {
        for (let key of record.keys) {
            this[key] = record._fields[record._fieldLookup[key]];
        }
    }
}

// const RE_splitQuery = /;/g;
// const RE_splitQuery = /;(?!(?:[^"]*"[^"]*|[^']*'[^']*|[^`]*`[^`]*)(?:"[^"]*"[^"]*|'[^']*'[^']*|`[^`]*`[^`]*)*$)/g;
// function splitQuery(query) {
//     return query.split(query, RE_splitQuery);
// }

/**
 * @async
 * @param {String} query 
 * @param {Object} [param=null] 
 * @returns {Array<Record>}
 */
exports.request = async function request(query, param = null) {
    assert(isString(query), request, "invalid query", TypeError);
    assert(param === null || isObject(param), request, "invalid param", TypeError);
    /** @type {Neo4j~Session} */
    const session = driver.session();
    try {
        /** @type {Array<Neo4j~Record>} */
        const records = await session.run(query, param);
        /** @type {Array<Record>} */
        const results = records.map(Record.from);
        session.close();
        return results;
    } catch (err) {
        session.close();
        throw err;
    }
};

/**
 * @param {String} query 
 * @returns {Function}
 */
exports.bindQuery = function bindQuery(query) {
    assert(isString(query), bindQuery, "invalid query", TypeError);

    /**
     * @async
     * @param {Obbject} [param]
     * @returns {Array<Record>}
     */
    function request(param) {
        return exports.request(query, param);
    }

    return request;
};

/**
 * @param  {...String} pathSeg 
 * @returns {Function}
 */
exports.requireQuery = function requireQuery(...pathSeg) {
    assert(pathSeg.every(isString), requireQuery, "invalid path segments", TypeError);
    const query = readFileSync(joinPath(...pathSeg));

    /**
     * @function
     * @async
     * @param {Obbject} [param]
     * @returns {Array<Record>}
     */
    const request = exports.bindQuery(query);
    return request;
};