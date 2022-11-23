'use strict';

const http = require('http');
const path = require('path');
const cors = require('cors');

const express = require('express');
const app = express();


const { host, port} = require(path.join(__dirname, 'configREST.json'));

const Datastorage = require(path.join(__dirname, 'storage', 'dataStorageLayer.js'));

const storage = new Datastorage();

const server = http.createServer(app);

app.use(cors());

app.use(express.json());

app.get('/api/games', (req, res) => {
    storage.getAll().then(result => res.json(result)).catch(err => res.json(err));
});

app.get('/api/games/:number', (req, res) => 
    storage.get(req.params.number).then(result => res.json(result)).catch(err => res.json(err))
);

app.delete('/api/games/:number', (req, res) => 
    storage.remove(req.params.number).then(result => res.json(result)).catch(err => res.json(err))
);

app.post('/api/games/', (req, res) => {
    const game = req.body;
    storage.insert(game)
        .then(status => res.json(status))
        .catch(err => res.json(err));
});

app.put('/api/games/:number', (req, res) => {
    const game = req.body;
    const number = req.params.number;
    storage.update(number, game)
        .then(status => res.json(status))
        .catch(err => res.json(err));
});

app.all('*', (req,res)=> res.json('resource not supporterd'));

server.listen(port, host, () => console.log(`Server ${host}:${port} available`));