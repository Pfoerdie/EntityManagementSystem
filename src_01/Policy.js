const EMS = require("./index.js");
const assert = require("assert");
const is = require("./is.js");

class Policy extends EMS.Entity {

    #profile;
    #inheritFrom;
    #conflict;
    #permission;
    #obligation;
    #prohibition;

}

module.exports = Policy;