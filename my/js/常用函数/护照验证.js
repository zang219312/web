var pattern = /^([EK]\d{8}|(SE|DE|PE|MA)\d{7})$/,
  str = 'E1234578';
console.log(pattern.test(str));