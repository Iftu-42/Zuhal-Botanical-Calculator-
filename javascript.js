const display = document.getElementById('display');
const themeBtn = document.getElementById('theme-toggle');

// Theme Toggle Logic
themeBtn.addEventListener('click', () => {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        body.removeAttribute('data-theme');
    } else {
        body.setAttribute('data-theme', 'dark');
    }
});

// Calculator Logic
function appendValue(input) {
    if (display.innerText === '0' || display.innerText === 'Error') {
        display.innerText = input;
    } else {
        display.innerText += input;
    }
}

function clearDisplay() {
    display.innerText = '0';
}

function deleteLast() {
    display.innerText = display.innerText.slice(0, -1) || '0';
}

function calculate() {
    try {
        // eval is okay for a simple client-side project
        display.innerText = eval(display.innerText);
    } catch (error) {
        display.innerText = 'Error';
    }
}
