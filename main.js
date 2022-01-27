const random = require("./utils");
const myArgs = process.argv.slice(2);
const rolls = myArgs[0] || 1;
let n = 76;
let arr = [...Array(n).keys()];
arr.shift();
n = 75;

const callNumber = (iters = 1) => {
  let randomPosition;
  let randomValue;
  for (let i = 0; i < iters; i++) {
    randomPosition = random.getRandomInt(n);
    randomValue = arr.splice(randomPosition, 1);
    console.log("new number!", randomValue[0]);
    n--;
  }
};

const main = () => {
  callNumber(rolls);
  console.log("done!");
  console.log(arr);
};

console.log(myArgs);
if (require.main === module) {
  main();
}
