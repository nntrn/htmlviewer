
function createElementId(id, root = document) {
  const elementId = 'hv-' + id.replace(/[^a-zA-Z0-9]+/g, '-')
  if(!document.querySelector(`#${elementId}`)) {
    root.appendChild(Object.assign(document.createElement('div'), { id: elementId }))
  }
  return document.querySelector(`#${elementId}`)

}

function createTocLink(obj) {
  return Object.assign(document.createElement('a'), {
    innerHTML: obj.title,
    href: obj.path,
    target: 'iframe'
  })
}

function tree(node, ul) {
  node.files.forEach(file => {
    let li = document.createElement('li')
    li.appendChild(Object.assign(document.createElement('a'), { innerHTML: file.title, href: file.path, target: 'iframe' }))
    ul.appendChild(li)
  })
}

function createDirectoryList(obj, parent = document.createElement('ul')) {
  if(Array.isArray(obj)) {
    return obj.filter(f => ['directory', 'file'].includes(f.type)).map(a => createDirectoryList(a, parent))[0]
  }
  if(obj.type === 'directory') {
    const ul = Object.assign(document.createElement('ul'), {
      className: obj.type,
      title: obj.name.split('/').slice(-1)[0]
    })

    obj.contents.forEach(content => {
      createDirectoryList(content, ul)
    })
    parent.appendChild(ul)
  }
  if(obj.type === 'file') {
    const li = Object.assign(document.createElement('li'), {
      className: obj.type,
    })

    li.appendChild(Object.assign(document.createElement('a'), {
      textContent: obj.name.split('/').slice(-1)[0],
      href: obj.name,
      target: 'iframe'
    }))
    parent.appendChild(li)

  }
  return parent
}

function createToc(data) {
  data.files.forEach(file => {
    const reduced = file.dirname.reduce((a, b, i) => {
      const elemId = b.replace(/^([0-9])/, 'hv-$1').replace(/[^a-zA-Z0-9]+/g, '-')
      var c = a.querySelector('#' + elemId)
      if(!c) {
        c = Object.assign(document.createElement('div'), { id: elemId, className: `parent level-${i}`, title: b })
        a.appendChild(c)
      }
      return c
    }, document.querySelector('#toc'))

    reduced.appendChild(createTocLink(file))
  })

}
module.exports = {
  createElementId,
  createTocLink,
  tree,
  createDirectoryList,
  createToc
}

