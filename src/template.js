'use strict'
const styleCss = require('./style')
const inlineScripts = require('./script')
const { camelCase, kebabCase } = require('./utils')

function writeHTMLAttr(obj) {
  return Object.entries(obj)
    .map(e => `${kebabCase(e[0])}='${Array.isArray(e[1]) ? e[1].join(' ') : e[1].toString()}'`)
    .join('')
}

const htmlTemplate = (props = this.defaultProps) => `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${props.title}</title>
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta data-htmlviewer="true" />

  ${styleCss(props)}
</head>
<body>
<main>
  <header>
    <h1><strong>htmlviewer:</strong> ${props.title}</h1>
    <h3>${props.dirpath}</h3>
  </header>
  <article>
    <div ${writeHTMLAttr(props.dom.toc)}></div>
    <iframe ${writeHTMLAttr(props.dom.iframe)}></iframe>
  </article>
  <footer>
    <div>Created using <a href="https://github.com/nntrn/htmlviewer">htmlviewer</a></div>
  </footer>
</main>
<script>
  const data = ${JSON.stringify(props, null, 2)}
</script>
<script>
${[props.inline.script].flat(2).join('\n')}
</script>

</body>
</html>

`

htmlTemplate.defaultProps = {
  title: 'Untitled',
  dom: {
    iframe: {
      name: 'hvframe',
      id: 'hvframe',
      sandbox: 'allow-scripts'
    },
    toc: {
      id: 'hvtoc'
    }
  },
  inline: {
    script: [],
    style: []
  }
}

module.exports = htmlTemplate
