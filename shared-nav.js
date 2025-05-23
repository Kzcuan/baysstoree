// Add info button to navigation
function addInfoButton() {
    const navbarNav = document.querySelector('.navbar-nav');
    if (navbarNav) {
        // Check if info button already exists
        const existingInfoButton = navbarNav.querySelector('.info-button');
        if (existingInfoButton) {
            return; // Don't add if it already exists
        }

        const currentPath = window.location.pathname;
        const isInfoPage = currentPath.includes('info.html');
        
        const infoButton = document.createElement('li');
        infoButton.className = 'nav-item';
        infoButton.innerHTML = `
            <a class="nav-link info-button ${isInfoPage ? 'active' : ''}" href="info.html">
                <i class="fas fa-info-circle"></i>
            </a>
        `;
        navbarNav.appendChild(infoButton);

        // Add admin links if admin is logged in
        if (localStorage.getItem('adminLoggedIn')) {
            const adminLinks = document.createElement('li');
            adminLinks.className = 'nav-item dropdown';
            adminLinks.innerHTML = `
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                    <i class="fas fa-cog"></i> Admin
                </a>
                <ul class="dropdown-menu dropdown-menu-dark">
                    <li><h6 class="dropdown-header">Store Management</h6></li>
                    <li><a class="dropdown-item" href="admin_info.html">
                        <i class="fas fa-store"></i> Store Information
                    </a></li>
                    <li><hr class="dropdown-divider"></li>
                    
                    <li><h6 class="dropdown-header">Product Management</h6></li>
                    <li><a class="dropdown-item" href="admin_accounts.html">
                        <i class="fas fa-user-circle"></i> Accounts
                    </a></li>
                    <li><a class="dropdown-item" href="admin_tools.html">
                        <i class="fas fa-tools"></i> Tools
                    </a></li>
                    <li><hr class="dropdown-divider"></li>
                    
                    <li><h6 class="dropdown-header">Transaction Management</h6></li>
                    <li><a class="dropdown-item" href="admin_history.html">
                        <i class="fas fa-history"></i> Order History
                    </a></li>
                </ul>
            `;
            navbarNav.appendChild(adminLinks);

            // Add logout button
            const logoutButton = document.createElement('li');
            logoutButton.className = 'nav-item';
            logoutButton.innerHTML = `
                <a class="nav-link" href="#" onclick="logout()">
                    <i class="fas fa-sign-out-alt"></i> Logout
                </a>
            `;
            navbarNav.appendChild(logoutButton);
        }
    }
}

// Add shared styles for info button
function addInfoButtonStyles() {
    // Check if styles already exist
    if (document.querySelector('#info-button-styles')) {
        return;
    }

    const style = document.createElement('style');
    style.id = 'info-button-styles';
    style.textContent = `
        .info-button {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex !important;
            align-items: center;
            justify-content: center;
            background: rgba(77, 166, 255, 0.1);
            border: 1px solid rgba(77, 166, 255, 0.2);
            margin-left: 10px;
            transition: all 0.3s ease;
        }

        .info-button:hover {
            background: #4da6ff;
            transform: translateY(-2px);
            box-shadow: 0 0 15px rgba(77, 166, 255, 0.5);
        }

        .info-button i {
            font-size: 1.2rem;
            color: #4da6ff;
            transition: all 0.3s ease;
        }

        .info-button:hover i {
            color: #ffffff;
        }

        .info-button.active {
            background: #4da6ff;
        }

        .info-button.active i {
            color: #ffffff;
        }
    `;
    document.head.appendChild(style);
}

// Logout function
function logout() {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('username');
    window.location.href = 'login.html';
}

// Shared navigation functionality
document.addEventListener('DOMContentLoaded', () => {
    // Initialize navigation
    initializeNavigation();

    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add click handler to each link
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Get the target page
            const href = link.getAttribute('href');
            
            // If it's the home page, make sure we preserve the data
            if (href === 'index.html') {
                // Make sure data is saved before navigation
                try {
                    const accounts = getItems(ACCOUNTS_KEY);
                    const tools = getItems(TOOLS_KEY);
                    const history = getItems(HISTORY_KEY);
                    
                    // Double check data is saved
                    if (accounts && tools && history) {
                        console.log('Data preserved before navigation:', {
                            accounts,
                            tools,
                            history
                        });
                    }
                } catch (error) {
                    console.error('Error preserving data:', error);
                    e.preventDefault();
                    alert('Please try again, ensuring your data is saved.');
                    return;
                }
            }
        });
    });
});

// Initialize navigation
function initializeNavigation() {
    const navbarNav = document.querySelector('#navbarNav .navbar-nav');
    
    // Clear existing navigation
    navbarNav.innerHTML = '';
    
    // Add main navigation items
    const navItems = [
        { href: 'index.html', icon: 'fas fa-home', text: 'HOME' },
        { href: 'accounts.html', icon: 'fas fa-gamepad', text: 'Modder Game' },
        { href: 'history.html', icon: 'fas fa-history', text: 'HISTORY' }
    ];

    // Add styles for nav buttons if not exists
    if (!document.querySelector('#nav-buttons-styles')) {
        const style = document.createElement('style');
        style.id = 'nav-buttons-styles';
        style.textContent = `
            .nav-button {
                background: rgba(77, 166, 255, 0.1);
                border: 1px solid rgba(77, 166, 255, 0.2);
                border-radius: 20px;
                padding: 10px 20px !important;
                margin: 5px;
                transition: all 0.3s ease;
                color: #4da6ff !important;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                font-weight: 500;
                letter-spacing: 0.5px;
            }

            .nav-button:hover {
                background: #4da6ff !important;
                transform: translateY(-2px);
                box-shadow: 0 0 15px rgba(77, 166, 255, 0.5);
                color: white !important;
            }

            .nav-button.active {
                background: #4da6ff !important;
                color: white !important;
                box-shadow: 0 0 15px rgba(77, 166, 255, 0.5);
            }

            .nav-button i {
                font-size: 1.1em;
                transition: all 0.3s ease;
            }

            .nav-button:hover i {
                transform: scale(1.1);
            }

            @media (max-width: 991px) {
                .nav-button {
                    width: 100%;
                    margin: 5px 0;
                    justify-content: flex-start;
                }
            }
        `;
        document.head.appendChild(style);
    }

    navItems.forEach(item => {
        const li = document.createElement('li');
        li.className = 'nav-item';
        const currentPath = window.location.pathname;
        const isActive = currentPath.includes(item.href);
        
        li.innerHTML = `
            <a class="nav-link nav-button ${isActive ? 'active' : ''}" href="${item.href}">
                <i class="${item.icon}"></i>
                <span>${item.text}</span>
            </a>
        `;
        navbarNav.appendChild(li);
    });
    
    // Add login/admin buttons based on login status
    if (localStorage.getItem('adminLoggedIn') === 'true') {
        // Admin dropdown
        const adminLinks = document.createElement('li');
        adminLinks.className = 'nav-item dropdown ms-lg-2';
        adminLinks.innerHTML = `
            <a class="nav-link nav-button dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                <i class="fas fa-cog"></i>
                <span>Admin Panel</span>
            </a>
            <ul class="dropdown-menu dropdown-menu-dark">
                <li><a class="dropdown-item" href="admin_profile.html">
                    <i class="fas fa-user-circle"></i> Profile
                </a></li>
                <li><a class="dropdown-item" href="admin_accounts.html">
                    <i class="fas fa-users-cog"></i> Manage Accounts
                </a></li>
                <li><a class="dropdown-item" href="admin_history.html">
                    <i class="fas fa-history"></i> Manage History
                </a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item text-danger" href="#" onclick="logout()">
                    <i class="fas fa-sign-out-alt"></i> Logout
                </a></li>
            </ul>
        `;
        navbarNav.appendChild(adminLinks);
    } else {
        // Login button for non-admin users
        const loginButton = document.createElement('li');
        loginButton.className = 'nav-item ms-lg-2';
        loginButton.innerHTML = `
            <a class="nav-link nav-button" href="login.html">
                <i class="fas fa-sign-in-alt"></i>
                <span>Back to Login</span>
            </a>
        `;
        navbarNav.appendChild(loginButton);
    }

    // Add dropdown menu styles if not exists
    if (!document.querySelector('#dropdown-styles')) {
        const dropdownStyle = document.createElement('style');
        dropdownStyle.id = 'dropdown-styles';
        dropdownStyle.textContent = `
            .dropdown-menu {
                background: rgba(13, 20, 33, 0.95);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(77, 166, 255, 0.2);
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
                padding: 8px;
                border-radius: 12px;
                margin-top: 8px;
            }

            .dropdown-item {
                color: #fff;
                border-radius: 8px;
                padding: 8px 16px;
                display: flex;
                align-items: center;
                gap: 8px;
                transition: all 0.3s ease;
            }

            .dropdown-item:hover {
                background: rgba(77, 166, 255, 0.2);
                transform: translateX(5px);
            }

            .dropdown-item i {
                font-size: 1.1em;
                width: 20px;
                text-align: center;
            }

            .dropdown-divider {
                border-color: rgba(77, 166, 255, 0.2);
                margin: 8px 0;
            }

            .dropdown-header {
                color: #4da6ff;
                font-size: 0.85em;
                font-weight: 600;
                padding: 8px 16px;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
        `;
        document.head.appendChild(dropdownStyle);
    }
}

// Initialize info button
document.addEventListener('DOMContentLoaded', () => {
    addInfoButtonStyles();
    addInfoButton();
}); 