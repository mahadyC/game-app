'use strict';

(function(){
    let inputField;
    
    document.addEventListener('DOMContentLoaded', init);

    function init(){
        inputField = document.getElementById('id');

        document.getElementById('submit')
        .addEventListener('click', send);
    } 

    async function send(){
        clearMessageArea();
        const id = inputField.value;
        inputField.value = '';
        try {
            
            const options = {
                method: 'POST',
                body: JSON.stringify({number: id}),
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const data = await fetch('/remove', options);
            const result = await data.json();
            if(result.message){
                updateMessageArea(result.message, result.type);
            }
        } 
        catch (error) {
            updateMessageArea(error.message, 'error');
        }
    }

})();