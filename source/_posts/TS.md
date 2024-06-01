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
let num:number=1
let bool:boolean=false
/**
 * 定义固定类型数组
 */
let arr1:number[]=[1,2,3]
let arr2:string[]=['1','2']
/**
 * 使用泛型定义固定类型数组
 */
let arr3:Array<number>=[1,2,3]
/**
 * 不声明类型定义数组
 */
// 此时不生命类型则自动分配好了类型，不能赋值数组中不存在的类型
// ts中数组中的类型默认声明好了，不能添加原本数组中不存在的类型
let arr4=[1,2,3]
let arr5 =[1,'2']
/**
 * 定义混合类型any数组
 */
// 定义混合类型any的数组可以存放任何类型的值
let arr6:any[]=[1,'ds',false]
```

### 元组

```ts
/**
 * 元组（类型写在数组外面，元组类型写在数组里面）
 */
// 一旦定义了元组，其类型和固定顺序位置的数据类型就确定了
let arr7:[number,boolean]=[1,false]
// 但是其长度可以通过push方法改变，但不能直接赋值改变
arr7.push(2)
// arr7 =[1,false,2]  //报错
```

### 联合类型

```ts
/**
 * 联合类型
 */
let a : number | string =0
```

### 字面量类型

```ts
/**
 * 字面量类型（字面量类型声明的值中只能赋值为指定的）
 */
let a1 : 1 | 0 =0;
```

### 枚举类型

enmu类型代表选取多个中的一个，枚举类型相当于对象和类型的结合，既可以当变量使用，也可以作为类型进行约束。可以使用enum约束变量的类型，限制使用函数时只能传入enum中的属性。

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
enum Color{
    red ,green,blue
}
let a2 = Color.blue
console.log(a2);  //默认情况下赋值为0,1,2
enum Color{
    red1=1,green1,blue1
}
console.log(Color.blue1); //改变后为1，2，3
enum Color{
    red2='red',green2='green',blue2='blue'
}
console.log(Color.blue2);  //赋值给其中一项的如果不是可迭代的（number），则需要为每一个都赋值
```

### any和unknown类型

```ts
/**
 * any类型和unkonwn类型的区别
 * unkonwn类型表示强制类型检查（可以通过赋值改变类型,只有类型明确时才能使用对应属性或方法）
 * any类型表示不进行类型检查
 */
let a3:unknown=1;
a3='1'
a3={a1:'dsf'}
// a3.a1
// a3()
// a3.toString() 当定义unknown未知类型时，在类型未知的情况下不能使用方法
if(typeof a3 === 'function'){
    a3()
}
if(typeof a3 === 'string'){
    a3.toUpperCase()
}
```

### void、undefined和never类型

```ts
/**
 * void类型、undefined类型 和 never类型
 * void类型一般用于表示函数无返回值
 * undefined类型一般用于表示函数直接return或者return undefined
 * never类型一般用于表示函数死循环，永远无法return
 */
// 1 undefined类型，此时函数返回时将返回undefined（undefined类型表示未赋值、为初始化）
function a4():undefined{
    console.log('a4');
    return
}
// 2 void类型，表示变量本身就不存在，当函数没有返回值时，返回值就是void
function a5(){
    console.log('a5');
}
// 2 never类型，表示一个函数永远执行不完（报错或无限循环）
function throwErr(message:string,errCode:number):never{
    throw{
        message,errCode
    }
}
function whileLoop():never{
    while(true){
        console.log('永远为真');
    }
}
```

### 类型断言

```ts
/**
 * 类型适配（类型断言）as
 */
let message:any;
message='1cf' //即使这个时候赋值为字符串，类型仍然是any
let a6 = (<string>message).endsWith('c')    //使用尖括号对变量进行类型断言
let a7 = (message as string).endsWith('f')  //使用as关键字对变量进行类型断言
```

### 函数的声明

```ts
/**
 * 函数的声明
 */
// 1 ts中函数形参的个数和传参时的个数必须要保持一致
let a8 = (message:string,code:number)=>{  
    console.log(message,code);
}
a8('a8',8)
// 2 可选参数，用 ?表示可选参数（可选参数必须要在必选参数之后）
let a9 =(message:string,code?:number)=>{
    console.log(message,code);
}
a9('你好')
// 3 默认参数，与ES6相似
let a10=(message:string='你好',code:number=1)=>{
    console.log(message,code);
}
a10('嗨')
```

### 具体对象类型

```ts
/**
 * 具体对象类型
 */
let person1 :{
    name:string,
    age:number
}={
    name:'张三',
    age:18
}
let person2={
    name:'李四',age:20
}
// person2.nicname 此时会报错，不能使用对象没有的属性和方法
let person3:any={name:'王五',age:22}
console.log(person3.nickname); //如果将对象的类型改为any，则可以使用任意类型（相当于原生js对象）
```

### 接口interface

```ts
/**
 * 定义接口interface
 */
interface Point{
    x:number,y:number
}
let drawPoint = (point:Point)=>{
    console.log({x:point.x,y:point.y});
}
// drawPoint({x:'1',y:1})  这时候不满足接口就会报错.同时这样讲函数和接口分开写不利于代码的高内聚低耦合原则
interface Person{
    age:number;name:string;
    say:()=>void  //用接口表示对应的类型生命，讲函数和接口放在一起提高代码的高内聚低耦合
}
```

### 类和接口

```ts
/**
 * 类 class （ES6中也有类的概念）
 */
class PersonClass implements Person{  //使用类实现接口
    age:number;name:string;
    constructor(age:number=10,name:string='张三'){  //js中的函数不可以重载，一个类中有且只能有一个构造函数
        this.age=age;
        this.name=name
    }
    say=()=>{console.log(`我是：${this.name},今年${this.age}碎了`)};
}
const person4 = new PersonClass()
person4.say()
```



### 类的访问修饰符

```ts
/**
 * 构造函数中访问修饰符：public、private、protected
 */
// 1 public访问修饰符 （没有书写时默认为：public）
class PersonClass2 implements Person{  //使用类实现接口
    // age:number;name:string;
    constructor(public age:number,public name:string){  //js中的函数不可以重载，一个类中有且只能有一个构造函数
        // 使用关键字public之后，将自动构造出静态属性，不用在赋值
        // this.age=age;this.name=name
    }
    say=()=>{console.log(`我是：${this.name},今年${this.age}碎了`)};
}
const person5 = new PersonClass2(100,'活活')
person5.say()
// 2 private访问修饰符
interface pp{  
    say:()=>void,
    // 添加getter和setter，用于给私有变量赋值
    getAge:()=>number,
    getName:()=>string,
    setAge:(val:number)=>void,
    setName:(val:string)=>void
}
class PersonClass3 implements pp{  //使用类实现接口
    constructor(private age:number,private name:string){  //js中的函数不可以重载，一个类中有且只能有一个构造函数
        // 使用private访问修饰符后，同样不用自动注册
    }
    say=()=>{console.log(`我是：${this.getName},今年${this.getAge}碎了`)};
    // 定义setter方法
    getName=()=>{
        return this.name
    }
    getAge= () => {
        return this.age
    }
    setName=(val:string)=>{
        this.name=val
    }
    setAge=(val:number)=>{
        this.age=val
    }
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
let lastInArray = <T>(arr:Array<T>)=>{
    return arr[arr.length-1]
}
const L1 = lastInArray([1,2,3])
console.log(L1);
const L2 = lastInArray(['a','b'])
console.log(L2);
// 显示指明类型
let L3 = lastInArray<string | number>(['1','2'])
// 多泛型表达
let L4 = <T,Y>(x:T,y:Y)=>[x,y]
const v1 = L4(1,'one')
//声明泛型接口
interface ReturnItemFn<T> {
    (para: T): T
}
const returnItem: ReturnItemFn<number> = para => para
//声明泛型类

class Stack<T> {
    private arr: T[] = []
 
    public push(item: T) {
        this.arr.push(item)
    }
 
    public pop() {
        this.arr.pop()
    }
}
const stack = new Stack<number>();
```

### 类型type

```ts
/**
 * 类型type
 */
type Square = {
    size:number
}
type Rectangle = {
    width:number;
    height:number;
}
type Shape = Square | Rectangle; //联合类型
function area(shape:Shape){
    if('size' in shape){  //如果shape中有size属性，说明是正方形
        return shape.size ** 2
    }
    if('width' in shape){
        return shape.width * shape.height
    }
}
```

### 类型守护 is

类型守护的意义就在于`类型的倒推`，由结果推导出变量的具体类型（收缩变量的类型范围），这样当结果已经知道时，就可以推导出变量为unknow或其他等一些未知的类型。

例如：

当变量使用unknown类型，判定结果为boolean类型时，不使用as关键字就无法在后面使用value对应的方法，因为它的类型是unknown。

```ts
const isString=(value:unknown):boolean=>typeof value==='string';
function test(value:unknown):string{
    if(isString(value)){
      // value.charCodeAt(0) , 抛出错误，需要使用as
      (value as string).charCodeAt(0);
    }
	return ''
}
```

使用is类型守护，当结果类型已知时，就可以倒推出变量的类型（收缩类型），进而可以使用对应的方法

```ts
const isString=(value:unknown):value is string=>typeof value==='string';
function test(value:unknown):string{
    if(isString(value)){
		value.charCodeAt(0) // is变量守护后，倒推出value为string类型
    }
	return ''
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
    size:number
}
type Rectangle1 = {
    width:number;
    height:number;
}
function isSquare(shape1:Shape1):boolean{
    return 'size' in shape1
}
function isRectangle(shape1:Shape1):boolean{
    return 'width' in shape1
}
type Shape1 = Square1 | Rectangle1;
function area1(shape1:Shape1){
    if(isSquare(shape1)){  //如果shape中有size属性，说明是正方形
        return shape1.size ** 2
    }
    if(isRectangle(shape1)){
        return shape1.width * shape1.height
    }
}
/**
 * 应该将判断函数定义为类型（而不是布尔值），这样类型守卫才不会失效
 */
type Square1 = {
    size:number
}
type Rectangle1 = {
    width:number;
    height:number;
}
function isSquare(shape1:Shape1):shape1 is Square1{  //将boolean判断上升到类型判断中，使类型一致
    return 'size' in shape1
}
function isRectangle(shape1:Shape1):shape1 is Rectangle1{
    return 'width' in shape1
}
type Shape1 = Square1 | Rectangle1;
function area1(shape1:Shape1){
    if(isSquare(shape1)){  //如果shape中有size属性，说明是正方形
        return shape1.size ** 2
    }
    if(isRectangle(shape1)){
        return shape1.width * shape1.height
    }
}
```

### 函数重载

```ts
/**
 * 函数重载（TS的函数重载发生在编译时而不是运行时，因为js不支持函数重载）
 */
// 使用函数重载将会明确函数的签名，大大提升对函数使用的准确性
function makeDate(timeStamp:number):Date;
function makeDate(year:number,month:number,day:number):Date;
function makeDate(timeStampOrYear:number,month?:number,day?:number){
    if(month != null && day != null){
        return new Date(timeStampOrYear,month-1,day)
    }else{
        return new Date(timeStampOrYear)
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
type Add={
    (a:number,b:number):number;
    debugName:string;  //添加debugName附加信息
    (a:number,b:number,c:number):number;  //进行函数的重载
}
const add:Add = (a:number,b:number,c?:number)=>{
    return a+b+(c != null ? c : 0);
};
add.debugName='附加信息'
/**
 * new构造函数进行签名
 */
type Poit={
    new (x:number,y:number):{x:number;y:number};
    new (x:number,y:number,z:number):{x:number;y:number,z:number};
}
const point = class{
    constructor(public x:number,public y :number,public z?:number){}
}
/**
 * 索引签名
 */
// 定义字典类型
type Dictionary = {
    [key:string]:any;
}
// 定义Person类型
type Person1 = {
    name:string;
    age:number;
}
// 定义字典对象类型
type PersonDictionary = {
    [username:string]:Person1
}
const persons :PersonDictionary={
    alex:{
        name:'阿莱克斯',
        age:18
    },
    michal:{
        name:'jackson',
        age:20
    }
}
const alex=persons['alex']
persons['张三']={
    name:'张三',
    age:100
}
delete persons['张三']
// 注意：当访问不存在的属性时，ts不会报错
const aa = persons['不存在'] //undefined
// aa.name  //ts书写时不会报错，编译时报错
```

### 函数副作用

```ts
/**
 * 函数的副作用
 */
function reverseSorted(input:number[]):number[]{
    return input.sort().reverse()
}
let arr8 = [1,2,3,4]
const result = reverseSorted(arr8)
console.log(result,arr8); //可以观察到两个数组都变化了，函数出现了副作用
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
function reverseSorted2(input:readonly number[]):number[]{
    // return input.slice().sort().reverse()
    return [...input].sort().reverse()
}
let arr9 = [1,2,3,4]
const result2 = reverseSorted2(arr9)
console.log(result2,arr9);
```

### 双重断言

```ts
/**
 * 双重断言
 */
// 断言：
type T2D = {x:number;y:number};
type T3D = {x:number;y:number,z:number};
let P2D : T2D={x:1,y:1}
let P3D : T3D={x:10,y:10,z:10}
P2D=P3D  //多出属性的值可以赋值给少属性的值
// P3D=P2D  //这样会报错，少属性的值不能付给多属性的值，此时可用类型断言
P3D = P2D as T3D; //使用类型断言，表示P2D为T3D类型的值，这样就可以赋值
// 双重类型断言 （如果两个值连类型都不一致）
type PersonT = {name:string,age:number}
let person6 : PersonT = {name:'张三',age:18}
// P3D = person6 报错
// P3D = person6 as T3D 单重断言仍报错，因为数据类型都不对
P3D = person6 as any as T3D  //双重断言
```

### 字符串不可更改

```ts
/**
 * js中的字符串不可更改 immutable
 */
let king = 'elvis'
king = 'james' //这里虽然变量变了，但是其实elvis字符串还在
king[2] //字符串通过索引可以访问到对应字母
// king[2] = 'b'  //报错，js中字符串不可修改
```

### 常量断言 as const

```ts
/**
 * 常量断言（js中对象类型的值可以修改）
 */
const obj = {
    name:'张三',
    age:19
} 
obj.name='李四' //此时对象中的值可以任意修改
const obj2 = {
    name:'王五',
    age:100,
    arr:[1,2,3]
} as const
// obj2.name='张三' //此时报错，使用常量断言之后不能修改
// 延展：常量断言可以断言任何一个类型（包括数组），将任何类型的成员变量都转换为readonly只读属性
// 应用场景2：（常量断言会将值变为字面量类型）
function layout(setting:{align:'left' | 'center';}){
    console.log('align为：',setting.align);
}
// const test = {align:'left'}
// layout(test) //此时会报错，因为test中的值是字符串，不是符合条件的字面量类型
const test = { align:'left' } as const
layout(test)  //使用常量类型断言，将值变为字面量类型了
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

### this关键字

ts在函数中使用this关键字时，由于其类型要约束，因此需要在函数定义参数处声明其类型，声明方式：使用this关键字作为第一个参数，ts会自动识别这是在为this定义类型，后面参数接收和传参时和正常一样。

```ts
/**
 * this关键字
 */
function double(this:{value:number}){ //this必须是参数的第一位（假的）
    this.value = this.value * 2
}
const valid = {
    value:10,
    double
}
valid.double() //得到20
const valid2 = {
    val:1,
    double
}
// valid2.double() 此时报错，因为valid2中对象没有value属性
```

### declare关键字

ts中declare关键字就是用于告诉编译器，某个类型存在，并且在当前页面可以使用。

declare关键字可以描述：

- 变量（const、let、var 命令声明）
- type 或者 interface 命令声明的类型
- class
- enum
- 函数（function）
- 模块（module）
- 命名空间（namespace）

```js
declare function sayHello(name:string):void;
sayHello('张三');
```

### module关键字

当我们在使用非TypeScript编写的库的时候，他们并没有自己的类型，在ts项目中引入的时候就会抛出错误，这时候通常在`.d.ts`文件中进行定义。也可以使用`module关键字`来声明某个模块的类型

```ts
declare module "url" {
    export interface Url {
        protocol?: string;
        hostname?: string;
        pathname?: string;
    }

    export function parse(urlStr: string, parseQueryString?, slashesDenoteHost?): Url;
}
```

如果想要快速使用，而忽略其类型校验，可以进行简写：

```ts
declare module "url"
```

### typeof操作符

```ts
/**
 * typeof操作符，提取已有变量的类型
 */
const center = {
    x:0,y:0,z:0
}
// type position = {
//     x:number,y:number,z:number
// }
type position = typeof center //这里使用typeof操作符就不用重新定义
const unit:position={   
    x:center.x+1,y:center.y+1,z:center.z+1
}
```

### keyof操作符

```ts
/**
 * keyof操作符，拿到全部的成员变量作为联合类型
 */
type Person3 = {
    name:string,
    age:number
}
const person7 : Person3 ={
    name:'张三',age:18
}
function getValueByKey(obj:Person3,key:keyof Person3){  //keyof操作符得到联合类型
    const value = obj[key];
    return value;
}
const age = getValueByKey(person7,'age')
// const email = getValueByKey(person7,'email') 这样会报错，不能得到不存在的key
```

### 类型查找

```ts
/**
 * 类型查找
 */
type res = {
    user:{
        name:string,
        age:number
    },
    data:{
        info:string,
        msg:string
    }
}
// 通过定义的类型中的某一项进行类型查找
function getInfo():res['data']{
    return {
        info:'info',msg:'msg'
    }
}
```

### 类型映射

```ts
/**
 * 类型映射
 */
type Point2 = {
    x:number,y:number,z:number
}
//定义Readonly类型，用于将变量中每一项变为只读属性
export type Readonly<T>={  //使用export的原因是Readonly是TS内置好的函数
    readonly [item in keyof T] : T[item]
}
const center2 : Readonly<Point2>={
    x:1,y:1,z:1
}
// center2.x = 100  此时会报错
```

### 类型修饰符

```ts
/**
 * 映射修饰符，readonly、?等
 */
type Point3 = {
    readonly x:number;
    y?:number
}
type Mapped<T> = {
    // readonly [item in keyof T] ? : T[item]
    -readonly [item in keyof T] -? : T[item]
}
type Result3 = Mapped<Point3>
// 实际使用案例
export class State<T>{
    constructor(public current:T){}
    update(next:Partial<T>){
        this.current = {...this.current,...next}
    }
}
export type Partial<T> = {
    [item in keyof T]?:T[item];
}
const state = new State({x:0,y:0})
state.update({y:124});
console.log(state.current);
```



### interface和type的区别

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
let div = document.createElement('div');
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
type Keys = 'firstname' | 'surname';
type DudeType = {

[key in Keys]: string;

};
const test1: DudeType = {
  firstname: 'Pawel',
  surname: 'Grzybek',
};
```

4 、 默认导出方式不同

```ts
// inerface 支持同时声明，默认导出 而type必须先声明后导出
export default interface Config {
  name: string;
}
// 同一个js模块只能存在一个默认导出哦
 type Config2 = {name: string}
  export default Config2
//   type或者interface使用指南
//   在选择使用 type 还是 interface 时，你可以根据具体情况来决定。通常来说，如果你需要定义对象的结构，或者要求类实现某个结构，使用 interface 是一个不错的选择。
//   而如果你需要复杂的联合类型或交叉类型，或者仅仅是为了给某个类型起一个别名以提高可读性，那么使用 type 是更合适的
```





