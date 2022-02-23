const styleCss = require('./style')
const scripts = require('./script')

const scriptString = Object.values(scripts).map(s => s.toString().split('\n').map(e => '  ' + e).join('\n'))

function createTemplate(data) {
  return [
    '<!doctype html>',
    '<html lang="en">',
    '<head>',
    `<title>htmlviewer: ${data.name || 'Untitled'}</title>`,
    '<meta name="viewport" content="width=device-width,initial-scale=1">',
    '<meta charset="UTF-8" />',
    styleCss(data),
    '</head>',
    '<body>',
    '<header>',
    `  <h1><strong>htmlviewer:</strong> ${data.name}</h1>`,
    `  <h3>${data.dirpath}</h3>`,
    '</header>',
    '<article>',
    `  <ul id="${data.dom.toc.id}"></ul>`,
    `  <iframe name="${data.dom.iframe.name}" id="${data.dom.iframe.id}"></iframe>`,
    '</article>',
    '<footer>',
    `Created using <a href="https://github.com/nntrn/htmlviewer">htmlviewer</a>`,
    '</footer>',
    '',
    '<script>',
    `const data = ${JSON.stringify(data, null, 2)}`,
    '</script>',
    '<script>',
    scriptString,
    '  createToc(data)',
    '</script>',
    '</body>',
    '',
    '</html>',
  ].flat(2).join('\n')

}
module.exports = createTemplate
