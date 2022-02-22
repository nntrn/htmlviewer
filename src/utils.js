const fs = require('fs')
const path = require('path')

function createAndWrite(dirPath = '', data = '') {
  if(!dirPath) {
    return data
  }
  fs.mkdir(path.dirname(dirPath), { recursive: true }, function () {
    if(typeof data === 'object') {
      fs.writeFileSync(dirPath, JSON.stringify(data, null, 2))
    } else {
      fs.writeFileSync(dirPath, data)
    }
  })
  return data
}

function parseArgs(args) {
  if(args.join(' ').indexOf('--') < 0) {
    return args
  }
  let stdIn = args.join(' ').split('>')[0].split(' ')
  return Object.fromEntries(stdIn
    .join(' ')
    .split('--')
    .filter(Boolean)
    .map(e => {
      let a = e.trim().split(' ')
      let a2 = a.length > 2 ? a.slice(1,) : a.slice(1,).toString()
      return [a[0], a2]
    }))
}

// example
// pipe(odds, double, log)([1, 2, 3, 4, 5])
function pipe(...fns) {
  return (arg) => fns.reduce((prev, fn) => fn(prev), arg)
}

function read(filePath) {
  if(fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    var fileStr = fs.readFileSync(filePath, 'utf-8')
    if(/\.json$/.test(filePath)) {
      try { fileStr = JSON.parse(fileStr)
      } catch (e) {}
    }
    return fileStr
  }
}

function fold(str, size, arr) {
  arr = arr || []
  if(str.length <= size) {
    arr.push(str)
    return arr
  }
  arr.push(str.substring(0, size))
  var tail = str.substring(size)
  return fold(tail, size, arr)
}

// returnns YYYY-MM-DD
function getISODate(dt = new Date) {
  return (new Date(dt)).toISOString().split('T')[0]
}

function getAllDirectoryFiles(dirPath) {
  return fs.readdirSync(dirPath)
    .map(e => path.join(dirPath, e))
    .map(file => fs.statSync(file).isDirectory() ? getAllDirectoryFiles(file) : file)
    .flat()
}

function camelCase(str) {
  return str.replace(/[^a-zA-Z]+(\w)/gi, function (word, letter) {
    return letter.toUpperCase()
  })
}

function kebabCase(flag) {
  return flag.replace(/([A-Z])/g, '-$1').toLowerCase()
}

function formatNote(str = '') {
  const note = str.match(/.{0,75}([\s|\n]|\W)/g) || []
  return note.length > 0 ? note
    .filter(Boolean)
    .map(e => e.trim().length > 0 ? `#    ${e.replace(/^[\s\#]{0,2}/, '')}` : '')
    .filter(Boolean) : ''
}

function detectScriptLine(str) {
  if(str.charAt(0) === '$' && str.charAt(1) !== '(') {
    return true
  }
  return false
}

function getUserHome() {
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME']
}

exports.createAndWrite = createAndWrite
exports.parseArgs = parseArgs
exports.pipe = pipe
exports.read = read
exports.fold = fold
exports.getISODate = getISODate
exports.getAllDirectoryFiles = getAllDirectoryFiles
exports.camelCase = camelCase
exports.kebabCase = kebabCase
exports.formatNote = formatNote
exports.detectScriptLine = detectScriptLine
exports.getUserHome = getUserHome
exports.btoa = str => Buffer.from(str + '\n', 'binary').toString('base64')

