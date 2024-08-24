const btn = document.querySelector("#btn");
const h1 = document.querySelector("#text");


btn.addEventListener('click', () => {

    const newColor = randColor();
    document.body.style.backgroundColor = newColor;
    h1.innerText = newColor;


})

const randColor = () => {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);

    return `rgb(${r},${g},${b})`;
}



