export class Header {
  constructor() {
    const el = document.createElement('div');
    el.innerText = 'this is Header';
    document.body.appendChild(el);
  }
}

export class Content {
  constructor() {
    const elem = document.createElement('div');
    elem.innerText = 'This is Content';
    document.body.appendChild(elem);
  }
}

export class Footer {
  constructor() {
    const elem = document.createElement('div');
    elem.innerText = 'This is Footer';
    document.body.appendChild(elem);
  }
}
