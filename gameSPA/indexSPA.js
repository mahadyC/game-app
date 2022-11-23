'use strict';

const http = require('http');
const path = require('path');
const cors = require('cors');
const fetch = require('node-fetch');

const express = require('express');
const app = express();

const {port, host} = require('./config.json');

const server = http.createServer(app);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'menu.html')));

app.use(cors());

app.get('/getAll', (req, res) => {
    fetch('http://localhost:4000/api/games/', {mode: 'cors'}) 
    .then(data => data.json())
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

app.post('/getOne', (req, res) => {
    const gameId = req.body.id;
    if(gameId && gameId.length > 0){
        fetch(`http://localhost:4000/api/games/${gameId}`, {mode: 'cors'}) 
        .then(data => data.json())
        .then(result => res.json(result))
        .catch(err => res.json(err));
    }
    else{
        res.json({message:'empty id', type: 'error'});
    }
});

app.post('/remove', (req, res) => {
    const gameId = req.body.number;
    if(gameId && gameId.length > 0){
        fetch(`http://localhost:4000/api/games/${gameId}`, {method: 'DELETE',mode: 'cors'})
        .then(data => data.json())
        .then(result => res.json(result))
        .catch(err => res.json(err));
    }
    else{
        res.json({message:'empty id', type: 'error'});
    }
});

app.post('/add', (req, res) =>{
    const game = req.body;
    const options = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(game)
    };

    fetch(`http://localhost:4000/api/games`, options)
    .then(data => data.json())
    .then(result => res.json(result))
    .catch(err => res.json(err));
}); 

app.post('/update', (req, res) =>{
    const game = req.body;
    const options = {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(game)
    };

    fetch(`http://localhost:4000/api/games/${gameId}`, options)
    .then(data => data.json())
    .then(result => res.json(result))
    .catch(err => res.json(err));
}); 

app.all('*', (req, res) => res.json('not supported'));

server.listen(port, host, () => console.log(`Server ${host}:${port} running...`));

