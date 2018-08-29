import {isMobile} from './reusable/helpers';

/* Wait until content is loaded */
document.addEventListener('DOMContentLoaded', main);

function main() {

    if (isMobile.any()) {
        console.log('mobile');
    }
    else {
        console.log('desktop');
    }

}

let a = document.querySelector('.test-container');

document.addEventListener('click', (evt) => {
  if (evt.target === a || a.contains(evt.target)) {
    alert('yes');
    if (a.classList.contains('w3-show')) {
      alert(a.classList);
    }
  }
  else {
    alert('no')
  }

});
