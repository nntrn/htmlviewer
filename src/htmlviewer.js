const fs = require('fs')
const path = require('path')
const { getAllDirectoryFiles, createAndWrite, getUserHome } = require('./utils')
const inlineScripts = require('./script')
const hvTemplate = require('./template')

class HtmlViewer {
  constructor(args) {
    this.args = args
    this.cwd = process.cwd()
  }

  printenv() {
    console.log(this)
  }
}

module.exports = HtmlViewer
