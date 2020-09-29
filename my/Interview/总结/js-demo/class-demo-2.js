// 父类
class People {
  constructor(name) {
    this.name = name;
  }
  eat() {
    console.log(`${this.name}吃饭`);
  }
}

// 子类
class Student extends People {
  constructor(name, number) {
    super(name);
    this.number = number;
  }
  sayHi() {
    console.log(`${this.name}de学号${this.number}`);
  }
}

// 子类
class Teacher extends People {
  constructor(name, major) {
    super(name);
    this.major = major;
  }
  teach() {
    console.log(`${this.name} 教 ${this.major}课`);
  }
}

const ts = new Student('ts', '1504200');
console.log(ts);
ts.sayHi();
ts.eat();

const xu = new Teacher('xu', '医学');
console.log(xu);
xu.teach();
xu.eat();
