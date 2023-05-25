const styleCss = require('./style')
const scripts = require('./script')

// const scriptString = Object.values(scripts).map(s => s.toString().split('\n').map(e => '  ' + e).join('\n'))

const scriptString = (data) => `
const ul = document.querySelector("#${data.toc_id} ul")

data.files.forEach(el=>{
  let li = document.createElement('li')
  li.appendChild(Object.assign(document.createElement('a'), {
    href: el, 
    target: "${data.iframe_name}",
    textContent: el.replace(data.root,'')
  }))

  ul.appendChild(li)
})
`
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
    `  <h1>htmlviewer</h1>`,
    `  <h3>${data.dirpath}</h3>`,
    '</header>',
    '<article>',
    `  <div id="${data.toc_id}"><ul></ul></div>`,
    `  <iframe name="${data.iframe_name}" id="${data.iframe_name}"></iframe>`,
    '</article>',
    '<footer>',
    `Created using <a href="https://github.com/nntrn/htmlviewer">htmlviewer</a>`,
    '</footer>',
    '</main>',
    '<script>',
    `  const data = ${JSON.stringify(data, null, 2)}`,
    '</script>',
    '<script>',
    scriptString(data),
    // '  createToc(data)',
    '</script>',
    '</body>',
    '',
    '</html>',
  ].flat(2).join('\n')

}
module.exports = createTemplate
