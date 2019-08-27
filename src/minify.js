const
    Path = require('path'),
    Fs = require('fs');

console.log(scanDirectory(__dirname));

// const
//     tools = Fs.readdirSync(Path.join(__dirname, "tools")).filter(file => file.endsWith(".js") && file !== "index.js"),
//     cypher = Fs.readdirSync(Path.join(__dirname, "cypher")).filter(file => file.endsWith(".cyp") && file !== "index.js"),
//     modules = Fs.readdirSync(Path.join(__dirname, "modules")).filter(file => file.endsWith(".js") && file !== "index.js");

// console.log("tools:", tools);
// console.log("cypher:", cypher);
// console.log("modules:", modules);

// // TODO

// let EMSjs = `
//     Test
// `;

// let EMSminjs = EMSjs
//     .replace(/\s+/g, " ")
//     .trim();

// Fs.writeFileSync(Path.join(__dirname, "EMS.js"), EMSjs);
// Fs.writeFileSync(Path.join(__dirname, "EMS.min.js"), EMSminjs);

function scanDirectory(directory, depth = Infinity) {
    let content = Fs.readdirSync(directory);
    let result = {};
    for (let name of content) {
        let path = Path.join(directory, name);
        let stats = Fs.statSync(path);
        if (stats.isDirectory()) {
            result[name] = scanDirectory(path, depth - 1);
        } else if (stats.isFile()) {
            result[name] = Fs.readFileSync(path).toString();
        }
    }
    return result;
}