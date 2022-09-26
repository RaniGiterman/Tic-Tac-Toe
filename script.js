let board = document.getElementsByClassName("board")[0];

window.onload = () => {
  let windowHeight = window.innerHeight;
  let boardHeight = 300;

  board.style.marginTop = `${windowHeight / 2 - boardHeight * 1.35}px`;
};

function placeX(elem) {
  if (elem.classList.contains("tile_before")) {
    elem.textContent = "X";
    elem.classList.remove("tile_before");
    elem.classList.add("tile_after");

    check_win();
  }
}

function check_win() {
  let horizontal = check_horizontal("X");
  let vertical = check_vertical("X");
  let diagonal = check_diagonal("X");

  let state = false;

  let color_arr = [];
  if (horizontal) {
    console.log("h");
    color_arr.push(...horizontal);
    state = true;
  }
  if (vertical) {
    console.log("v");
    color_arr.push(...vertical);
    state = true;
  }
  if (diagonal) {
    console.log("d");
    console.log(diagonal);
    color_arr.push(...diagonal);
    state = true;
  }

  if (state) {
    color_success(color_arr);
    board.style.pointerEvents = "none";
    return;
  }

  let pc_played = false;
  for (let i = 0; i < board.children.length; i++) {
    // need to make sure the board isn't full before letting pc play
    if (board.children[i].innerHTML == "") {
      pc_played = true;
      pc_play();
      break;
    }
  }

  if (!pc_played) {
    setTimeout(() => {
      for (let i = 0; i < board.children.length; i++) {
        board.children[i].style.color = "orange";
      }
    }, 100);
  }
}

function check_horizontal(char) {
  let good_arr = []; // if good array reaches a length of 3, found.
  for (let i = 0; i < board.children.length; i++) {
    if (i % 3 == 0) good_arr = [];

    if (
      board.children[i].innerHTML == char &&
      board.children[i].classList.contains("tile_after")
    ) {
      // only if got x inside, insert to good_arr
      good_arr.push(board.children[i]);
    }
    if (good_arr.length == 3) return good_arr;
  }

  return false;
}
function check_vertical(char) {
  let good_arr = []; // if good array reaches a length of 3, found.

  // yes, i'm running over the array 3 times. The length is only 9 so it's fine. Wouldn't happen if I had a million elements..

  for (let i = 0; i < board.children.length; i += 3) {
    if (
      board.children[i].innerHTML == char &&
      board.children[i].classList.contains("tile_after")
    ) {
      // only if got x inside, insert to good_arr
      good_arr.push(board.children[i]);
    }
    if (good_arr.length == 3) return good_arr;
  }

  good_arr = [];

  for (let i = 1; i < board.children.length; i += 3) {
    if (
      board.children[i].innerHTML == char &&
      board.children[i].classList.contains("tile_after")
    ) {
      // only if got x inside, insert to good_arr
      good_arr.push(board.children[i]);
    }
    if (good_arr.length == 3) return good_arr;
  }

  good_arr = [];

  for (let i = 2; i < board.children.length; i += 3) {
    if (
      board.children[i].innerHTML == char &&
      board.children[i].classList.contains("tile_after")
    ) {
      // only if got x inside, insert to good_arr
      good_arr.push(board.children[i]);
    }
    if (good_arr.length == 3) return good_arr;
  }

  return false;
}
function check_diagonal(char) {
  let good_arr = []; // if good array reaches a length of 3, found.

  // yes, i'm running over the array 2 times. The length is only 9 so it's fine. Wouldn't happen if I had a million elements..

  for (let i = 0; i < board.children.length; i += 4) {
    if (
      board.children[i].innerHTML == char &&
      board.children[i].classList.contains("tile_after")
    ) {
      // only if got x inside, insert to good_arr
      good_arr.push(board.children[i]);
    }
    if (good_arr.length == 3) {
      return good_arr;
    }
  }

  good_arr = [];

  for (let i = 2; i < board.children.length - 1; i += 2) {
    if (
      board.children[i].innerHTML == char &&
      board.children[i].classList.contains("tile_after")
    ) {
      // only if got x inside, insert to good_arr
      good_arr.push(board.children[i]);
    }
    if (good_arr.length == 3) return good_arr;
  }

  return false;
}

function color_success(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i].style.color = "rgb(0,255,0)";
  }
}

function pc_play() {
  // Try to win
  for (let i = 0; i < board.children.length; i++) {
    if (
      board.children[i].innerHTML == "" &&
      !board.children[i].classList.contains("tile_after")
    ) {
      // empty square

      board.children[i].innerHTML = "O";
      board.children[i].classList.remove("tile_before");
      board.children[i].classList.add("tile_after");

      let horizontal = check_horizontal("O");
      let vertical = check_vertical("O");
      let diagonal = check_diagonal("O");

      let state = false;

      let color_arr = [];
      if (horizontal) {
        color_arr.push(...horizontal);
        state = true;
      } else if (vertical) {
        color_arr.push(...vertical);
        state = true;
      } else if (diagonal) {
        color_arr.push(...diagonal);
        state = true;
      }

      if (state) {
        board.children[i].innerHTML = "O";
        board.children[i].classList.add("tile_after");
        board.children[i].classList.remove("tile_before");

        color_success(color_arr);
        board.style.pointerEvents = "none";
        return;
      }

      // clean the square
      board.children[i].innerHTML = "";
      board.children[i].classList.remove("tile_after");
      board.children[i].classList.add("tile_before");
    }
  }

  // Try to block player from winning
  for (let i = 0; i < board.children.length; i++) {
    if (
      board.children[i].innerHTML == "" &&
      !board.children[i].classList.contains("tile_after")
    ) {
      // empty square

      board.children[i].innerHTML = "X";
      board.children[i].classList.remove("tile_before");
      board.children[i].classList.add("tile_after");

      let horizontal = check_horizontal("X");
      let vertical = check_vertical("X");
      let diagonal = check_diagonal("X");

      let state = false;

      let color_arr = [];
      if (horizontal) {
        color_arr.push(...horizontal);
        state = true;
      } else if (vertical) {
        color_arr.push(...vertical);
        state = true;
      } else if (diagonal) {
        color_arr.push(...diagonal);
        state = true;
      }

      if (state) {
        board.children[i].innerHTML = "O";
        board.children[i].classList.add("tile_after");
        board.children[i].classList.remove("tile_before");
        return;
      }

      board.children[i].innerHTML = "";
      board.children[i].classList.remove("tile_after");
      board.children[i].classList.add("tile_before");
    }
  }
  // so none of the next moves lead to a win for X. gotta put a circle randomly.

  let random = Math.floor(Math.random() * 8);

  while (board.children[random].innerHTML != "") {
    random = Math.floor(Math.random() * 8);
  }

  console.log(board.children[random]);
  board.children[random].innerHTML = "O";
  board.children[random].classList.add("tile_after");
  board.children[random].classList.remove("tile_before");
}

function new_game() {
  for (let i = 0; i < board.children.length; i++) {
    board.children[i].innerHTML = "";
    board.children[i].style.color = "white";
    board.style.pointerEvents = "all";
    board.children[i].classList.remove("tile_after");
    board.children[i].classList.add("tile_before");
  }
}
