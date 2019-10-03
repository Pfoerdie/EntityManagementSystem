const _module = require("./modules");
exports.enforce = Object.assign({}, _module.enforce);
exports.exec = Object.assign({}, _module.exec);
exports.info = Object.assign({}, _module.info);
exports.admin = Object.assign({}, _module.admin);
exports.decide = Object.assign({}, _module.decide);
exports.repo = Object.assign({}, _module.repo);
exports.service = Object.assign({}, _module.service);
Object.freeze(exports);