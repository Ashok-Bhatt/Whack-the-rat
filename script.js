
let timer;
let position;
let randomBox;
let time = 60;
let timeDifference = 0.5
let score = 0;
let highScore = localStorage.getItem("high-score");
let startGame;

function wackRat(){
    randomBox.removeEventListener("click", wackRat);
    score++;
    scoreDisplay.textContent = score;
    if (score > highScore){
        highScore = score;
        highScoreDisplay.textContent = highScore;
    }
}

function popRat(){

    console.log(time);
    time = time - timeDifference;
    timeDisplay.innerText = Math.ceil(time);

    if (time==0){
        
        clearInterval(timer);
        alert(`Time Over \nYour Score: ${score} \nHigh Score: ${highScore}`)
        localStorage.setItem("high-score", highScore);

        startGame = confirm("Wanna Play Again?");
        if (startGame){
            time = 60;
            score = 0;
            timeDisplay.innerText = time;
            scoreDisplay.innerText = score;
            timer = setInterval(popRat, timeDifference*1000);
        }
    } 
    else {
        position = Math.ceil(Math.random()*16);
        console.log(position);
        randomBox = document.getElementById(position);
        randomBox.appendChild(rat_image);

        randomBox.addEventListener("click", wackRat);
    }
}

function setAttributes(element, attributes) {
    for(let key in attributes) {
      element.setAttribute(key, attributes[key]);
    }
}


const gameBody = document.getElementById("container");

const scoreDisplay = document.getElementById("score");

const highScoreDisplay = document.getElementById("high-score");
highScoreDisplay.textContent = highScore;

const timeDisplay = document.getElementById("time");

const rat_image = document.createElement("img")
setAttributes(rat_image, {"src":"images/rat.jpg", "height":"100px", "width":"100px"});

// creating the inner boxes inside container
for (let i=1; i<=16; i++){
    let item = document.createElement("div");
    let attributes = {"class":"item", "id":i};
    setAttributes(item, attributes);
    gameBody.appendChild(item);
}

window.addEventListener("load", ()=>{
    startGame = confirm("Are you ready?");
    if (startGame){
        timer = setInterval(popRat, timeDifference*1000);
    }
})