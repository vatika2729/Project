const fakeRequestPromise = (url) => {
    return new Promise((resolve, reject) => {
        const rand = Math.floor(Math.random() * 10);
        setTimeout(() => {
            if (rand < 5) {
                resolve(`Status code 200, API has fetch the response ${rand}`);
            }

            reject(`Status code 401, You are unauthorised user ${rand}`);

        }, 2000)
    })
}

fakeRequestPromise('/dogs/1')
    .then((result) => {
        console.log('Request has been send');
        console.log(`response: ${result}`);
        return fakeRequestPromise('abcd.com/page1')
    })
    .then((result) => {
        console.log('Page 1 Request has been send');
        console.log(`response: ${result}`);
        return fakeRequestPromise('abcd.com/page2');
    })
    .then((result) => {
        console.log('Page 2 Request has been send');
        console.log(`response: ${result}`);
    })
    .catch((error) => {
        console.log('Hey!!!, Your Authorization has expired');
        console.log(`response: ${error}`);
    });
