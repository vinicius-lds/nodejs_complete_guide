const path = require("path");

module.exports.rootDir = () => path.dirname(process.mainModule.filename);
module.exports.buildFilePath = (...levels) => {
  console.log(levels);
  let r = this.rootDir();
  levels.forEach(level => (r = path.join(r, level)));
  console.log(r);
  return r;
};
