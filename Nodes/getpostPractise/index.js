const express = require('express');
const app = express();
const methodOverride = require('method-override');
const path = require('path');
const { v4: uuid } = require('uuid');

let comments = [
    {
        id: uuid()
        ,
        username: 'Todd',
        comment: 'lol that is so funny'
    },
    {
        id: uuid(),
        username: 'skyler',
        comment: 'Plss, delete your account, Todd'
    },
    {
        id: uuid(),
        username: 'sk8erboi',
        comment: 'Me and my dog loves the bird watching'
    },
    {
        id: uuid(),
        username: 'sayHI',
        comment: 'hi hooku hi hooku hi hi'
    }


]

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

app.listen(3000, () => {
    console.log('port listened on 3000')
})

app.get('/', (req, res) => {
    res.render('apple')
})
app.get('/comments/new', (req, res) => {
    res.render('comments/new')
})
app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(cp => cp.id === id);
    res.render('comments/show', { comment })
})

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(cp => cp.id === id);
    res.render('comments/update', { comment })
})

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params
    const updatedComment = req.body.comment;
    const updatedUsername = req.body.username;
    const fComment = comments.find(cp => cp.id === id);
    fComment.comment = updatedComment;
    fComment.username = updatedUsername;

    res.redirect('/comments');
})

app.delete('/comments/:id', (req, res) => {
    const { id } = req.params
    const fComment = comments.find(cp => cp.id === id);
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments');
})

app.get('/comments', (req, res) => {

    res.render('comments/index', { comments })
})
app.post('/comments', (req, res) => {
    const { username, comment } = req.body
    comments.push({ username, comment, id: uuid() })
    res.redirect('/comments')
})



app.get('/apple', (req, res) => {
    res.send('apple');
})

app.post('/apple', (req, res) => {
    const { fruitname, qty, price } = req.body;
    res.send(`Hey!! Mukul, You have buy ${fruitname} of quantity ${qty} and price is ${price}`);
})