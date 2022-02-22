const cssString = `
*,*:after{box-sizing:border-box}
article{display:flex; gap:1em;height:80vh;overflow:hidden}
iframe{width:100%;transition:all 600ms cubic-bezier(0.68, -0.55, 0.265, 1.55);border:5px solid #222;background:white;}
#toc{overflow:scroll;padding:0;width:30vw;padding-right:3em}
#toc li{padding:0 0.25rem;}
#toc span:hover{font-weight:bold }
#toc span{cursor:pointer;}
#toc a{text-decoration:none;line-height:100%}
#toc a:after{content:attr(href);display:block;font-size:90%;color:#999;border-bottom:none;text-decoration:none;}
body{position:relative;overflow:hidden;height:90vh;width:100%;margin:auto;padding:1em 4em}
#toc,iframe{overflow-y:scroll}
header *{line-height:100%;margin:.3em 0;}
footer{padding:1em 0;}
#toc:hover{/*! min-width:40vw */}
#toctree{height:100vh;overflow:scroll;flex-grow:1;padding:0}
#toctree li{padding:0 0.25rem;}
#toctree a{text-decoration:none;line-height:100%}
#toctree {height:100%;overflow-y:scroll;display:block;flex-direction: column;flex-wrap:wrap;padding-bottom:2em}
#toctree .directory:before{content:attr(title);margin-left:0;padding-left:0;display: table-row}
#toctree .directory{display:flex;flex-direction: column;flex-wrap:wrap}
#toctree .file{display:list-item;margin-left:10%}
#toctree ul{display:flex;padding-top:0;margin:0;padding-left:10px}

.level-0{margin-left:0}
.level-1{margin-left:10px}
.parent:before{content:attr(title);display:table-row;margin:0}
.parent a{display:table-row;white-space: pre}
.parent a:before{content:'└ '}
.parent a:after{content:''!important}

`

module.exports = [
  '<style>',
  cssString.split('\n').map(e => '  ' + e),
  '</style>'
].flat(2).join('\n')
