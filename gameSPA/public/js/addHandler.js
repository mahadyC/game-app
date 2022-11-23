'use strict';

(function(){
    let idField;
    let nameField;
    let yearField;
    let ratingField;
    let genreField;

    document.addEventListener('DOMContentLoaded', init);

    function init(){
        idField = document.getElementById('id');
        nameField = document.getElementById('name');
        yearField = document.getElementById('year');
        ratingField = document.getElementById('rating');
        genreField = document.getElementById('genre');

        document.getElementById('submit')
        .addEventListener('click', send);
    }

    async function send(){
        clearMessageArea();
        if(idField.value.length > 0 && nameField.value.length > 0 && yearField.value.length > 0 && ratingField.value.length > 0 && genreField.value.length > 0){
            const game = {
                number: idField.value,
                name: nameField.value,
                year: yearField.value,
                rating: ratingField.value,
                genre: genreField.value
            };
            idField.value = '';
            nameField.value = '';
            yearField.value = '';
            ratingField.value = '';
            genreField.value = '';
            try {
                const options = {
                    method: 'POST',
                    body: JSON.stringify(game),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
    
                const data = await fetch('/add', options);
                const resultJson = await data.json();
                if(resultJson.message){
                    updateMessageArea(resultJson.message, resultJson.type);
                }
            } 
            catch (error) {
                updateMessageArea(error.message, 'error');
            }
        } else {
            updateMessageArea("Input fields missing data", 'error');
        }

    }

})();