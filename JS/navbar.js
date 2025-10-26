// navbar.js - Complete version with all functionality

const navbarAuth = document.querySelector("#authSection");
const userDropdown = document.querySelector("#userDropdown");
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

const backendLink = "https://hospitality-management-system-xdyy.onrender.com"
// const backendLink = "http://localhost:3000"; 

// ========== LOAD NAVBAR BASED ON LOGIN STATUS ==========
async function loadNavbar() {
    try {
        const response = await fetch(`${backendLink}/currentUser`);
        const result = await response.json();
        console.log("Login check result:", result);

        // If backend returns success and user object
        const user = result.user || result;
        if (user && user.username) {
            showUserProfile(user);
        } else {
            showLoginButton();
        }
    } catch (err) {
        console.error("Error fetching login status:", err);
        showLoginButton();
    }
}

// ========== SHOW USER PROFILE DROPDOWN ==========
function showUserProfile(user) {
    // Hide login button
    if (navbarAuth) navbarAuth.style.display = "none";

    // Show user dropdown
    if (userDropdown) userDropdown.style.display = "block";

    // Update dropdown info
    const navUserName = document.getElementById("navUserName");
    const navUserAvatar = document.getElementById("navUserAvatar");

    if (navUserName) {
        const displayName = user.name || user.username || "User";
        navUserName.textContent = displayName.split(" ")[0];
    }

    if (navUserAvatar) {
        const name = user.name || user.username || "U";
        const initials = name
            .split(" ")
            .map(s => s[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();
        navUserAvatar.textContent = initials;
    }

    // ===== ADD CART LINK DYNAMICALLY =====
    const dropdownMenu = userDropdown.querySelector(".dropdown-menu");
    if (dropdownMenu) {
        // Remove existing cart link if any
        const existingCart = dropdownMenu.querySelector(".dropdown-item.cart-link");
        if (existingCart) existingCart.remove();

        // Create new cart link
        const cartLink = document.createElement("a");
        cartLink.href = "./HTML/cart.html";
        cartLink.className = "dropdown-item cart-link";
        cartLink.innerHTML = `<i class="fas fa-shopping-cart"></i> Cart`;
        
        // Insert above the divider
        const divider = dropdownMenu.querySelector(".dropdown-divider");
        if (divider) {
            dropdownMenu.insertBefore(cartLink, divider);
        } else {
            dropdownMenu.appendChild(cartLink);
        }
    }
}

// ========== SHOW LOGIN BUTTON ==========
function showLoginButton() {
    // Show login button
    if (navbarAuth) {
        navbarAuth.style.display = "block";
    }

    // Hide user dropdown
    if (userDropdown) {
        userDropdown.style.display = "none";
    }
}

// ========== LOGOUT FUNCTION ==========
function logout(e) {
    if (e) e.preventDefault();
    
    if (!confirm("Are you sure you want to logout?")) return;

    fetch(`${backendLink}/logout`, { method: "POST" })
        .then(res => res.json())
        .then(data => {
            console.log("Logout successful:", data);
            alert("Logged out successfully!");
            location.reload();
        })
        .catch(err => {
            console.error("Logout error:", err);
            // Still reload on error
            location.reload();
        });
}

// ========== MOBILE MENU TOGGLE ==========
function setupMobileMenu() {
    if (!mobileMenuBtn || !navLinks) return;

    // Remove old event listener by cloning
    const newMobileMenuBtn = mobileMenuBtn.cloneNode(true);
    mobileMenuBtn.parentNode.replaceChild(newMobileMenuBtn, mobileMenuBtn);

    newMobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('active');
        
        const icon = newMobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// ========== MOBILE DROPDOWN TOGGLE ==========
function setupMobileDropdown() {
    if (!userDropdown) return;

    const userProfileNav = userDropdown.querySelector(".user-profile-nav");

    if (userProfileNav) {
        // Remove any existing listeners by cloning
        const newProfileNav = userProfileNav.cloneNode(true);
        userProfileNav.parentNode.replaceChild(newProfileNav, userProfileNav);
        
        // Only add click handler in mobile view
        if (window.innerWidth <= 968) {
            newProfileNav.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                userDropdown.classList.toggle("active");
            });
        }
    }
}

// ========== CLOSE MENU WHEN CLICKING NAV ITEMS ==========
function setupNavItemClicks() {
    const navItems = document.querySelectorAll('.nav-links .here a');
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 968) {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn?.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });
}

// ========== CLOSE MENU WHEN CLICKING OUTSIDE ==========
function setupOutsideClick() {
    document.addEventListener('click', (e) => {
        // Close mobile menu
        if (mobileMenuBtn && navLinks && window.innerWidth <= 968) {
            if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        }

        // Close user dropdown in mobile
        if (userDropdown && window.innerWidth <= 968) {
            const userProfileNav = userDropdown.querySelector('.user-profile-nav');
            if (userProfileNav && !userDropdown.contains(e.target)) {
                userDropdown.classList.remove('active');
            }
        }
    });
}

// ========== HANDLE WINDOW RESIZE ==========
function setupResizeHandler() {
    window.addEventListener('resize', () => {
        // Close mobile menu when resizing to desktop
        if (window.innerWidth > 968) {
            navLinks?.classList.remove('active');
            userDropdown?.classList.remove('active');
            
            const icon = mobileMenuBtn?.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
        
        // Re-setup mobile dropdown
        setupMobileDropdown();
    });
}

// ========== INITIALIZE ON PAGE LOAD ==========
document.addEventListener("DOMContentLoaded", () => {
    // Load user data and setup navbar
    loadNavbar();
    
    // Setup all event handlers
    setupMobileMenu();
    setupMobileDropdown();
    setupNavItemClicks();
    setupOutsideClick();
    setupResizeHandler();

    // Setup logout button
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", logout);
    }
});

// Expose logout globally for inline onclick handlers
window.logout = logout;