const _module = require("./module.js");
// exports.enforce = Object.assign({}, _module.enforce);
exports.enforce = (...args) => _module.enforce(...args);
exports.execute = Object.assign({}, _module.execute);
exports.info = Object.assign({}, _module.info);
exports.admin = Object.assign({}, _module.admin);
exports.decide = Object.assign({}, _module.decide);
exports.repo = Object.assign({}, _module.repo);
Object.freeze(exports);