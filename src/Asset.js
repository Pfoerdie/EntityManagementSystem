const EMS = require("./index.js");
const assert = require("assert");
const is = require("./is.js");

class Asset extends EMS.Entity {

    #partOf;
    #hasPolicy;

}

module.exports = Asset;