const path = require('path')


module.exports.rootDir = () => path.dirname(process.mainModule.filename)
module.exports.buildFilePath = fileName => path.join(this.rootDir(), 'data', fileName)
