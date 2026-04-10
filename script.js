/**
 * AESTHETIC GLASS CALCULATOR LOGIC
 * Handles: Standard Math, Scientific Functions, Theme Memory, and Mode Toggling
 */

let currentOperand = '0';
let previousOperand = '';
let operation = null;
let shouldResetScreen = false;

// --- 1. THEME & VISUAL LOGIC ---

/**
 * Changes the background image and accent color based on user selection
 * @param {string} theme - 'yellow', 'pink', 'olive', or 'brown'
 */
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    // Save to localStorage so the theme stays even after refresh
    localStorage.setItem('calc-theme', theme);
}

/**
 * Toggles between Light and Dark glass styles
 */
function toggleMode() {
    const html = document.documentElement;
    const currentMode = html.getAttribute('data-mode');
    const newMode = currentMode === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-mode', newMode);
    document.getElementById('mode-toggle').innerText = newMode === 'light' ? '🌙' : '☀️';
}

// --- 2. INPUT HANDLING ---

function appendNumber(number) {
    if (currentOperand === '0' || shouldResetScreen) {
        currentOperand = number;
        shouldResetScreen = false;
    } else {
        // Prevent multiple decimals
        if (number === '.' && currentOperand.includes('.')) return;
        currentOperand += number;
    }
    updateDisplay();
}

function clearDisplay() {
    currentOperand = '0';
    previousOperand = '';
    operation = null;
    updateDisplay();
}

function deleteNumber() {
    if (currentOperand === '0') return;
    currentOperand = currentOperand.toString().slice(0, -1);
    if (currentOperand === '') currentOperand = '0';
    updateDisplay();
}

// --- 3. CALCULATION ENGINE ---

function chooseOperator(op) {
    if (operation !== null) compute();
    operation = op;
    previousOperand = currentOperand;
    shouldResetScreen = true;
    updateDisplay();
}

function compute() {
    let result;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+': result = prev + current; break;
        case '-': result = prev - current; break;
        case '*': result = prev * current; break;
        case '/': 
            if (current === 0) {
                alert("Cannot divide by zero");
                clearDisplay();
                return;
            }
            result = prev / current; 
            break;
        case '%': result = prev % current; break;
        default: return;
    }

    currentOperand = roundResult(result).toString();
    operation = null;
    previousOperand = '';
    shouldResetScreen = true;
    updateDisplay();
}

// --- 4. SCIENTIFIC FUNCTIONS ---

function appendSci(func) {
    const current = parseFloat(currentOperand);
    if (isNaN(current)) return;

    let result;
    switch (func) {
        case 'sin': result = Math.sin(current * Math.PI / 180); break; // Degree conversion
        case 'cos': result = Math.cos(current * Math.PI / 180); break; // Degree conversion
        case 'tan': result = Math.tan(current * Math.PI / 180); break; // Degree conversion
        case 'log': 
            if (current <= 0) {
                alert("Invalid Input for Log");
                return;
            }
            result = Math.log10(current); 
            break;
        default: return;
    }
    
    currentOperand = roundResult(result).toString();
    shouldResetScreen = true;
    updateDisplay();
}

// Helper to keep the display clean (prevents long floating point errors)
function roundResult(number) {
    return Math.round(number * 100000000) / 100000000;
}

// --- 5. UI UPDATE ---

function updateDisplay() {
    const currentDisplay = document.getElementById('current-operand');
    const previousDisplay = document.getElementById('previous-operand');

    currentDisplay.innerText = currentOperand;
    
    if (operation != null) {
        // Show the equation in the small top text
        previousDisplay.innerText = `${previousOperand} ${operation}`;
    } else {
        previousDisplay.innerText = '';
    }
}

// --- 6. INITIALIZATION ---

// When the page loads, set the saved theme or default to olive
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('calc-theme') || 'olive';
    setTheme(savedTheme);
});
