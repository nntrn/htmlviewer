#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const {
  getCwd,
  createDirectories,
  isDirectory
} = require('../lib/utils')

const template = require('../lib/template')

function walk(dir, a = {}) {
  const files = fs.readdirSync(dir)

  files
    .filter(f => !(/node_modules/.test(f)))
    .forEach(e => {
      if(/^\./.test(e)) {
        return
      }
      const p = path.join(dir, e)
      if(isDirectory(p)) {
        a.children.push(walk(p, {
          name: e,
          type: 'dir',
          path: path.relative(getCwd(), p),
          children: []
        }))
      }
      if(/\.html$/.test(e)) {
        const n = p.split('/').slice(-2)
        a.children.push({
          name: n[1].replace(/\\*.html/, ''),
          html: `<strong>${n[0]}/</strong>${n[1]}`,
          // name: filename.replace(/\\*.html/, ''),
          type: 'file',
          path: p
        })
      }
    })
  return a
}

const outPath = path.join(getCwd(), 'html-lister2')
createDirectories(outPath)

const dataa = walk(getCwd(), {
  root: getCwd(),
  children: []
})

const dataString = `const data = ${JSON.stringify(dataa, null, 2)}`

fs.writeFileSync(path.join(outPath, 'data.js'), dataString)
fs.writeFileSync(path.join(outPath, 'index.html'), template.html(dataString))

