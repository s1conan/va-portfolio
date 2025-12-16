document.addEventListener('DOMContentLoaded', () => {
    // 1. Interactive Tech Stack Hover
    const techIcons = document.querySelectorAll('.tech-icon');
    const techInfoBox = document.getElementById('tech-info');

    // Define the expertise messages for each tool/category
    const expertise = {
        'Project Management': 'Expert: Efficiently set up boards, manage tasks, and generate client reports.',
        'Communication': 'Advanced: Highly skilled in cross-platform chat etiquette, quick response times, and meeting coordination.',
        'CRM': 'Proficient: Experience with lead management, pipeline cleaning, and basic data entry in major CRMs.',
        'Document Management': 'Expert: File organization, access control, and collaborative document creation.',
        'Design/Marketing': 'Proficient: Creating engaging social media graphics and basic marketing asset design.',
        'Website CMS': 'Familiar: Handling minor text/image updates and managing plugins.',
        'Default': 'Hover over a tool to see my level of expertise!'
    };

    techIcons.forEach(icon => {
        icon.addEventListener('mouseover', () => {
            const toolCategory = icon.getAttribute('data-tool');
            techInfoBox.innerHTML = expertise[toolCategory] || expertise['Default'];
        });

        icon.addEventListener('mouseout', () => {
            // Revert to the default message when the mouse leaves
            techInfoBox.innerHTML = expertise['Default'];
        });
    });

    // 2. Simple Scroll Animation (Optional, for elegance)
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('#navbar ul li a');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a visual class to the section being viewed (CSS styles not included above, but a nice touch)
                entry.target.classList.add('visible');

                // Update active link in navigation
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active');
                    }
                });
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.3 // Trigger when 30% of the section is visible
    });

    sections.forEach(section => {
        observer.observe(section);
    });
});