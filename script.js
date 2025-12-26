document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu-item');
    const backButton = document.querySelector('.back-button');
    const leftNavButton = document.querySelector('.left-nav-button');
    const rightNavButton = document.querySelector('.right-nav-button');
    const stepText = document.querySelector('.step-text .current');
    const headerTitle = document.getElementById('headerTitle');

    const sections = ['question', 'related-concepts', 'hint', 'verify', 'solution'];
    const titles = ['Help me to Solve', 'Related Concepts', 'Hint', 'Verify Answer', 'Solution'];
    let currentIndex = 0;
    let currentSolutionStep = 1;
    let currentQuestionStep = 0; // Track which question step (0-5) we're on
    const totalSolutionSteps = 5;
    const totalQuestionSteps = 5;

    // Step content data
    const stepData = [
        {
            question: '<b>Solve the quadratic equation: \\( x^2 - 7x + 3 = 0 \\)</b>',
            isOptionsStep: true // This step shows options, not content
        },
        {
            question: '<b>Step 1: Identify the Type of Equation</b>',
            content: '<div class="step-content" style="margin-bottom: 16px;"><p>The given equation is a quadratic equation in the form \\( ax^2 + bx + c = 0 \\), where \\( a = 1 \\), \\( b = -7 \\), and \\( c = 3 \\).</p></div>'
        },
        {
            question: '<b>Step 2: Apply the Quadratic Formula</b>',
            content: '<div class="step-content" style="margin-bottom: 16px;"><p>Use the quadratic formula \\( x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a} \\) to find the roots of the equation. Substitute \\( a = 1 \\), \\( b = -7 \\), and \\( c = 3 \\) into the formula.</p></div>'
        },
        {
            question: '<b>Step 3: Calculate the Discriminant</b>',
            content: '<div class="step-content" style="margin-bottom: 16px;"><p>Compute the discriminant \\( b^2 - 4ac = (-7)^2 - 4 \\times 1 \\times 3 = 49 - 12 = 37 \\).</p></div>'
        },
        {
            question: '<b>Step 4: Solve for the Roots</b>',
            content: '<div class="step-content" style="margin-bottom: 16px;"><p>Substitute the values into the quadratic formula:</p><p style="margin: 16px 0; text-align: center; font-size: 16px;">\\[ x = \\frac{-(-7) \\pm \\sqrt{37}}{2 \\times 1} = \\frac{7 \\pm \\sqrt{37}}{2} \\]</p><p>This gives two solutions: \\( x_1 = \\frac{7 + \\sqrt{37}}{2} \\) and \\( x_2 = \\frac{7 - \\sqrt{37}}{2} \\).</p></div>'
        },
        {
            question: '<b>Step 5: Final Answer</b>',
            content: '<div class="correct-answer"><div class="answer-label">✓ Final Answer</div><div class="answer-text" style="font-size: 18px; text-align: center; margin: 20px 0;">\\[ x_1 = \\frac{7 + \\sqrt{37}}{2}, \\quad x_2 = \\frac{7 - \\sqrt{37}}{2} \\]</div></div><div class="explanation"><div class="explanation-title">Summary:</div><p>We solved the quadratic equation \\( x^2 - 7x + 3 = 0 \\) using the quadratic formula. The discriminant of 37 indicates two distinct real roots. The solutions can be approximated as:</p><ul style="margin-left: 20px; margin-top: 8px;"><li>\\( x_1 \\approx 6.54 \\)</li><li>\\( x_2 \\approx 0.46 \\)</li></ul></div>'
        }
    ];

    // Related concepts for each step
    const relatedConceptsData = [
        [], // Step 0 - no related concepts
        [
            {
                title: 'Quadratic Equations',
                content: 'A quadratic equation is a polynomial equation of degree 2 in the form \\( ax^2 + bx + c = 0 \\), where \\( a \\neq 0 \\). The coefficients \\( a \\), \\( b \\), and \\( c \\) are real numbers.'
            }
        ],
        [
            {
                title: 'Quadratic Formula',
                content: 'The quadratic formula \\( x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a} \\) provides the solutions to any quadratic equation. The ± symbol indicates there are typically two solutions.'
            }
        ],
        [
            {
                title: 'Discriminant',
                content: 'The discriminant \\( \\Delta = b^2 - 4ac \\) determines the nature of roots. If \\( \\Delta > 0 \\), there are two distinct real roots; if \\( \\Delta = 0 \\), one repeated real root; if \\( \\Delta < 0 \\), two complex roots.'
            }
        ],
        [
            {
                title: 'Root Solutions',
                content: 'The two roots represent the x-values where the quadratic function equals zero. These are the solutions to the original equation.'
            }
        ],
        [
            {
                title: 'Approximate Values',
                content: 'The roots can be expressed both in exact form (with radicals) and approximate decimal form. This helps verify solutions and understand their numerical values.'
            }
        ]
    ];

    // Render math equations using KaTeX
    function renderMath() {
        if (typeof renderMathInElement !== 'undefined') {
            renderMathInElement(document.body, {
                delimiters: [
                    {left: '$$', right: '$$', display: true},
                    {left: '\\[', right: '\\]', display: true},
                    {left: '$', right: '$', display: false},
                    {left: '\\(', right: '\\)', display: false}
                ],
                throwOnError: false
            });
        }
    }

    // Update question step
    function updateQuestionStep(stepNum) {
        currentQuestionStep = stepNum;
        const questionText = document.getElementById('step-question');
        const stepOptions = document.getElementById('step-options');
        
        if (questionText && stepData[stepNum]) {
            questionText.innerHTML = stepData[stepNum].question;
            
            // If it's Step 0, show options; otherwise show content
            if (stepData[stepNum].isOptionsStep) {
                // Restore original options for Step 0
                stepOptions.innerHTML = `<div class="option">
                    <div class="radio"></div>
                    <div class="option-text"><b>(A) \\( x = \\frac{7 \\pm \\sqrt{37}}{2} \\)</b></div>
                </div>

                <div class="option">
                    <div class="radio"></div>
                    <div class="option-text"><b>(B) \\( x = \\frac{7 \\pm \\sqrt{25}}{2} \\)</b></div>
                </div>

                <div class="option">
                    <div class="radio"></div>
                    <div class="option-text"><b>(C) \\( x = \\frac{-7 \\pm \\sqrt{49}}{2} \\)</b></div>
                </div>

                <div class="option">
                    <div class="radio"></div>
                    <div class="option-text"><b>(D) \\( x = \\frac{7 \\pm \\sqrt{13}}{2} \\)</b></div>
                </div>`;
                // Re-attach click handlers
                const options = stepOptions.querySelectorAll('.option');
                if (options) {
                    options.forEach(option => {
                        option.addEventListener('click', function() {
                            options.forEach(opt => opt.classList.remove('selected'));
                            this.classList.add('selected');
                        });
                    });
                }
            } else {
                // Show content for Steps 1-5
                stepOptions.innerHTML = stepData[stepNum].content;
            }
        }
        
        renderMath();
    }

    // Show solution step
    function showSolutionStep(stepNumber) {
        // Solution is now a simple single solution, no steps needed
        renderMath();
    }

    // Show related concepts for current step
    function showDynamicRelatedConcepts() {
        const concepts = relatedConceptsData[currentQuestionStep] || [];
        const conceptsContainer = document.getElementById('related-concepts-section');
        
        if (!conceptsContainer) return;
        
        if (concepts.length === 0) {
            conceptsContainer.innerHTML = '<p style="color: #666; padding: 20px; text-align: center;">No related concepts for this step.</p>';
            return;
        }
        
        let html = '';
        concepts.forEach(concept => {
            html += `
                <div class="concept-item">
                    <div class="concept-title">${concept.title}</div>
                    <div class="concept-text">${concept.content}</div>
                </div>
            `;
        });
        
        conceptsContainer.innerHTML = html;
        renderMath();
    }

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
        
        // Update step text based on section
        if (sections[index] === 'solution') {
            if (stepText) stepText.innerHTML = `<b>Solution</b>`;
            showSolutionStep(currentSolutionStep);
        } else if (sections[index] === 'related-concepts') {
            // Show related concepts for the current question step
            showDynamicRelatedConcepts();
            if (stepText) stepText.innerHTML = `<b>Step ${currentQuestionStep}</b>`;
        } else {
            if (stepText) stepText.innerHTML = `<b>Step ${index}</b>`;
        }

        currentIndex = index;
        renderMath();
    }

    menuItems.forEach((item, index) => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            if (sections[index] === 'solution') {
                currentSolutionStep = 1;
            }
            showSection(index);
        });
    });

    const options = document.querySelectorAll('.option');
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
            if (sections[currentIndex] === 'solution') {
                if (currentSolutionStep < totalSolutionSteps) {
                    currentSolutionStep++;
                    showSolutionStep(currentSolutionStep);
                    if (stepText) stepText.innerHTML = `<b>Step ${currentSolutionStep}</b>`;
                } else if (currentIndex < sections.length - 1) {
                    currentIndex++;
                    showSection(currentIndex);
                }
            } else if (sections[currentIndex] === 'question') {
                // Navigate through question steps
                if (currentQuestionStep < totalQuestionSteps) {
                    updateQuestionStep(currentQuestionStep + 1);
                    if (stepText) stepText.innerHTML = `<b>Step ${currentQuestionStep}</b>`;
                } else if (currentIndex < sections.length - 1) {
                    currentIndex++;
                    showSection(currentIndex);
                }
            } else {
                if (currentIndex < sections.length - 1) {
                    showSection(currentIndex + 1);
                }
            }
        });
    }

    if (rightNavButton) {
        rightNavButton.addEventListener('click', function() {
            if (sections[currentIndex] === 'solution') {
                if (currentSolutionStep > 1) {
                    currentSolutionStep--;
                    showSolutionStep(currentSolutionStep);
                    if (stepText) stepText.innerHTML = `<b>Step ${currentSolutionStep}</b>`;
                } else if (currentIndex > 0) {
                    currentIndex--;
                    showSection(currentIndex);
                }
            } else if (sections[currentIndex] === 'question') {
                // Navigate through question steps
                if (currentQuestionStep > 0) {
                    updateQuestionStep(currentQuestionStep - 1);
                    if (stepText) stepText.innerHTML = `<b>Step ${currentQuestionStep}</b>`;
                } else if (currentIndex > 0) {
                    currentIndex--;
                    showSection(currentIndex);
                }
            } else {
                if (currentIndex > 0) {
                    showSection(currentIndex - 1);
                }
            }
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            if (sections[currentIndex] === 'solution' && currentSolutionStep > 1) {
                currentSolutionStep--;
                showSolutionStep(currentSolutionStep);
                if (stepText) stepText.innerHTML = `<b>Step ${currentSolutionStep}</b>`;
            } else if (sections[currentIndex] === 'question' && currentQuestionStep > 0) {
                updateQuestionStep(currentQuestionStep - 1);
                if (stepText) stepText.innerHTML = `<b>Step ${currentQuestionStep}</b>`;
            } else if (currentIndex > 0) {
                showSection(currentIndex - 1);
            }
        } else if (e.key === 'ArrowRight') {
            if (sections[currentIndex] === 'solution' && currentSolutionStep < totalSolutionSteps) {
                currentSolutionStep++;
                showSolutionStep(currentSolutionStep);
                if (stepText) stepText.innerHTML = `<b>Step ${currentSolutionStep}</b>`;
            } else if (sections[currentIndex] === 'question' && currentQuestionStep < totalQuestionSteps) {
                updateQuestionStep(currentQuestionStep + 1);
                if (stepText) stepText.innerHTML = `<b>Step ${currentQuestionStep}</b>`;
            } else if (currentIndex < sections.length - 1) {
                showSection(currentIndex + 1);
            }
        }
    });

    if (backButton) {
        backButton.addEventListener('click', function() {
            window.history.back();
        });
    }

    setTimeout(renderMath, 100);
});

function verifyAnswer() {
    const resultBox = document.getElementById('resultBox');
    if (resultBox) {
        resultBox.classList.add('show');
    }
}
