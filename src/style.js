function createStyle(data) {
  const tocId = `#${data.toc_id}`
  const iframeId = `#${data.iframe_name}`

  return `
  <style>
    *,*:after{box-sizing:border-box}
    article{display:flex; gap:1em;height:80vh;overflow:hidden}
    ${iframeId}{width:100%;transition:all 600ms cubic-bezier(0.68, -0.55, 0.265, 1.55);border:5px solid #222;background:white;}
    ${tocId}{overflow-y:scroll;padding:0;width:fit-content;max-width:50vw;word-break: break-word;}
    ${tocId} li{padding:0 0.25rem;}
    ${tocId} span:hover{font-weight:bold }
    ${tocId} span{cursor:pointer;}
    ${tocId} a{text-decoration:none;line-height:100%}
    ${tocId}-old a:after{content:attr(href);display:block;font-size:90%;color:#999;border-bottom:none;text-decoration:none;}
    body{position:relative;overflow:hidden;height:100%;width:100%;margin:auto;padding:1em 4em;font-family:monospace;font-size:85%}
    ${tocId},${iframeId}{overflow-y:scroll}
    header{margin-bottom:2em}
    header *{line-height:100%;margin:.3em 0;}
    footer{padding:1em 0;}
    ${tocId}:hover{/*! min-width:40vw */}

    .level-0{margin-left:0;border-top:1px solid}
    .level-1{margin-left:10px;}
    .parent:before{content:attr(title);display:table;margin:0}
    .parent a{display:table;white-space: pre-line}
    .parent a:before{content:'└ ';display:table-cell; padding:.4em}
    .parent a:after{content:''!important}
    .parent > .parent {margin-left: 1em;}

    ::-webkit-scrollbar{width:10px;height:6px;}
    ::-webkit-scrollbar-track{background:transparent;}
    ::-webkit-scrollbar-thumb{border-radius:30px;border:3px solid transparent;background:#000;background-clip:content-box;}

    @media screen and (max-width: 510px) {
      body{overflow-y:unset}
      article{flex-wrap:wrap;height:100%}
      ${tocId} a:after{display: none}
      ${tocId} a{display: list-item;margin:.25em 0;margin-left:1em;}
      ${iframeId}{height:100%;min-height: 50vh;}
      ${tocId}{width:100%!important;height:30vh;flex-grow:1;max-width: unset}
  }
  </style>
  `
}

module.exports = createStyle
