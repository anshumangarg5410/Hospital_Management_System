const navbarAuth = document.querySelector("#authSection");
const userDropdown = document.querySelector("#userDropdown");
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

// const backendLink = "https://hospitality-management-system-xdyy.onrender.com";
const backendLink = "http://localhost:3000"; 


async function loadNavbar() {
    try {
        const response = await fetch(`${backendLink}/currentUser`);
        const result = await response.json();
        console.log("Login check result:", result);

        const user = result.user || result;
        if (user && user.username) {
            localStorage.setItem("hms_user", JSON.stringify(user));
            showUserProfile(user);
        } else {
            localStorage.removeItem("hms_user");
            showLoginButton();
        }
    } catch (err) {
        console.error("Error fetching login status:", err);
        localStorage.removeItem("hms_user");
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
    if (navbarAuth) navbarAuth.style.display = "block";
    if (userDropdown) userDropdown.style.display = "none";
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

    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
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
}


function setupMobileDropdown() {
    if (!userDropdown) return;

    const userProfileNav = userDropdown.querySelector(".user-profile-nav");
    if (!userProfileNav) return;

    if (window.innerWidth <= 968) {
        userProfileNav.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            userDropdown.classList.toggle("active");
        });
    }
}


function setupNavItemClicks() {
    const navItems = document.querySelectorAll('.nav-links .here a');
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 968) {
                navLinks?.classList.remove('active');
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

function initializeSearch() {
    const searchInput = document.querySelector(".search-input");
    const searchContainer = document.querySelector(".search-container");
    

    if (!searchInput || !searchContainer) return;


    const clearBtn = document.createElement('button');
    clearBtn.className = 'clear-search-btn';
    clearBtn.innerHTML = '<i class="fas fa-times"></i>';
    clearBtn.setAttribute('aria-label', 'Clear search');
    
    const searchWrapper = searchContainer.querySelector('.search-wrapper');
    if (searchWrapper) {
        searchWrapper.appendChild(clearBtn);
    }


    const suggestionsContainer = document.createElement('div');
    suggestionsContainer.className = 'suggestions-container';
    searchContainer.appendChild(suggestionsContainer);

    let selectedIndex = -1;
    let searchData = [];


    async function loadSearchData() {
        try {
            const response = await fetch(`${backendLink}/searchItems`);
            const data = await response.json();
            if (data.success) {
                searchData = data.searchItems;
                console.log("Search data loaded:", searchData.length, "items");
            }
        } catch (err) {
            console.error("Error fetching search data:", err);
        }
    }


    searchInput.addEventListener('input', () => {
        if (searchInput.value.trim()) {
            clearBtn.classList.add('show');
            updateSuggestions(searchInput.value.trim());
        } else {
            clearBtn.classList.remove('show');
            clearSuggestions();
        }
    });


    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        clearBtn.classList.remove('show');
        clearSuggestions();
        searchInput.focus();
    });

    function clearSuggestions() {
        suggestionsContainer.innerHTML = '';
        suggestionsContainer.classList.remove('show');
        selectedIndex = -1;
    }

    function updateSuggestions(query) {
        const lowerQuery = query.toLowerCase();
        const matches = searchData.filter(item => 
            item.keyword.toLowerCase().includes(lowerQuery) ||
            (item.description && item.description.toLowerCase().includes(lowerQuery))
        );

        if (matches.length === 0) {
            showNoResults(query);
            return;
        }

        let html = '<div class="suggestions-header">Suggested Results</div>';
        
        matches.forEach((item, index) => {
            const icon = item.icon || 'fa-search';
            const category = item.category || 'General';
            const description = item.description || '';
            
            html += `
                <div class="suggestion-item" data-index="${index}" data-link="${item.link}">
                    <div class="suggestion-icon">
                        <i class="fas ${icon}"></i>
                    </div>
                    <div class="suggestion-content">
                        <div class="suggestion-title">
                            ${item.keyword}
                            <span class="suggestion-category">${category}</span>
                        </div>
                        ${description ? `<div class="suggestion-description">${description}</div>` : ''}
                    </div>
                    <i class="fas fa-arrow-right suggestion-arrow"></i>
                </div>
            `;
        });

        suggestionsContainer.innerHTML = html;
        suggestionsContainer.classList.add('show');
        selectedIndex = -1;


        document.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', () => {
                const link = item.getAttribute('data-link');
                window.location.href = link;
            });
        });
    }

    function showNoResults(query) {
        suggestionsContainer.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <p>No results found for "${query}"</p>
            </div>
        `;
        suggestionsContainer.classList.add('show');
    }


    searchInput.addEventListener('keydown', (e) => {
        const items = document.querySelectorAll('.suggestion-item');
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
            updateSelection(items);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedIndex = Math.max(selectedIndex - 1, -1);
            updateSelection(items);
        } else if (e.key === 'Enter') {
            if (selectedIndex >= 0 && items.length > 0) {
                e.preventDefault();
                items[selectedIndex].click();
            } else if (items.length > 0) {
                e.preventDefault();
                items[0].click();
            }
        } else if (e.key === 'Escape') {
            clearSuggestions();
            searchInput.blur();
        }
    });

    function updateSelection(items) {
        items.forEach((item, index) => {
            if (index === selectedIndex) {
                item.style.background = 'linear-gradient(90deg, rgba(102, 126, 234, 0.12), transparent)';
                item.style.borderLeftColor = '#667eea';
                item.style.paddingLeft = '24px';
                item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            } else {
                item.style.background = '';
                item.style.borderLeftColor = 'transparent';
                item.style.paddingLeft = '20px';
            }
        });
    }


    document.addEventListener('click', (e) => {
        if (!searchContainer.contains(e.target)) {
            clearSuggestions();
        }
    });


    searchInput.addEventListener('focus', () => {
        if (searchInput.value.trim()) {
            updateSuggestions(searchInput.value.trim());
        }
    });


    loadSearchData();
}

function setupProtectedLinks() {
    const prescLink = document.getElementById("orderPrescriptionLink");
    const recordsLink = document.getElementById("myRecordsLink");

    const checkIsLoggedIn = () => {
        try {
            const saved = localStorage.getItem("hms_user");
            if (saved) {
                const parsed = JSON.parse(saved);
                return !!(parsed && (parsed.username || parsed.email));
            }
        } catch(e) {}
        return false;
    };

    if (prescLink) {
        prescLink.addEventListener("click", (e) => {
            if (!checkIsLoggedIn()) {
                e.preventDefault();
                sessionStorage.setItem("hms_auth_notice", "login_required_prescription");
                sessionStorage.setItem("hms_redirect", "order_prescription.html");
                window.location.href = "./HTML/patient_login_page.html?redirect=order_prescription.html&msg=login_required_prescription";
            }
        });
    }

    if (recordsLink) {
        recordsLink.addEventListener("click", (e) => {
            if (!checkIsLoggedIn()) {
                e.preventDefault();
                sessionStorage.setItem("hms_auth_notice", "login_required_records");
                sessionStorage.setItem("hms_redirect", "user_portal.html?tab=reports");
                window.location.href = "./HTML/patient_login_page.html?redirect=user_portal.html%3Ftab%3Dreports&msg=login_required_records";
            }
        });
    }
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

    initializeSearch();
    setupProtectedLinks();
});

window.logout = logout;