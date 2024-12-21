// 中缀记法转后缀记法
function toBackRecord(str) {
    const stack = [];
    let left = 0,res = "";
    const culcRecord = new Map([
        ["+", 1],
        ["-", 1],
        ["*", 2],
        ["/",3],
    ]);
    while (left<str.length) {
        const item = str.charAt(left);
        if (culcRecord.has(item)) { //符号
            const last = stack[stack.length - 1];
            if (culcRecord.get(item) > culcRecord.get(last)) {
                res += item;
            } else {
                stack.push(item);                
            }
        } else { // 字母
            res += item;
        }
        left++;
    }
    while (stack.length) {
        const item = stack.pop();
        res += item;
    }
    return res;
}
console.log(
    toBackRecord("a+b*c")
);
// b c * a +