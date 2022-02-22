const styleCss = require('./style')
const scripts = require('./script')

const scriptString = Object.values(scripts).map(s => s.toString().split('\n').map(e => '  ' + e).join('\n'))

module.exports = data => [
  '<!doctype html>',
  '<html lang="en">',
  '<head>',
  `<title>${data.name || 'Untitled'}</title>`,
  '<meta name="viewport" content="width=device-width,initial-scale=1">',
  '<meta charset="UTF-8" />',
  styleCss,
  '</head>',
  '<body>',
  '<header>',
  `<h1>${data.name}</h1>`,
  `<h3>${data.dirpath}</h3>`,
  '</header>',
  '<article>',
  '  <ul id="toc"></ul>',
  '  <iframe name="iframe" id="iframe"></iframe>',
  '</article>',
  '<footer>',
  `  ${data.name}`,
  '</footer>',
  '',
  '<script>',
  `const data = ${JSON.stringify(data, null, 2)}`,
  '</script>',
  '<script>',
  scriptString,
  '  createToc(data)',
  '  //tree(data, document.querySelector("#toc"))',
  '  //toctree.appendChild(createDirectoryList(data.tree_files[0]).firstChild)',
  '</script>',
  '</body>',
  '',
  '</html>',
].flat(2).join('\n')

