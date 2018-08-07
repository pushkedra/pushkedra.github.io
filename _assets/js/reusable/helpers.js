/* XMLHttpRequest promisified*/
export let request = obj => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(obj.method || "GET", obj.url);
        if(obj.spinner){
            obj.spinner.style.display = 'block';
        }
        if (obj.headers) {
            Object.keys(obj.headers).forEach(key => {
                xhr.setRequestHeader(key, obj.headers[key]);
            });
        }
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.response);
                if(obj.spinner){
                    obj.spinner.style.display = 'none';
                }
            } else {
                reject(xhr.statusText);
            }
        };
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send(obj.body);
    });
};

export function urlencodeFormData(fd) {
    let s = '';
    function encode(s) {
        return encodeURIComponent(s).replace(/%20/g, '+');
    }
    for (let pair of fd.entries()) {
        if (typeof pair[1] === 'string') {
            s += (s ? '&' : '') + encode(pair[0]) + '=' + encode(pair[1]);
        }
    }
    return s;
}

export let isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    // chromeOnIos: function () {
    //     return navigator.userAgent.match('CriOS');
    // },
    // safariOnIos: function () {
    //     return /iP(ad|hone|od).+Version\/[\d\.]+.*Safari/i.test(navigator.userAgent);
    // },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

/*Unique id*/
export function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export function openForm(formElement, classManipulate){
    formElement.classList.add(classManipulate)
}

export function closeForm(formElement, classManipulate){
    formElement.classList.remove(classManipulate)
}

export function checkEnterKeyPressed(evt){
    return (evt.keyCode ? evt.keyCode : evt.which) === 13
}

export let debounce = (fn, time) => {
    let timeout;

    return function() {
        const functionCall = () => fn(...arguments);

        clearTimeout(timeout);
        timeout = setTimeout(functionCall, time);
    }
}

export function getClosest(elem, selector) {
    for (; elem && elem !== document; elem = elem.parentNode) {
        if (elem.matches(selector)) return elem
    }
    return null
}

export function createTag(type, ...args) {
    if (type === 'option') {
        return `<option value="${args[0]}" >${args[1]}</option>`
    }
    else if (type === 'hidden_input') {
        return `<input type="hidden" name="${args[0]}" value="${args[1]}"/>`
    }
    else {
        return ''
    }
}

export function contextSearch(searchData, searchQuery) {

    if (!Boolean(searchQuery)) return [];

    function isEnglishChar(letter) {
        return letter && ((letter.charCodeAt(0) < 123 && letter.charCodeAt(0) > 96) || (letter.charCodeAt(0) < 91 && letter.charCodeAt(0) > 64))
    }

    let query = searchQuery.toLowerCase();
    let results = searchData.filter((obj) => obj.newSearch.some((elem) => {

        let indexFirst = elem.toLowerCase().indexOf(query);

        if (indexFirst > -1) {
            return !(indexFirst > 0 && isEnglishChar(elem[indexFirst]) && isEnglishChar(elem[indexFirst - 1]))
        }
        else {
            return false
        }

    }));

    results.map((result) => {
        result.occurrences = (result.title.toLowerCase().includes(query)) ? 4 : 0;
        result.occurrences += (result.description.toLowerCase().includes(query)) ? 2 : 0;
        result.h2.map((item) => {result.occurrences += (item.toLowerCase().includes(query)) ? 1 : 0});
        result.h3.map((item) => {result.occurrences += (item.toLowerCase().includes(query)) ? 1 : 0});
    });

    results.sort(function (a, b) {
        if (a.priority < b.priority) {
            return 1;
        }
        else if (a.priority > b.priority) {
            return -1;
        }
        else {
            if (a.occurrences < b.occurrences) {
                return 1;
            }
            else if (a.occurrences > b.occurrences) {
                return -1;
            }
            else {
                return 0;
            }
        }
    });
    return results
}