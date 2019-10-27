EntityClient.then(async function (Entity) {

    let e0 = await Entity.get("hello-world");

}).catch(console.error);