const fs = require('fs')

function tryJSON(content) {
  try {
    const json = JSON.parse(content)
    return json
  } catch (err) {
    return content
  }
}

function readFile(filepath) {
  var ret = filepath
  try {
    ret = fs.readFileSync(filepath, 'utf8');
    return tryJSON(ret)
  } catch (err) {
    return filepath
  }
}

function getArgType(str) {
  if (["", "true"].indexOf(str) > -1) return true
  if (str.toLowerCase() === 'false') return false
  if (!isNaN(str)) return Number(str)
  if (str.charAt(0) === '@') {
    return readFile(str.slice(1))
  }
  return str
}

function parseArgs(args) {
  if (args.join(' ').indexOf('--') < 0) {
    return args
  }
  let stdIn = args.join(' ').split(' >')[0].split(' ')
  return Object.fromEntries(stdIn
    .join(' ')
    .split('--')
    .filter(Boolean)
    .map(e => {
      let a = e.trim().split(' ')
      let a2 = a.length > 2 ? a.slice(1,).map(t => getArgType(t)) : getArgType(a.slice(1,).toString())
      return [a[0], a2]
    }))
}


module.exports = parseArgs
