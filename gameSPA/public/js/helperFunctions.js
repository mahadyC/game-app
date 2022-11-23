'use strict';

function updateMessageArea(message, type){
    const messagearea = document.getElementById('messagearea');
    messagearea.textContent = message;
    messagearea.setAttribute('class', type);
}

function clearMessageArea(){
    const messagearea = document.getElementById('messagearea');
    messagearea.textContent = '';
    messagearea.removeAttribute('class');
}
