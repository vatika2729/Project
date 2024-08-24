const express = require('express');
const app = express();
const path = require('path');
const reditt = require('./data.json');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

app.listen('3000', () => {
    console.log('listening portno. 3000');
})

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/r/:subredit', (req, res) => {
    const { subredit } = req.params;
    const data = reditt[subredit];
    if (data) {
        res.render('subredit', { ...data })
    }
    else {
        res.render('noresult', { subredit })
    }
    // console.log(data);

})

app.get('/random', (req, res) => {
    const math = Math.floor(Math.random() * 10 + 1);
    res.render('random', { rand: math })
})

