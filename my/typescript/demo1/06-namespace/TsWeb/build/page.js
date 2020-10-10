"use strict";
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
            new Components.Header();
            new Components.Content();
            new Components.Footer();
        }
        return Page;
    }());
    Home.Page = Page;
})(Home || (Home = {}));
