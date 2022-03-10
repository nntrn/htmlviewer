#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { getAllDirectoryFiles, createAndWrite, getUserHome } = require('./src/utils')
const inlineScripts = require('./src/script')
const hvTemplate = require('./src/template')

const args = process.argv.slice(2)

const scriptString = [
  Object.values(inlineScripts).map(s => s.toString().split('\n').map(e => '  ' + e).join('\n')),
  'createToc(data)'
]

function readHTML(filepath, root) {

  const fileHtml = fs.readFileSync(filepath)
  const doctitle = [path.basename(filepath), fileHtml.toString().match(/<title>([^<]+)<\/title>/)].flat(2).filter(Boolean)
  return {
    path: filepath,
    relative: path.relative(root, filepath),
    basename: path.basename(filepath),
    title: doctitle.slice(-1)[0],
    dirname: path.dirname(filepath).replace(root, '').split(path.sep).filter(Boolean),
  }
}

function getNameFromPath(dirpath, maxFileNameLen = 140) {
  const name = dirpath.split(path.sep).reverse().reduce((a, b, c) => {
    if(a[0] + b.length > maxFileNameLen) {
      return a
    }
    return [a[0] + b.length, [b.replace(/[^\d\w]+/g, ''), ...a[1]]]
  }, [0, []])

  return name[1].filter(Boolean).join('-')
}

function createHtmlViewer(filepath = process.cwd(), userOptions = {}) {
  const cwd = process.cwd()
  const realfilepath = fs.realpathSync(filepath)
  const title = path.basename(realfilepath)
  const resolvedpath = path.resolve(filepath)
  const rootFiles = getAllDirectoryFiles(resolvedpath)

  const htmlFiles = rootFiles
    .filter(e => /\.(x)?html$/.test(e.toLowerCase(), 'i'))
    .map(e => readHTML(e, resolvedpath))

  var tocObject = {}

  htmlFiles.forEach(e => {
    var root = tocObject
    for(var i in e.dirnames) {
      root[i] = root[i] || {}
    }
    tocObject = root

  })

  return Object.assign({
    root: filepath,
    dirpath: resolvedpath,
    hvname: getNameFromPath(resolvedpath.replace(getUserHome(), '')),
    name: filepath.split(path.sep).slice(-1)[0],
    sep: path.sep,
    files: htmlFiles,
    title: title,
    toc: tocObject,
    dom: {
      toc: { id: 'hvtoc' },
      iframe: { id: 'hvframe', name: 'hvframe', sandbox: 'allow-scripts' }
    }
  }, userOptions)
}

const data = createHtmlViewer(args[0], { inline: { script: scriptString, style: ['*{color:red}']}})
const hvHtmlOutput = hvTemplate(data)

console.log(hvTemplate(data))

