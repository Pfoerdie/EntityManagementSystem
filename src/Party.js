const EMS = require("./index.js");
const assert = require("assert");
const is = require("./is.js");

class Party extends EMS.Entity {

    #uid;
    #partOf;
    #ready = false;

}

module.exports = Party;