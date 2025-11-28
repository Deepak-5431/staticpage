document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu-item');
    const options = document.querySelectorAll('.option');
    const leftNavButton = document.querySelector('.left-nav-button');
    const rightNavButton = document.querySelector('.right-nav-button');
    const currentStepSpan = document.querySelector('.step-text .current');
    
    let currentStep = 1;
    const maxSteps = 5;

    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            menuItems.forEach(menuItem => {
                menuItem.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    options.forEach(option => {
        option.addEventListener('click', function() {
            options.forEach(opt => {
                opt.classList.remove('selected');
            });

            this.classList.add('selected');
        });
    });

    leftNavButton.addEventListener('click', function() {
        if (currentStep < maxSteps) {
            currentStep++;
            currentStepSpan.innerHTML = `<b>Step ${currentStep}</b>`;
        }
    });

    rightNavButton.addEventListener('click', function() {
        if (currentStep > 1) {
            currentStep--;
            currentStepSpan.innerHTML = `<b>Step ${currentStep}</b>`;
        }
    });

    const backButton = document.querySelector('.back-button');
    backButton.addEventListener('click', function() {
        console.log('Back button ');
    });
});
