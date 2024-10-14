/**
 * 选择排序 Selection Sort
 *
 * 从 未排序序列 中找到最大的元素，放到已排序序列的末尾，重复上述步骤，直到所有元素排序完毕。
 *
 * 算法原理
 * 1. 假设未排序序列的第一个是最大值，记下该元素的位子，从前往后比较
 * 2. 若某个元素比该元素大，覆盖之前的位置
 * 3. 重复第二个步骤，直到找到为排序的末尾
 * 4. 将未排序元素的第一个元素和最大元素交换位置
 * 5. 重复前面几个步骤，直到所有元素都已经排序
 *
 * 算法复杂度
 * 平均时间复杂度：O(n^2)
 * 空间复杂度：O(1)原地排序
 * 稳定性：不稳定
 * 排序方式：In-place 内排
 * 
 * 用一个 minIndex 记录未排序区间的最小值的索引
 * 双层for循环
 * 初始拿第一个元素做哨兵arr[minIndex]临时的最小值
 * 外循环遍历未排序的区间(最后一个不用遍历，因为是仅有的未排序元素)
 * 内循环从 i+1 开始遍历未排序区间的元素并与 arr[minIndex] 比较
 * 如果当前元素小于哨兵arr[minIndex]，说明当前元素更小，则重置 minIndex
 * 内循环一边下来就排好了第一个元素
 * 
 * 选择排序的不稳定性理解：
 * 举个例子，序列[5, 8, 5, 2, 9]，我们知道第一遍选择第1个元素5会和2交换，
 * 那么原序列中2个5的相对前后顺序就被破坏了，所以选择排序不是一个稳定的排序算法。
 */

const selectionSort = function (arr) {
  const len = arr.length;
  let minIndex = 0; // 记录未排序区间中最小值的索引
  // 外循环遍历未排序空间的元素(最后一个不用遍历，因为是仅有的未排序元素)
  for (let i = 0; i < len - 1; i++) {
    minIndex = i;
    // 内循环未排序区间，i是左边界，len是右边界
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    // minIndex === i 说明当前元素是未排序区间中最小元素，否则交换
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  return arr;
};

const arr = [5, 8, 2, 0, 1, 9, 3, 1, 4, 7, 6, 9];
console.log(selectionSort(arr));