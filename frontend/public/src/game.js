import { diff_mode } from "./menu.js";
import { getQuestion } from "./api.js"

let round = 1;
let first = undefined;
let order = undefined;
let second = undefined;
let nowScore = 0;
let nowQuestion = 0;
let state = 0;

function default_color() {
    document.getElementById("block1").style.backgroundColor = "#ffffff";
    document.getElementById("block2").style.backgroundColor = "#ffffff";
    document.getElementById("block3").style.backgroundColor = "#ffffff";
    document.getElementById("choice1").style.border = "0.25rem solid #379588"
    document.getElementById("choice2").style.border = "0.25rem solid #379588"
    document.getElementById("choice3").style.border = "0.25rem solid #379588"
    document.getElementById("op1").style.border = "0.25rem solid #379588"
    document.getElementById("op2").style.border = "0.25rem solid #379588"
    document.getElementById("op3").style.border = "0.25rem solid #379588"
    document.getElementById("op4").style.border = "0.25rem solid #379588"
}

export async function update(state){
    if(state == "pass"){
        if(diff_mode == "easy"){
            nowScore++;
        }
        if(diff_mode == "medium"){
            nowScore += 2;
        }
        if(diff_mode == "hard"){
            nowScore += 5
        }
        document.getElementById("score_counter").innerHTML = nowScore;
    }
    if(state == "skip"){
        default_color();
    }
    let obj = await getQuestion(diff_mode);
    // console.log(obj);
    nowQuestion++;
    round = 1;
    document.getElementById("question").innerHTML = obj.data.question;
    document.getElementById("block1").innerHTML = obj.data.c1;
    document.getElementById("block2").innerHTML = obj.data.c2;
    document.getElementById("block3").innerHTML = obj.data.c3;
}

function calculate (){
    let ans;
    if(order == "+"){
        ans = parseFloat(first) + parseFloat(second);
    }
    if(order == "-"){
        ans = parseFloat(first) - parseFloat(second);
    }
    if(order == "*"){
        ans = parseFloat(first) * parseFloat(second);
    }
    if(order == "/"){
        ans = parseFloat(first) / parseFloat(second);
    }
    return ans;
}

function reset(num){
    first = undefined;
    order = undefined;
    second = undefined;
    state = 0;
    
    default_color();

    let edit = "block" + round;
    if(num == document.getElementById("question").innerHTML){
        update("pass");
        round = 1;
    } else {
        document.getElementById(edit).innerHTML = num;
        round += 1;
        if(round == 4) round = 1;
        let next = "block" + (round);
        document.getElementById(next).style.backgroundColor = "#edab62";
    }
    // console.log(round);
}

function handleChoiceClick(choiceId, blockId) {
    if (state == 0) {
        first = document.getElementById(blockId).innerHTML;
        document.getElementById(choiceId).style.border = "0.25rem solid #e96a42"
        state = 1;
    } else if (state == 1) {
        state--;
        document.getElementById(choiceId).style.border = "0.25rem solid #379588"

    } else if (state == 2) {
        second = document.getElementById(blockId).innerHTML;
        // alert(first + order + second);
        reset(calculate());
    }
}

function handleOperatorClick(operatorId, chosenOperator) {
    if (state == 1) {
        state = 2;
        order = chosenOperator;
        document.getElementById(operatorId).style.border = "0.25rem solid #e96a42"
    } else if (state == 2) {
        state = 1;
        document.getElementById(operatorId).style.border = "none"
    }
}


choice1.addEventListener("click", function () {
    handleChoiceClick("choice1", "block1");
});

choice2.addEventListener("click", function () {
    handleChoiceClick("choice2", "block2");
});

choice3.addEventListener("click", function () {
    handleChoiceClick("choice3", "block3");
});

op1.addEventListener("click", function () {
    handleOperatorClick("op1", "+");
});

op2.addEventListener("click", function () {
    handleOperatorClick("op2", "-");
});

op3.addEventListener("click", function () {
    handleOperatorClick("op3", "*");
});

op4.addEventListener("click", function () {
    handleOperatorClick("op4", "/");
});

const skip = document.getElementById("skip");
skip.addEventListener("click", function () {
    update('skip');
});

const restart = document.getElementById("restart");
restart.addEventListener("click", function () {
    if (confirm('Are you sure you want to restart?')) {
        location.reload();
    }
});



export {nowScore};