'use strict';

const toArrayInsert = (game) => [
    +game.number, game.name, +game.year, game.rating, game.genre
];

const toArrayUpdate = (game) => [
    game.name, +game.year, game.rating, game.genre, +game.number
];


module.exports = { toArrayInsert, toArrayUpdate}