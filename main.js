#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { getAllDirectoryFiles, createAndWrite, getUserHome } = require('./src/utils')
const template = require('./src/template')

const args = process.argv.slice(2)

function readHTML(filepath, root) {
  const fileHtml = fs.readFileSync(filepath)
  const doctitle = [path.basename(filepath), fileHtml.toString().match(/<title>([^<]+)<\/title>/)].flat(2).filter(Boolean)
  return {
    path: filepath,
    dirname: path.dirname(filepath).replace(root, '').split('/').filter(Boolean),
    basename: path.basename(filepath),
    title: doctitle.slice(-1)[0],
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

function getDataHV(filepath = process.cwd(), userOptions = {}) {
  const resolvedpath = path.resolve(filepath)
  const rootFiles = getAllDirectoryFiles(resolvedpath)

  const htmlFiles = rootFiles
    .filter(e => /\.html$/.test(e.toLowerCase(), 'i'))
    .map(e => readHTML(e, resolvedpath))

  return {
    root: filepath,
    dirpath: resolvedpath,
    hvname: getNameFromPath(resolvedpath.replace(getUserHome(), '')),
    name: filepath.split('/').slice(-1)[0],
    sep: path.sep,
    files: htmlFiles,
    dom: {
      toc: { id: 'hvtoc' },
      iframe: { id: 'hvframe', name: 'hvframe' }
    },
    ...userOptions
  }
}

const data = getDataHV(args[0])
const htmloutputpath = [getUserHome(), '.hv', data.hvname + '.html'].join(path.sep)

createAndWrite(htmloutputpath, template(data))

console.log(htmloutputpath)
