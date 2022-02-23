function createStyle(data) {
  const tocId = `#${data.dom.toc.id}`
  const iframeId = `#${data.dom.iframe.id}`

  return `
  <style>
    *,*:after{box-sizing:border-box}
    article{display:flex; gap:1em;height:80vh;overflow:hidden}
    ${iframeId}{width:100%;transition:all 600ms cubic-bezier(0.68, -0.55, 0.265, 1.55);border:5px solid #222;background:white;}
    ${tocId}{overflow:scroll;padding:0;width:30vw;padding-right:3em}
    ${tocId} li{padding:0 0.25rem;}
    ${tocId} span:hover{font-weight:bold }
    ${tocId} span{cursor:pointer;}
    ${tocId} a{text-decoration:none;line-height:100%}
    ${tocId} a:after{content:attr(href);display:block;font-size:90%;color:#999;border-bottom:none;text-decoration:none;}
    body{position:relative;overflow:hidden;height:90vh;width:100%;margin:auto;padding:1em 4em}
    ${tocId},${iframeId}{overflow-y:scroll}
    header *{line-height:100%;margin:.3em 0;}
    footer{padding:1em 0;}
    ${tocId}:hover{/*! min-width:40vw */}
  
    .level-0{margin-left:0}
    .level-1{margin-left:10px}
    .parent:before{content:attr(title);display:table-row;margin:0}
    .parent a{display:table-row;white-space: pre}
    .parent a:before{content:'└ '}
    .parent a:after{content:''!important}
  </style>
  `
}

module.exports = createStyle
