const colors = [
    "AliceBlue",
    "AntiqueWhite",
    "Aqua",
    "Aquamarine",
    "Azure",
    "Beige",
    "Bisque",
    "Black",
    "BlanchedAlmond",
    "Blue",
    "BlueViolet",
    "Brown",
    "BurlyWood",
    "CadetBlue",
    "Chartreuse",
    "Chocolate",
    "Coral",
    "CornflowerBlue",
    "Cornsilk",
    "Crimson",
    "Cyan",
    "DarkBlue",
    "DarkCyan",
    "DarkGoldenRod",
    "DarkGray",
    "DarkGrey",
    "DarkGreen",
    "DarkKhaki",
    "DarkMagenta",
    "DarkOliveGreen",
    "DarkOrange",
    "DarkOrchid",
    "DarkRed",
    "DarkSalmon",
    "DarkSeaGreen",
    "DarkSlateBlue",
    "DarkSlateGray",
    "DarkSlateGrey",
    "DarkTurquoise",
    "DarkViolet",
    "DeepPink",
    "DeepSkyBlue",
    "DimGray",
    "DimGrey",
    "DodgerBlue",
    "FireBrick",
    "FloralWhite",
    "ForestGreen",
    "Fuchsia",
    "Gainsboro",
    "GhostWhite",
    "Gold",
    "GoldenRod",
    "Gray",
    "Grey",
    "Green",
    "GreenYellow",
    "HoneyDew",
    "HotPink",
    "IndianRed",
    "Indigo",
    "Ivory",
    "Khaki",
    "Lavender",
    "LavenderBlush",
    "LawnGreen",
    "LemonChiffon",
    "LightBlue",
    "LightCoral",
    "LightCyan",
    "LightGoldenRodYellow",
    "LightGray",
    "LightGrey",
    "LightGreen",
    "LightPink",
    "LightSalmon",
    "LightSeaGreen",
    "LightSkyBlue",
    "LightSlateGray",
    "LightSlateGrey",
    "LightSteelBlue",
    "LightYellow",
    "Lime",
    "LimeGreen",
    "Linen",
    "Magenta",
    "Maroon",
    "MediumAquaMarine",
    "MediumBlue",
    "MediumOrchid",
    "MediumPurple",
    "MediumSeaGreen",
    "MediumSlateBlue",
    "MediumSpringGreen",
    "MediumTurquoise",
    "MediumVioletRed",
    "MidnightBlue",
    "MintCream",
    "MistyRose",
    "Moccasin",
    "NavajoWhite",
    "Navy",
    "OldLace",
    "Olive",
    "OliveDrab",
    "Orange",
    "OrangeRed",
    "Orchid",
    "PaleGoldenRod",
    "PaleGreen",
    "PaleTurquoise",
    "PaleVioletRed",
    "PapayaWhip",
    "PeachPuff",
    "Peru",
    "Pink",
    "Plum",
    "PowderBlue",
    "Purple",
    "RebeccaPurple",
    "Red",
    "RosyBrown",
    "RoyalBlue",
    "SaddleBrown",
    "Salmon",
    "SandyBrown",
    "SeaGreen",
    "SeaShell",
    "Sienna",
    "Silver",
    "SkyBlue",
    "SlateBlue",
    "SlateGray",
    "SlateGrey",
    "Snow",
    "SpringGreen",
    "SteelBlue",
    "Tan",
    "Teal",
    "Thistle",
    "Tomato",
    "Turquoise",
    "Violet",
    "Wheat",
    "White",
    "WhiteSmoke",
    "Yellow",
    "YellowGreen",
];

const container = document.querySelector('.container');
const search = document.getElementById('search');
let keyword = '';
let timeout;

function randomColor() {
    const values = '0123456789ABCDEF';
    let color = '#';
    let rgbColor = 'rgb(';
    for (let i = 0; i < 6; i++) {
        color += values[Math.floor(Math.random() * 16)];
    };
    for (let i = 1; i < 6; i += 2) {
        let decimal = parseInt(color.substring(i, i + 2), 16);
        rgbColor += decimal;
        if (i < 5) {
            rgbColor += ', ';
        };
    };
    rgbColor += ')';
    return {hex: color, rgb: rgbColor};
};

let color = randomColor();

window.onload = () => {
    document.body.style.backgroundColor = color.hex;
    search.focus();
};

let main = document.querySelector('p');
main.addEventListener('click', () => {
    if (main.innerText.startsWith('#') || main.innerText.includes('rgb')) {
        let content = '';
        if (mode === 'hex') {
            navigator.clipboard.writeText(color.hex);
            content = color.hex;
        } else if (mode === 'rgb') {
            navigator.clipboard.writeText(color.rgb);
            content = color.rgb;
        };
        main.innerText = 'Copied color to clipboard!';
        timeout = setTimeout(() => {
            main.innerText = content;
        }, 1800);
    };
});

function isColor(color) {
    if (/^#([0-9A-F]{3}){1,2}$/i.test(color)) return true;
    if (/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/.test(color)) return true;
    return false;
};


const autocomplete = document.getElementById('autocomplete');

let previousColor = color.hex;
search.addEventListener('input', (e) => {
    e.preventDefault();
    const userInput = search.value;
    const result = colors.find(color => color.toLowerCase().startsWith(userInput.toLowerCase()));
    if (result) {
        autocomplete.value = result;
        search.setAttribute('data-autocomplete', result);
        const mainRect = main.getBoundingClientRect();
    } else {
        autocomplete.value = '';
    }

    




    if (search.value.startsWith('#')) {
        search.setAttribute('maxlength', '7');
    } else if (search.value.startsWith('rgb')) {
        search.setAttribute('maxlength', '16');
    };
    if (search.value === '') {
        document.body.style.backgroundColor = previousColor;
        main.innerText = mode === 'hex' ? previousColor : color.rgb;
    } else {
        main.innerText = search.value;
        if (isColor(search.value)) {
            document.body.style.backgroundColor = search.value;
        };
        document.body.style.backgroundColor = au
    };
});

let mode = 'hex';
window.addEventListener('keydown', (e) => {
    if (e.ctrlKey) {
        mode = mode === 'hex' ? 'rgb' : 'hex';
        if (mode === 'hex') {
            main.innerText = color.hex;
            search.placeholder = color.hex;
        } else {
            main.innerText = color.rgb;
            search.placeholder = color.rgb;
        };
    };
    if (e.key === ' ') {
        e.preventDefault();
        clearTimeout(timeout)
        color = randomColor();
        previousColor = color.hex;
        if (mode === 'hex') {
            main.innerText = color.hex;
            search.placeholder = color.hex;
        } else {
            main.innerText = color.rgb;
            search.placeholder = color.rgb;
        };
        document.body.style.backgroundColor = color.hex;
        main.style.userSelect = 'all';
        main.style.cursor = 'text';
        search.focus();
        search.value = '';
    };
    if (e.key === 'Enter') {
        e.preventDefault();
        const result = search.getAttribute('data-autocomplete');
        if (result) {
            search.value = result;
            autocomplete.value = '';
            main.innerText = result;
            document.body.style.backgroundColor = result;
        };
    };
});