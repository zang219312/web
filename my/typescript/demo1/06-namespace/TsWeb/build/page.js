"use strict";
var Components;
(function (Components) {
    var SubCom;
    (function (SubCom) {
        var Test = /** @class */ (function () {
            function Test() {
            }
            return Test;
        }());
        SubCom.Test = Test;
    })(SubCom = Components.SubCom || (Components.SubCom = {}));
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
var Home;
(function (Home) {
    /* class Header {
      constructor() {
        const el = document.createElement('div');
        el.innerText = 'this is Header';
        document.body.appendChild(el);
      }
    }
  
    class Content {
      constructor() {
        const elem = document.createElement('div');
        elem.innerText = 'This is Content';
        document.body.appendChild(elem);
      }
    }
  
    class Footer {
      constructor() {
        const elem = document.createElement('div');
        elem.innerText = 'This is Footer';
        document.body.appendChild(elem);
      }
    } */
    var Page = /** @class */ (function () {
        function Page() {
            console.log(Components);
            new Components.Header();
            new Components.Content();
            new Components.Footer();
        }
        return Page;
    }());
    Home.Page = Page;
})(Home || (Home = {}));
