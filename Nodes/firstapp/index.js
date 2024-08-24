const express = require('express');
const app = express();
// console.dir(app);

// app.use((req, res) => {
//     console.log('hurray we got the incoming request.')
//     res.send({
//         a: 123,
//         b: 222,
//         c: "abc"
//     });

// })

app.get('/', (req, res) => {

    res.send(`Welcome to homepage`);
})

app.get('/r/:varname', (req, res) => {
    const { varname } = req.params;
    res.send(`The search params is ${varname}`);
})

app.get('/:search/:id', (req, res) => {
    const { search, id } = req.params;
    res.send(`The search ${id} and params is ${search}`);
})

app.get('/search', (req, res) => {
    const { q } = req.query;
    res.send(`The search params query is ${q}`);
})

app.get('/cats', (req, res) => {
    res.send('meow');
})

app.get('*', (req, res) => {
    res.send(`No page found`);
})

app.listen(3000, () => {
    console.log('running on 3000 server');
})