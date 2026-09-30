const dropBtn = document.querySelectorAll('.list-link');
const features = document.getElementById('features');
const company = document.getElementById('company');
const nav = document.querySelector('.nav');
const openMenu = document.getElementById('open-menu');
const closeMenu = document.getElementById('close-menu');

const appState = {
  sideBarOpen: false,
  featuresListOpen: false,
  companyListOpen: false
};

function toggleDropdown(btn) {
  const isFeatures = btn.classList.contains('features');
  const key = isFeatures ? 'featuresListOpen' : 'companyListOpen';
  const target = isFeatures ? features : company;
  const icon = btn.querySelector('img');

  appState[key] = !appState[key];
  const isOpen = appState[key];

  target.classList.toggle('open', isOpen);
  if (icon) {
    icon.src = `images/icon-arrow-${isOpen ? 'up' : 'down'}.svg`;
  }
}

function closeDropdown(isFeatures) {
  const key = isFeatures ? 'featuresListOpen' : 'companyListOpen';
  const target = isFeatures ? features : company;
  const btn = document.querySelector(`.list-link.${isFeatures ? 'features' : 'company'}`);
  const icon = btn ? btn.querySelector('img') : null;

  if (appState[key]) {
    appState[key] = false;
    target.classList.remove('open');
    if (icon) icon.src = 'images/icon-arrow-down.svg';
  }
}

openMenu.addEventListener('click', () => {
  appState.sideBarOpen = true;
  nav.classList.add('open');
});

closeMenu.addEventListener('click', () => {
  appState.sideBarOpen = false;
  nav.classList.remove('open');
});

dropBtn.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation(); 
    toggleDropdown(btn);
  });
});

document.addEventListener('click', (e) => {
  const isInsideFeatures = e.target.closest('.dropdown.features');
  const isInsideCompany = e.target.closest('.dropdown.company');

  if (!isInsideFeatures) closeDropdown(true);
  if (!isInsideCompany) closeDropdown(false);

  if (appState.sideBarOpen && e.target === nav) {
    appState.sideBarOpen = false;
    nav.classList.remove('open');
  }
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (appState.sideBarOpen) {
      appState.sideBarOpen = false;
      nav.classList.remove('open');
    }
    closeDropdown(true);
    closeDropdown(false);
  }
});