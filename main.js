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
        setTimeout(() => {
            main.innerText = content;
        }, 1800);
    };
});

search.addEventListener('input', (e) => {
    e.preventDefault();
    main.innerText = search.value;
});

let mode = 'hex';
window.addEventListener('keydown', (e) => {
    if (e.shiftKey) {
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
        color = randomColor();
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
});