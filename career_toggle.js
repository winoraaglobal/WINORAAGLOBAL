
// Career Section Visibility Toggle
document.addEventListener('DOMContentLoaded', function () {
    const careersLink = document.querySelector('a[href="#careers"]');
    const careersSection = document.getElementById('careers');

    if (careersLink && careersSection) {
        careersLink.addEventListener('click', function (e) {
            e.preventDefault();

            // Show the section
            careersSection.style.display = 'block';

            // Smooth scroll to the section
            const headerOffset = 80;
            const elementPosition = careersSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    }
});
