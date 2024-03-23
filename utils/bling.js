/**
 * bling.js
 * https://gist.github.com/paulirish/12fb951a8b893a454b32
 */

window.$$ = document.querySelectorAll.bind(document);
window.$ = document.querySelector.bind(document);

Node.prototype.on = window.on = function (name, fn, ...options) {
  if (options.length > 0) {
    this.addEventListener(name, fn, ...options);
  } else {
    this.addEventListener(name, fn);
  }
};

NodeList.prototype.__proto__ = Array.prototype;

NodeList.prototype.on = NodeList.prototype.addEventListener = function (
  name,
  fn,
  ...options
) {
  if (options.length > 0) {
    this.forEach(function (elem, i) {
      elem.on(name, fn, ...options);
    });
  } else {
    this.forEach(function (elem, i) {
      elem.on(name, fn);
    });
  }
};

// a function to create html elements
const makeElem = (elemType, props, children) => {
  const elem = document.createElement(elemType);
  
  if (props) {
    for (const [key, value] of Object.entries(props)) {
      if (key === 'onclick' && props['once']) {
        elem.on('click', value, { once: true });
      } else {
        elem[key] = value;
      }
    }
  }

  if (children) {
    elem.prepend(...children);
  }

  return elem;
};


window.makeElem = makeElem;
