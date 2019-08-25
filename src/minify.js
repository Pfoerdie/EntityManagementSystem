const
    Path = require('path'),
    Fs = require('fs'),
    tools = Fs.readdirSync(Path.join(__dirname, "tools")).filter(file => file.endsWith(".js") && file !== "index.js"),
    cypher = Fs.readdirSync(Path.join(__dirname, "cypher")).filter(file => file.endsWith(".cyp") && file !== "index.js"),
    modules = Fs.readdirSync(Path.join(__dirname, "modules")).filter(file => file.endsWith(".js") && file !== "index.js");

console.log("tools:", tools);
console.log("cypher:", cypher);
console.log("modules:", modules);

// TODO

let EMSjs = `
    Test
`;

let EMSminjs = EMSjs
    .replace(/\s+/g, " ")
    .trim();

Fs.writeFileSync(Path.join(__dirname, "EMS.js"), EMSjs);
Fs.writeFileSync(Path.join(__dirname, "EMS.min.js"), EMSminjs);