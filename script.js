const display = document.getElementById('display');
const historyDisplay = document.getElementById('history');
const grid = document.getElementById('btn-grid');
const themeBtn = document.getElementById('theme-toggle');

const garden = document.getElementById('dynamic-garden');
const universe = document.getElementById('dynamic-universe');

let currentMode = 'std';
const flowers = ['🌸', '🌼', '🌺', '🍃', '🌿', '🌱'];
const stars = ['⭐', '✨', '🌟', '✦', '✧'];

const modes = {
    std: ['C', 'DEL', '%', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '(', '='],
    sci: ['C', 'DEL', 'π', '√', 'sin', 'cos', 'tan', '^', 'log', '(', ')', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '=', '']
};

function triggerGrowth() {
    const theme = document.body.dataset.theme;
    const container = theme === 'light' ? garden : universe;
    const items = theme === 'light' ? flowers : stars;
    
    const item = document.createElement('div');
    item.className = 'growth-item';
    item.innerText = items[Math.floor(Math.random() * items.length)];
    item.style.left = Math.random() * 95 + 'vw';
    item.style.top = Math.random() * 95 + 'vh';
    item.style.fontSize = (Math.random() * 1 + 1) + 'rem';
    
    if(theme === 'dark') item.style.animationDelay = Math.random() * 3 + 's';

    container.appendChild(item);
    
    // Cleanup if there are too many (keeps site fast)
    if (container.children.length > 100) container.removeChild(container.firstChild);
}

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
        if (label === '') btn.style.visibility = 'hidden';
        btn.onclick = () => handleInput(label);
        grid.appendChild(btn);
    });
}

function handleInput(val) {
    if (val === '') return;
    triggerGrowth(); // This makes the plants grow on every click!

    if (val === 'C') {
        display.innerText = '0';
    } else if (val === 'DEL') {
        display.innerText = display.innerText.length > 1 ? display.innerText.slice(0, -1) : '0';
    } else if (val === '=') {
        try {
            let expr = display.innerText.replace(/π/g, 'Math.PI').replace(/√/g, 'Math.sqrt').replace(/\^/g, '**');
            ['sin', 'cos', 'tan', 'log'].forEach(f => { expr = expr.replace(new RegExp(f, 'g'), `Math.${f}`); });
            display.innerText = eval(expr).toFixed(2).replace(/\.00$/, '');
        } catch { display.innerText = "Error"; }
    } else {
        if (display.innerText === '0' && val !== '.') display.innerText = val;
        else display.innerText += val;
    }
}

setMode('std');
