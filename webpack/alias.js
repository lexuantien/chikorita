const path = require("path");
const { ROOT_DIR } = require("./env");

const alias = {
  "@src": path.join(ROOT_DIR, "/src"),
  "@helpers": path.join(ROOT_DIR, "/src/helpers/"),
  "@middleware": path.join(ROOT_DIR, "/src/middleware/"),
};

module.exports = {
  alias,
};
