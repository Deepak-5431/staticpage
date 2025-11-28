document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu-item');
    const options = document.querySelectorAll('.option');
    const backButton = document.querySelector('.back-button');
    const leftNavButton = document.querySelector('.left-nav-button');
    const rightNavButton = document.querySelector('.right-nav-button');

    const pages = ['static.html', 'related-concepts.html', 'hint.html', 'verify.html', 'solution.html'];
    const currentPage = window.location.pathname.split('/').pop() || 'static.html';
    const currentIndex = pages.indexOf(currentPage);

    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetPage = this.getAttribute('data-page');
            if (targetPage) {
                window.location.href = targetPage;
            }
        });
    });

    if (options) {
        options.forEach(option => {
            option.addEventListener('click', function() {
                options.forEach(opt => {
                    opt.classList.remove('selected');
                });
                this.classList.add('selected');
            });
        });
    }

    if (leftNavButton) {
        leftNavButton.addEventListener('click', function() {
            if (currentIndex < pages.length - 1) {
                window.location.href = pages[currentIndex + 1];
            }
        });
    }

    if (rightNavButton) {
        rightNavButton.addEventListener('click', function() {
            if (currentIndex > 0) {
                window.location.href = pages[currentIndex - 1];
            }
        });
    }

    if (backButton) {
        backButton.addEventListener('click', function() {
            window.history.back();
        });
    }
});
