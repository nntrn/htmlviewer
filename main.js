#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { getAllDirectoryFiles, createAndWrite, getUserHome, btoa } = require('./src/utils')
const { execSync } = require('child_process')
const template = require('./src/template')

const args = process.argv.slice(2)

function readHTML(filepath, root) {
  const fileHtml = fs.readFileSync(filepath)
  const doctitle = [ path.basename(filepath), fileHtml.toString().match(/<title>([^<]+)<\/title>/)].flat(2).filter(Boolean)
  return {
    path: filepath,
    dirname: path.dirname(filepath).replace(root, '').split('/').filter(Boolean),
    basename: path.basename(filepath),
    title: doctitle.slice(-1)[0],
  }
}

const defaultOptions = (filepath = process.cwd()) => {
  const rootFiles = getAllDirectoryFiles(filepath)

  const htmlFiles = rootFiles
    .filter(e => /\.html$/.test(e.toLowerCase(), 'i'))
    .map(e => readHTML(e, filepath))

  return {
    root: filepath,
    dirpath: path.resolve(filepath),
    name: filepath.split('/').slice(-1)[0],
    hash_path: btoa(path.resolve(filepath)).replace(/=/g, ''),
    files: htmlFiles,
    tree: execSync(`tree -I "(node_modules|tmp|build|out|__pycache__)" -P '*.html' --noreport --dirsfirst ${path.resolve(filepath)}`).toString().split('\n'),
    tree_files: JSON.parse(execSync(`tree  -I "(node_modules|tmp|build|out|__pycache__)" -P '*.html' --noreport --dirsfirst -f -J ${path.resolve(filepath)}`).toString())
  }
}

const data = defaultOptions(args[0])
const htmloutputpath = `${getUserHome()}/.hv/${data.name}-${data.hash_path.slice(-10)}.html`
createAndWrite(htmloutputpath, template(data))
createAndWrite(
  htmloutputpath.replace('.html', '.js'),
  [ 'const data', JSON.stringify(data, null, 2), ].join(' = ')
)

console.log(htmloutputpath)
