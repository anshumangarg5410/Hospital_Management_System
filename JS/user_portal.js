        function showTab(tabName) {
            // Hide all tabs
            const tabs = document.querySelectorAll('.tab-content');
            tabs.forEach(tab => tab.classList.remove('active'));

            // Remove active class from all nav items
            const navItems = document.querySelectorAll('.nav-item');
            navItems.forEach(item => item.classList.remove('active'));

            // Show selected tab
            document.getElementById(tabName).classList.add('active');

            // Add active class to clicked nav item
            event.target.closest('.nav-item').classList.add('active');

            // Update page title
            const titles = {
                'dashboard': 'Dashboard',
                'appointments': 'Appointments',
                'prescriptions': 'Prescriptions',
                'medicines': 'Medicine Orders',
                'reports': 'Medical Reports',
                'profile': 'Settings'
            };
            document.getElementById('pageTitle').textContent = titles[tabName];

            // Scroll to top
            window.scrollTo(0, 0);
        }

        function updateProfile() {
            const userName = document.getElementById('userName').value;
            document.getElementById('displayUserName').textContent = userName;
            alert('Profile updated successfully!');
        }

        function changePassword() {
            const currentPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (!currentPassword || !newPassword || !confirmPassword) {
                alert('Please fill in all password fields.');
                return;
            }

            if (newPassword !== confirmPassword) {
                alert('New passwords do not match.');
                return;
            }

            if (newPassword.length < 8) {
                alert('Password must be at least 8 characters long.');
                return;
            }

            alert('Password changed successfully!');
            document.getElementById('currentPassword').value = '';
            document.getElementById('newPassword').value = '';
            document.getElementById('confirmPassword').value = '';
        }