/**
 * Main JavaScript for KTX Maintenance Dashboard
 */

document.addEventListener('DOMContentLoaded', function() {
    // Update current time in the top bar
    updateCurrentTime();
    setInterval(updateCurrentTime, 60000); // Update every minute
    
    // Initialize sidebar toggle
    initSidebarToggle();
    
    // Initialize dropdowns
    initDropdowns();
    
    // Init notification handlers
    initNotifications();
});

/**
 * Updates the current time display in the top bar
 */
function updateCurrentTime() {
    const currentTimeElem = document.querySelector('.current-time');
    if (!currentTimeElem) return;
    
    const now = new Date();
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        weekday: 'long',
        hour: '2-digit', 
        minute: '2-digit' 
    };
    
    currentTimeElem.textContent = now.toLocaleDateString('ko-KR', options);
}

/**
 * Initializes sidebar toggle functionality
 */
function initSidebarToggle() {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (!menuToggle || !sidebar || !mainContent) return;
    
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        
        // For smaller screens, we want to show/hide the sidebar
        if (window.innerWidth <= 768) {
            if (sidebar.classList.contains('active')) {
                sidebar.style.transform = 'translateX(0)';
            } else {
                sidebar.style.transform = 'translateX(-100%)';
            }
        }
    });
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && 
            sidebar.classList.contains('active') && 
            !sidebar.contains(e.target) && 
            e.target !== menuToggle) {
            sidebar.classList.remove('active');
            sidebar.style.transform = 'translateX(-100%)';
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            sidebar.style.transform = '';
        } else if (!sidebar.classList.contains('active')) {
            sidebar.style.transform = 'translateX(-100%)';
        }
    });
}

/**
 * Initializes dropdown menus
 */
function initDropdowns() {
    // Notification dropdown
    const notificationToggle = document.querySelector('.notification-toggle');
    const notificationDropdown = document.querySelector('.notification-dropdown');
    
    if (notificationToggle && notificationDropdown) {
        notificationToggle.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent document click event
            notificationDropdown.style.display = notificationDropdown.style.display === 'block' ? 'none' : 'block';
        });
        
        // Close dropdown when clicking elsewhere
        document.addEventListener('click', function() {
            notificationDropdown.style.display = 'none';
        });
        
        // Prevent closing when clicking inside dropdown
        notificationDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // User menu dropdown (to be implemented)
    // ...
}

/**
 * Initializes notification interactions
 */
function initNotifications() {
    // Filter buttons for alerts
    const filterButtons = document.querySelectorAll('.filter-btn');
    const alertItems = document.querySelectorAll('.alert-item');
    
    if (!filterButtons.length || !alertItems.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Show/hide alert items based on filter
            alertItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Acknowledge buttons
    const acknowledgeButtons = document.querySelectorAll('.btn-acknowledge');
    
    acknowledgeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const alertItem = this.closest('.alert-item');
            
            // Apply a visual transition
            alertItem.style.opacity = '0.6';
            this.textContent = '확인됨';
            this.disabled = true;
            
            // In a real app, we would send this to the server
            // For the mockup, we'll just mark it visually
        });
    });
    
    // Detail buttons
    const detailButtons = document.querySelectorAll('.btn-details');
    
    detailButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Get alert info
            const alertItem = this.closest('.alert-item');
            const alertTitle = alertItem.querySelector('h4').textContent;
            
            // In a real app, we would navigate to a details page or show a modal
            // For the mockup, we'll just show an alert
            alert(`상세 정보: ${alertTitle}`);
        });
    });
}
