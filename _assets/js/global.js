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
  if (evt.target === a || a.contains(evt.target)) {
    console.log('yes');
    alert('yes');
    if (a.classList.contains('w3-show')) {
      console.log(evt.target.classList);
      alert(a.classList);
    }
  }
  else {
    console.log('no');
    alert('no');
  }

});

document.querySelector('.content-wrapper').addEventListener('click', (evt) => {
  console.log(evt.target);
  alert(evt.target);
});
