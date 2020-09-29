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
// function err(): never {
//   throw new Error('死循环');
// }

// // 死循环
// function forNever(): never {
//   while (true) { }
//   console.log("Hello JSPang");
// }

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

// 3.新增查看腰围，但不是必须
interface girl3 {
  name: string;
  age: number;
  bust: number;
  Waistline: number;
}
