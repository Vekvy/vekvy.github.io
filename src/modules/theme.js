const html = document.documentElement;
const systemSwitch = document.getElementById('system-theme-switch');
const darkSwitch = document.getElementById('dark-mode-switch');

export const applyTheme = () => {
  if (!systemSwitch || !darkSwitch) return;

  const useSystem = systemSwitch.selected;
  let themeToApply;

  if (useSystem) {
    const systemPrefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    themeToApply = systemPrefersDark ? 'dark' : 'light';
    darkSwitch.disabled = true;
    darkSwitch.selected = systemPrefersDark;
  } else {
    darkSwitch.disabled = false;
    themeToApply = darkSwitch.selected ? 'dark' : 'light';
  }

  html.classList.remove('dark', 'light');
  html.classList.add(themeToApply);
  html.dataset.theme = themeToApply;

  localStorage.setItem('use-system-theme', useSystem);
  localStorage.setItem('theme', darkSwitch.selected ? 'dark' : 'light');
};

export const initTheme = () => {
  const savedUseSystem = localStorage.getItem('use-system-theme') !== 'false';
  const savedTheme = localStorage.getItem('theme') || 'dark';

  if (systemSwitch && darkSwitch) {
    systemSwitch.selected = savedUseSystem;
    darkSwitch.selected = savedTheme === 'dark';
    applyTheme();

    systemSwitch.addEventListener('change', applyTheme);
    darkSwitch.addEventListener('change', applyTheme);
  }

  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', () => {
      if (systemSwitch?.selected) applyTheme();
    });
};
