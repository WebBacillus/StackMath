import { getRank, createItem } from "./api.js";
import { nowScore } from "./game.js";
import { diff_mode } from "./menu.js";

function drawTable(items) {
  const table = document.getElementById("main-table-body");

  // Clear all elements
  table.innerHTML = "";
  let rank = 1;
  for (const item of items) {
    const row = table.insertRow();
    row.insertCell().innerHTML = rank++;
    row.insertCell().innerText = item.student_id;
    row.insertCell().innerText = item.name;
    row.insertCell().innerText = item.score;
  }
}

export async function fetchAndDrawTable() {
  const items = await getRank();

  drawTable(items);
}

score_board_back.addEventListener("click", ()=> {
  container3.style.display = "none";
  container1.style.display = "block";
})

game_over_submit.addEventListener("click", ()=> {
    const idToAdd = document.getElementById("student_id");
    const nameToAdd = document.getElementById("name");
    let scoreToAdd = parseInt(nowScore);
    const regex = /^\d{10}$/;

    if(idToAdd.value == ""){
      alert("Please enter your student ID");
    }
    else if(!regex.test(idToAdd.value)){
      alert("Your student id must have 10 digit");
    }
    else if(nameToAdd.value == ""){
      alert("Please enter your name");
    }
    else {
      // console.log(scoreToAdd);
      const payload = {
        student_id: idToAdd.value,
        name: nameToAdd.value,
        score: scoreToAdd,
      };
      console.log(payload);
    
      createItem(payload);
      fetchAndDrawTable();
  
      location.reload();
    }

});

game_over_skip.addEventListener('click',  () => {
  location.reload();
});