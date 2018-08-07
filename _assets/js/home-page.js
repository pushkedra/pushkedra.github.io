document.addEventListener('DOMContentLoaded', initListeners);

function initListeners() {

    for (let item of [...document.querySelectorAll('div')]) {
        console.log(item);
    }

}