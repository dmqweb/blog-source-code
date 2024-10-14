const leadingFnRe = /^function/;
const leadingFnNameRe = /^\w+\s*\(/;
/**
 * 将函数字符串转成函数，支持几种类型
 *   类型一：() => {} / val => {}
 *   类型二：setValue() {}
 *   类型三：function() {} / function setValue() {}
 * @param str
 * @returns
 */
function transformStringToFunction(str) {
  if (typeof str !== "string") return str;
  let fn;
  if (leadingFnNameRe.test(str) && !leadingFnRe.test(str)) {
    str = `function ${str}`;
  }
  let fnBody = `
    return function() {
      const self = this;
      try {
        return (${str}).apply(self, arguments);
      } catch(e) {
        console.log('call function which parsed by lowcode failed: ', e);
        return e.message;
      }
    };
  `;
  try {
    // eslint-disable-next-line no-new-func
    fn = new Function(fnBody)();
  } catch (e) {
    console.error(str);
    console.error(e.message);
  }
  return fn;
}

// 测试一个有效的函数字符串
const validFunctionString = 'return x * 2';
const validFunction = transformStringToFunction(validFunctionString);
console.log(validFunction(5)); // 输出: 10

// 测试一个不是字符串的参数
const nonString = 123;
console.log(transformStringToFunction(nonString)); // 输出: 123

// 测试一个以函数名开头但不是完整定义的字符串
const incompleteFunctionString = 'myFunction';
console.log(transformStringToFunction(incompleteFunctionString)); // 输出: function myFunction() { ... }

// 测试一个无效的函数字符串
const invalidFunctionString = 'invalid code';
const invalidFunction = transformStringToFunction(invalidFunctionString);
console.log(invalidFunction()); // 输出: call function which parsed by lowcode failed:  ...