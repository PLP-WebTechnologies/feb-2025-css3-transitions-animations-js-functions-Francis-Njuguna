document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('animatedButton');
    const colorSelect = document.getElementById('colorPreference');
    const speedSlider = document.getElementById('animationSpeed');

    // Load saved preferences
    const savedColor = localStorage.getItem('buttonColor') || '#4CAF50';
    const savedSpeed = localStorage.getItem('animationSpeed') || '1';

    // Apply saved preferences
    button.style.backgroundColor = savedColor;
    colorSelect.value = savedColor;
    speedSlider.value = savedSpeed;
    document.documentElement.style.setProperty('--primary-color', savedColor);

    // Apply initial animation speed from localStorage
    const initialSpeed = localStorage.getItem('animationSpeed') || '1';
    document.documentElement.style.setProperty('--animation-duration', `${0.5 / initialSpeed}s`);

    // Handle color preference changes
    colorSelect.addEventListener('change', (e) => {
        const selectedColor = e.target.value;
        button.style.backgroundColor = selectedColor;
        document.documentElement.style.setProperty('--primary-color', selectedColor);
        localStorage.setItem('buttonColor', selectedColor);
    });

    // Handle animation speed changes
    speedSlider.addEventListener('input', (e) => {
        const speed = e.target.value;
        // Update the CSS variable for animation duration
        document.documentElement.style.setProperty('--animation-duration', `${0.5 / speed}s`);
        localStorage.setItem('animationSpeed', speed);
    });

    // Handle button click animation
    button.addEventListener('click', () => {
        button.classList.remove('animate-pulse');
        void button.offsetWidth; // Trigger reflow
        button.classList.add('animate-pulse');
        
        // Remove animation class after it completes
        const speed = speedSlider.value;
        setTimeout(() => {
            button.classList.remove('animate-pulse');
        }, (500 / speed));
    });

    // Add hover effect for button icon
    button.addEventListener('mouseover', () => {
        const icon = button.querySelector('i');
        icon.style.transform = 'rotate(180deg)';
        icon.style.transition = 'transform 0.3s ease';
    });

    button.addEventListener('mouseout', () => {
        const icon = button.querySelector('i');
        icon.style.transform = 'rotate(0deg)';
    });
});