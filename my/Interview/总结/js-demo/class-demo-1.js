// 类
class Student {
  constructor(name, number) {
    this.name = name;
    this.number = number;
  }

  sayHi() {
    console.log(`${this.name},序号${this.number}`);
  }
}

// 声明实例
const zd = new Student('zd', '11111031');
zd.sayHi();
console.log(zd);
