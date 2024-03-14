/**
 * bling.js
 * https://gist.github.com/paulirish/12fb951a8b893a454b32
*/

window.$$ = document.querySelectorAll.bind(document);
window.$ = document.querySelector.bind(document);

Node.prototype.on = window.on = function (name, fn) {
  this.addEventListener(name, fn);
}

NodeList.prototype.__proto__ = Array.prototype;

NodeList.prototype.on = NodeList.prototype.addEventListener = function (name, fn) {
  this.forEach(function (elem, i) {
    elem.on(name, fn);
  });
}

// a function to create html elements
const makeElem = (elemType, props, children) => {
  const elem = document.createElement(elemType);
  if (props) Object.assign(elem, props);
  if (children) elem.prepend(...children);

  return elem;
}

window.makeElem = makeElem;