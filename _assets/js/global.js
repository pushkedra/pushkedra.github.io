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
