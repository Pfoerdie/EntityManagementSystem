const EMS = require("./src");
console.log(EMS);

// const _module = require("./src/modules");
// console.log(_module);

EMS.repo.connect("localhost", "neo4j", "neo4j");