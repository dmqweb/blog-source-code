---
title: typeScript笔记
date: 2023-12-11 12:24:4
categories:
  - typeScript
tags:
  - typeScript
sticky: true
---

# TS

### 定义数据类型

```ts
/**
 * 定义数据类型
 */
let num: number = 1;
let bool: boolean = false;
/**
 * 定义固定类型数组
 */
let arr1: number[] = [1, 2, 3];
let arr2: string[] = ["1", "2"];
/**
 * 使用泛型定义固定类型数组
 */
let arr3: Array<number> = [1, 2, 3];
/**
 * 不声明类型定义数组
 */
// 此时不生命类型则自动分配好了类型，不能赋值数组中不存在的类型
// ts中数组中的类型默认声明好了，不能添加原本数组中不存在的类型
let arr4 = [1, 2, 3];
let arr5 = [1, "2"];
/**
 * 定义混合类型any数组
 */
// 定义混合类型any的数组可以存放任何类型的值
let arr6: any[] = [1, "ds", false];
```

### 元组

```ts
/**
 * 元组（类型写在数组外面，元组类型写在数组里面）
 */
// 一旦定义了元组，其类型和固定顺序位置的数据类型就确定了
let arr7: [number, boolean] = [1, false];
// 但是其长度可以通过push方法改变，但不能直接赋值改变
arr7.push(2);
// arr7 =[1,false,2]  //报错
```

### 联合类型

```ts
/**
 * 联合类型
 */
let a: number | string = 0;
```

### 字面量类型

```ts
/**
 * 字面量类型（字面量类型声明的值中只能赋值为指定的）
 */
let a1: 1 | 0 = 0;
```

### 枚举类型

enmu 类型代表选取多个中的一个，枚举类型相当于对象和类型的结合，既可以当变量使用，也可以作为类型进行约束。可以使用 enum 约束变量的类型，限制使用函数时只能传入 enum 中的属性。

**例如：**

```js
enum STATUS {
    OPEN = 'OPEN',
    CLOSE = 'CLOSE',
  }
  const clickSwitch = (current: STATUS) => { //限制只能传入
    return '测试'
  }
  clickSwitch(STATUS.OPEN)
```

**基本使用：**

```ts
/**
 * 枚举类型 enum
 */
enum Color {
  red,
  green,
  blue,
}
let a2 = Color.blue;
console.log(a2); //默认情况下赋值为0,1,2
enum Color {
  red1 = 1,
  green1,
  blue1,
}
console.log(Color.blue1); //改变后为1，2，3
enum Color {
  red2 = "red",
  green2 = "green",
  blue2 = "blue",
}
console.log(Color.blue2); //赋值给其中一项的如果不是可迭代的（number），则需要为每一个都赋值
```

### any 和 unknown 类型

```ts
/**
 * any类型和unkonwn类型的区别
 * unkonwn类型表示强制类型检查（可以通过赋值改变类型,只有类型明确时才能使用对应属性或方法）
 * any类型表示不进行类型检查
 */
let a3: unknown = 1;
a3 = "1";
a3 = { a1: "dsf" };
// a3.a1
// a3()
// a3.toString() 当定义unknown未知类型时，在类型未知的情况下不能使用方法
if (typeof a3 === "function") {
  a3();
}
if (typeof a3 === "string") {
  a3.toUpperCase();
}
```

### void、undefined 和 never 类型

```ts
/**
 * void类型、undefined类型 和 never类型
 * void类型一般用于表示函数无返回值
 * undefined类型一般用于表示函数直接return或者return undefined
 * never类型一般用于表示函数死循环，永远无法return
 */
// 1 undefined类型，此时函数返回时将返回undefined（undefined类型表示未赋值、为初始化）
function a4(): undefined {
  console.log("a4");
  return;
}
// 2 void类型，表示变量本身就不存在，当函数没有返回值时，返回值就是void
function a5() {
  console.log("a5");
}
// 2 never类型，表示一个函数永远执行不完（报错或无限循环）
function throwErr(message: string, errCode: number): never {
  throw {
    message,
    errCode,
  };
}
function whileLoop(): never {
  while (true) {
    console.log("永远为真");
  }
}
```

### 类型断言

```ts
/**
 * 类型适配（类型断言）as
 */
let message: any;
message = "1cf"; //即使这个时候赋值为字符串，类型仍然是any
let a6 = (<string>message).endsWith("c"); //使用尖括号对变量进行类型断言
let a7 = (message as string).endsWith("f"); //使用as关键字对变量进行类型断言
```

### 函数的声明

```ts
/**
 * 函数的声明
 */
// 1 ts中函数形参的个数和传参时的个数必须要保持一致
let a8 = (message: string, code: number) => {
  console.log(message, code);
};
a8("a8", 8);
// 2 可选参数，用 ?表示可选参数（可选参数必须要在必选参数之后）
let a9 = (message: string, code?: number) => {
  console.log(message, code);
};
a9("你好");
// 3 默认参数，与ES6相似
let a10 = (message: string = "你好", code: number = 1) => {
  console.log(message, code);
};
a10("嗨");
```

### 具体对象类型

```ts
/**
 * 具体对象类型
 */
let person1: {
  name: string;
  age: number;
} = {
  name: "张三",
  age: 18,
};
let person2 = {
  name: "李四",
  age: 20,
};
// person2.nicname 此时会报错，不能使用对象没有的属性和方法
let person3: any = { name: "王五", age: 22 };
console.log(person3.nickname); //如果将对象的类型改为any，则可以使用任意类型（相当于原生js对象）
```

### 接口 interface

```ts
/**
 * 定义接口interface
 */
interface Point {
  x: number;
  y: number;
}
let drawPoint = (point: Point) => {
  console.log({ x: point.x, y: point.y });
};
// drawPoint({x:'1',y:1})  这时候不满足接口就会报错.同时这样讲函数和接口分开写不利于代码的高内聚低耦合原则
interface Person {
  age: number;
  name: string;
  say: () => void; //用接口表示对应的类型生命，讲函数和接口放在一起提高代码的高内聚低耦合
}
```

### 类和接口

```ts
/**
 * 类 class （ES6中也有类的概念）
 */
class PersonClass implements Person {
  //使用类实现接口
  age: number;
  name: string;
  constructor(age: number = 10, name: string = "张三") {
    //js中的函数不可以重载，一个类中有且只能有一个构造函数
    this.age = age;
    this.name = name;
  }
  say = () => {
    console.log(`我是：${this.name},今年${this.age}碎了`);
  };
}
const person4 = new PersonClass();
person4.say();
```

### 类的访问修饰符

```ts
/**
 * 构造函数中访问修饰符：public、private、protected
 */
// 1 public访问修饰符 （没有书写时默认为：public）
class PersonClass2 implements Person {
  //使用类实现接口
  // age:number;name:string;
  constructor(public age: number, public name: string) {
    //js中的函数不可以重载，一个类中有且只能有一个构造函数
    // 使用关键字public之后，将自动构造出静态属性，不用在赋值
    // this.age=age;this.name=name
  }
  say = () => {
    console.log(`我是：${this.name},今年${this.age}碎了`);
  };
}
const person5 = new PersonClass2(100, "活活");
person5.say();
// 2 private访问修饰符
interface pp {
  say: () => void;
  // 添加getter和setter，用于给私有变量赋值
  getAge: () => number;
  getName: () => string;
  setAge: (val: number) => void;
  setName: (val: string) => void;
}
class PersonClass3 implements pp {
  //使用类实现接口
  constructor(private age: number, private name: string) {
    //js中的函数不可以重载，一个类中有且只能有一个构造函数
    // 使用private访问修饰符后，同样不用自动注册
  }
  say = () => {
    console.log(`我是：${this.getName},今年${this.getAge}碎了`);
  };
  // 定义setter方法
  getName = () => {
    return this.name;
  };
  getAge = () => {
    return this.age;
  };
  setName = (val: string) => {
    this.name = val;
  };
  setAge = (val: number) => {
    this.age = val;
  };
}
```

### 泛型< T >

#### 泛型是什么

泛型是程序设计语言的一种风格或范式，它允许我们使用一些以后才指定的类型。在定义函数接口或者类时，不预先定义好具体的类型，而在使用的时候才去指定类型的一种特性。

```ts
/**
 * 泛型<T>
 * 泛型定义了函数中需要使用的类型（可以动态变化，写在变量名之后，括号之前）
 * 不止函数，类和接口中都可以使用泛型
 */
// 动态泛型保证函数返回值和参数的类型一致
let lastInArray = <T>(arr: Array<T>) => {
  return arr[arr.length - 1];
};
const L1 = lastInArray([1, 2, 3]);
console.log(L1);
const L2 = lastInArray(["a", "b"]);
console.log(L2);
// 显示指明类型
let L3 = lastInArray<string | number>(["1", "2"]);
// 多泛型表达
let L4 = <T, Y>(x: T, y: Y) => [x, y];
const v1 = L4(1, "one");
//声明泛型接口
interface ReturnItemFn<T> {
  (para: T): T;
}
const returnItem: ReturnItemFn<number> = (para) => para;
//声明泛型类

class Stack<T> {
  private arr: T[] = [];

  public push(item: T) {
    this.arr.push(item);
  }

  public pop() {
    this.arr.pop();
  }
}
const stack = new Stack<number>();
```

### 类型 type

```ts
/**
 * 类型type
 */
type Square = {
  size: number;
};
type Rectangle = {
  width: number;
  height: number;
};
type Shape = Square | Rectangle; //联合类型
function area(shape: Shape) {
  if ("size" in shape) {
    //如果shape中有size属性，说明是正方形
    return shape.size ** 2;
  }
  if ("width" in shape) {
    return shape.width * shape.height;
  }
}
```

### 类型守护 is

类型守护的意义就在于`类型的倒推`，由结果推导出变量的具体类型（收缩变量的类型范围），这样当结果已经知道时，就可以推导出变量为 unknow 或其他等一些未知的类型。

例如：

当变量使用 unknown 类型，判定结果为 boolean 类型时，不使用 as 关键字就无法在后面使用 value 对应的方法，因为它的类型是 unknown。

```ts
const isString = (value: unknown): boolean => typeof value === "string";
function test(value: unknown): string {
  if (isString(value)) {
    // value.charCodeAt(0) , 抛出错误，需要使用as
    (value as string).charCodeAt(0);
  }
  return "";
}
```

使用 is 类型守护，当结果类型已知时，就可以倒推出变量的类型（收缩类型），进而可以使用对应的方法

```ts
const isString = (value: unknown): value is string => typeof value === "string";
function test(value: unknown): string {
  if (isString(value)) {
    value.charCodeAt(0); // is变量守护后，倒推出value为string类型
  }
  return "";
}
```

**使用：**

```ts
/**
 * 类型守护
 * 类型判断：typeof,实例判断：instanceof，属性判断:in，字面量相等判断(==等)
 * 自定义类型判断，通过：{形参} is {类型}
 */
// 将判断变为返回boolean的函数时，类型守护失效，这时候就需要使用自定义类型判断
type Square1 = {
  size: number;
};
type Rectangle1 = {
  width: number;
  height: number;
};
function isSquare(shape1: Shape1): boolean {
  return "size" in shape1;
}
function isRectangle(shape1: Shape1): boolean {
  return "width" in shape1;
}
type Shape1 = Square1 | Rectangle1;
function area1(shape1: Shape1) {
  if (isSquare(shape1)) {
    //如果shape中有size属性，说明是正方形
    return shape1.size ** 2;
  }
  if (isRectangle(shape1)) {
    return shape1.width * shape1.height;
  }
}
/**
 * 应该将判断函数定义为类型（而不是布尔值），这样类型守卫才不会失效
 */
type Square1 = {
  size: number;
};
type Rectangle1 = {
  width: number;
  height: number;
};
function isSquare(shape1: Shape1): shape1 is Square1 {
  //将boolean判断上升到类型判断中，使类型一致
  return "size" in shape1;
}
function isRectangle(shape1: Shape1): shape1 is Rectangle1 {
  return "width" in shape1;
}
type Shape1 = Square1 | Rectangle1;
function area1(shape1: Shape1) {
  if (isSquare(shape1)) {
    //如果shape中有size属性，说明是正方形
    return shape1.size ** 2;
  }
  if (isRectangle(shape1)) {
    return shape1.width * shape1.height;
  }
}
```

### 函数重载

```ts
/**
 * 函数重载（TS的函数重载发生在编译时而不是运行时，因为js不支持函数重载）
 */
// 使用函数重载将会明确函数的签名，大大提升对函数使用的准确性
function makeDate(timeStamp: number): Date;
function makeDate(year: number, month: number, day: number): Date;
function makeDate(timeStampOrYear: number, month?: number, day?: number) {
  if (month != null && day != null) {
    return new Date(timeStampOrYear, month - 1, day);
  } else {
    return new Date(timeStampOrYear);
  }
}
//当调用函数时，ts编译器会根据传入的参数类型和数量来确定应该调用哪个函数
console.log(makeDate(123923892));
```

### 函数签名

```ts
/**
 * 调用签名（签名是函数重载中的概念，描述了函数所需的参数类型和返回值类型）
 */
//定义了一个类型（函数类型），其中类型别名包含一个debugName属性，然后包含一个函数重载
type Add = {
  (a: number, b: number): number;
  debugName: string; //添加debugName附加信息
  (a: number, b: number, c: number): number; //进行函数的重载
};
const add: Add = (a: number, b: number, c?: number) => {
  return a + b + (c != null ? c : 0);
};
add.debugName = "附加信息";
/**
 * new构造函数进行签名
 */
type Poit = {
  new (x: number, y: number): { x: number; y: number };
  new (x: number, y: number, z: number): { x: number; y: number; z: number };
};
const point = class {
  constructor(public x: number, public y: number, public z?: number) {}
};
/**
 * 索引签名
 */
// 定义字典类型
type Dictionary = {
  [key: string]: any;
};
// 定义Person类型
type Person1 = {
  name: string;
  age: number;
};
// 定义字典对象类型
type PersonDictionary = {
  [username: string]: Person1;
};
const persons: PersonDictionary = {
  alex: {
    name: "阿莱克斯",
    age: 18,
  },
  michal: {
    name: "jackson",
    age: 20,
  },
};
const alex = persons["alex"];
persons["张三"] = {
  name: "张三",
  age: 100,
};
delete persons["张三"];
// 注意：当访问不存在的属性时，ts不会报错
const aa = persons["不存在"]; //undefined
// aa.name  //ts书写时不会报错，编译时报错
```

### 函数副作用

```ts
/**
 * 函数的副作用
 */
function reverseSorted(input: number[]): number[] {
  return input.sort().reverse();
}
let arr8 = [1, 2, 3, 4];
const result = reverseSorted(arr8);
console.log(result, arr8); //可以观察到两个数组都变化了，函数出现了副作用
```

### 函数参数修饰符

```ts
/**
 * 修饰符：public,private,readonly,protected
 */
/**
 * readonly只读属性
 */
// 添加readonly之后，值只可以被读取，一旦被改写就会报错
function reverseSorted2(input: readonly number[]): number[] {
  // return input.slice().sort().reverse()
  return [...input].sort().reverse();
}
let arr9 = [1, 2, 3, 4];
const result2 = reverseSorted2(arr9);
console.log(result2, arr9);
```

### 双重断言

```ts
/**
 * 双重断言
 */
// 断言：
type T2D = { x: number; y: number };
type T3D = { x: number; y: number; z: number };
let P2D: T2D = { x: 1, y: 1 };
let P3D: T3D = { x: 10, y: 10, z: 10 };
P2D = P3D; //多出属性的值可以赋值给少属性的值
// P3D=P2D  //这样会报错，少属性的值不能付给多属性的值，此时可用类型断言
P3D = P2D as T3D; //使用类型断言，表示P2D为T3D类型的值，这样就可以赋值
// 双重类型断言 （如果两个值连类型都不一致）
type PersonT = { name: string; age: number };
let person6: PersonT = { name: "张三", age: 18 };
// P3D = person6 报错
// P3D = person6 as T3D 单重断言仍报错，因为数据类型都不对
P3D = person6 as any as T3D; //双重断言
```

### 字符串不可更改

```ts
/**
 * js中的字符串不可更改 immutable
 */
let king = "elvis";
king = "james"; //这里虽然变量变了，但是其实elvis字符串还在
king[2]; //字符串通过索引可以访问到对应字母
// king[2] = 'b'  //报错，js中字符串不可修改
```

### 常量断言 as const

```ts
/**
 * 常量断言（js中对象类型的值可以修改）
 */
const obj = {
  name: "张三",
  age: 19,
};
obj.name = "李四"; //此时对象中的值可以任意修改
const obj2 = {
  name: "王五",
  age: 100,
  arr: [1, 2, 3],
} as const;
// obj2.name='张三' //此时报错，使用常量断言之后不能修改
// 延展：常量断言可以断言任何一个类型（包括数组），将任何类型的成员变量都转换为readonly只读属性
// 应用场景2：（常量断言会将值变为字面量类型）
function layout(setting: { align: "left" | "center" }) {
  console.log("align为：", setting.align);
}
// const test = {align:'left'}
// layout(test) //此时会报错，因为test中的值是字符串，不是符合条件的字面量类型
const test = { align: "left" } as const;
layout(test); //使用常量类型断言，将值变为字面量类型了
```

### 非空断言 !

```ts
/**
 * 非空断言：（变量后加: ！）
 */
let str: string | null = "hello";
console.log(str.length); // 报错，str 可能为 null
console.log(str!.length); // 不报错，使用非空断言操作符 ! 告诉编译器 str 不为 null
```

### this 关键字

ts 在函数中使用 this 关键字时，由于其类型要约束，因此需要在函数定义参数处声明其类型，声明方式：使用 this 关键字作为第一个参数，ts 会自动识别这是在为 this 定义类型，后面参数接收和传参时和正常一样。

```ts
/**
 * this关键字
 */
function double(this: { value: number }) {
  //this必须是参数的第一位（假的）
  this.value = this.value * 2;
}
const valid = {
  value: 10,
  double,
};
valid.double(); //得到20
const valid2 = {
  val: 1,
  double,
};
// valid2.double() 此时报错，因为valid2中对象没有value属性
```

### declare 关键字

ts 中 declare 关键字就是用于告诉编译器，某个类型存在，并且在当前页面可以使用。

declare 关键字可以描述：

- 变量（const、let、var 命令声明）
- type 或者 interface 命令声明的类型
- class
- enum
- 函数（function）
- 模块（module）
- 命名空间（namespace）

```js
declare function sayHello(name: string): void;
sayHello("张三");
```

### module 关键字

当我们在使用非 TypeScript 编写的库的时候，他们并没有自己的类型，在 ts 项目中引入的时候就会抛出错误，这时候通常在`.d.ts`文件中进行定义。也可以使用`module关键字`来声明某个模块的类型

```ts
declare module "url" {
  export interface Url {
    protocol?: string;
    hostname?: string;
    pathname?: string;
  }

  export function parse(
    urlStr: string,
    parseQueryString?,
    slashesDenoteHost?
  ): Url;
}
```

如果想要快速使用，而忽略其类型校验，可以进行简写：

```ts
declare module "url";
```

### typeof 操作符

```ts
/**
 * typeof操作符，提取已有变量的类型
 */
const center = {
  x: 0,
  y: 0,
  z: 0,
};
// type position = {
//     x:number,y:number,z:number
// }
type position = typeof center; //这里使用typeof操作符就不用重新定义
const unit: position = {
  x: center.x + 1,
  y: center.y + 1,
  z: center.z + 1,
};
```

### keyof 操作符

```ts
/**
 * keyof操作符，拿到全部的成员变量作为联合类型
 */
type Person3 = {
  name: string;
  age: number;
};
const person7: Person3 = {
  name: "张三",
  age: 18,
};
function getValueByKey(obj: Person3, key: keyof Person3) {
  //keyof操作符得到联合类型
  const value = obj[key];
  return value;
}
const age = getValueByKey(person7, "age");
// const email = getValueByKey(person7,'email') 这样会报错，不能得到不存在的key
```

### 类型查找

```ts
/**
 * 类型查找
 */
type res = {
  user: {
    name: string;
    age: number;
  };
  data: {
    info: string;
    msg: string;
  };
};
// 通过定义的类型中的某一项进行类型查找
function getInfo(): res["data"] {
  return {
    info: "info",
    msg: "msg",
  };
}
```

### 类型映射

```ts
/**
 * 类型映射
 */
type Point2 = {
  x: number;
  y: number;
  z: number;
};
//定义Readonly类型，用于将变量中每一项变为只读属性
export type Readonly<T> = {
  //使用export的原因是Readonly是TS内置好的函数
  readonly [item in keyof T]: T[item];
};
const center2: Readonly<Point2> = {
  x: 1,
  y: 1,
  z: 1,
};
// center2.x = 100  此时会报错
```

### 类型修饰符

```ts
/**
 * 映射修饰符，readonly、?等
 */
type Point3 = {
  readonly x: number;
  y?: number;
};
type Mapped<T> = {
  // readonly [item in keyof T] ? : T[item]
  -readonly [item in keyof T]-?: T[item];
};
type Result3 = Mapped<Point3>;
// 实际使用案例
export class State<T> {
  constructor(public current: T) {}
  update(next: Partial<T>) {
    this.current = { ...this.current, ...next };
  }
}
export type Partial<T> = {
  [item in keyof T]?: T[item];
};
const state = new State({ x: 0, y: 0 });
state.update({ y: 124 });
console.log(state.current);
```

### interface 和 type 的区别

1、实现对象和类一般使用**interface**，

而实现联合类型、元组类型、交叉类型一般使用**type**

```ts
// 1 类型别名可以用于其它类型 （联合类型、元组类型、交叉类型），
// interface不支持这些，interface支持对象类型定义更好。
type PartialPointX = { x: number };
type PartialPointY = { y: number };
// union(联合)
type PartialPoint = PartialPointX | PartialPointY;
// tuple(元祖)
type Data = [PartialPointX, PartialPointY];
//primitive(原始值)
type Name = Number;
// typeof的返回值
let div = document.createElement("div");
type B = typeof div;
```

2 、 interface 可以多次定义 并被视为合并所有声明成员 type 不支持

```ts
interface Point {
  x: number;
}
interface Point {
  y: number;
}
const point1: Point = { x: 1, y: 2 };
```

3 、 type 能使用 in 关键字生成映射类型，但 interface 不行。

```ts
type Keys = "firstname" | "surname";
type DudeType = {
  [key in Keys]: string;
};
const test1: DudeType = {
  firstname: "Pawel",
  surname: "Grzybek",
};
```

4 、 默认导出方式不同

```ts
// inerface 支持同时声明，默认导出 而type必须先声明后导出
export default interface Config {
  name: string;
}
// 同一个js模块只能存在一个默认导出哦
type Config2 = { name: string };
export default Config2;
//   type或者interface使用指南
//   在选择使用 type 还是 interface 时，你可以根据具体情况来决定。通常来说，如果你需要定义对象的结构，或者要求类实现某个结构，使用 interface 是一个不错的选择。
//   而如果你需要复杂的联合类型或交叉类型，或者仅仅是为了给某个类型起一个别名以提高可读性，那么使用 type 是更合适的
```

# --------------------------------

#

# ts 进阶

> 类型系统

- 对代码中所有的标识符（变量、函数、参数、返回值）进行类型检查

> 对接 js 引擎优化：ts 虽然不能改变 js 这门动态语言的本质，但是对于 js 代码的类型约束确使得编译出来的 js 代码有利于 v8 等引擎进行优化，例如：

- js 对象由于类型确定，有利于 js 引擎编译时，对象静态编译的优化（v8 引擎会假装 js 对象属性类型确定，根据第一次获取到的形状），这样查找对象的属性更快。
- js 函数由于传入类型确定，有利于字节码编译为机器码时，对执行过程的缓存优化（v8 引擎将字节码编译为机器码后，机器码部分存在一个反编译优化，会将多次执行过程标记为 hot，并进行缓存）

## 配置文件 ts.config.json

- `tsc --init`生成配置文件

## 三方库

- ts-node 将 ts 代码在内存中编译，直接执行
- nodemon 监听文件变化，执行命令，热启动
- - `nodemon --watch src -e ts --exec ts-node test.ts`

## 基本类型

- number
- string
- boolean
- 数组[]或 Array
- 对象 object 或 Object
- null 和 undefined
- 联合类型：多种类型任选其一，存在类型保护(例如 typeof 或 if 判断 可以触发类型保护，确定到精确类型)
- void 类型：通常用于约束函数的返回值，表示该函数没有任务返回
- never 类型：通常用于约束函数的返回值，表示该函数永远不可能结束
- 字面量类型：使用一个值进行约束
- 元组类型：一个固定长度的数组，并且数组中每一项的类型确定
- any 类型，绕过类型检查，any 类型的数据可以赋值给任意类型

## 类型别名

> 对已知的类型进行定义

```ts
type User = {
  name: string;
  age: number;
};
```

## 函数重载

>

```ts
function combine(a: number, b: number): number;
function combine(a: string, b: string): string;
function combine(a: number | string, b: number | string): number | string {
  if (typeof a === "number" && typeof b === "number") {
    return a + b;
  } else if (typeof a === "string" && typeof b === "string") {
    return a + "、" + b;
  }
  throw new Error("a和b必须是相同类型");
}
```

## 可选参数

```ts
function sum(a: number, b: number, c?: number): number {
  if (c) {
    return a + b + c;
  }
  return a + b;
}
sum(1, 2);
sum(2, 3, 5);
```

## 扩展类型

### 扩展类型 type

```ts
type User = {
  name: string;
  age: number;
};
type Condition = (n: number) => boolean;
type Condition = {
  //只有一个函数时，{}相当于定界符，等同于上面
  (n: number): boolean;
};
```

### 枚举 enum

> 字面量类型配合联合类型的问题：

- 字面量类型配合联合类型约定了类型的取值，但是如果后面字面量类型名需要修改时，相应的所有的变量赋值也要全部做修改。这时因为联合类型将真实的值和类型混为一体，导致后续修改类型会产生大量的修改。
- 而枚举类型是一种赋值的效果，直接修改 enmu 中的值即可
- 字面量类型不会进去到编译结果
  所以需要枚举类型。

```ts
enum ThemeColor {
  black = "#000000",
  white = "#ffffff",
}
```

> enum 枚举会参与到编译中，编译的结果就是一个对象，可以在运行时使用 enum 枚举。
> 注意：

- 枚举的字段（key）必须是字符串或数字
- 数字枚举的值（value）会自动自增，默认从 0 开始，第一项赋值之后从第一项开始
- 被数字枚举约束的变量，可以直接赋值为数字
- 数字枚举的编译结果和字符串有所差异
  最佳实践：
- 尽量使用统一类型的数据作为枚举项

### 接口 interface

> 接口 interface 用于约束类、对象和函数的标准
> 接口常用于对象和类的类型约束，type 常用于变量类型约束。
> 接口 interface 和类型别名 type，非常相似，但是在类的约束上有所区别，type 常用于多种类型联合结合使用或者定义函数类型常用 type，interface 常用于定义类和对象，提供精细化的接口，并且 interface 可以定义多次，被视为合并，还可以继承
> 泛型类型约束时，使用该泛型去继承 interface

```ts
interface Person {
  name: string;
  age: number;
}
interface Condition {
  (n: number): boolean;
}
```

> 接口也可以继承，可以通过接口之间的继承，实现多种接口的集合。type 的交叉类型&也可以实现类似的效果，但是两者有所差别：

- 子接口不能覆盖父接口的成员
- 交叉类型会把相同成员的类型进行交叉

```ts
interface User {
  readonly id: "1";
  name: "张三";
}
let arr: readonly number[] = [1, 2, 3];
// arr.splice 、arr[0]=3 、arr.pop()等改变数组类型的方法都会失效
arr = [3, 2, 1]; //注意可以正常赋值，因为readonly约束的是堆中的对象类型，不是栈中的
```

> 泛型中直接有对应的泛型类型，例如 readonly number[]可以替换为：ReadonlyArray<number>

## 模块解析

> 模块解析：应该从什么位置寻找模块，在 TS 中，有两种模块解析策略，

- classic：经典
- node：node 解析策略（唯一的变化是，将 js 替换为 ts）

## 类型兼容性

> 类型不一致时，可以使用类型断言 as
> 基本类型完全比对
> 对象类型采用：鸭子比对法：即多类型的可以赋值给部分类型的变量，但是对象字面量赋值时不行（严格遵循类型）。

```ts
interface Duck {
  name: string;
}
const b = {
  name: "咯咯",
  age: 1,
};
const a: Duck = b; //可将宽泛类型的变量赋值给部分类型变量
// const a:Duck = { //但是对象字面量赋值时，严格遵循类型约束
//     name:"嘎嘎",
//     age:1
// }
```

> 函数类型约束 参数：（传递给函数的参数可以少，但不许多）。返回值（类型必须匹配）

## 修饰符

### readonly

> readonly 表示只读修饰符，不参与最后的编译结果，仅允许对数组或元组字面量使用 readonly 修饰符

### 访问修饰符

> 访问修饰符用于 class 类中定义属性列表时使用

- public：默认的访问修饰符，公开的，所有代码均可访问
- static：私有的，只有在类中可以访问
- protected：受保护的，不能在外部使用，但是可以在子类中使用

## 类 class

> ts 中不允许在 constructor 中动态的添加属性，要求使用 属性列表 来描述类中的属性。

```ts
// 不允许在constructor中动态添加属性
class user {
  constructor(name: string) {
    this.name = name;
  }
}
```

```ts
class User {
  name: string; //需要在类中定义属性列表，提前声明类的形状
  age: number = 18; //可以设置默认值
  sex?: "男" | "女"; //可以设置可选
  readonly id: string; //readonly只读，不允许该值被修改
  private sno: string; //私有，是访问属性符，默认是public
  constructor(name: string) {
    this.name = name;
  }
}
```

## 泛型

> 有时，书写某个函数时，会丢失一些类型信息（多个位置的类型应该保持一致或者有关联的信息），例如参数的类型未知，但是该类型又和返回值的类型相关联，这时就要使用到泛型
> 泛型是指附属于函数、类、接口、类型别名之上的类型。泛型相当于是一个类型变量，在定义时，无法预先知道具体的类型时，可以用该变量来代替，只有调用时，才会确定他的类型
> 很多时候，TS 会智能的根据传递的参数，推导出泛型的类型（前提是该参数使用了该泛型），也可以给泛型设置默认值

### 函数中使用泛型

> 在函数名之后写上泛型：`<T>`，使用函数时，在函数名后面添加，例如：`<string>`

### 类型别名中使用泛型

```ts
type callback<T> = (n: T, i: number) => boolean;
function filter<T>(arr: T[], callback: callback<T>): T[] {
  return arr;
}
```

### 接口中使用泛型

```ts
interface callback<T> {
  (n: T, i: number): boolean;
}
```

### 类中使用泛型

> 在类中的属性描述中也可以使用泛型。在类中定义，可以约束整个类中所有使用到泛型的地方，和使用该类时传入的类型一致

```ts
class Person<T> {
  numOrStr: T;
  constructor(ar: T) {
    this.numOrStr = ar;
  }
  helper(a: T): T[] {
    return [a];
  }
}
const a = new Person<string>("str");
```

### 泛型继承

> 使用泛型约束函数时，某些时候泛型的类型未知，但是函数内部又要使用泛型参数对应的方法，这个时候就要对泛型的形状进行声明，可以使用该泛型去继承 interface 接口。
> 或者当需要对泛型的类型进一步约束时，可以使用泛型去继承 interface 接口。

```ts
interface hasNameProperty {
  name: string;
}
function nameToUpperCase<T extends hasNameProperty>(obj: T): T {
  obj.name;
  return obj;
}
```

### 多泛型

```ts
function minxinArray<T, K>(arr1: T[], arr2: K[]): (T | K)[] {
  if (arr1.length !== arr2.length) throw Error("长度");
  let result: (T | K)[] = [];
  for (let i = 0; i < arr1.length; i++) {
    result.push(arr1[i]);
    result.push(arr2[i]);
  }
  return result;
}
```
