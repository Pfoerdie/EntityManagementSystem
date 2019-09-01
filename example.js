const EMS = require("./src");
const _EMS = require("./src/modules");
console.log("EMS:", EMS);

(async () => {

    EMS.repo.connect("localhost", "neo4j", "odrl");
    console.log("ping:", await EMS.repo.ping());

    await EMS.repo.wipeData();

    console.log("Asset.create:", await _EMS.repo.Asset.create({
        type: "File",
        uid: "hello_world",
        path: "/hello world.txt"
    }));

    console.log("Party.create:", await _EMS.repo.Party.create({
        type: "User",
        uid: "lorem_ipsum",
        username: "test",
        passowrd: "test"
    }));

    console.log("Asset.find", await _EMS.repo.Asset.find({
        type: "File",
        uid: "hello_world"
    }));

    console.log("Party.find", await _EMS.repo.Party.find({
        type: "User",
        username: "test"
    }));

})().catch(console.error);
