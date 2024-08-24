let winningScoreSelector = document.querySelector('#maxNO');
const fScore = document.querySelector("#fScore");
const sScore = document.querySelector("#sScore");
const playerone = document.querySelector("#playerone");
const playertwo = document.querySelector("#playertwo");
let count = 0;
let count2 = 0;
let winningScore = 3;
let isGameOver = false;

winningScoreSelector.addEventListener('change', function () {
    winningScore = parseInt(this.value);
    reset();

})

playerone.addEventListener('click', (e) => {

    if (!isGameOver) {
        count++;
        if (count === winningScore) {
            isGameOver = true;
            fScore.classList.add('winner');
            sScore.classList.add('loser');
            playerone.disabled = true;
            playertwo.disabled = true;
        }
        fScore.textContent = `${count}`;
    }

})

playertwo.addEventListener('click', (e) => {

    if (!isGameOver) {
        count2++;
        if (count2 === winningScore) {
            isGameOver = true;
            sScore.classList.add('winner');
            fScore.classList.add('loser');
            playerone.disabled = true;
            playertwo.disabled = true;
        }
        sScore.textContent = `${count2}`;
    }


});

document.querySelector("#reset").addEventListener('click', () => {
    reset();
    winningScoreSelector.selectindex = "1";
    winningScore = 3;
});

function reset() {
    count = 0;
    count2 = 0;
    fScore.textContent = `${count}`;
    sScore.textContent = `${count2}`;
    isGameOver = false;
    fScore.classList.remove("winner", "loser");
    sScore.classList.remove("winner", "loser");
    playerone.disabled = false;
    playertwo.disabled = false;
};