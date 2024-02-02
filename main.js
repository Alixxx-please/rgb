import { colors } from './colors.js';

const container = document.getElementsByClassName('container');
const input = document.querySelector('input');

input.addEventListener('input', (e) => {
    console.log(e.value);

    container.style.backgroundColor = colors[e.target.value];
});