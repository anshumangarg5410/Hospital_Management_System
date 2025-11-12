

const navbarAuth = document.querySelector("#authSection");
const userDropdown = document.querySelector("#userDropdown");
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

// const backendLink = "https://hospitality-management-system-xdyy.onrender.com"
const backendLink = "http://localhost:3000"; 


async function loadNavbar() {
    try {
        const response = await fetch(`${backendLink}/currentUser`);
        const result = await response.json();
        console.log("Login check result:", result);


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


function showUserProfile(user) {

    if (navbarAuth) navbarAuth.style.display = "none";


    if (userDropdown) userDropdown.style.display = "block";


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


    const dropdownMenu = userDropdown.querySelector(".dropdown-menu");
    if (dropdownMenu) {

        const existingCart = dropdownMenu.querySelector(".dropdown-item.cart-link");
        if (existingCart) existingCart.remove();


        const cartLink = document.createElement("a");
        cartLink.href = "./HTML/cart.html";
        cartLink.className = "dropdown-item cart-link";
        cartLink.innerHTML = `<i class="fas fa-shopping-cart"></i> Cart`;
        

        const divider = dropdownMenu.querySelector(".dropdown-divider");
        if (divider) {
            dropdownMenu.insertBefore(cartLink, divider);
        } else {
            dropdownMenu.appendChild(cartLink);
        }
    }
}


function showLoginButton() {

    if (navbarAuth) {
        navbarAuth.style.display = "block";
    }


    if (userDropdown) {
        userDropdown.style.display = "none";
    }
}


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

            location.reload();
        });
}

function setupMobileMenu() {
    if (!mobileMenuBtn || !navLinks) return;


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


function setupMobileDropdown() {
    if (!userDropdown) return;

    const userProfileNav = userDropdown.querySelector(".user-profile-nav");

    if (userProfileNav) {

        const newProfileNav = userProfileNav.cloneNode(true);
        userProfileNav.parentNode.replaceChild(newProfileNav, userProfileNav);
        

        if (window.innerWidth <= 968) {
            newProfileNav.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                userDropdown.classList.toggle("active");
            });
        }
    }
}


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


function setupOutsideClick() {
    document.addEventListener('click', (e) => {

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


        if (userDropdown && window.innerWidth <= 968) {
            const userProfileNav = userDropdown.querySelector('.user-profile-nav');
            if (userProfileNav && !userDropdown.contains(e.target)) {
                userDropdown.classList.remove('active');
            }
        }
    });
}


function setupResizeHandler() {
    window.addEventListener('resize', () => {

        if (window.innerWidth > 968) {
            navLinks?.classList.remove('active');
            userDropdown?.classList.remove('active');
            
            const icon = mobileMenuBtn?.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
        

        setupMobileDropdown();
    });
}


document.addEventListener("DOMContentLoaded", () => {

    loadNavbar();
    

    setupMobileMenu();
    setupMobileDropdown();
    setupNavItemClicks();
    setupOutsideClick();
    setupResizeHandler();


    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", logout);
    }
});


window.logout = logout;