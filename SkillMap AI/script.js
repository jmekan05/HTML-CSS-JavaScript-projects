document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for the 'Join Waitlist' button
    const waitlistButton = document.querySelector('nav .button');

    waitlistButton.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent the default jump-to-anchor behavior
        
        const targetSection = document.querySelector('#final-cta');
        
        // Scroll smoothly to the target section
        window.scrollTo({
            top: targetSection.offsetTop,
            behavior: 'smooth'
        });
    });
});