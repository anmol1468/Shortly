document.addEventListener('scroll', () => {
    let nav = document.querySelector('.navigation');

    if (window.pageYOffset >= 40) {
        document.querySelector('.navigation').classList.add('navigation--active')
    } else if (window.pageYOffset < 40) {
        document.querySelector('.navigation').classList.remove('navigation--active')
    }
});


///////// code for copying the link to clipboard



document.addEventListener('click', (event) => {
    if (event.target.classList.contains('copy')) {

        /// code to change color and text of button when clicked
        event.target.textContent = 'Copied!';
        event.target.style.backgroundColor = '#000';
        event.target.style.color = '#fff';

        //// code to set the previously clicked buttons to default
        let currentEl = event.target.parentNode.parentNode;
        let nextSibling = currentEl.nextElementSibling;

        while (nextSibling && nextSibling.classList.contains('link')) {
            let button = nextSibling.querySelector('button');
            button.textContent = 'Copy';
            button.style.backgroundColor = '#2acfcf';
            button.style.color = '#fff';

            nextSibling = nextSibling.nextElementSibling;
        }

        let previousSibling = currentEl.previousElementSibling;

        while (previousSibling && previousSibling.classList.contains('link')) {
            let button = previousSibling.querySelector('button');
            button.textContent = 'Copy';
            button.style.backgroundColor = '#2acfcf';
            button.style.color = '#fff';

            previousSibling = previousSibling.previousElementSibling;
        }


        //// code to copy the text to clipboard
        let text = event.target.parentNode.querySelector('input');
        text.select();
        document.execCommand("copy");
    }
});


/// code for shortning the link


async function getData(url) {
    const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);
    const data = await response.json()

    return data.result
}



async function createNewLi(url) {

    alert('Please wait for a while(this might about 30 seconds) we shorten your link')

    const result = await getData(url);

    const { original_link: original, short_link: shortLink } = result;


    const linkDiv = document.createElement('div');
    linkDiv.classList.add("link", "align-center");

    const inputDiv = document.createElement('div');
    inputDiv.classList.add("link__input");
    inputDiv.innerText = `${original}`;

    const outputDiv = document.createElement('div');
    outputDiv.classList.add("link__output");

    const input = document.createElement('input');
    input.setAttribute("type", "text");
    input.setAttribute("value", `${shortLink}`);

    const button = document.createElement('button');
    button.classList.add("btn", "btn--primary", "btn--boxy", "copy");
    button.textContent = 'Copy'

    outputDiv.appendChild(input);
    outputDiv.appendChild(button);

    linkDiv.appendChild(inputDiv);
    linkDiv.appendChild(outputDiv);

    document.querySelector(".link-tool").appendChild(linkDiv)
}


document.querySelector('#shorten').addEventListener('click', () => {
    if (document.querySelector('.shorten__input').checkValidity()) {
        let url = document.querySelector('.shorten__input').value;
        createNewLi(url)
    } else {
        alert('Please give a valid input (for eg - https://facebook.com)');
    }
})

document.querySelector('.shorten__input').addEventListener('keyup', (event) => {
    console.log(event);
    if (event.code === "Enter") {
        if (document.querySelector('.shorten__input').checkValidity()) {
            let url = document.querySelector('.shorten__input').value;
            createNewLi(url)
        } else {
            alert('Please give a valid input (for eg - https://facebook.com)');
        }

        document.querySelector('.shorten__input').value = '';
    }
})


//////// code for the hamburger menu

document.querySelector('.fa-bars').addEventListener('click', () => {
    document.querySelector('.navigation-ham').classList.toggle('nav-ham-on');
    document.querySelector('.fa-bars').classList.toggle('fas-active');
})