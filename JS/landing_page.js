const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links'); // FIXED: Uncommented this line
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

// Handle user dropdown in mobile view
const userDropdown = document.getElementById('userDropdown');
if (userDropdown) {
  const userProfileNav = userDropdown.querySelector('.user-profile-nav');
  
  userProfileNav?.addEventListener('click', (e) => {
    e.stopPropagation();
    userDropdown.classList.toggle('active');
  });
}

// ====== ENHANCED SEARCH FUNCTIONALITY ======
document.addEventListener("DOMContentLoaded", async () => {
  const searchInput = document.querySelector(".search-input");
  const searchContainer = document.querySelector(".search-container");

  // Create clear button
  const clearBtn = document.createElement('button');
  clearBtn.className = 'clear-search-btn';
  clearBtn.innerHTML = '<i class="fas fa-times"></i>';
  clearBtn.setAttribute('aria-label', 'Clear search');
  searchContainer.querySelector('.search-wrapper')?.appendChild(clearBtn) || 
  document.querySelector('.hero-content').querySelector('.search-container').firstElementChild.appendChild(clearBtn);

  // Create and style suggestions container
  const suggestionsContainer = document.createElement('div');
  suggestionsContainer.className = 'suggestions-container';
  searchContainer.appendChild(suggestionsContainer);

  let selectedIndex = -1;

  // Load search data from backend
  let searchData = [];
  try {
    const response = await fetch("https://hospitality-management-system-xdyy.onrender.com/searchItems");
    const data = await response.json();
    if (data.success) {
      searchData = data.searchItems;
      console.log("Search data loaded:", searchData);
    }
  } catch (err) {
    console.error("Error fetching search data:", err);
  }

  // Show/hide clear button
  searchInput.addEventListener('input', () => {
    if (searchInput.value.trim()) {
      clearBtn.classList.add('show');
      updateSuggestions(searchInput.value.trim());
    } else {
      clearBtn.classList.remove('show');
      clearSuggestions();
    }
  });

  // Clear button functionality
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
      item.keyword.toLowerCase().includes(lowerQuery)
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

    // Add click handlers
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

  // Keyboard navigation
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

  // Close on click outside
  document.addEventListener('click', (e) => {
    if (!searchContainer.contains(e.target)) {
      clearSuggestions();
    }
  });

  // Focus behavior
  searchInput.addEventListener('focus', () => {
    if (searchInput.value.trim()) {
      updateSuggestions(searchInput.value.trim());
    }
  });
});