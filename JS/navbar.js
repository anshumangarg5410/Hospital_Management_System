// navbar.js - Simplified version (only login or dropdown, no separate portal button)

const navbarAuth = document.querySelector("#authSection");
const userDropdown = document.querySelector("#userDropdown");

const backendLink = "http://localhost:3000"; // change to deployed URL if needed

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
    if (navbarAuth) {
        navbarAuth.style.display = "none";
    }

    // Show user dropdown
    if (userDropdown) {
        userDropdown.style.display = "block";
    }

    // Update dropdown info
    const navUserName = document.getElementById("navUserName");
    const navUserAvatar = document.getElementById("navUserAvatar");

    if (navUserName) {
        const displayName = user.name || user.username || "User";
        navUserName.textContent = displayName.split(" ")[0]; // First name only
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

// ========== MOBILE DROPDOWN TOGGLE ==========
function setupMobileDropdown() {
    if (!userDropdown) return;

    const userProfileNav = userDropdown.querySelector(".user-profile-nav");

    if (userProfileNav && window.innerWidth <= 968) {
        // Remove any existing listeners
        const newProfileNav = userProfileNav.cloneNode(true);
        userProfileNav.parentNode.replaceChild(newProfileNav, userProfileNav);
        
        newProfileNav.addEventListener("click", e => {
            e.preventDefault();
            e.stopPropagation();
            userDropdown.classList.toggle("active");
        });
    }
}

// ========== MOBILE MENU TOGGLE ==========
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', e => {
        if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// ========== INITIALIZE ON PAGE LOAD ==========
document.addEventListener("DOMContentLoaded", () => {
    loadNavbar();
    setupMobileDropdown();

    // Setup logout button
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", logout);
    }

    // Re-setup mobile dropdown on window resize
    window.addEventListener("resize", () => {
        setupMobileDropdown();
    });
});

// Expose logout globally
window.logout = logout;