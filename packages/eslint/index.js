const noProcessNodeEnvRule = require("./no-process-node-env");
const plugin = { rules: { "no-process-node-env": noProcessNodeEnvRule } };
module.exports = plugin;
