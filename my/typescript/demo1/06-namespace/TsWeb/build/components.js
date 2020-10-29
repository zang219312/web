"use strict";
var Components;
(function (Components) {
  var Header = /** @class */ (function () {
    function Header() {
      var el = document.createElement('div');
      el.innerText = 'this is Header';
      document.body.appendChild(el);
    }
    return Header;
  }());
  Components.Header = Header;
  var Content = /** @class */ (function () {
    function Content() {
      var elem = document.createElement('div');
      elem.innerText = 'This is Content';
      document.body.appendChild(elem);
    }
    return Content;
  }());
  Components.Content = Content;
  var Footer = /** @class */ (function () {
    function Footer() {
      var elem = document.createElement('div');
      elem.innerText = 'This is Footer';
      document.body.appendChild(elem);
    }
    return Footer;
  }());
  Components.Footer = Footer;
})(Components || (Components = {}));