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

document.addEventListener('click', (evt) => {
  let a = document.querySelector('.test-container');
  if (a.classList.contains('w3-show') && (evt.target === a || a.contains(evt.target))) {
    console.log('yes');
    alert(evt.target.classList);
  }
  else {
    console.log('no');
    alert('no');
  }

});
