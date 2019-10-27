const _ = require("../tools");

exports["Action.create"] = _.normalizeStr(_.read.sync(__dirname + "/Action.create.cyp"));
exports["Action.find"] = _.normalizeStr(_.read.sync(__dirname + "/Action.find.cyp"));

exports["Asset.create"] = _.normalizeStr(_.read.sync(__dirname + "/Asset.create.cyp"));
exports["Asset.find"] = _.normalizeStr(_.read.sync(__dirname + "/Asset.find.cyp"));
exports["Asset#update"] = _.normalizeStr(_.read.sync(__dirname + "/Asset#update.cyp"));

exports["AssetCollection.create"] = _.normalizeStr(_.read.sync(__dirname + "/AssetCollection.create.cyp"));
exports["AssetCollection.find"] = _.normalizeStr(_.read.sync(__dirname + "/AssetCollection.find.cyp"));

exports["Party.create"] = _.normalizeStr(_.read.sync(__dirname + "/Party.create.cyp"));
exports["Party.find"] = _.normalizeStr(_.read.sync(__dirname + "/Party.find.cyp"));

exports["PartyCollection.create"] = _.normalizeStr(_.read.sync(__dirname + "/PartyCollection.create.cyp"));
exports["PartyCollection.find"] = _.normalizeStr(_.read.sync(__dirname + "/PartyCollection.find.cyp"));