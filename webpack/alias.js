const path = require("path");
const { ROOT_DIR } = require("./env");

const alias = {
  "@src": path.join(ROOT_DIR, "/src"),
};

module.exports = {
  alias,
};
