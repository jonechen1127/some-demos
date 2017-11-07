/*
* @Author: chenjun
* @Date:   2017-11-04 08:56:48
* @Last Modified by:   chenjun
* @Last Modified time: 2017-11-04 08:56:52
*/
var root = document.documentElement;
var timer = null;
var baseSize = 0;

function setBaseSize() {
    baseSize = (root.clientWidth / 320) * 20;
    baseSize = baseSize > 24 ? 24 : baseSize;
    root.style.fontSize = baseSize + 'px';
}
window.addEventListener("resize", function() {
    timer && clearTimeout(timer);
    timer = setTimeout(setBaseSize, 300);
}, false);
setBaseSize();