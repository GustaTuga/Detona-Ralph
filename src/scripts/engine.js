const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#menu-lives"),
    },
    values: {
        timeId: null,
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        curretTime: 60,
        lives: 3, 
    },
    actions: {
        timerId: null,
        countDownTimerId: null,
    },
};

function countDown() {
    state.values.curretTime--;
    state.view.timeLeft.textContent = state.values.curretTime;

    if (state.values.curretTime <= 0) {
        endGame("Game Over! O seu resultado foi: " + state.values.result);
    }
}

function playSound() {
    let audio = new Audio("./src/audios/audios/hit.m4a");
    audio.play();
    audio.volume = 0.1;
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * state.view.squares.length);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function moveEnemy() {
    state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            } else {
                state.values.lives--;
                state.view.lives.textContent = `X${state.values.lives}`; 

                if (state.values.lives <= 0) {
                    endGame("Game Over! Você perdeu todas as vidas. Sua pontuação foi: " + state.values.result);
                }
            }
        });
    });
}

function endGame(message) {
    clearInterval(state.actions.timerId); 
    clearInterval(state.actions.countDownTimerId); 

    state.view.timeLeft.textContent = "0"; 
    state.values.curretTime = 0;
    alert(message);
    
    resetGame();
}

function resetGame() {
    state.values.curretTime = 60;
    state.values.lives = 3;
    state.values.result = 0;

    state.view.timeLeft.textContent = state.values.curretTime;
    state.view.score.textContent = state.values.result;
    state.view.lives.textContent = `X${state.values.lives}`;

    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });
}

function initialize() {
    moveEnemy();
    addListenerHitBox();

    if (!state.actions.countDownTimerId) {
        state.actions.countDownTimerId = setInterval(countDown, 1000);
    }
}

initialize();
