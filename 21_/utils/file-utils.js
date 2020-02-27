const fs = require("fs");
const pathUtils = require("./path-utils");

module.exports.delete = (fileName, callback) =>
  fs.unlink(fileName, callback || (() => {}));

module.exports.read = (fileName, callback) => fs.readFile(fileName, callback);

module.exports.readAsJsonArrayAndAppend = (fileName, objectToAppend) =>
  this.readAsJson(fileName, result =>
    this.write(fileName, [...result, objectToAppend])
  );

module.exports.readAsJson = (fileName, callback) =>
  fs.readFile(pathUtils.buildFilePath(fileName), (error, fileContent) =>
    callback(error ? [] : JSON.parse(fileContent))
  );

module.exports.write = (fileName, content) =>
  fs.writeFile(
    pathUtils.buildFilePath(fileName),
    typeof content === "string" ? content : JSON.stringify(content),
    error => console.error(error)
  );
