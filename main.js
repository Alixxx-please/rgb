import { colors } from './colors.js';

const container = document.getElementsByClassName('container');
const input = document.querySelector('input');

input.addEventListener('input', (e) => {
    container.style.backgroundColor = colors[e.target.value];
});