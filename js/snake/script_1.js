let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");

Array.prototype.sample = function () {
  return this[Math.floor(Math.random() * this.length)];
};

let squares = [
  25, 50, 75, 100, 125, 150, 175, 200, 225, 250, 275, 300, 325, 350, 375, 400,
  425, 450, 475, 500, 525, 550, 575, 600, 625, 650,
];
let mode_array = [
  "blue",
  "rainbow",
  "aaaaaa",
  "normal",
  "normal",
  "normal",
  "normal",
  "normal",
  "normal",
];

let ex_p = [];

let direc = "up";
let loopcount = 0;
let score = 2;
let p_size = 25;
let g_size = 28;
let tik = 100;
let mode = "normal";
let clicked = false;

let p_x_pos = [];
let p_y_pos = [];
let a_x;
let a_y;
let p_x;
let p_y;
let o_x;
let o_y;

let point = document.getElementById("point");
let gameover_sound = document.getElementById("gameover");

let random_x;
let random_y;

// drawApple();

let obstacle_array = [1, 1, 1, 2, 2, 3];

shuffleObstacle();

function shuffleObstacle() {
  random_x = obstacle_array.sample();
  random_y = obstacle_array.sample();
  o_x = squares.sample();
  o_y = squares.sample();
  return;
}

function drawObstacle() {
  context.beginPath();
  context.rect(o_x, o_y, p_size * random_x, p_size * random_y);
  context.fillStyle = "#0000ff";
  context.closePath();
  context.fill();
}

function drawApple(player) {
  if (mode == "rainbow") {
    console.log(mode);
    a_x = squares.sample();
    a_y = squares.sample();
    context.beginPath();
    context.rect(a_x, a_y, p_size, p_size);
    context.fillStyle = "#ff0000";
    context.closePath();
    context.fill();
  } else {
    mode = mode_array.sample();
    console.log(mode);
    a_x = squares.sample();
    a_y = squares.sample();
    context.beginPath();
    context.rect(a_x, a_y, p_size, p_size);
    context.fillStyle = "#ff0000";
    context.closePath();
    context.fill();
  }

  if (player == true) {
    drawPlayer();
  } else {
  }
}
drawPlayerStart();

function drawPlayerStart() {
  p_x = squares.sample();
  p_y = squares.sample();
  drawPlayer();
}

function drawPlayer() {
  if (p_x == a_x && p_y == a_y) {
    drawPlayerStart();
  } else {
    context.beginPath();
    context.rect(p_x, p_y, p_size, p_size);
    context.fillStyle = "#00ff00";
    context.closePath();
    context.fill();
  }
}

function reDrawPlayer() {
  context.beginPath();
  context.rect(p_x, p_y, p_size, p_size);
  context.fillStyle = "#00ff00";
  context.closePath();
  context.fill();
}

/////////////// Button ///////////////
document.addEventListener("keydown", function (event) {
  if (clicked == false) {
    clicked = true;
    if (event.keyCode == 37 || event.keyCode == 65) {
      if (direc != "right") {
        direc = "left";
        if (p_x < 0) {
          p_x = g_size * p_size - p_size;
        }
      }
    } else if (event.keyCode == 38 || event.keyCode == 87) {
      if (direc != "down") {
        direc = "up";
        if (p_y < 0) {
          p_y = g_size * p_size - p_size;
        }
      }
    } else if (event.keyCode == 39 || event.keyCode == 68) {
      if (direc != "left") {
        direc = "right";
        if (p_x > g_size * p_size - p_size) {
          p_x = 0;
        }
      }
    } else if (event.keyCode == 40 || event.keyCode == 83) {
      if (direc != "up") {
        direc = "down";
        if (p_y > g_size * p_size - p_size) {
          p_y = 0;
        }
      }
    }
  }
});
let rainbow_array = ["red", "orange", "yellow", "green", "blue", "purple"];
let colour;
let count = 0;

const getHighscores = async () => {
  return await fetch("php-database/get_highscore.php", {
    method: "GET",
    mode: "same-origin",
    credentials: "same-origin",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};
/////////////// Timer ///////////////

let highscores;

highscores = getHighscores();
highscores
  .then((data) => {
    dataArray = data;
    console.log(dataArray);
  })
  .catch((error) => {
    console.error(error);
  });

let loop_delay = 1;
let loop = 0;
setInterval(function () {
  if (loop < 1) {
    tableCreate();
  }
  loop++;
}, 300 * loop_delay);
let done = false;
timer();
setInterval(timer, tik);

function timer() {
  clicked = false;
  dirc = direc;
  drawObstacle();
  if (mode == "rainbow") {
    count++;
    if (count == 100) {
      mode = "normal";
      count = 0;
    }
  }
  if (dirc == "left") {
    p_x += -p_size;
    if (p_x < 0 && mode != "blue") {
      p_x = g_size * p_size - p_size;
    } else if (mode == "blue" && p_x < 0) {
      gameover();
    }
  } else if (dirc == "up") {
    p_y += -p_size;
    if (p_y < 0 && mode != "blue") {
      p_y = g_size * p_size - p_size;
    } else if (mode == "blue" && p_y < 0) {
      gameover();
    }
  } else if (dirc == "right") {
    p_x += p_size;
    if (p_x > g_size * p_size - p_size && mode != "blue") {
      p_x = 0;
    } else if (mode == "blue" && p_x > g_size * p_size - p_size) {
      gameover();
    }
  } else if (dirc == "down") {
    p_y += p_size;
    if (p_y > g_size * p_size - p_size && mode != "blue") {
      p_y = 0;
    } else if (mode == "blue" && p_y > g_size * p_size - p_size) {
      gameover();
    }
  }

  context.clearRect(0, 0, p_size * g_size, p_size * g_size);
  // drawApple
  context.beginPath();
  context.rect(a_x, a_y, p_size, p_size);
  context.fillStyle = "#ffaaaa";
  context.closePath();
  context.fill();
  // drawPlayer
  if (p_x == a_x && p_y == a_y) {
    score++;
    point.play();
    if (mode == "rainbow") {
      score++;
    }
    document.getElementById("score").innerHTML = "Score: " + score;
    drawApple();
  } else {
    context.beginPath();
    context.rect(p_x, p_y, p_size, p_size);
    context.fillStyle = "#00ff00";
    context.closePath();
    context.fill();
  }
  p_x_pos.push(p_x);
  p_y_pos.push(p_y);
  let c = 0;

  ///////// self collision /////////

  for (let i = 0; i < score; i++, c++) {
    if (
      p_x_pos[p_x_pos.length - 2 - i] == p_x &&
      p_y_pos[p_y_pos.length - 2 - i] == p_y
    ) {
      if (mode != "aaaaaa") {
        console.log("game-over");
        gameover();
      }
    }
    if (
      p_x_pos[p_x_pos.length - 2 - i] == a_x &&
      p_y_pos[p_y_pos.length - 2 - i] == a_y
    ) {
      console.log("inside you!");
      drawApple();
    }

    context.beginPath();
    context.rect(
      p_x_pos[p_x_pos.length - 1 - i],
      p_y_pos[p_y_pos.length - 1 - i],
      p_size,
      p_size
    );

    if (mode == "rainbow") {
      if (c > 5) {
        c = 0;
      }
      context.fillStyle = rainbow_array[c];
    } else if (mode == "normal") {
      context.fillStyle = "#00ff00";
    } else if (mode == "blue") {
      context.fillStyle = "#0000ff";
    } else if (mode == "aaaaaa") {
      context.fillStyle = "#aaaaaa";
    }
    context.closePath();
    context.fill();
  }
}

// setTimeout(function () {
//   tableCreate();
// }, tik/4);

const setHighscore = async (name, score) => {
  return await fetch("php-database/set_highscore.php", {
    method: "POST",
    mode: "same-origin",
    credentials: "same-origin",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, score }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

function gameover() {
  let username = "DIP";
  gameover_sound.play();
  if (document.getElementById("name").value != "DIP") {
    username = document.getElementById("name").value;
  }
  username = username.toUpperCase();
  context.fillStyle = "red";
  context.fillRect(0, 0, 500, 500);
  setHighscore(username, score);
  document.getElementById("score").innerHTML = "Score: " + score;
  
  tableCreate();
  drawApple(true);
  score = 2;
}

function tableCreate() {
  if (done == true) {
    document.getElementById("table").remove();
  }
  const body = document.body,
    tbl = document.createElement("table");
  tbl.id = "table";
  tbl.style.width = "150px";
  tbl.style.border = "1px solid black";

  for (let i = 0; i < 6; i++) {
    const tr = tbl.insertRow();
    for (let j = 0; j < 2; j++) {
      const td = tr.insertCell();
      if (j == 0) {
        let name = dataArray[i].name;
        td.appendChild(document.createTextNode(name));
      } else if (j == 1) {
        let score = dataArray[i].score;
        td.appendChild(document.createTextNode(score));
      }
      td.style.border = "1px solid white";
    }
  }
  document.getElementById("leader-board").appendChild(tbl);
  done = true;
}
