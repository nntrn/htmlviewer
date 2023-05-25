#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { getAllDirectoryFiles, createAndWrite, getUserHome } = require('./src/utils')
const template = require('./src/template')
const parseArgs = require('./args')

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
    if (a[0] + b.length > maxFileNameLen) {
      return a
    }
    return [a[0] + b.length, [b.replace(/[^\d\w]+/g, ''), ...a[1]]]
  }, [0, []])

  return name[1].filter(Boolean).join('-')
}

function createHtmlViewer(filepath = process.cwd(), userOptions = {}) {
  const realfilepath = fs.realpathSync(filepath)
  const title = path.basename(realfilepath)
  const resolvedpath = path.resolve(filepath)
  const rootFiles = getAllDirectoryFiles(resolvedpath)

  const outputFiles = rootFiles
  // .map(e => readHTML(e, resolvedpath))
  // const re = new RegExp("ab+c");

  // const outputFiles = rootFiles
  //   .filter(e => /\.(x)?html$/.test(e.toLowerCase(), 'i'))
  //   .map(e => readHTML(e, resolvedpath))

  return {
    root: filepath,
    dirpath: resolvedpath,
    hvname: getNameFromPath(resolvedpath.replace(getUserHome(), '')),
    home: getUserHome(),
    name: filepath.split('/').slice(-1)[0],
    sep: path.sep,
    files: outputFiles,
    title: title,
    iframe_name: 'hvframe',
    toc_id: 'hv-toc',
    // dom: {
    //   toc: { id: 'hvtoc' },
    //   iframe: { id: 'hvframe', name: 'hvframe' }
    // },
    ...userOptions
  }
}


const filepath = args[0] || process.cwd()
const realfilepath = fs.realpathSync(filepath)
const title = path.basename(realfilepath)
const resolvedpath = path.resolve(filepath)
const outputFiles = getAllDirectoryFiles(resolvedpath)



const defaultArgs = {
  root: filepath,
  dirpath: resolvedpath,
  home: getUserHome(),
  name: filepath.split('/').slice(-1)[0],
  sep: path.sep,
  files: outputFiles,
  title: title,
  iframe_name: 'hvframe',
  toc_id: 'hv-toc',
}

const data = { ...defaultArgs, ...(parseArgs(args)) }
// const data = createHtmlViewer(args[0], parseArgs(args))
// const htmloutputpath = [getUserHome(), '.hv', data.hvname + '.html'].join(path.sep)

// createAndWrite(htmloutputpath, template(data))

console.log(template(data))

