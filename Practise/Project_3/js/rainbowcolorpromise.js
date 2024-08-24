const colorChange = (color, delay) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            document.body.style.backgroundColor = color;
            resolve();
        }, delay)
    })
}


// colorChange('violet', 2000)
//     .then(() => {
//         return colorChange('indigo', 2000)
//     })
//     .then(() => {
//         return colorChange('blue', 2000)
//     })
//     .then(() => {
//         return colorChange('green', 2000)
//     })
//     .then(() => {
//         return colorChange('yellow', 2000)
//     })
//     .then(() => {
//         return colorChange('orange', 2000)
//     })
//     .then(() => {
//         return colorChange('red', 2000)
//     })

const rainbow = async () => {
    await colorChange('indigo', 2000);
    await colorChange('blue', 2000);
    await colorChange('green', 2000);
    await colorChange('yellow', 2000);
    await colorChange('orange', 2000);
    await colorChange('red', 2000)
}