(function(e){function t(t){for(var n,a,s=t[0],c=t[1],u=t[2],h=0,f=[];h<s.length;h++)a=s[h],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&f.push(o[a][0]),o[a]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);l&&l(t);while(f.length)f.shift()();return i.push.apply(i,u||[]),r()}function r(){for(var e,t=0;t<i.length;t++){for(var r=i[t],n=!0,s=1;s<r.length;s++){var c=r[s];0!==o[c]&&(n=!1)}n&&(i.splice(t--,1),e=a(a.s=r[0]))}return e}var n={},o={app:0},i=[];function a(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.m=e,a.c=n,a.d=function(e,t,r){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(a.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)a.d(r,n,function(t){return e[t]}.bind(null,n));return r},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/2048/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=t,s=s.slice();for(var u=0;u<s.length;u++)t(s[u]);var l=c;i.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"56d7":function(e,t,r){"use strict";r.r(t);r("e260"),r("e6cf"),r("cca6"),r("a79d");var n=r("7a23"),o={id:"app"},i=Object(n["f"])("div",{class:"header"},[Object(n["e"])(" 2048 game with an auto solver"),Object(n["f"])("br"),Object(n["e"])(" by "),Object(n["f"])("a",{href:"https://github.com/paradite/2048"},"@paradite")],-1),a={class:"buttons"},s={class:"info"},c={class:"scores"},u=Object(n["e"])(" High Scores "),l=Object(n["f"])("br",null,null,-1),h={key:0};function f(e,t,r,f,v,d){var g=Object(n["j"])("GameBoard");return Object(n["h"])(),Object(n["c"])("div",o,[i,Object(n["f"])(g,{game:v.game,cells:v.cells},null,8,["game","cells"]),Object(n["f"])("div",a,[Object(n["f"])("div",{class:["button button-primary",{active:v.game.isAuto}],onClick:t[1]||(t[1]=function(){return d.handleAuto&&d.handleAuto.apply(d,arguments)})}," Magic ",2),Object(n["f"])("div",{class:"button button-primary",onClick:t[2]||(t[2]=function(){return d.restart&&d.restart.apply(d,arguments)})}," Restart ")]),Object(n["f"])("div",s,"Move count: "+Object(n["k"])(v.game.moveCount),1),Object(n["f"])("div",c,[u,l,0===v.game.scores.length?(Object(n["h"])(),Object(n["c"])("span",h," (empty)")):Object(n["d"])("",!0),(Object(n["h"])(!0),Object(n["c"])(n["a"],null,Object(n["i"])(v.game.scores,(function(e,t){return Object(n["h"])(),Object(n["c"])("div",{key:t,class:"score"}," [moves: "+Object(n["k"])(e[0])+", max: "+Object(n["k"])(e[1])+"] ",1)})),128))])])}var v=r("ade3"),d={class:"bg"},g=Object(n["f"])("div",null,null,-1);function b(e,t,r,o,i,a){return Object(n["h"])(),Object(n["c"])("div",{class:"board",style:{width:a.totalSize+"px",height:a.totalSize+"px",padding:i.marginSize+"px"}},[(Object(n["h"])(!0),Object(n["c"])(n["a"],null,Object(n["i"])(r.cells,(function(e){var t;return Object(n["h"])(),Object(n["c"])("div",{key:e.id,class:["cell",(t={},Object(v["a"])(t,"cell-".concat(e.number),!0),Object(v["a"])(t,"fade-in",e&&e.count===r.game.moveCount),t)],id:e.id,style:{left:i.cellSize*e.col+i.marginSize*(e.col+1)+"px",top:i.cellSize*e.row+i.marginSize*(e.row+1)+"px"}},Object(n["k"])(e.number),15,["id"])})),128)),Object(n["f"])("div",d,[(Object(n["h"])(!0),Object(n["c"])(n["a"],null,Object(n["i"])(r.game.rows,(function(e,t){return Object(n["h"])(),Object(n["c"])("div",{key:t,class:"row",style:{width:a.totalSize+"px",height:i.cellSize+"px",marginBottom:t===r.game.rows.length-1?0:i.marginSize+"px"}},[(Object(n["h"])(!0),Object(n["c"])(n["a"],null,Object(n["i"])(e,(function(t,r){return Object(n["h"])(),Object(n["c"])("div",{key:r,class:"cell-bg",style:{width:i.cellSize+"px",height:i.cellSize+"px",marginRight:r===e.length-1?0:i.marginSize+"px"}},null,4)})),128))],4)})),128))]),g],4)}r("99af");var w=r("2909"),m=r("3835"),p=r("d4ec"),O=r("bee2"),j=r("cd3f"),A=r.n(j),y=r("ec26"),k=(r("b64b"),function(e,t){if(t){console.log("----");for(var r=0;r<e.length;r++){for(var n="",o=e[r],i=0;i<o.length;i++)o[i]&&o[i].number>=10?n+=o[i].number+" ":o[i]?n+=o[i].number+"  ":n+=".  ";console.log(n)}}}),M={ArrowLeft:"ArrowLeft",ArrowRight:"ArrowRight",ArrowUp:"ArrowUp",ArrowDown:"ArrowDown"},C=[M.ArrowLeft,M.ArrowRight,M.ArrowUp,M.ArrowDown],R=2048,S=!1,x=function(){function e(t,r,n,o){Object(p["a"])(this,e),this.row=t,this.col=r,this.number=n,this.count=o,this.id=Object(y["a"])()}return Object(O["a"])(e,[{key:"is",value:function(e){return this.number===e}},{key:"add",value:function(e){this.number=this.number+e}},{key:"updatePos",value:function(e,t){this.row=e,this.col=t}}]),e}(),z=function(){function e(){var t=this;Object(p["a"])(this,e),Object(v["a"])(this,"restart",(function(){t.moveCount=0,t.resetRows()})),Object(v["a"])(this,"runForEachCell",(function(e){for(var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:t.rows,n=0;n<r.length;n++)for(var o=r[n],i=0;i<o.length;i++){var a=o[i];e(n,i,a)}})),this.rows=[],this.cells=[],this.restart(),this.moved={},this.moveCount=0,this.scores=[],this.isAuto=!1,this.autoInterval=null}return Object(O["a"])(e,[{key:"resetRows",value:function(){this.rows=new Array(4);for(var e=0;e<this.rows.length;e++)this.rows[e]=new Array(4);this.addRandomNumbers(2,this.rows),this.updateCells()}},{key:"updateCells",value:function(){var e=[];this.runForEachCell((function(t,r,n){n&&e.push(n)})),e.sort((function(e,t){return e.id<t.id?-1:e.id>t.id?1:0})),this.cells=e}},{key:"checkWin",value:function(){var t=this,r=!1;if(this.runForEachCell((function(n,o,i){i&&i.number===e.winNumber&&(t.scores.push([t.moveCount,e.winNumber]),r=!0,console.log("score, moves filled",t.moveCount,t.moveCount,t.getFilledCount(t.rows)))})),r)return this.restart(),!0}},{key:"checkLose",value:function(){var e=this.rows.length*this.rows[0].length,t=0;if(this.runForEachCell((function(e,r,n){n&&t++})),e===t)return this.scores.push([this.moveCount,this.getMax(this.rows)]),console.log("score, moves filled",0,this.moveCount,this.getFilledCount(this.rows)),this.restart(),!0}},{key:"addRandomNumbers",value:function(t,r){for(var n=0;n<t;n++){var o=e.getRandomPosition(),i=e.getRandomPosition(),a=3;while(r[o][i]&&a)o=e.getRandomPosition(),i=e.getRandomPosition(),a--;if(r[o][i])return;var s=e.getRandomNumber();e.addNumberToPosition(s,o,i,this.moveCount,r)}}},{key:"getNewRows",value:function(t,r){for(var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},o=A()(t),i=0;i<o.length;i++)for(var a=o[i],s=0;s<a.length;s++)if(!n["".concat(i,"-").concat(s)]){var c=a[s];if(c){var u=c.number,l=e.getMoveDestination(o,i,s,u,r,n);if(l){var h=Object(m["a"])(l,2),f=h[0],v=h[1];if(f===i&&v===s)continue;n["".concat(f,"-").concat(v)]=!0;var d=a[s];o[f][v]?(o[f][v].is(u)||console.error("cell ".concat(c," from ").concat(i,",").concat(s," moved to ").concat(f,",").concat(v," with ").concat(o[f][v])),d.add(o[f][v].number,d),d.updatePos(f,v),o[f][v]=d,a[s]=void 0):(d.updatePos(f,v),o[f][v]=d,a[s]=void 0)}}}return o}},{key:"handleEvent",value:function(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];if(e.isValidKey(t)){n&&this.moveCount++;var o=this.getNewRows(this.rows,t,r);this.squeeze(o,t),this.rows=o,this.updateCells();var i=this.checkWin();if(!i&&(i=this.checkLose(),!i))return this.addRandomNumbers(1,o),k(o,S),this.rows=o,this.updateCells(),this.cells}}},{key:"squeeze",value:function(e,t){for(var r=!1,n=0;n<e.length;n++)for(var o=e[n],i=0;i<o.length;i++){var a=o[i];if(a){var s=this.getSqueezeDestination(e,n,i,t);if(s){var c=Object(m["a"])(s,2),u=c[0],l=c[1];if(u===n&&l===i)continue;r=!0;var h=o[i];e[u][l]?(console.error("something wrong r c",u,l),console.error("rows[r][c]",e[u][l])):(h.updatePos(u,l),e[u][l]=h,o[i]=void 0)}}}r&&this.squeeze(e,t)}},{key:"getSqueezeDestination",value:function(e,t,r,n){switch(n){case M.ArrowUp:if(0===t)return[t,r];for(var o=t-1;o>=0;o--)if(e[o][r])return[o+1,r];return[0,r];case M.ArrowDown:if(t===e.length-1)return[t,r];for(var i=t+1;i<=e.length-1;i++)if(e[i][r])return[i-1,r];return[e.length-1,r];case M.ArrowLeft:if(0===r)return[t,r];for(var a=r-1;a>=0;a--)if(e[t][a])return[t,a+1];return[t,0];case M.ArrowRight:if(r===e[0].length-1)return[t,r];for(var s=r+1;s<=e[0].length-1;s++)if(e[t][s])return[t,s-1];return[t,e[0].length-1];default:break}}},{key:"autoSolve",value:function(){var e=this.getAutoMoveMinFilledNSteps(3);return this.handleEvent(e)}},{key:"getFilledCount",value:function(e){var t=0;return this.runForEachCell((function(e,r,n){n&&t++}),e),t}},{key:"getMax",value:function(e){var t=0;return this.runForEachCell((function(e,r,n){n&&n.number>t&&(t=n.number)}),e),t}},{key:"getAutoMoveMinFilled",value:function(){for(var e=this.rows.length*this.rows[0].length,t=0,r=this.getAutoMoveRandom(),n=[],o=0;o<C.length;o++){var i=C[o],a=this.getNewRows(this.rows,i),s=this.getFilledCount(a),c=this.getMax(a);s<e?(e=s,t=c,n=[i]):s===e&&c>t?(t=c,n=[i]):s===e&&c===t&&n.push(i)}var u=Math.floor(Math.random()*n.length);return r=n[u]?n[u]:r,r}},{key:"getAutoMoveMinFilledTwoSteps",value:function(){for(var e=this.getFilledCount(this.rows),t=this.rows.length*this.rows[0].length,r=0,n=this.getAutoMoveRandom(),o=[],i=0;i<C.length;i++)for(var a=C[i],s=0;s<C.length;s++){var c=C[s],u=this.getNewRows(this.rows,a);this.squeeze(u,a),u=this.getNewRows(u,c);var l=this.getFilledCount(u),h=this.getMax(u);l<e-3&&(console.log("----",e),console.log("getAutoMoveMinFilled -> move move 2 filledCount max",a,c,l,h)),l<t?(t=l,r=h,o=[a]):l===t&&h>r?(r=h,o=[a]):l===t&&h===r&&o.push(a)}var f=Math.floor(Math.random()*o.length);return n=o[f]?o[f]:n,n}},{key:"getAutoMoveMinFilledNSteps",value:function(e){for(var t=this.getFilledCount(this.rows),r=this.rows.length*this.rows[0].length,n=0,o=this.getAutoMoveRandom(),i=[],a=[[M.ArrowDown],[M.ArrowUp],[M.ArrowLeft],[M.ArrowRight]],s=1;s<e;s++){for(var c=[],u=0;u<a.length;u++)for(var l=a[u],h=0;h<C.length;h++){var f=C[h];c.push([].concat(Object(w["a"])(l),[f]))}a=c}for(var v=0;v<a.length;v++){for(var d=a[v],g=this.rows,b=0;b<d.length;b++){var m=d[b];g=this.getNewRows(g,m),this.squeeze(g,m)}var p=this.getFilledCount(g),O=this.getMax(g);p<t-2&&S&&(console.log("----",t),console.log("getAutoMoveMinFilled -> moveC, filledC max",this.moveCount,p,O)),p<r?(r=p,n=O,i=[d[0]]):p===r&&O>n?(n=O,i=[d[0]]):p===r&&O===n&&i.push(d[0])}var j=Math.floor(Math.random()*i.length);return o=i[j]?i[j]:o,o}},{key:"getAutoMoveRandom",value:function(){var e=Math.random();return e<.25?M.ArrowDown:e<.5?M.ArrowUp:e<.75?M.ArrowLeft:M.ArrowRight}}]),e}();Object(v["a"])(z,"winNumber",R),Object(v["a"])(z,"isValidKey",(function(e){return e===M.ArrowUp||e===M.ArrowDown||e===M.ArrowLeft||e===M.ArrowRight})),Object(v["a"])(z,"addNumberToPosition",(function(e,t,r,n,o){var i=new x(t,r,e,n);o[t][r]=i})),Object(v["a"])(z,"getRandomPosition",(function(){var e=Math.random();return e<.25?0:e<.5?1:e<.75?2:3})),Object(v["a"])(z,"getRandomNumber",(function(){return 2})),Object(v["a"])(z,"getMoveDestination",(function(e,t,r,n,o,i){switch(o){case M.ArrowUp:if(0===t)return[t,r];for(var a=t-1;a>=0;a--)if(i["".concat(a,"-").concat(r)]){if(e[a][r])return[a+1,r]}else if(e[a][r])return e[a][r].is(n)?[a,r]:[a+1,r];return[t,r];case M.ArrowDown:if(t===e.length-1)return[t,r];for(var s=t+1;s<=e.length-1;s++)if(i["".concat(s,"-").concat(r)]){if(e[s][r])return[s-1,r]}else if(e[s][r])return e[s][r].is(n)?[s,r]:[s-1,r];return[t,r];case M.ArrowLeft:if(0===r)return[t,r];for(var c=r-1;c>=0;c--)if(i["".concat(t,"-").concat(c)]){if(e[t][c])return[t,c+1]}else if(e[t][c])return e[t][c].is(n)?[t,c]:[t,c+1];return[t,r];case M.ArrowRight:if(r===e[0].length-1)return[t,r];for(var u=r+1;u<=e[0].length-1;u++)if(i["".concat(t,"-").concat(u)]){if(e[t][u])return[t,u-1]}else if(e[t][u])return e[t][u].is(n)?[t,u]:[t,u-1];return[t,r];default:break}}));var F={name:"GameBoard",data:function(){var e=80,t=10;return{cellSize:e,marginSize:t}},computed:{totalSize:function(){return 4*this.cellSize+3*this.marginSize}},props:{game:z,cells:Array,rows:Array}};r("ddec");F.render=b;var N=F,P=new z,E=50,D={name:"App",components:{GameBoard:N},mounted:function(){var e=this;window.onkeyup=function(t){e.cells=P.handleEvent(t.code)},document.addEventListener("touchstart",o,!1),document.addEventListener("touchmove",i,!1);var t=null,r=null;function n(e){return e.touches||e.originalEvent.touches}function o(e){var o=n(e)[0];t=o.clientX,r=o.clientY}function i(e){if(t&&r){var n=e.touches[0].clientX,o=e.touches[0].clientY,i=t-n,a=r-o;Math.abs(i)>Math.abs(a)?this.cells=i>0?P.handleEvent(M.ArrowLeft):P.handleEvent(M.ArrowRight):this.cells=a>0?P.handleEvent(M.ArrowUp):P.handleEvent(M.ArrowDown),t=null,r=null}}},data:function(){return{game:P,cells:P.cells,isAuto:!1,autoInterval:null}},methods:{restart:function(){this.cells=P.restart()},handleAuto:function(){var e=this;this.isAuto=!this.isAuto,this.autoInterval&&clearInterval(this.autoInterval),this.isAuto&&(this.cells=P.autoSolve(),this.autoInterval=setInterval((function(){e.cells=P.autoSolve()}),E))}}};r("687d");D.render=f;var L=D,U=Object(n["b"])({render:function(){return Object(n["g"])(L)}});U.mount("#app")},"687d":function(e,t,r){"use strict";r("e43f")},b882:function(e,t,r){},ddec:function(e,t,r){"use strict";r("b882")},e43f:function(e,t,r){}});
//# sourceMappingURL=app.20cd7525.js.map