const fs = require('fs')

const parseArgs = require('./args')


function testBinary(filepath) {
  var encoding1 = 'binary';
  var encoding2 = 'binary';
  var a = fs.readFileSync(filepath);
  var b = new Buffer(fs.readFileSync(filepath, encoding1), encoding2);
  console.log('Object equality:', a === b);
  console.log('Buffer equality:', a.equals(b));

  return [a === b, a.equals(b)]
}


const args = process.argv.slice(2)

// console.log(fs.stat(args[0]))


pathsToCheck = args
for (let i = 0; i < pathsToCheck.length; i++) {
  fs.stat(pathsToCheck[i], (err, stats) => {
    console.log(stats.isDirectory());
    console.log(stats);
  });
}

// const testArg = parseArgs(process.argv.slice(2))

// console.log(JSON.stringify(testArg, null, 2))