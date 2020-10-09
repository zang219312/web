let count: number = 1;
let myName: string = 'zd';
// count = 'zd';  //报错
console.log(count);
console.log(myName);

/**
 * 自定义静态类型
 */
interface RanMeiZi {
  name: string;
  age: number;
}

let lm: RanMeiZi = {
  name: 'lyf',
  age: 38,
};

//* 对象
let lyf: {
  name: string;
  age: number;
} = {
  name: 'lyf',
  age: 38,
};
// console.log(lyf)

//* 数组
let sisters: String[] = ['zz', 'bb', 'gg'];
// let sisters2: String[] = ['zz', 'bb', 123]; //报错
// console.log(sisters);

//* 类
class Person {}
let xie: Person = new Person();
// console.log(xie);

//* ts中的 =>  与  es6中的 => 不是一回事
//* 在ts 中 => 用来表示函数的定义
//* 函数
let fn: () => string = (): string => {
  return '谢大脚';
};

console.log(fn());

/**
 * 类型注解
 */

function add(one: number, two: number): number {
  return one + two;
}
let a = add(1, 2);

console.log('add(1，2)的值为', a);

//* 函数无返回值时定义方法
function sayHi(): void {
  console.log('hello,world');
}

//* 如果一个函数是永远也执行不完的，就可以定义返回值为 never

// 执行的时候，抛出了异常
/* function err(): never {
  throw new Error('死循环');
}

// 死循环
function forNever(): never {
  while (true) { }
  console.log("Hello JSPang");
} */

//* 函数参数为对象（解构）时
function sum({ one, two }: { one: number; two: number }): number {
  return one + two;
}

console.log(sum({ one: 1, two: 2 }));

function getNumber({ num }: { num: number }): number {
  return num;
}

console.log(getNumber({ num: 12 }));

//* 数组类型的定义
let arr: number[] = [1, 2, 3];
let arr2: string[] = ['a', 'b', 'c'];
let arr3: undefined[] = [undefined, undefined, undefined];

let arr4: (number | string | boolean)[] = [1, null, 'ccc'];
console.log(arr4);

//* 数组中对象类型的定义
let females: { name: string; age: number | string }[] = [
  { name: 'lyf', age: 38 },
  { name: '谢大脚', age: '48' },
];

//* 类型别名
type lady = { name: string; age: number | string };
let females2: lady[] = [
  { name: 'lyf', age: 38 },
  { name: '影子', age: '48' },
];
console.log(females2);

//* 还可以用类
class Madam {
  name: string;
  age: number | string;
}

let females3: Madam[] = [
  { name: '刘英', age: 38 },
  { name: '影子', age: '48' },
];
console.log(females3);

//* 元组 tuple
// 把数组中的每个元素类型的位置给固定住了
let t_xjj: [string, string, number] = ['lyf', 'star', 23];

//* 接口 interface
//* 1.年龄小于 25 岁，胸围大于 90 公分的，可以进入面试环节
/* let resume = (name: string, age: number, bust: number): void => {
  age <= 24 && bust >= 90 && console.log(name + '进入面试');
  age > 24 || (bust < 90 && console.log(name + '被淘汰'));
};
resume('lyf', 24, 94);
resume('大脚', 18, 66);

//* 2.新增查看简历
let getResume = (name: string, age: number, bust: number): void => {
  console.log(name + ' 年龄：' + age);
  console.log(name + ' 胸围：' + bust);
};
getResume('lyf', 24, 94); */

/*interface Girl {
  name: string;
  age: number;
  bust: number;
}

let resume = (girl: Girl): void => {
  girl.age <= 24 && girl.bust >= 90 && console.log(girl.name + '进入面试');
  girl.age > 24 || (girl.bust < 90 && console.log(girl.name + '被淘汰'));
};
let girl = { name: 'lyf', age: 24, bust: 94 };

let getResume = (girl: Girl): void => {
  console.log(girl.name + ' 年龄：' + girl.age);
  console.log(girl.name + ' 胸围：' + girl.bust);
};

resume(girl);
getResume(girl); */

//* 接口和类型别名的区别
//* 类型别名可以直接给类型，比如 string，而接口必须代表对象。
type girl1 = string;

// 接口必须是一个对象
interface girl2 {
  name: string;
  age: number;
}

//* 3.新增查看腰围，但不是必须 ?:
/* interface Girl3 {
  name: string;
  age: number;
  bust: number;
  Waistline?: number;
}

let getResume = (girl: Girl3) => {
  console.log(girl.name + ' 年龄：' + girl.age);
  console.log(girl.name + ' 胸围：' + girl.bust);
  girl.Waistline && console.log(girl.name + ' 腰围：' + girl.Waistline);
};

getResume({ name: 'lyf', age: 24, bust: 94, Waistline: 66 }); */
// 允许加入任意值
interface Girl4 {
  name: string;
  age: number;
  bust: number;
  Waistline?: number;
  [propName: string]: any; //去掉报错
}
//*属性的名字是字符串类型，属性的值可以是任何类型。

let getResume = (girl: Girl4) => {
  console.log(girl.name + ' 年龄：' + girl.age);
  console.log(girl.name + ' 胸围：' + girl.bust);
  girl.Waistline && console.log(girl.name + ' 腰围：' + girl.Waistline);
  girl.sex && console.log(girl.name + ' 性别：' + girl.sex);
};

let girl = {
  name: 'asd',
  age: 24,
  bust: 98,
  sex: '女',
};

// getResume(girl);

//* 接口里的方法
interface Girl5 {
  name: string;
  age: number;
  bust: number;
  waistline?: number;
  [propName: string]: any;
  say(): string;
}

let getResume2 = (girl: Girl5) => {
  console.log(girl.name + ' 年龄：' + girl.age);
  console.log(girl.name + ' 胸围：' + girl.bust);
  girl.Waistline && console.log(girl.name + ' 腰围：' + girl.Waistline);
  girl.sex && console.log(girl.name + ' 性别：' + girl.sex);
  girl.say && console.log(girl.name + '说：' + girl.say());
};

let newGirl = {
  name: '铁扇',
  age: 204,
  bust: 98,
  sex: '女',
  say() {
    return 'hello';
  },
};

// getResume2(newGirl);

//* 接口和类的约束
class XJieJie implements Girl5 {
  name: '';
  age: 22;
  bust: 99;
  say() {
    return '';
  }
}

//* 接口间的继承
interface Teacher extends Girl5 {
  teach(): string;
}
// 4.只看Teacher的简历
let getTeacherResume = (girl: Teacher): void => {
  console.log(girl.name + ' 年龄：' + girl.age);
  console.log(girl.name + ' 胸围：' + girl.bust);
  girl.Waistline && console.log(girl.name + ' 腰围：' + girl.Waistline);
  girl.sex && console.log(girl.name + ' 性别：' + girl.sex);
  console.log(girl.name + '是 ' + girl.teach() + ' 老师');
};
let tea = {
  name: '玉兔',
  age: 24,
  bust: 98,
  sex: '女',
  say() {
    return 'hello';
  },
  teach() {
    return 'English';
  },
};

// getTeacherResume(tea);

//* 类的基本使用
class Lady {
  msg = 'hello,world';
  getMsg() {
    return this.msg;
  }
}
let goddess: Lady = new Lady();

// console.log(goddess.getMsg()); //hello,world

// 继承
class XJieJie2 extends Lady {
  sayLove() {
    return 'love love love!!!';
  }
}

// let nv1 = new XJieJie2();
// console.log(nv1.getMsg()); //hello,world
// console.log(nv1.sayLove()); //love love love!!!

// 重写
class XJieJie3 extends XJieJie2 {
  sayLove() {
    return 'i love you';
  }
  getMsg() {
    return '这是重写后的方法';
  }
}

// console.log(new XJieJie3().sayLove());
// console.log(new XJieJie3().getMsg());

//* super
class XJieJie4 extends Lady {
  constructor() {
    super();
  }
  sayHello() {
    return super.getMsg() + '  !!!';
  }
}

//* 类的访问类型 public protected private
class Male {
  public name: string;
  public sayHello() {
    console.log(this.name + "说：'你好'");
  }
}

let male = new Male();
male.name = 'zd';
male.sayHello();
console.log(male.name);

// private
class Male2 {
  private name: string;
  public sayHello() {
    this.name = 'male2';
    console.log(this.name + " 说：'你好'");
  }
}

let male2 = new Male2();
// male2.name = 'zd'; // 报错
male2.sayHello();
// console.log(male2.name); // 报错

console.log('--------------');

// protected
class Male3 {
  protected name: string;
  public introduce(): void {
    console.log('我是' + this.name);
  }
}

class Teachers extends Male3 {
  constructor() {
    super();
  }
  public say(): void {
    this.name; // 没报错
  }
}

new Teachers().say();

//* 12 类的构造函数

class Person2 {
  public name: string;

  constructor(name: string) {
    this.name = name;
  }
}

let p = new Person2('zd');
console.log(p.name);

// 类继承中的构造器写法
class Person3 {
  constructor(public name: string) {}
}

class Teacher3 extends Person3 {
  constructor(public age: number) {
    super('zdd');
  }
}
let t1 = new Teacher3(24);
console.log(t1);

//* 13 类的 Getter、Setter 和 static 使用
//
class XJieJie5 {
  constructor(private _age: number) {}
  get age() {
    return this._age - 10;
  }
  set age(age: number) {
    this._age = age + 3;
  }
}
let daJibe = new XJieJie5(24);
daJibe.age = 28;
console.log(daJibe.age);

class Girl {
  static sayLove() {
    return 'love!';
  }
}
/* let g1 = new Girl();
console.log(g1.sayLove()); */
console.log(Girl.sayLove());

// * 14 类的只读属性和抽象类
// readonly
class Person4 {
  public readonly _name: string;
  constructor(name: string) {
    this._name = name;
  }
}
let p1 = new Person4('zd');
// p1._name = 'aa'; // 报错 _name 是只读属性
console.log(p1._name);

// 抽象类的使用
abstract class Girl2 {
  abstract skill();
}

class Waiter extends Girl2 {
  skill() {
    console.log('喝水');
  }
}
class BaseTeacher extends Girl2 {
  skill() {
    console.log('泰式按摩');
  }
}
class seniorTeacher extends Girl2 {
  skill() {
    console.log('SPA');
  }
}

// * 15  配置文件

// tsc --init  生成tsconfig.json;
