const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));

function activateTab(tab) {
  tabs.forEach((item) => {
    const isActive = item === tab;
    item.classList.toggle('is-active', isActive);
    item.setAttribute('aria-selected', String(isActive));
    item.tabIndex = isActive ? 0 : -1;
  });

  panels.forEach((panel) => {
    const isActive = panel.id === tab.getAttribute('aria-controls');
    panel.classList.toggle('is-active', isActive);
    panel.hidden = !isActive;
  });
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateTab(tab));

  tab.addEventListener('keydown', (event) => {
    const keyMap = {
      ArrowLeft: index === 0 ? tabs.length - 1 : index - 1,
      ArrowRight: index === tabs.length - 1 ? 0 : index + 1,
      Home: 0,
      End: tabs.length - 1,
    };

    if (!(event.key in keyMap)) {
      return;
    }

    event.preventDefault();
    const nextTab = tabs[keyMap[event.key]];
    activateTab(nextTab);
    nextTab.focus();
  });
});
