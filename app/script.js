document.addEventListener('DOMContentLoaded', function() {
    const output = document.getElementById('output');
    let currentInput = '';
    let operator = '';
    let firstValue = '';
    let secondValue = '';

    function updateDisplay(value) {
        output.textContent = value;
    }

    function clearDisplay() {
        currentInput = '';
        operator = '';
        firstValue = '';
        secondValue = '';
        updateDisplay('0');
    }

    function handleNumberClick(value) {
        if (currentInput.replace('.', '').length >= 13) {
            return; // Prevent input if it exceeds 13 digits (excluding the decimal point)
        }
        if (operator && !secondValue) {
            currentInput = value;
            secondValue = value;
        } else {
            currentInput += value;
        }
        updateDisplay(currentInput);
    }

    function handleOperatorClick(op) {
        if (!firstValue && currentInput) {
            firstValue = currentInput;
        } else if (firstValue && secondValue) {
            calculate();
            firstValue = output.textContent;
        }
        operator = op;
        currentInput = '';
    }

    function calculate() {
        if (!firstValue || !operator || !secondValue) return;
        const a = parseFloat(firstValue);
        const b = parseFloat(secondValue);
        let result = 0;
        switch (operator) {
            case 'add':
                result = a + b;
                break;
            case 'subtract':
                result = a - b;
                break;
            case 'multiply':
                result = a * b;
                break;
            case 'divide':
                result = a / b;
                break;
        }
        updateDisplay(result.toString().slice(0, 14)); // Limit display to 13 digits
        firstValue = result.toString().slice(0, 14); // Store only up to 13 digits
        secondValue = '';
        operator = '';
        currentInput = result.toString().slice(0, 14); // Store only up to 13 digits
    }

    function handleBackspace() {
        if (currentInput.length > 0) {
            currentInput = currentInput.slice(0, -1);
            updateDisplay(currentInput || '0');
        }
    }

    document.querySelectorAll('.number').forEach(button => {
        button.addEventListener('click', () => handleNumberClick(button.id));
    });

    document.querySelectorAll('.operator').forEach(button => {
        button.addEventListener('click', () => {
            if (button.id === 'equals') {
                secondValue = currentInput;
                calculate();
            } else {
                handleOperatorClick(button.id);
            }
        });
    });

    document.getElementById('clear').addEventListener('click', clearDisplay);
    document.getElementById('decimal').addEventListener('click', () => handleNumberClick('.'));
    document.getElementById('plus-minus').addEventListener('click', () => {
        if (currentInput) {
            currentInput = (parseFloat(currentInput) * -1).toString();
            updateDisplay(currentInput);
        }
    });
    document.getElementById('percent').addEventListener('click', () => {
        if (currentInput) {
            currentInput = (parseFloat(currentInput) / 100).toString();
            updateDisplay(currentInput);
        }
    });

    function handleKeyPress(event) {
        const key = event.key;
        if (key >= '0' && key <= '9') {
            handleNumberClick(key);
        } else if (key === '.') {
            handleNumberClick('.');
        } else if (key === '+') {
            handleOperatorClick('add');
        } else if (key === '-') {
            handleOperatorClick('subtract');
        } else if (key === '*') {
            handleOperatorClick('multiply');
        } else if (key === '/') {
            handleOperatorClick('divide');
        } else if (key === '=' || key === 'Enter') {
            secondValue = currentInput;
            calculate();
        } else if (key === 'Escape') {
            clearDisplay();
        } else if (key === '%') {
            if (currentInput) {
                currentInput = (parseFloat(currentInput) / 100).toString();
                updateDisplay(currentInput);
            }
        } else if (key === 'Backspace') {
            handleBackspace();
        }
    }

    document.addEventListener('keydown', handleKeyPress);

    clearDisplay();
});
