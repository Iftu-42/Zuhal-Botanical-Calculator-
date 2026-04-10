const html = document.documentElement;
const output = document.getElementById('output');

function toggleSection(type) {
    html.setAttribute('data-section', type);
    document.getElementById('btn-std').classList.toggle('active', type === 'std');
    document.getElementById('btn-sci').classList.toggle('active', type === 'sci');
}

function setTheme(theme) {
    html.setAttribute('data-theme', theme);
}

function append(val) {
    if (output.innerText === '0' && val !== '.') {
        output.innerText = val;
    } else {
        output.innerText += val;
    }
}

function allClear() { output.innerText = '0'; }

function backspace() {
    output.innerText = output.innerText.slice(0, -1) || '0';
}

function compute() {
    try {
        let expression = output.innerText.replace('÷', '/').replace('×', '*');
        // Simple auto-close for square root
        if (expression.includes('Math.sqrt(') && !expression.endsWith(')')) {
            expression += ')';
        }
        let result = eval(expression);
        output.innerText = Number.isInteger(result) ? result : result.toFixed(3);
    } catch {
        output.innerText = "Error";
        setTimeout(allClear, 1000);
    }
}

document.getElementById('mode-toggle').addEventListener('click', function() {
    const isLight = html.getAttribute('data-mode') === 'light';
    const newMode = isLight ? 'dark' : 'light';
    html.setAttribute('data-mode', newMode);
    this.innerText = isLight ? '🌙 Dark Mode' : '✨ Light Mode';
});
