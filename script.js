document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu-item');
    const options = document.querySelectorAll('.option');
    const backButton = document.querySelector('.back-button');
    const leftNavButton = document.querySelector('.left-nav-button');
    const rightNavButton = document.querySelector('.right-nav-button');
    const stepText = document.querySelector('.step-text .current');
    const headerTitle = document.getElementById('headerTitle');

    const sections = ['question', 'related-concepts', 'hint', 'verify', 'solution'];
    const titles = ['Help me to Solve', 'Related Concepts', 'Hint', 'Verify Answer', 'Solution'];
    const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5'];
    let currentIndex = 0;

    function showSection(index) {
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });

        const targetSection = document.getElementById(sections[index] + '-section');
        if (targetSection) {
            targetSection.classList.add('active');
        }

        menuItems.forEach(item => item.classList.remove('active'));
        if (menuItems[index]) {
            menuItems[index].classList.add('active');
        }

        if (headerTitle) headerTitle.textContent = titles[index];
        if (stepText) stepText.innerHTML = `<b>${steps[index]}</b>`;

        currentIndex = index;
    }

    menuItems.forEach((item, index) => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            showSection(index);
        });
    });

    if (options) {
        options.forEach(option => {
            option.addEventListener('click', function() {
                options.forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
            });
        });
    }

    if (leftNavButton) {
        leftNavButton.addEventListener('click', function() {
            if (currentIndex < sections.length - 1) {
                showSection(currentIndex + 1);
            }
        });
    }

    if (rightNavButton) {
        rightNavButton.addEventListener('click', function() {
            if (currentIndex > 0) {
                showSection(currentIndex - 1);
            }
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            showSection(currentIndex - 1);
        } else if (e.key === 'ArrowRight' && currentIndex < sections.length - 1) {
            showSection(currentIndex + 1);
        }
    });

    if (backButton) {
        backButton.addEventListener('click', function() {
            window.history.back();
        });
    }
});

function verifyAnswer() {
    const resultBox = document.getElementById('resultBox');
    if (resultBox) {
        resultBox.classList.add('show');
    }
}
