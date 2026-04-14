export const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                });
            }
        });
    });
};

export const initNavigation = () => {
    const redirectToGithub = () => {
        window.location.href = 'https://github.com/Vekvy/';
    };

    const navElements = ['my-profile', 'to-github-page'];
    navElements.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('click', redirectToGithub);
    });
};

export const removePreload = () => {
    document.body.classList.remove('preload');
};

export const updateDialogTitle = (id, text) => {
    const titleEl = document.getElementById(id);
    if (titleEl) titleEl.innerText = text;
};
