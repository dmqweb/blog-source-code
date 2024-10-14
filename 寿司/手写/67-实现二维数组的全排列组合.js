/**
 * 二维数组的全排列组合
 *
 * 例如
 * var arr =[[‘A’,’B’],[‘a’,’b’],[1,2]] 求二维数组的全排列组合
 * 结果：Aa1,Aa2,Ab1,Ab2,Ba1,Ba2,Bb1,Bb2
 */

/**
 * 方法一
 * @param {*} arr
 * @returns
 */
function foo(arr) {
  var len = arr.length;
  if (len >= 2) {
    var len1 = arr[0].length;
    var len2 = arr[1].length;
    var items = new Array(len1 * len2); 
    var index = 0;
    for (var i = 0; i < len1; i++) {
      for (var j = 0; j < len2; j++) {
        if (Array.isArray(arr[0])) {
          items[index] = arr[0][i].concat(arr[1][j]);
        } else {
          items[index] = [arr[0][i]].concat(arr[1][j]);
        }
        index++;
      }
    }
    var newArr = new Array(len - 1);
    for (var i = 2; i < arr.length; i++) {
      newArr[i - 1] = arr[i];
    }
    newArr[0] = items;
    return foo(newArr);
  } else {
    return arr[0];
  }
}
var arr = [
  ["A", "B"],
  ["a", "b"],
  [1, 2],
];
console.log(foo(arr));

/**
 * 方法二
 * @param {*} arr1
 * @param {*} arr2
 * @returns
 */
const getResult = (arr1, arr2) => {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
    return;
  }
  if (!arr1.length) {
    return arr2;
  }
  if (!arr2.length) {
    return arr1;
  }
  let result = [];
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      result.push(String(arr1[i]) + String(arr2[j]));
    }
  }
  return result;
};

const findAll = (arr) =>
  arr.reduce((total, current) => {
    return getResult(total, current);
  }, []);
var arr = [
  ["A", "B"],
  ["a", "b"],
  [1, 2],
];
console.log(findAll(arr));
/**
 * 方法三 回溯法
 * @param {*} arr 
 * @returns 
 */
const fullArray = (arr) => {
  const res = [];
  const traceBack = (path, n) => {
    if (path.length === arr.length) {
      res.push(path.slice());
      return;
    }
    for (const item of arr[n]) {
      traceBack(path + item, n + 1);
    }
  };
  traceBack("", 0);
  return res;
};
var arr = [
  ["A", "B"],
  ["a", "b"],
  [1, 2],
];
console.log(fullArray(arr));
