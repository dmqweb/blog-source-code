/**
 * 实现16进制颜色10进制颜色
 * 
 * #fff => rgb(255,255,255)
 */
const colorToRgb = function (color) {
  let reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
  color = color.toLowerCase();
  if (reg.test(color)) {
    // 如果只有3位颜色值，需先变为6位再处理 eg：#fef -> #ffeeff
    if (color.length === 4) {
      let newColor = "#";
      for (let i = 1; i < 4; i++) {
        newColor += color.charAt(i).repeat(2);
      }
      color = newColor;
    }
    // 处理6位颜色值，转rgb
    let colorChange = [];
    for (let i = 1; i < 7; i += 2) {
      colorChange.push(paeInt(color.slice(i, i + 2), 16));
    }
    return `rgb(${colorChange.join(",")})`;
  } else {
    return color;
  }
};

console.log(colorToRgb("#fffff0"));
