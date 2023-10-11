//TODO ทำ has seleted level
//TODO ทำให้ค่อยๆ fade popup
import { nowScore, update} from './game.js'
function start_time(){
  let time = 180;
  let minutes, seconds;
  setInterval(() => {
      minutes = parseInt(time / 60, 10);
      seconds = parseInt(time % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      time_counter.innerHTML = minutes + ":" + seconds;
      // console.log(minutes + ":" + seconds);
      if (--time < 0) {
          time = 0;
          your_score_counter.innerHTML = nowScore ;
          game_over.classList.add("show");
          clearInterval();
      }
  }, 1000)
}
let diff_mode = "";

function reset_selected() {
  easy.classList.remove("selected");
  medium.classList.remove("selected");
  hard.classList.remove("selected");
}

if (diff_mode === "") {
  diff_info.innerHTML = "please select your difficulty";
}
if (diff_mode === "easy") {
  diff_info.innerHTML = "It's easy bro";
}
if (diff_mode === "medium") {
  diff_info.innerHTML = "It's medium bro";
}
if (diff_mode === "hard") {
  diff_info.innerHTML = "It's hard bro";
}

how_to_play.addEventListener("click", function () {
  game_rules.classList.add("show");
});
game_rules_back.addEventListener("click", function () {
  game_rules.classList.remove("show");
});
show_score_board.addEventListener("click", function () {
  container1.style.display = "none";
  container3.style.display = "block";
});
// addButton.addEventListener("click", function () {
//     gameover.classList.remove("show");
//     scoreBoard.classList.add("show");
// });

start_game.addEventListener("click", function () {
  diff.classList.add("show");
});
diff_back.addEventListener("click", function () {
  diff.classList.remove("show");
});

easy.addEventListener("click", function () {
  diff_mode = "easy";
  reset_selected();
  easy.classList.add("selected");
});
easy.addEventListener("mouseover", function () {
  diff_info.innerHTML = "It's easy for CEDT<br>Time : 3 minutes<br>No bonus score";
  easy.classList.add("choose");
});
easy.addEventListener("mouseout", function () {
  easy.classList.remove("choose");
});
medium.addEventListener("click", function () {
  diff_mode = "medium";
  reset_selected();
  medium.classList.add("selected");
});
medium.addEventListener("mouseover", function () {
  diff_info.innerHTML = "It's medium for geniuses guy<br>Time : 3 minutes<br>Bonus score x 2 ";
  medium.classList.add("choose");
});
medium.addEventListener("mouseout", function () {
  medium.classList.remove("choose");
});
hard.addEventListener("click", function () {
  diff_mode = "hard";
  reset_selected();
  hard.classList.add("selected");
});
hard.addEventListener("mouseover", function () {
  diff_info.innerHTML = "It's hard for CP<br>Time: 3 minutes<br>Bonus score x 5";
  hard.classList.add("choose");
});
hard.addEventListener("mouseout", function () {
  hard.classList.remove("choose");
});

diff_start.addEventListener("click", function () {
  if (diff_mode == "") {
    alert("Please select your difficulty");
  } else {
    start_time();
    diff.classList.remove("show");
    container1.style.display = "none";
    container2.style.display = "block";
    block1.style.backgroundColor = "#edab62";
    update(0);

  }
});

export {diff_mode};
// retry.addEventListener("click", function () {
//     scoreBoard.classList.remove("show");
//     location.reload();
// });
