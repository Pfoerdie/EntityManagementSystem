const EMS = require("./src");
const _EMS = require("./src/modules");
console.log("EMS:", EMS);

(async () => {

    EMS.repo.connect("localhost", "neo4j", "odrl");
    console.log("ping:", await EMS.repo.ping());

    await EMS.repo.wipeData();

    let testAsset = await _EMS.repo.Asset.create({
        type: "File",
        uid: "hello_world",
        path: "/hello world.txt"
    });

    let testParty = await _EMS.repo.Party.create({
        type: "User",
        uid: "lorem_ipsum",
        username: "test",
        passowrd: "test"
    });

    console.log();
    console.log("Asset", testAsset, { partOf: testAsset.partOf });
    console.log("Party", testParty, { partOf: testAsset.partOf });

})().catch(console.error);
