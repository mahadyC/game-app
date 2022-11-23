'use strict';

(function(){
    
    document.addEventListener('DOMContentLoaded', init);

    async function init(){
        try {
            const data = await fetch('/getAll'); 
            const games = await data.json();

            const resultset = document.getElementById('resultset');
            for(let game of games){
                const tr = document.createElement('tr');
                tr.appendChild(createCell(game.number));
                tr.appendChild(createCell(game.name));
                tr.appendChild(createCell(game.year));
                tr.appendChild(createCell(game.rating));
                tr.appendChild(createCell(game.genre));
                resultset.appendChild(tr);
            }
        } 
        catch (error) {
            document.getElementById('messagearea')
            .innerHTML = `<p class="error">${error.message}</p>`
        }
    } 

    function createCell(data){
        const td = document.createElement('td');
        td.textContent = data;
        return td;
    }
})();