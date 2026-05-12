export const initSmoothScroll = (): void => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e: Event) => {
      e.preventDefault();
      const targetId = (anchor as HTMLAnchorElement).getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
        });
      }
    });
  });
};
export const initNavigation = (): void => {
  const redirectToGithub = (): void => {
    window.location.href = 'https://github.com/Vekvy/';
  };
  const navElements: string[] = ['my-profile', 'to-github-page'];
  navElements.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('click', redirectToGithub);
  });
};
export const removePreload = (): void => {
  document.body.classList.remove('preload');
};
export const updateDialogTitle = (id: string, text: string): void => {
  const titleEl = document.getElementById(id);
  if (titleEl) titleEl.innerText = text;
};
