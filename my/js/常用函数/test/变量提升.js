// 变量提升
function Foo() {
  getName = function () {
    alert(1);
    return this;
  }
}

Foo.getName = function () {
  alert(2)
}
Foo.prototype.getName = function () {
  alert(3)
}

var getName = function (param) {
  alert(4)
}

function getName() {
  alert(5)
}

Foo.getName(); //2
getName(); // 4 
Foo().getName(); // 1
getName(); //4
new Foo.getName()
new Foo().getName()
new new Foo().getName()