const express = require('express');
const morgan = require('morgan');
const app = express();



app.use(morgan("common"))
app.use((req, res, next) => {
    req.requestTime = Date.now();
    console.log(req.method.toUpperCase(), req.path);
    next();
})

app.use((req, res, next) => {
    console.log('my middle ware')
    next();
})


app.get('/', (req, res) => {
    res.send('hello')
})

app.get('/error', (req, res) => {
    chicken.fly()
})

app.get('/dogs', (req, res) => {

    res.send('woof woof')
})

app.listen('3000', () => {
    console.log("listening on port no. 3000")
})