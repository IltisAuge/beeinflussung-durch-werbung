function onPageLoad() {
  let elements = [document.getElementById('page-title'), document.getElementById('page-body')];
  let i = 0;
  setInterval(function() {
    let element = elements[i];
    if (element == null) {
      return;
    }
    console.log(element);
    let op = 0.1;
    var i2 = setInterval(function() {
      if (op > 1.00) {
        clearInterval(i2);
        return;
      }
      element.style.opacity = op;
      op = op + 0.1;
    }, 50, 0);
    i++;
    if (i + 1 >= elements.length) {
      return;
    }
  }, 100, 0);
}

function themeSelectorClicked(document, selector) {
  let checked = selector.checked;
  console.log("checked=" + checked);
  let theme = checked ? "dark" : "light";
  setTheme(document, theme);
  setThemeStylesheet(document, theme);
}

var detectedTheme = null;

function detectAndUpdateTheme(document) {
  console.log("Detecting theme...");
  let theme = getCookie('theme');
  console.log("Found theme cookie:" + theme);
  let isUsingDarkmode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  theme = (theme != null && theme == "dark") || (theme == null && isUsingDarkmode) ? "dark" : "light";
  console.log("Theme=" + theme);
  setThemeStylesheet(document, theme);
  detectedTheme = theme;
}

function setTheme(document, theme) {
  console.log("Set theme cookie to " + theme);
  document.cookie = "theme=" + theme;
}

function setThemeStylesheet(document, theme) {
  var stylesheet = document.createElement('link');
  stylesheet.rel = "stylesheet";
  stylesheet.type = 'text/css';
  stylesheet.href = 'compiled/css/' + theme + '_mode/index.css';
  document.head.appendChild(stylesheet);
  console.log("Added " + theme + " mode stylesheet.");
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function addIframe(url) {
  $(window).load(function() {
    var f = document.createElement('iframe');
    f.src = url;
    f.width = 1000;
    f.height = 500;
    $('body').append(f);
  });
}
