function createCache() {
  const data = {};
  return {
    set: function (key, value) {
      data[key] = value;
    },

    get: function (key) {
      return data[key];
    },
  };
}

let c = createCache();
c.set('a', 100);
let d = c.get('a');
console.log(d); //100
