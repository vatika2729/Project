const p1 = {
    display: document.querySelector("#fScore"),
    button: document.querySelector("#playerone"),
    score: 0
}

const p2 = {
    display: document.querySelector("#sScore"),
    button: document.querySelector("#playertwo"),
    score: 0
}

let winningScoreSelector = document.querySelector('#maxNO');
let winningScore = 3;
let isGameOver = false;


function updateScores(player, opponent) {

    if (!isGameOver) {
        player.score++;
        if (player.score === winningScore) {
            isGameOver = true;
            player.display.classList.add('winner');
            opponent.display.classList.add('loser');
            player.button.disabled = true;
            opponent.button.disabled = true;
        }
        player.display.textContent = player.score;
    }

}


winningScoreSelector.addEventListener('change', function () {
    winningScore = parseInt(this.value);
    reset();

})

p1.button.addEventListener('click', (e) => {

    updateScores(p1, p2);

})

p2.button.addEventListener('click', (e) => {

    updateScores(p2, p1);

});

document.querySelector("#reset").addEventListener('click', () => {
    reset();
    winningScoreSelector.selectindex = "1";
    winningScore = 3;
});

function reset() {
    isGameOver = false;

    for (let p of [p1, p2]) {
        p.score = 0;
        p.display.textContent = 0;
        p.display.classList.remove("winner", "loser");
        p.button.disabled = false;

    }

}