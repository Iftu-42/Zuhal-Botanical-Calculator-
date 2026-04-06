const display = document.getElementById('display');
const historyDisplay = document.getElementById('history');
const grid = document.getElementById('btn-grid');
const themeBtn = document.getElementById('theme-toggle');

let currentMode = 'std';
const modes = {
    std: [
        'C', 'DEL', '%', '/', 
        '7', '8', '9', '*', 
        '4', '5', '6', '-', 
        '1', '2', '3', '+', 
        '0', '.', '(', '='
    ],
    sci: [
        'C', 'DEL', 'π', '√',
        'sin', 'cos', 'tan', '^',
        'log', '(', ')', '/',
        '7', '8', '9', '*',
        '4', '5', '6', '-',
        '1', '2', '3', '+',
        '0', '.', '=', '' 
    ]
};
function toggleTheme() {
    const body = document.body;
    if (body.dataset.theme === 'dark') {
        body.dataset.theme = 'light';
        themeBtn.innerText = '✨ Light Mode';
    } else {
        body.dataset.theme = 'dark';
        themeBtn.innerText = '🌙 Dark Mode';
    }
}

function setMode(mode) {
    currentMode = mode;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(`btn-${mode}`).classList.add('active');
    render();
}

function render() {
    grid.innerHTML = '';
    modes[currentMode].forEach(label => {
        const btn = document.createElement('button');
        btn.innerText = label;
        btn.className = 'btn';
        btn.onclick = () => handleInput(label);
        grid.appendChild(btn);
    });
}

function handleInput(val) {
    if (val === 'C') {
        display.innerText = '0';
        historyDisplay.innerText = '';
    } else if (val === 'DEL') {
        display.innerText = display.innerText.length > 1 ? display.innerText.slice(0, -1) : '0';
    } else if (val === '=') {
        try {
            let expr = display.innerText
                .replace(/π/g, 'Math.PI')
                .replace(/√/g, 'Math.sqrt')
                .replace(/\^/g, '**');
            
            ['sin', 'cos', 'tan', 'log'].forEach(f => {
                expr = expr.replace(new RegExp(f, 'g'), `Math.${f}`);
            });

            let result = eval(expr);
            historyDisplay.innerText = display.innerText + " =";
            display.innerText = Number.isInteger(result) ? result : result.toFixed(4);
        } catch {
            display.innerText = "Error";
        }
    } else {
        if (display.innerText === '0' && val !== '.') display.innerText = val;
        else display.innerText += val;
    }
}

// Leaf Particles
setInterval(() => {
    const leaf = document.createElement('div');
    leaf.className = 'leaf';
    leaf.style.left = Math.random() * 100 + 'vw';
    const size = (Math.random() * 15 + 10) + 'px';
    leaf.style.width = size;
    leaf.style.height = size;
    leaf.style.animationDuration = (Math.random() * 5 + 5) + 's';
    document.body.appendChild(leaf);
    setTimeout(() => leaf.remove(), 10000);
}, 1000);

setMode('std');
