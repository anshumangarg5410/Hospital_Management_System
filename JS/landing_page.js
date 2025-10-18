// Navbar Mobile Menu Toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links .here a');

// Toggle menu on hamburger click
mobileMenu.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  
  // Animate hamburger icon
  const icon = mobileMenu.querySelector('i');
  if (navLinks.classList.contains('active')) {
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times');
  } else {
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  }
});

// Close menu when clicking on nav items
navItems.forEach(item => {
  item.addEventListener('click', () => {
    navLinks.classList.remove('active');
    const icon = mobileMenu.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navLinks.contains(e.target) && !mobileMenu.contains(e.target)) {
    navLinks.classList.remove('active');
    const icon = mobileMenu.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  }
});

// Close menu on window resize if open
window.addEventListener('resize', () => {
  if (window.innerWidth > 968) {
    navLinks.classList.remove('active');
    const icon = mobileMenu.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  }
});

