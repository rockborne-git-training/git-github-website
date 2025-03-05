document.addEventListener('DOMContentLoaded', function() {
    // Navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Sidebar navigation highlighting
    function highlightCurrentLesson() {
        const navItems = document.querySelectorAll('.exercise-nav li a'); // Select <a> inside <li>
        const currentPage = window.location.pathname.split('/').pop(); // Get current page filename
        
        // Remove 'active' from all items
        navItems.forEach(item => item.parentElement.classList.remove('active'));

        // Find and activate the matching link
        navItems.forEach(item => {
            if (item.getAttribute('href') === currentPage) {
                item.parentElement.classList.add('active');
            }
        });
    }

    // Call the function on page load to highlight the current page
    highlightCurrentLesson();

    // Exercise page-specific code for navigating steps
    const exerciseContent = document.querySelector('.exercise-content');
    if (exerciseContent) {
        const steps = Array.from(document.querySelectorAll('.step-number'));
        // const dots = Array.from(document.querySelectorAll('.dot'));
        // const prevBtn = document.querySelector('.nav-arrow.prev');
        // const nextBtn = document.querySelector('.nav-arrow.next');
        const navItems = document.querySelectorAll('.exercise-nav li');
        const progressBar = document.querySelector('.progress-bar');
        const progressText = document.querySelector('.progress-text');
        const index = Number(window.location.pathname.split('/').pop().split(".")[1]) - 1; // Get current page filename
        console.log(index);
        // let currentStep = 0;

        // Update progress bar
        function updateProgress(index) {
            const progress = ((index + 1) / steps.length) * 100;
            progressBar.style.width = `${progress}%`;
            progressText.textContent = `${index + 1}/${steps.length} Steps`;
        }

        // Update active step
        function updateStep(index) {
            steps.forEach(step => step.classList.remove('active'));
            // dots.forEach(dot => dot.classList.remove('active'));
            navItems.forEach(item => item.classList.remove('active'));
            
            steps[index].classList.add('active');
            // dots[index].classList.add('active');
            navItems[index].classList.add('active');
            
            // prevBtn.disabled = index === 0;
            // nextBtn.disabled = index === steps.length - 1;
            
            // currentStep = index;
            updateProgress(index);
        }

        // Navigation click handlers for steps (no page switching here)
        // prevBtn.addEventListener('click', () => {
        //     if (currentStep > 0) {
        //         updateStep(currentStep - 1);
        //     }
        // });

        // nextBtn.addEventListener('click', () => {
        //     if (currentStep < steps.length - 1) {
        //         updateStep(currentStep + 1);
        //     }
        // });

        // Sidebar navigation for steps (no page switching here)
        // navItems.forEach((item, index) => {
        //     item.addEventListener('click', (e) => {
        //         // e.preventDefault();  // Prevent page switch only for step navigation
        //         updateStep(index);
        //     });
        // });

        // Dots navigation for steps
        // dots.forEach((dot, index) => {
        //     dot.addEventListener('click', () => {
        //         updateStep(index);
        //     });
        // });

        // Copy button functionality
        const copyButtons = document.querySelectorAll('.copy-btn');
        copyButtons.forEach(button => {
            button.addEventListener('click', () => {
                const command = button.previousElementSibling.textContent;
                navigator.clipboard.writeText(command);
                const originalText = button.textContent;
                button.textContent = 'Copied!';
                setTimeout(() => {
                    button.textContent = originalText;
                }, 2000);
            });
        });

        // Initialize page step
        updateStep(index);
    }
});
