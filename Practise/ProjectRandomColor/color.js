const btn = document.querySelector("#btn");
const display = document.querySelector("#display");
const copy = document.querySelector("#copy");
const getColor = () => {
    const randomNumber = Math.floor(Math.random() * 16777215);
    const randomCode = `#${randomNumber.toString(16)}`;
    return randomCode;
}


const colorChange = () => {
    const value = getColor();
    document.body.style.backgroundColor = value;
    display.innerText = value;
    btn.style.backgroundColor = value;

}

const copyCode = () => {
    const value = display.innerText;
    navigator.clipboard.writeText(value);
}


btn.addEventListener('click', colorChange);

copy.addEventListener('click', copyCode);

colorChange();