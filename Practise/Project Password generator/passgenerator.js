const upperSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerSet = "abcdefghijklmnopqrstuvwxyz";
const numberSet = "0123456789";
const symbolSet = "~!@#$%^&*()";

const upperCaseCheckbox = document.querySelector('#upper-case');
const lowerCaseCheckbox = document.querySelector('#lower-case');
const numberCheckbox = document.querySelector('#number');
const symbolCheckbox = document.querySelector('#symbol');
const generateButton = document.querySelector('#btn');
const displayScreen = document.querySelector('#screen');
const charLengthInput = document.querySelector('#charleng');
const copy = document.querySelector('#copy');


const getRandomValue = (dataSet) => {
    return dataSet[Math.floor(Math.random() * dataSet.length)];
}

const generatePassword = (password = "") => {
    if (upperCaseCheckbox.checked) {
        password += getRandomValue(upperSet);
    }
    if (lowerCaseCheckbox.checked) {
        password += getRandomValue(lowerSet);
    }
    if (numberCheckbox.checked) {
        password += getRandomValue(numberSet);
    }
    if (symbolCheckbox.checked) {
        password += getRandomValue(symbolSet);
    }
    charLengthInput.value = charLengthInput.value > 30 ? 30 : charLengthInput.value < 4 ? 4 : charLengthInput.value;
    if (password.length < charLengthInput.value) {
        return generatePassword(password);
    }
    displayScreen.textContent = shufflePassword(password, charLengthInput.value);
}

const truncateString = (str, num) => {
    return str.length > num ? str.substring(0, num) : str;
}

const shufflePassword = (str, num) => {
    const truncatedStr = truncateString(str, num);
    const chars = truncatedStr.split("");
    chars.sort(() => 0.5 - Math.random());
    return chars.join("");
}

generateButton.addEventListener('click', () => {
    generatePassword();
});

copy.addEventListener('click', function () {
    let value = displayScreen.textContent;
    navigator.clipboard.writeText(value)
})

generatePassword();