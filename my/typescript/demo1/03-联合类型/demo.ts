//* 联合类型
interface Waiter {
  anMo: boolean;
  say(): void;
}

interface Teacher {
  anMo: boolean;
  skill(): string;
}

//* 类型保护 - 类型断言

function judgeWho(animal: Waiter | Teacher): boolean {
  if (animal.anMo) {
    console.log((animal as Teacher).skill());
  } else {
    (animal as Waiter).say();
  }

  return animal.anMo;
}
const jiShi: Waiter = {
  anMo: false,
  say() {
    console.log('jiShi1:我不会按摩');
  },
};

const jiShi2: Teacher = {
  anMo: true,
  skill() {
    return 'jiShi2说:我会';
  },
};
// console.log(judgeWho(jiShi));
// console.log(judgeWho(jiShi2));

// * 类型保护 in
// 判断 animal 里有没有 skill() 方法
function judgeWhoOfIn(animal: Waiter | Teacher): void {
  if ('skill' in animal) {
    console.log(animal.skill());
  } else {
    animal.say();
  }
}
// judgeWhoOfIn(jiShi);
// judgeWhoOfIn(jiShi2);

// 类型保护 - typeof 语法
function add(
  first: string | number,
  second: string | number
): string | number | boolean {
  if (typeof first === 'string' && typeof second === 'string') {
    return `${first}${second}`;
  } else if (typeof first === 'number' && typeof second === 'number') {
    return first + second;
  }
  return false;
}

/* console.log(add(1, 2)); // 3
console.log(add('z', 'd')); // zd
console.log(add('1', 2)); // false */

// 类型保护 - instanceof 语法
class NumberObj {
  count: number;
}
//* instanceof 只能用在类上
function addObj(first: object | NumberObj, second: object | NumberObj): number {
  if (first instanceof NumberObj && second instanceof NumberObj) {
    return first.count + second.count;
  }
  return 0;
}
