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
