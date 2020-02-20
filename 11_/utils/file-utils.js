const fs = require('fs')
const pathUtils = require('./path-utils')


module.exports.readAndAppend = (fileName, objectToAppend) =>
    this.read(fileName, result => this.write(fileName, [... result, objectToAppend]))

module.exports.read = (fileName, callback) =>
    fs.readFile(pathUtils.buildFilePath(fileName), (error, fileContent) => callback(error ? [] : JSON.parse(fileContent)))


module.exports.write = (fileName, content) =>
    fs.writeFile(pathUtils.buildFilePath(fileName), typeof content === 'string' ? content : JSON.stringify(content) , error => console.log(error))
