const data = [
    {
        "ques": "Which of the following is a markup language?",
        "a": "HTML",
        "b": "CSS",
        "c": "XML",
        "d": "PHP",
        "correct": "a"
    },
    {
        "ques": "Inside which HTML element do we put the JavaScript?",
        "a": "<Javascript>",
        "b": "<Script>",
        "c": "<Scripting>",
        "d": "<JS>",
        "correct": "b"
    },
    {
        "ques": `How do you write "Hello World" in an alert box?`,
        "a": `msg("Hello World")`,
        "b": `msgBox("Hello World")`,
        "c": `alertBox("Hello World")`,
        "d": `alert("Hello World")`,
        "correct": "d"
    }
]

const question = document.querySelector('.quest');
const option = document.querySelectorAll('.option');
let index = 0;
const btn = document.querySelector('.btn');
let total = data.length;
let right = 0;
let wrong = 0;


const quizLoaded = () => {

    if (index === total) {
        return quizEnd()
    }
    reset();
    const dataArray = data[index];
    question.innerText = `${index + 1}) ${dataArray.ques}`;
    option[0].nextElementSibling.innerText = dataArray.a;
    option[1].nextElementSibling.innerText = dataArray.b;
    option[2].nextElementSibling.innerText = dataArray.c;
    option[3].nextElementSibling.innerText = dataArray.d;

}



btn.addEventListener('click', () => {
    const dataArray = data[index];
    const ans = getAnswer();

    if (ans === dataArray.correct) {
        right++;
    }
    else {
        wrong++;
    }
    index++;
    quizLoaded();
    return;

})

function getAnswer() {
    let answer;
    option.forEach(
        (input) => {
            if (input.checked) {
                answer = input.value;
            }
        }
    )
    return answer;
}

const reset = () => {
    option.forEach(
        (input) => {
            input.checked = false;
        }
    )
}

const quizEnd = () => {
    document.querySelector('#box').innerHTML =
        `<h3>Thanks for playing the quiz </h3>
            <h2> ${right} out of ${total} are correct</h2> `
}


quizLoaded();
