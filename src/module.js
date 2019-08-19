const _ = require("./tools.js");
_.enumerate(exports, 'repo', require("./repo.js"));
_.enumerate(exports, 'info', require("./info.js"));
_.enumerate(exports, 'admin', require("./admin.js"));
_.enumerate(exports, 'decide', require("./decide.js"));
_.enumerate(exports, 'exec', require("./exec.js"));
_.enumerate(exports, 'enforce', require("./enforce.js"));