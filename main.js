const random = require("./utils");
const myArgs = process.argv.slice(2);
const readline = require("readline");
const prompt = require("prompt");
prompt.start();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const rolls = myArgs[0] || 1;

const generateArray = (n) => {
  let arr = [...Array(n).keys()];
  arr.shift();
  return arr;
};

const generateArrayWithMin = (min = 1, n) => {
  let arr = [...Array(n).keys()];
  arr.splice(0, min);
  return arr;
};

const callNumber = (arr) => {
  let n = arr.length;
  let randomPosition;
  let randomValue;
  randomPosition = random.getRandomInt(0, n);
  randomValue = arr.splice(randomPosition, 1);
  return randomValue[0];
};

const fillCard = (pos, card, arr) => {
  for (let i = 0; i < 5; i++) {
    card[pos].push(callNumber(arr));
  }
};

const generateCard = (name) => {
  let arr;
  console.log("generating card for", name);
  let card = [[], [], [], [], []];
  for (let i = 0; i < 5; i++) {
    arr = generateArrayWithMin(i * 15 + 1, (i + 1) * 15 + 1);
    fillCard(i, card, arr);
  }

  return card;
};

function onErr(err) {
  console.log(err);
  return 1;
}

const main = () => {
  /*for (let i = 0; i < rolls; i++) {
    callNumber(arr);
  }*/
  let cards = [];
  console.log("How many users do you want to generate cards for?");
  prompt.get(["users"], function (err, result) {
    if (err) {
      return onErr(err);
    }
    console.log("res", result);
    for (let i = 0; i < parseInt(result.users); i++) {
      cards.push({ name: `user${i}`, card: generateCard(`user${i}`) });
      console.log(cards[i]);
    }

    /*let arr = generateArray(76);
    for (let i = 0; i < 75; i++) {
      console.log("new number!", callNumber(arr));
    }
    console.log(arr);*/
  });
};

if (require.main === module) {
  main();
}
