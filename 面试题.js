/**
 * 手写XMLHttpRequest
 */
const xhr = new XMLHttpRequest();
xhr.open("GET", "localhost:3000/test", false); //false代表同步请求，true代表异步请求
xhr.onreadystatechange = () => {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      alert(xhr.responseText);
    } else {
      console.error(xhr.responseText);
    }
  }
};
xhr.send(null);
const xhr2 = new XMLHttpRequest();
xhr2.open("POST", "localhost:3000/test", false); //false代表同步请求，true代表异步请求
xhr2.onreadystatechange = () => {
  if (xhr2.readyState === 4) {
    if (xhr2.status === 200) {
      alert(xhr2.responseText);
    } else {
      console.error(xhr2.responseText);
    }
  }
};
xhr2.send({
  name: "张三",
  age: 18,
});
/**
 * 使用XMLHttpRequest封装ajax
 */
function ajax(url, options = { method: "GET", data: null }) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(url, options.method);
    if (xhr.onreadystatechange) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else if (xhr.status === 404) {
          reject("404 not foud");
        }
      }
    }
    xhr.send(options.data);
  });
}
/**
 * 手写防抖函数
 */
function debounce(fn, delay = 500) {
  let timer = null;
  return function () {
    if (timer) clearTimeout(timer);
    else {
      timer = setTimeout(() => {
        fn.apply(this, arguments);
        timer = null;
      }, delay);
    }
  };
}
// input.addEventListener('change',debounce(function(){console.log('d')}),500);
/**
 * 手写节流函数
 */
function throttle(fn, delay) {
  let timer = null;
  return function () {
    if (timer) return;
    timer = setTimeout(() => {
      fn.apply(this, arguments);
      timer = null;
    }, delay);
  };
}
// input.addEventListener('change',throttle(function(){console.log('d')}),500)
/**
 * Event创建DOM标准事件
 */
const rootDOM = document.getElementById("#root");
rootDOM.addEventListener(
  "test",
  (e) => {
    console.log(e, "自定义事件");
  },
  false
);
const event = new Event("test"); //创建一个事件
rootDOM.dispatchEvent(event); //触发一个事件
/**
 * CustomEvent创建自定义事件，可以携带自定义数据
 * 注意customEvent自定义数据的名称必须是detail属性
 */
const customEvent = new CustomEvent("test1", { detail: "携带的数据" });
rootDOM.addEventListener("test1", (e) => {
  console.log(e.detail);
});
rootDOM.dispatchEvent(customEvent);
