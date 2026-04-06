const display = document.getElementById('display');
const historyDisplay = document.getElementById('history');
const grid = document.getElementById('btn-grid');

let currentMode = 'std';
const modes = {
    std: ['C', 'DEL', '%', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '(', '='],
    sci: ['sin', 'cos', 'tan', 'π', '√', '^', 'log', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '0', '(', ')', '=']
};

function toggleTheme() {
    document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
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
        display.innerText = display.innerText.slice(0, -1) || '0';
    } else if (val === '=') {
        try {
            let expr = display.innerText.replace('π', 'Math.PI').replace('√', 'Math.sqrt').replace('^', '**');
            // Advanced solver for sin/cos/tan
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
        if (display.innerText === '0') display.innerText = val;
        else display.innerText += val;
    }
}

// Leaf Animation
setInterval(() => {
    const leaf = document.createElement('div');
    leaf.className = 'leaf';
    leaf.style.left = Math.random() * 100 + 'vw';
    leaf.style.width = leaf.style.height = (Math.random() * 15 + 10) + 'px';
    leaf.style.animationDuration = (Math.random() * 5 + 5) + 's';
    document.getElementById('leaf-container').appendChild(leaf);
    setTimeout(() => leaf.remove(), 10000);
}, 800);

setMode('std');
