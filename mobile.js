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

function isColor(color) {
  if (/^#([0-9A-F]{3}){1,2}$/i.test(color)) return true;
  if (/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/.test(color)) return true;
  return false;
};

let header = document.getElementById('header');
let color = randomColor();
const search = document.getElementById('search');
let footer = document.getElementById('footer');
let keyword = '';
let timeout;
let previous = color.hex;
let autocomplete = document.createElement('span');
const delay = 1000;
let mode = 'hex';
let precedent = [];
let index = -1;
let left = document.getElementById('left');
let right = document.getElementById('right');
const main = document.getElementById('main');
let leftDot = document.getElementById('leftDot');
let rightDot = document.getElementById('rightDot');
let timeout2;
header.appendChild(autocomplete);
header.textContent = 'Touch the background'
footer.textContent = 'Hold background to switch format - Press text to copy - Hold text to type - Touch left or right for previous or next color'

header.addEventListener('touchend', (e) => {
  e.stopPropagation();
  if (timeout2 !== null) {
    clearTimeout(timeout2);
    timeout2 = null;
  };

  if (header.firstChild.nodeValue.startsWith('#') || header.firstChild.nodeValue.includes('rgb')) {
    let content = '';
    if (mode === 'hex') {
      navigator.clipboard.writeText(color.hex);
      content = color.hex;
    } else if (mode === 'rgb') {
      navigator.clipboard.writeText(color.rgb);
      content = color.rgb;
    };
    header.firstChild.nodeValue = 'Copied color to clipboard!';
    header.classList.add('pulse');
    timeout = setTimeout(() => {
      header.firstChild.nodeValue = content;
      header.classList.remove('pulse');
    }, 1800);
  };
});


header.addEventListener('touchstart', (e) => {
  e.stopPropagation();
  const result = search.getAttribute('data-autocomplete');
  timeout2 = setTimeout(() => {
    navigator.virtualKeyboard.overlaysContent = true;
    navigator.virtualKeyboard.show();
    const input = search.value;
    const result = colors.find(color => color.toLowerCase().startsWith(input.toLowerCase()));
    if (result && input !== '') {
      autocomplete.innerText = result.substring(input.length);
      search.setAttribute('data-autocomplete', result);
    } else {
      autocomplete.innerText = '';
    };
  
    if (search.value.startsWith('#')) {
      search.setAttribute('maxlength', '7');
    } else if (search.value.startsWith('rgb')) {
      search.setAttribute('maxlength', '16');
    };
  
    if (search.value === '') {
      document.body.style.backgroundColor = previous;
      header.firstChild.nodeValue = mode === 'hex' ? previous : color.rgb;
    } else {
      header.firstChild.nodeValue = search.value;
      if (isColor(search.value)) {
         document.body.style.backgroundColor = search.value;
      };
      for (color of colors) {
        if (color.toLowerCase() === search.value.toLowerCase()) {
          document.body.style.backgroundColor = search.value;
          header.firstChild.nodeValue = search.value;
        };
      };
    };
  }, delay);
});

main.addEventListener('touchend', () => {
  clearTimeout(timeout);
  clearTimeout(timeout2);
  color = randomColor();
  precedent.push(color);
  index = precedent.length - 1;
  previous = color.hex;
  if (mode === 'hex') {
    header.firstChild.nodeValue = color.hex;
    search.placeholder = color.hex;
  } else {
    header.firstChild.nodeValue = color.rgb;
    search.placeholder = color.rgb;
  };
  document.body.style.backgroundColor = color.hex;
  header.style.userSelect = 'all';
  header.style.cursor = 'text';
  search.focus();
  search.value = '';
  autocomplete.innerText = '';
  leftDot.style.display = index > 0 ? 'block' : 'none';
  rightDot.style.display = index < precedent.length - 1 ? 'block' : 'none';
});

main.addEventListener('touchstart', () => {
  timeout2 = setTimeout(() => {
    mode = mode === 'hex' ? 'rgb' : 'hex';
    header.firstChild.nodeValue = mode === 'hex' ? color.hex : color.rgb;
    search.placeholder = mode === 'hex' ? color.hex : color.rgb;
  }, 750);
});

left.addEventListener('touchend', (e) => {
  e.stopPropagation();
  clearTimeout(timeout2);
  if (index > 0) {
    index--;
    color = precedent[index];
    document.body.style.backgroundColor = mode === 'hex' ? color.hex : color.rgb;
    header.firstChild.nodeValue = mode === 'hex' ? color.hex : color.rgb;
  };
  leftDot.style.display = index > 0 ? 'block' : 'none';
  rightDot.style.display = index < precedent.length - 1 ? 'block' : 'none';
});

right.addEventListener('touchend', (e) => {
  e.stopPropagation();
  clearTimeout(timeout2);
  if (index < precedent.length - 1) {
    index++;
    color = precedent[index];
    document.body.style.backgroundColor = mode === 'hex' ? color.hex : color.rgb;
    header.firstChild.nodeValue = mode === 'hex' ? color.hex : color.rgb;
  };
  leftDot.style.display = index > 0 ? 'block' : 'none';
  rightDot.style.display = index < precedent.length - 1 ? 'block' : 'none';
});

// toucher text = copier ; maintenir texte = écrire ; toucher écran = générer couleur ; maintenir écran = changer format