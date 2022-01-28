const utils = require("./utils");
const prompt = require("prompt");
prompt.start();

//Generates an array of numbers from 1 to n
const generateArray = (n) => {
  let arr = [...Array(n).keys()];
  arr.shift();
  return arr;
};

//Generates an array of numbers from min to n
const generateArrayWithMin = (min = 1, n) => {
  let arr = [...Array(n).keys()];
  arr.splice(0, min);
  return arr;
};

//Generates a random number from 1 to array length
const callNumber = (arr) => {
  let n = arr.length;
  let randomPosition;
  let randomValue;
  randomPosition = random.getRandomInt(0, n);
  randomValue = arr.splice(randomPosition, 1);
  return randomValue[0];
};

//Fills a user's card at position pos with numbers from arr
const fillCard = (pos, card, arr) => {
  for (let i = 0; i < 5; i++) {
    card[pos].push(callNumber(arr));
  }
};

//Generates a complete card for a user
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

//Checks if a user has won the bingo
const checkForBingo = (user, cards, drawn) => {
  let card = cards[user]["card"];

  //check rows
  for (let i = 0; i < 5; i++) {
    let row = card[i];
    //check one row
    let allRow = true;
    for (let j = 0; j < 5; j++) {
      //middle space is free
      if (i == 5 && j == 5) continue;
      //if the number is not in draw, the row is not a bingo winner
      !drawn.includes(row[j]) ? (allRow = false) : null;
    }
    //if the whole row is a winner, the user is a bingo winner
    if (allRow) return true;
  }

  //check columns
  for (let i = 0; i < 5; i++) {
    let column = [];
    for (let j = 0; j < 5; j++) {
      column.push(card[j][i]);
    }
    let allColumn = true;
    for (let j = 0; j < 5; j++) {
      //middle space is free
      if (i == 5 && j == 5) continue;
      //if the number is not in drawn, the column is not a bingo winner
      !drawn.includes(column[j]) ? (allColumn = false) : null;
    }
    //if the whole column is a winner, the user is a bingo winner
    if (allColumn) return true;
  }
  //check diagonal
  let allDiagonal = true;
  for (let i = 0; i < 5; i++) {
    //middle space is free
    if (i == 5) continue;
    //if the number is not in drawn, the diagonal is not a bingo winner
    !drawn.includes(card[i][i]) ? (allDiagonal = false) : null;
  }
  if (allDiagonal) return true;

  return false;
};

function onErr(err) {
  console.log(err);
  return 1;
}

//Plays a round of bingo
const playRound = (arr, i, cards, drawn) => {
  let newNumber = callNumber(arr);
  console.log("new number!", newNumber);
  drawn.push(newNumber);
  console.log("BINGO? (y/n)");
  prompt.get(["answer"], function (err, result) {
    if (err) {
      return onErr(err);
    }
    if (result.answer === "y") {
      console.log("specify user");
      prompt.get(["user"], function (err, result) {
        if (err) {
          return onErr(err);
        }

        if (checkForBingo(parseInt(result.user), cards, drawn)) {
          console.log(
            "Congratulations, user",
            result.user,
            "you have won the bingo!"
          );
          return;
        } else {
          console.log("Sorry, user", result.user, "you haven't won yet.");
          playRound(arr, i + 1, cards, drawn);
        }
      });
    } else {
      playRound(arr, i + 1, cards, drawn);
    }
  });
};

const main = () => {
  let cards = [];
  let drawn = [];
  console.log("How many users do you want to generate cards for?");
  prompt.get(["users"], function (err, result) {
    if (err) {
      return onErr(err);
    }
    for (let i = 0; i < parseInt(result.users); i++) {
      cards.push({ name: `user${i}`, card: generateCard(`user${i}`) });
      console.log(cards[i]);
    }
    let arr = generateArray(76);
    playRound(arr, 0, cards, drawn);
  });
};

if (require.main === module) {
  main();
}
