document.getElementById('password').addEventListener('input', function() {
    const password = this.value;
    const indicators = document.querySelectorAll('.strength-indicator');
    const message = document.getElementById('password-strength-text');
    const submitButton = document.getElementById('submit-btn');
    let strength = getStrength(password);

    updateIndicators(strength, indicators);
    updateMessage(strength, message);
    submitButton.disabled = strength < 3;
});

document.getElementById('togglePassword').addEventListener('click', function() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.getElementById('eyeIcon');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.src = 'open-eye.png'; 
    } else {
        passwordInput.type = 'password';
        toggleIcon.src = 'close-eye.png'; 
    }
});

function getStrength(password) {
    let strength = 0;
    if (password.length > 5) strength += 1;
    if (password.length > 8) strength += 1;
    if (/[\d]/.test(password) && /[a-zA-Z]/.test(password)) strength += 1;
    if (/[^a-zA-Z\d]/.test(password)) strength += 1;
    return strength;
}

function updateIndicators(strength, indicators) {
    indicators.forEach((indicator, index) => {
        indicator.className = 'strength-indicator bg-gray';
        if (index < strength) {
            const colorClass = ['bg-red', 'bg-yellow', 'bg-green'][index];
            indicator.className = `strength-indicator ${colorClass}`;
        }
    });
}

function updateMessage(strength, message) {
    const messages = [
        '',
        'Your password is weak.',
        'Better, but consider more variety.',
        'Stronger. Add some more special characters?',
        'It\'s a perfect password!'
    ];
    const colors = ['red', 'orange', 'orange', 'green', 'green'];
    message.textContent = messages[strength];
    message.style.color = colors[strength];
}
