let angularAppRoot = document.createElement("app-root");
document.body.append(angularAppRoot);
let espJsUrl = "https://oi.esphome.io/v2/www.js"
let espHomeScript = document.createElement('script');
espHomeScript.setAttribute('src',espJsUrl);
document.head.appendChild(espHomeScript);

setTimeout(() => {
  document.body.prepend(angularAppRoot);
}, 3000);