const path = require("path");
const { ROOT_DIR } = require("./env");

const alias = {
  "@helpers": path.join(ROOT_DIR, "/src/helpers/"),
  "@contexts": path.join(ROOT_DIR, "/src/contexts/"),
  "@components": path.join(ROOT_DIR, "/src/components/"),
  "@styles": path.join(ROOT_DIR, "/src/styles/"),
};

module.exports = {
  alias,
};
