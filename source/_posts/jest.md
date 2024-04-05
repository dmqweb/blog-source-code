---
title: jest
tags: jest
categories: TDD
date: 2024-03-30 20:33:01
---



# jest测试

市面上有很多测试框架，例如：mocha 、jasmine、vue test utils、vitest、react testing library和testing frameworks for jacascript等，但语法和思想大致相同，现在依jest框架进行简单的使用

```js
/**
 * jest简单的语法
 * expect  toBe 语法
 */
test('tow plus to 4',()=>{
    expect(2+2).toBe(4);
})
/**
 * toEqual语法，递归检查对象或数组的每个字段
 */
test('object assignment',()=>{
    const data = {name:"张三"};
    data['age'] = 18;
    expect(data).toEqual({name:"张三",age:18})
})
/**
 * expect  not  toBe
 */
test('adding is not 0',()=>{
    for(let i=0;i<10;i++){
        for(let j=0;j<5;j++){
            expect(i + j).not.toBe(-1);
        }
    }
})
/**
 * 检查指定空类型（null,undefined,defined，true和false）
 */
test('toBe null',()=>{
    const n = null;
    expect(n).toBeNull();
})
test('toBe defined',()=>{
    const n = 1;
    expect(n).toBeDefined();
})
test('toBe Undefined',()=>{
    let n;
    expect(n).toBeUndefined();
})
test('toBe Truthy',()=>{
    const n = 1;
    const m = true;
    expect(n && m).toBeTruthy();
})
test('toBe falsy',()=>{
    const n = 0;
    const m = false;
    expect(n && m).toBeFalsy();
})
/**
 * jest对0进行精确测试的结果
 */
test('zero', () => {
    const z = 0;
    expect(z).not.toBeNull(); //非null
    expect(z).toBeDefined(); //defined
    expect(z).not.toBeUndefined(); 
    expect(z).not.toBeTruthy(); //非true
    expect(z).toBeFalsy(); //false
  });
/**
 * jest测试数字
 */
test('two and two',()=>{
    const value = 2 + 2;
    expect(value).toBeGreaterThan(3);
    expect(value).toBeGreaterThanOrEqual(4)
    expect(value).toBeLessThanOrEqual(4.5)
    expect(value).toBeLessThanOrEqual(4)
    expect(value).toBe(4)
    expect(value).toEqual(4)
})
/**
 * toBeCloseTo检查浮点数相等
 */
test('test float number',()=>{
    const value = 0.1 + 0.2;
    // expect(value).toBe(0.3)  报错，因为计算机精度的原因
    expect(value).toBeCloseTo(0.3)
})
/**
 * toMatch根据正则表达式检查字符串
 */
test('test reg',()=>{
    expect('team').not.toMatch(/I/)
    expect('Christoph').toMatch(/stop/)
    expect('hello world').toMatch('lo w')
})
/**
 * toContain测试数组和可迭代对象
 */
const List = ['a','b','c','d'];
test('list to be',()=>{
    expect(List).toContain('c');
    expect(List).not.toContain(1);
})
/**
 * 测试异步代码
 */
const testPromise = Promise.resolve('hello');
//1 使用return
test('return异步代码',()=>{
    return testPromise.then(data=>{
        expect(data).toBe('hello')
    })
})
//2 使用async和await语法
function fetchMessage() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('hello');
        }, 1000);
    });
}
test('async and await', async () => {
    const result = await fetchMessage();
    expect(result).toBe('hello');
});
//expect.assertions验证是否调用了一定数量的断言，确保兑现的承若通过测试
//catch捕捉（确保Promise不会被兑现）
// test('catch fails with errors',()=>{
//     return fetchData2().catch(e=>expect(e).toMatch('error'))
// })

// 3 使用回调函数done
test('done to async',(done)=>{
    testPromise.then(res=>{
        expect(res).toBe('hello');
    })
    done();
})
// 4 .resolves匹配器等待Promise解析（reject则失败）
test('.resolves匹配器',()=>{
    expect(testPromise).resolves.toBe('hello')
})
/**
 * beforeEach和afterEach钩子函数
 * 当每一个测试之前或之后都需要调用相同的方法就可以使用这两个钩子函数
 */

/**
 * describe块
 */

/**
 * test.only只运行一个测试
 */
test.only('test only',()=>{
    expect('test only').toMatch('t o')
})
```

