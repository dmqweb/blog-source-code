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
> `赋值时，父集合类型可以赋值给子集合类型，extends时，父集合类型可以继承自子集合类型`
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
> 元组类型用于精确数组每一项的类型，并且可以定义可选。
```ts
/**
 * 元组（类型写在数组外面，元组类型写在数组里面）
 */
// 一旦定义了元组，其类型和固定顺序位置的数据类型就确定了
let arr7: [number, boolean?] = [1, false]; //可定义可选类型，用于控制元素个数
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
// 字面量类型可以使用模板字符串进行传参
type Name = "小猫" | "小狗";
type Age = 10 | 100
type Say = `${Name}叫` //小猫叫 | 小狗叫
type Info = `${Name}-${Age}` //小猫10 | 小猫100 | 小狗10 | 小狗100
// 泛型用法
type T1<T extends string> = `${T}喜欢你`;
type T2 = T1<"小猫" | "小狗"> //小猫喜欢你 | 小狗喜欢你
// 字面量类型配合as关键字重新起名字
interface Person{
  name:string
  age:number
}
type NewPerson = {
  [P in keyof Person as `get${P}`]:Person[P]
}
```

### 枚举类型

enmu 类型代表选取多个中的一个，枚举类型相当于对象和类型的结合，既可以当变量使用，也可以作为类型进行约束。可以使用 enum 约束变量的类型，限制使用函数时只能传入 enum 中的属性。

**例如：**

```javascript
enum STATUS {
    OPEN = 'OPEN',
    CLOSE = 'CLOSE',
  }
  const clickSwitch = (current: STATUS) => { //限制只能传入
    return '测试'
  }
  // 枚举类型参与值得获取
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
console.log(Color); //相同枚举类型会合并，不能重复赋值相同枚举属性
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
a3 = { a1: "dsf" }; //类型为unknown时，没确定类型时不能使用对应的方法
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
// 2 void类型，表示函数没有返回值，返回值是void.
function a5(target:{name:string}):void {
  console.log({name:"d"});
}
// 2 never类型，表示永远执行不完的函数的类型（报错或无限循环），当变量接收never类型函数返回值或这个函数可以执行完时就会报错
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
  say: () => void; //用接口表示对应的类型生命，将函数和接口放在一起提高代码的高内聚低耦合
  say2():void; //定义普通函数类型
}
```

### 类和接口

```ts
/**
 * 类 class （ES6类的概念）,类使用implements关键字去实现interface
 * 注意类继承的接口中不能包含可选属性！！
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

### 类的访问修饰符 public、protected和private

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
  //使用类实现接口，private属性不能在接口上
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

### 类型保护（类型收缩）
> 常见的类型保护有：typeof、instanceof、in和is，当结果已知时，可以去收缩和精确具体类型
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
 * 函数重载
 * 函数实现的参数个数（包含可选参数）不能大于函数签名的最大参数个数，注意ts多个函数签名需要写在一起
 */
// 使用函数重载将会明确函数的签名，大大提升对函数使用的准确性
function makeDate(timeStamp: number): Date;
// console.log(); 报错,ts函数签名需要写在一起
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
```
### 索引签名 []
```ts
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
> 常量断言常用于只读数组，保证每一项不可变
```ts
/**
 * 常量断言（将变量每一项变为readonly只读）
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
> 在.d.ts文件中使用declare关键字声明的变量和函数等，将会作为全局变量使用
ts 中 declare 关键字就是用于告诉编译器，某个类型存在，并且在当前页面可以使用。

declare 关键字可以描述：

- 变量（const、let、var 命令声明）
- type 或者 interface 命令声明的类型
- class
- enum
- 函数（function）
- 模块（module）
- 命名空间（namespace）

```javascript
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
> typeof操作符只能提取变量或字面量，不能提取表达式或类型
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
keyof any 返回的是：number | string | symbol,因为只有这三个值可以作为属性名
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
type Test1<T> = {
  [P in keyof T]?:T[P]  //?所有属性添加可选
  [P in keyof T]-?:T[P]  //-?所有属性取消可选
  readonly [P in keyof T]:T[P]  //readonly所有属性添加只读
  -readonly [P in keyof T]:T[P]  //-readonly所有属性取消只读

}
const center2: Readonly<Point2> = {
  x: 1,
  y: 1,
  z: 1,
};
// center2.x = 100  此时会报错
```
### 值映射
```ts
type Test<T> = {
  [P in T[number]]: P
}
type Test2<T> = {
  [P in keyof T]: T[P]
}
```
### 类型修饰符

```ts
/**
 * 映射修饰符，readonly、?等
 */
// readonly和数组泛型一起使用就会报错，ts中有：ReadonlyArray和Readonly两个泛型可以表示readonly数组
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
### 何时使用
- 定义公共API时使用interface，方便使用者进行继承扩展
- 定义组件属性和状态时使用type，其约束性更强
- type类型不能二次编辑，而interface可以随时扩展

# --------------------------------

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
- private：私有的，只有在类中可以访问
- static：静态的，在类上使用
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

> 有时，书写某个函数时，会丢失一些类型信息（多个位置的类型应该保持一致或者有关联的信息），例如参数的类型未知，但是该类型又和返回值的类型相关联，这时就要使用到泛型。
> 泛型是指附属于函数、类、接口、类型别名之上的类型。泛型相当于是一个类型变量，在定义时，无法预先知道具体的类型时，可以用该变量来代替，只有调用时，才会确定他的类型。
> 很多时候，TS 会智能的根据传递的参数，推导出泛型的类型（前提是该参数使用了该泛型），也可以给泛型设置默认值。

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
extends关键字常用于泛型约束
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
console.log(minxinArray<number, string>([1, 2, 3], ['1', '2', '3']));
```
### 泛型约束的局限性
函数泛型仅约束了参数的传递，并没有约束函数内部的实现，内部实现要通过extends关键字去约束。
```ts
interface hasNameProperty {
    name: string;
}
function nameToUpperCase<T>(obj: T): T {
    obj.name;
    return obj;
}
const a = {
    name: "a"
};
const b = {};
console.log(nameToUpperCase<hasNameProperty>(a)); //函数调用没有报错，函数执行报错
console.log(nameToUpperCase<hasNameProperty>(b)); //函数调用报错
```
- 例如上述示例，当传入泛型时，仅仅约束了函数传入参数时，必须是T类型，但是函数内部并不知道T的具体类型
- 即使调用函数时，传入了类型，函数内部仍然不能将参数判定为该确切的类型,也没有类型推导
- 可以使用一些类型判定的api进行推导，如：as、typeof、isInstnceOf、Array.isArray等
### infer占位符
> infer占位符，只能用于条件表达式中
```ts
type T1 = "小猫喜欢你" | "小狗喜欢你";
type T2<T> = T extends `${infer R}喜欢你` ? R : never;
type T3 = T2<T1> // "小猫" | "小狗"
```
### 装饰器

### nameSpace
> 自从ES6的模块化规范出现之后，官方就不推荐使用nameSpace了
### 协变（变量类型赋值）
子类型对象可以赋值给父类型对象
> ts协变意思是:如果不同类型的变量之间不能相互赋值,但是使用ts协变允许子类型对象赋值给父类型对象,子类型对象的属性更多,更加具体。
### 逆变（函数类型赋值）
> ts中,父类参数约束的函数可以赋值给子类参数约束的函数。
```ts
interface Parent{
    a:1
}
interface Child extends Parent{
    b:2
}
type FunParent = (arg: Parent) => any;
type FunChildren = (arg: Child) => any;
let fnParent: FunParent = () => true;
let funChild: FunChildren = () => 1;
funChild = fnParent; //逆变时,父类约束的函数可以赋值给子类约束的函数
```

# --------------------------------------

# 项目中使用 ts

## 注意事项
- .d.ts声明文件中默认全部导出使用，一旦使用import或者export关键字之后，就需要使用export进行导出才能使用
- 直接在类型定义文件.d.ts 中书写类型，任意文件夹中直接使用，ts 会自动找对应类型
- declare namespace 定义命名空间，这样可以防止使用混乱，还可以防止变量命名冲突
- - ```ts
    declare namespace Test {
      type Person = {
        name: string;
        age: number;
      };
    }
    ```
- .d.ts 文件可以统一写在 types 文件夹中，也可以写在就近文件夹中
- 三方库声明支持：当一个三方库中没有定义类型文件时，可以自己手写一个类型声明模块，例如
- - ```ts
    declare module "antd-dayjs-webpack-plugin";
    ```
- declare function 定义 TS 环境中已存在的 JS 运行时函数，不能用于定义自己手写的函数，常用于定义约束 es 语法内置的函数类型
- - ```ts
    declare function eval(x: string): any;
    ```
- declare 声明类型、接口等无效，只能用于声明 function、module 和 namespace
- 类型定义时，不能写默认参数值
- 只允许在函数或构造函数实现中使用参数初始化表达式（即参数默认值）
- 鸭子比对法的含义就是：当一个变量被类型约束之后，可以使用包含全部该类型声明，但类型声明更多的变量或字面量对该变量进行赋值
- 索引签名允许定义一个对象类型，该类型可以通过索引访问其属性，并且这些属性的值可以是相同的类型。
- ts 只支持两种索引签名：字符串和数字，可以同时使用两种类型的索引，但是数字索引的返回值必须是字符串索引返回值类型的子类型。
- typeof 操作符用于提取某个变量或类的类型
- keyof 操作符用于提取某个类型的字面量类型
- - ```ts
    type test = {
      name: "zhang";
      age: 18;
    };
    let a: keyof test;
    a = "name";
    a = "age";
    ```
- - ```ts
    interface NumberDictionary {
      [index: string]: number;
      length: number; // 可以，length是number类型
      name: string; // 错误，`name`的类型与索引类型返回值的类型不匹配
    }
    ```
- 索引签名可以结合 TS 高级类型特性使用，例如：映射类型
- - ```ts
    // 这里OptionsFlags是一个映射类型，它将T类型的所有键映射为boolean类型的值，通过索引签名实现这一点
    type OptionsFlags<T> = {
      [P in keyof T]: boolean;
    };
    ```
- 元组用于精确数组中每一项的类型，当添加越界的元素时，类型会被限制为元组中每个类型的联合类型
- - ```ts
    let arr: [string, number];
    arr = ["1", 0];
    arr.push(1);
    arr.push(null); //报错
    ```
- lib.es5.d.ts 中自定义的高级泛型

- - ArrayLike 泛型：类数组类型

- - Partial 泛型 全部属性变为：可选类型

- - - ```ts
      // Partial可选泛型
      interface User {
        name: string;
        age: number;
      }
      // 将User类型全部的属性变为可选类型
      type UserPartial = Partial<User>;
      ```

- - Required 泛型 全部属性变为：必选类型
- - - ```ts
      // Required必选泛型
      interface User1 {
        id?: string;
        sex?: number;
      }
      //将User1类型全部的属性变为必选类型
      type UserRequired = Required<User1>;
      ```

- - Readonly 泛型 全部属性变为：只读类型
- - - ```ts
      // Readonly泛型
      type User2 = {
        name: string;
        id: number;
      };
      // 将User2的全部类型变为只读类型
      interface UserReadOnly extends Readonly<User2> {}
      ```

- - Pick 泛型：从类型 T 中选取部分值的类型，创建一个新的类型。（泛型使用时需要传入类型和选取的类型属性）
- - - ```ts
      // Pick泛型，选取部分类型
      type User3 = {
        name: string;
        age: number;
        id: number;
      };
      // 选取User3类型中的部分值和类型
      type UserPicked = Pick<User3, "name" | "age">;
      ```
- - Record 泛型：构造一个类型，其键为第一个泛型参数类型，值为第二个泛型参数类型

```ts
// Record泛型，指定对某一类键的类型统一约束
type User4 = {
  age: number;
  id: number;
};
// 对键为string类型的值进行约束，相当于{ [key:string]:number; }
type UserRecored = Record<string, number>;
```

- - Exclude 泛型：排除类型中的某一个类型选项！（适用于对象类型）
- - - ```ts
      // Exclude排除泛型，用于在类型中排除某些类型选项！！
      type Unicode = "foo" | "bar" | "baz";
      type userExclude = Exclude<Unicode, "foo">;
      ```
- - Extract 泛型：指定类型中的某一个类型选项！
- - - ```ts
      // Extract精确泛型，选择某个类型选项！进行精确
      type Unicode1 = "foo" | "bar" | "baz";
      type UserExtract = Extract<Unicode1, "baz">;
      ```

- - Omit 泛型：创建一个新的类型，排除类型中指定类型（第二个参数类型）（适用于联合类型）
- - - ```ts
      // Omit泛型
      type User5 = {
        name: string;
        age: 13;
      };
      // 创建新类型，排除给定类型
      type UserOmit = Omit<User5, "age">;
      ```
- - type NonNullable<T> = T & {};内置的排除 undefined 和 null 的泛型（巧妙使用了条件类型去精确类型）。
- - - &在交叉类型中，具有多种类型全部的属性和方法，这里传入空对象不会对原来造成影响，但是使用了&条件类型，就会通过类型排除和类型首位精确定义类型定义。
- - Parameters 泛型，用于提取出函数参数的类型，并将其封装为元组
- - ConstructorParameters 泛型，用于提取出构造函数的参数类型（传入 typeof dmq 类），并将其封装为元组
- - ReturnType 泛型，用于提取函数返回值的类型
- - Awaited 泛型：尝试推断一个具有 then 方法（Promise）的最终完成值的类型
- - - ```ts
      function fetchUser(): Promise<{ id: number; name: string }> {
        return new Promise((resolve) => {
          resolve({ id: 1, name: "张三" });
        });
      }
      type User = Awaited<ReturnType<typeof fetchUser>>;
      ```
- - instanceType 泛型：获取一个构造函数类型的实例类型
- - - ```ts
      type InstanceTyped = InstanceType<typeof MyClass>; //MyClass
      ```
- - Uppercase Lowercase 泛型，将一个字符串类型的所有字符转为大（小）写
- - - ```ts
      type UpperHello = Uppercase<"hello">;
      ```
- - Capitalize 泛型，将字符串类型的首字符转为大写

## react 项目中使用 TS

> 配置 ts.config.json

- lib 选项表示编译过程中需要引入的库文件列表，react 项目中必须在 lib 中包含 dom 选项
- jsx 选项表示编译过程中如何处理 jsx 语法，react 项目中配置为 preserve，保留给 babel 处理即可，也可以配置为 react-jsx
  其余部分详见[官网](https://zh-hans.react.dev/learn/typescript)
