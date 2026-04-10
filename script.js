const output = document.getElementById('output');
const history = document.getElementById('prev-action');
const modeBtn = document.getElementById('mode-toggle');
const html = document.documentElement;

function append(value) {
    if (output.innerText === '0' && value !== '.') {
        output.innerText = value;
    } else {
        output.innerText += value;
    }
}

function allClear() {
    output.innerText = '0';
    history.innerText = '';
}

function compute() {
    try {
        let expression = output.innerText.replace('×', '*').replace('÷', '/');
        // Handle square root closing bracket automatically
        if (expression.includes('Math.sqrt(') && !expression.endsWith(')')) {
            expression += ')';
        }
        
        history.innerText = output.innerText;
        output.innerText = eval(expression);
    } catch (e) {
        output.innerText = "Error";
        setTimeout(allClear, 1500);
    }
}

function setTheme(theme) {
    html.setAttribute('data-theme', theme);
}

modeBtn.addEventListener('click', () => {
    const isLight = html.getAttribute('data-mode') === 'light';
    html.setAttribute('data-mode', isLight ? 'dark' : 'light');
    modeBtn.innerText = isLight ? '☀️' : '🌙';
});
