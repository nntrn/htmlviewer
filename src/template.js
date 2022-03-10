const styleCss = require('./style')
const scripts = require('./script')

const scriptString = Object.values(scripts).map(s => s.toString().split('\n').map(e => '  ' + e).join('\n'))

function createTemplate(data) {
  return [
    '<!doctype html>',
    '<html lang="en">',
    '<head>',
    `<title>${data.title || 'Untitled'}</title>`,
    '<meta name="viewport" content="width=device-width,initial-scale=1">',
    '<meta charset="UTF-8" />',
    styleCss(data),
    '</head>',
    '<body>',
    '<main>',
    '<header>',
    `  <h1><strong>htmlviewer:</strong> ${data.title}</h1>`,
    `  <h3>${data.dirpath}</h3>`,
    '</header>',
    '<article>',
    `  <div id="${data.dom.toc.id}"></div>`,
    `  <iframe name="${data.dom.iframe.name}" id="${data.dom.iframe.id}" sandbox="allow-scripts"></iframe>`,
    '</article>',
    '<footer>',
    `Created using <a href="https://github.com/nntrn/htmlviewer">htmlviewer</a>`,
    '</footer>',
    '</main>',
    '<script>',
    `  const data = ${JSON.stringify(data, null, 2)}`,
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
