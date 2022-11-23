'use strict';

(function(){
    let resultArea;
    let inputField;

    document.addEventListener('DOMContentLoaded', init);

    function init(){
        resultArea = document.getElementById('resultarea');
        inputField = document.getElementById('id');
        document.getElementById('submit')
            .addEventListener('click', send);
    }

    async function send(){
        clearMessageArea(); 
        resultArea.innerHTML = '';
        const id = inputField.value;
        inputField.value = '';

        try {
            const options = {
                method: 'POST',
                body: JSON.stringify({id: id}),
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            const data = await fetch('/getOne', options);
            const resultJson = await data.json();
            updatePage(resultJson);
        } 
        catch (error) {
            updateMessageArea(error.message, 'error'); 
        }
    }

    function updatePage(result){
        if(result){
            if(result.message){
                updateMessageArea(result.message, result.type);
            }
            else{
                updateGame(result);
            }
        }
        else {
            updateMessageArea('Not found', 'error'); 
        }
    }

    function updateGame(game){
        resultArea.innerHTML = `
        <h2>Query result</h2>
        <p><span class="legend"> Number: </span>${game.number}</p>
        <p><span class="legend"> Name: </span>${game.name}</p>
        <p><span class="legend"> Year: </span>${game.year}</p>
        <p><span class="legend"> Rating: </span>${game.rating}</p>
        <p><span class="legend"> Genre: </span>${game.genre}</p>
        `;
    }
})();