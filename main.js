const random = require("./utils");
const myArgs = process.argv.slice(2);
const rolls = myArgs[0] || 1;
/*let n = 76;
let arr = [...Array(n).keys()];
arr.shift();
n = 75;*/

const generateArray = () => {
  let n = 76;
  let arr = [...Array(n).keys()];
  arr.shift();
  return arr;
};

const callNumber = (arr) => {
  let n = arr.length;
  let randomPosition;
  let randomValue;
  /*for (let i = 0; i < iters; i++) {
    randomPosition = random.getRandomInt(n);
    randomValue = arr.splice(randomPosition, 1);
    console.log("new number!", randomValue[0]);
    n--;
  }*/
  randomPosition = random.getRandomInt(n);
  randomValue = arr.splice(randomPosition, 1);
  console.log("new number!", randomValue[0]);
  n--;
};

const generateCard = (name) => {
  console.log("generating card for", name);
  let card = [[]];
  for (let i = 0; i < 5; i++) {
    card[0].push(random.getRandomInt(16));
  }
};

const main = () => {
  let arr = generateArray();
  for (let i = 0; i < rolls; i++) {
    callNumber(arr);
  }
  console.log("done!");
  console.log(arr);
};

if (require.main === module) {
  main();
}
