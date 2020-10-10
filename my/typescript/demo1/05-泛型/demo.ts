function join(first: string | number, second: string | number): string {
  return `${first}${second}`;
}
console.log(join('z', 'd'));
//* 问题1： first 参数如果传的是字符串类型，要求 second 也传字符串类型?

//* 泛型 generic

function joint<pinJie>(first: pinJie, second: pinJie): string {
  return `${first}${second}`;
}

console.log(joint<number>(1, 2));
console.log(joint<string>('s', 's'));

//* 泛型中数组的使用
function myFun<ANY>(arr: ANY[]) {
  return arr;
}

console.log(
  myFun<string>(['11', 'ss'])
);

function myFun2<ANY>(arr: Array<ANY>) {
  return arr;
}
console.log(
  myFun2<string>(['23', '2'])
);

//* 多个泛型的定义
function joins<T, P>(first: T, second: P) {
  return `${first}${second}`;
}

joins<number, string>(123, '西瓜');
// 泛型的类型推断
joins(1, '2');

class SelectGirl {
  private _girls: string[];
  constructor(girls: string[]) {
    this._girls = girls;
  }
  getGirl(index: number): string {
    return this._girls[index];
  }
}

let girls = new SelectGirl(['大脚', '刘英', '小红']);
console.log(girls.getGirl(1));

// 初始类的泛型
class SelectGirl2 {
  constructor(private _girls: string[] | number[]) {}
  getGirl(index: number): number | string {
    return this._girls[index];
  }
}

class SelectGirl3<T> {
  constructor(private _girls: T[]) {}
  getGirl(index: number): T {
    return this._girls[index];
  }
}

let girls3 = new SelectGirl3<string>(['大脚', '刘英', '小红']);
console.log('SelectGirl3:  ', girls3.getGirl(0));

//* 泛型中的继承
// 返回是一个对象中的 name
interface Girl {
  name: string;
}
class SelectGirl4<T extends Girl> {
  constructor(private _girls: T[]) {}
  getGirl(index: number): string {
    return this._girls[index].name;
  }
}
let girl4 = new SelectGirl4([
  { name: '大脚' },
  { name: '刘英' },
  { name: '小红' },
]);

console.log(girl4.getGirl(2));

//* 泛型约束

class SelectGirl5<T> {
  constructor(private girls: T[]) {}
  getGirl(index: number): T {
    return this.girls[index];
  }
}

let girls5 = new SelectGirl5<string>(['大脚', '刘英', '小红']);
console.log('SelectGirl5:  ', girls5.getGirl(1));
