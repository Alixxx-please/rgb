import { colors } from './colors.js';

const container = document.getElementsByClassName('container');
const search = document.getElementById('search');

search.addEventListener('input', (e) => {
    console.log(e.value);
    container.style.backgroundColor = colors[e.target.value];
});