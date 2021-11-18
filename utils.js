const properCase = (string) => {
  return `${string[0].toUpperCase()}${string.slice(1).toLowerCase()}`;
};

const log = (content) => {
  console.log(content);
};

export const select = (selector, scope) => {
  return (scope || document).querySelector(selector);
};

export const listen = (target, event, callback, capture = false) => {
  target.addEventListener(event, callback, !!capture);
};

const sanitizeInput = (inputValue) => {
  const div = document.createElement('div');
  div.textContent = inputValue;
  return div.innerHTML;
};

const createElement = (tag, className) => {
  const el = document.createElement(tag);
  if (className) el.classList.add(className);
  return el;
};

const deleteChildElements = (parentElement) => {
  let child = parentElement.lastElementChild;
  while(child) {
    parentElement.removeChild(child);
    child = parentElement.lastElementChild;
  }
};

const addClass = (selector, className, scope) => {
  (scope || document).querySelector(selector).classList.add(className);
};
