// A. Problem solving

// 1
function noIdenticalElement(arr1, arr2) {
  let result = [];
  for (let ele of arr1) {
    if (arr2.indexOf(ele) === -1) {
      result.push(ele);
    }
  }
  for (let ele of arr2) {
    if (arr1.indexOf(ele) === -1) {
      result.push(ele);
    }
  }
  return result;
}
let A1 = [1, 2, "a"],
  A2 = [1, 3, "b"];
console.log(noIdenticalElement(A1, A2));

// 2
function ranking(data) {
  for (let i = 0; i < data.length - 1; i++) {
    for (let j = i + 1; j < data.length; j++) {
      let equalPoints = data[i].points === data[j].points,
        equalGD = data[i].GD === data[j].GD;
      if (
        data[i].points < data[j].points ||
        (equalPoints && data[i].GD > data[j].GD) ||
        (equalPoints &&
          equalGD &&
          data[i].name.toLowerCase() > data[j].name.toLowerCase())
      ) {
        [data[i], data[j]] = [data[j], data[i]];
      }
    }
  }
  data.forEach((ele, i) => (ele.position = i + 1));
  return data;
}
let data = [
  {
    name: "Arsenal",
    points: 99,
    GD: 45,
  },
  {
    name: "Chelsea",
    points: 75,
    GD: 39,
  },
  {
    name: "Manchester United",
    points: 60,
    GD: 29,
  },
  {
    name: "Liverpool",
    points: 89,
    GD: 39,
  },
];
console.log(ranking(data));
