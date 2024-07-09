class TreeNode {
  static default = null;
  constructor(val, left, right) {
    this.val = val;
    this.left = left || TreeNode.default;
    this.right = right || TreeNode.default;
  }
}
const tree = {
  val: 4,
  left: {
    val: 2,
    left: {
      val: 0,
      left: null,
      right: null,
    },
    right: {
      val: 3,
      left: null,
      right: null,
    },
  },
  right: {
    val: 6,
    left: {
      val: 5,
      left: null,
      right: null,
    },
    right: {
      val: 8,
      left: {
        val: 7,
        left: null,
        right: null,
      },
      right: {
        val: 9,
        left: null,
        right: null,
      },
    },
  },
};
var combinationSum2 = function (arr, target) {
  //   不能重复，找出arr中和为target的所有组合
  let res = [],
    path = [],
    sum = 0;
  backTracing(0);
  return res;
  function backTracing(startIndex) {
    if (sum > target) return;
    if (sum === target) {
      res.push([...path]);
      return;
    }
    for (let i = startIndex; i < arr.length; i++) {
      path.push(arr[i]);
      sum += arr[i];
      backTracing(i + 1);
      path.pop();
      sum -= arr[i];
    }
  }
};

console.log(combinationSum2([10, 1, 2, 7, 6, 1, 5], 8));

const btn = document.createElement("button");
btn.addEventListener("click", () => {
  console.log("交互事件先执行");
});
//定时事件
setTimeout(() => {
  console.log("定时事件接着执行");
}, 0);
const pro = Promise.resolve(() => {
  console.log("promise");
});
pro.then((res) => console.log("prosemis.then"));
const xhr = new XMLHttpRequest();
xhr.open("GET", "www.baidu.com");
xhr.onload = () => {
  console.log("xhr请求回调");
};
xhr.send();
function wait(time) {
  const start = Date.now();
  while (Date.now() - start < time) {}
}
wait(3000);
btn.click();
