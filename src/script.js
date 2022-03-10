const inlineScripts = {
  createElementId,
  createTocLink,
  createToc
}

module.exports = inlineScripts

function createElementId(id, root = document) {
  const elementId = 'hv-' + id.replace(/[^a-zA-Z0-9]+/g, '-')
  if(!document.querySelector(`#${elementId}`)) {
    root.appendChild(Object.assign(document.createElement('div'), { id: elementId }))
  }
  return document.querySelector(`#${elementId}`)

}

function createTocLink(obj, targetName) {
  return Object.assign(document.createElement('a'), {
    innerHTML: obj.title,
    href: obj.path,
    target: targetName
  })
}

function createToc(data) {
  data.files.forEach(file => {
    const reduced = file.dirname.reduce((a, b, i) => {
      const elemId = b.replace(/^([0-9])/, 'hv-$1').replace(/[^a-zA-Z0-9]+/g, '-')
      var c = a.querySelector('#' + elemId)
      if(!c) {
        c = Object.assign(document.createElement('details'), {
          id: elemId,
          className: `folder parent level-${i}`,
          title: b,
          innerHTML: `<summary>${b}</summary>` })
        a.appendChild(c)
      }
      return c
    }, document.querySelector(`#${data.dom.toc.id}`))

    reduced.appendChild(createTocLink(file, data.dom.iframe.name))
  })

}

