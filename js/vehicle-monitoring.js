/**
 * Vehicle Monitoring JavaScript for KTX Maintenance Dashboard
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize dropdowns and common UI elements (from main.js)
    if (typeof initDropdowns === 'function') {
        initDropdowns();
    }
    
    // Initialize vehicle monitoring specific functionality
    initVehicleMonitoring();
    
    // Initialize charts for the current page
    initCharts();
    
    // Initialize tab functionality
    initTabs();
});

/**
 * Initializes vehicle monitoring specific functionality
 */
function initVehicleMonitoring() {
    // Vehicle list item selection
    initVehicleSelection();
    
    // View toggles (list, grid, map)
    initViewToggles();
    
    // Filter functionality
    initFilters();
    
    // Timerange selection for sensor data
    initTimerangeSelectors();
}

/**
 * Initializes vehicle selection functionality
 */
function initVehicleSelection() {
    const vehicleItems = document.querySelectorAll('.vehicle-item');
    
    if (!vehicleItems.length) return;
    
    vehicleItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove selected class from all items
            vehicleItems.forEach(v => v.classList.remove('selected'));
            
            // Add selected class to clicked item
            this.classList.add('selected');
            
            // Get vehicle ID for data loading
            const vehicleId = this.getAttribute('data-id');
            
            // In a real app, we would load vehicle data from the server
            // For this mockup, we'll just update the vehicle title
            updateVehicleDetails(vehicleId);
        });
    });
}

/**
 * Updates the vehicle details panel with data for the selected vehicle
 * In a real app, this would fetch data from the server
 */
function updateVehicleDetails(vehicleId) {
    console.log(`Loading data for vehicle: ${vehicleId}`);
    
    // This is a mockup, so we won't actually load data
    // In a real app, we would make an API call and update the UI
    
    // Simulate a loading state
    const detailPanel = document.querySelector('.vehicle-detail-panel');
    if (detailPanel) {
        detailPanel.classList.add('loading');
        
        // Remove loading state after a short delay
        setTimeout(() => {
            detailPanel.classList.remove('loading');
        }, 500);
    }
    
    // Update vehicle title
    const vehicleTitle = document.querySelector('.vehicle-title h3');
    if (vehicleTitle) {
        vehicleTitle.textContent = vehicleId;
    }
}

/**
 * Initializes view toggle buttons
 */
function initViewToggles() {
    const viewToggles = document.querySelectorAll('.view-toggle');
    
    if (!viewToggles.length) return;
    
    viewToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            // Remove active class from all toggles
            viewToggles.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked toggle
            this.classList.add('active');
            
            // Get view type
            const viewType = this.getAttribute('data-view');
            
            // In a real app, we would switch the view here
            console.log(`Switching to ${viewType} view`);
        });
    });
}

/**
 * Initializes filter functionality
 */
function initFilters() {
    // Train type filter
    const trainTypeFilter = document.getElementById('train-type-filter');
    if (trainTypeFilter) {
        trainTypeFilter.addEventListener('change', function() {
            const selectedType = this.value;
            console.log(`Filtering by train type: ${selectedType}`);
            // In a real app, we would filter the vehicle list
        });
    }
    
    // Route filter
    const routeFilter = document.getElementById('route-filter');
    if (routeFilter) {
        routeFilter.addEventListener('change', function() {
            const selectedRoute = this.value;
            console.log(`Filtering by route: ${selectedRoute}`);
            // In a real app, we would filter the vehicle list
        });
    }
    
    // Status filter
    const statusFilter = document.getElementById('status-filter');
    if (statusFilter) {
        statusFilter.addEventListener('change', function() {
            const selectedStatus = this.value;
            console.log(`Filtering by status: ${selectedStatus}`);
            // In a real app, we would filter the vehicle list
        });
    }
    
    // Filter tags
    const filterTags = document.querySelectorAll('.filter-tag');
    if (filterTags.length) {
        filterTags.forEach(tag => {
            tag.addEventListener('click', function() {
                this.remove();
                // In a real app, we would update the filters
            });
        });
    }
    
    // Vehicle search
    const vehicleSearch = document.querySelector('.vehicle-search');
    if (vehicleSearch) {
        vehicleSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const vehicleItems = document.querySelectorAll('.vehicle-item');
            
            vehicleItems.forEach(item => {
                const vehicleId = item.getAttribute('data-id').toLowerCase();
                const vehicleInfo = item.querySelector('.vehicle-info p').textContent.toLowerCase();
                
                if (vehicleId.includes(searchTerm) || vehicleInfo.includes(searchTerm)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
}

/**
 * Initializes timerange selector buttons
 */
function initTimerangeSelectors() {
    const timerangeButtons = document.querySelectorAll('.timerange-btn');
    
    if (!timerangeButtons.length) return;
    
    timerangeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            timerangeButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get time range
            const timeRange = this.getAttribute('data-range');
            
            // In a real app, we would update the chart data
            updateCharts(timeRange);
        });
    });
}

/**
 * Initializes tabs functionality
 */
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (!tabButtons.length || !tabContents.length) return;
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get tab ID
            const tabId = this.getAttribute('data-tab');
            
            // Hide all tab contents
            tabContents.forEach(content => {
                content.style.display = 'none';
            });
            
            // Show selected tab content
            const selectedTab = document.getElementById(`${tabId}-tab`);
            if (selectedTab) {
                selectedTab.style.display = 'block';
            }
        });
    });
}

/**
 * Updates chart data based on the selected time range
 * In a real app, this would fetch data from the server
 */
function updateCharts(timeRange) {
    console.log(`Updating charts for time range: ${timeRange}`);
    
    // This is a mockup, so we won't actually update the charts
    // In a real app, we would make an API call and update the charts
    
    // Simulate a loading state for charts
    const chartContainers = document.querySelectorAll('.chart-container');
    
    chartContainers.forEach(container => {
        container.classList.add('loading');
        
        // Remove loading state after a short delay
        setTimeout(() => {
            container.classList.remove('loading');
        }, 800);
    });
}

/**
 * Initializes all charts on the page
 */
function initCharts() {
    // Initialize system gauge charts
    initGaugeCharts();
    
    // Initialize sensor data charts
    initSensorCharts();
    
    // Initialize maintenance type chart
    initMaintenanceTypeChart();
}

/**
 * Initializes gauge charts for system status
 */
function initGaugeCharts() {
    const gaugeCharts = document.querySelectorAll('.gauge-chart');
    
    if (!gaugeCharts.length) return;
    
    gaugeCharts.forEach(chart => {
        const ctx = chart.getContext('2d');
        const value = chart.getAttribute('data-value');
        const max = chart.getAttribute('data-max') || 100;
        const color = chart.getAttribute('data-color') || '#28a745';
        
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [value, max - value],
                    backgroundColor: [
                        color,
                        '#e9ecef'
                    ],
                    borderWidth: 0,
                    cutout: '75%'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                circumference: 180,
                rotation: -90,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false
                    }
                }
            }
        });
    });
}

/**
 * Initializes sensor data charts
 */
function initSensorCharts() {
    // Temperature Chart
    const temperatureChartElem = document.getElementById('temperatureChart');
    if (temperatureChartElem) {
        const ctx = temperatureChartElem.getContext('2d');
        
        // Sample time labels for the last hour (10-minute intervals)
        const timeLabels = [];
        const now = new Date();
        
        for (let i = 6; i >= 0; i--) {
            const time = new Date(now.getTime() - i * 10 * 60000);
            timeLabels.push(time.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }));
        }
        
        // Sample data
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: timeLabels,
                datasets: [
                    {
                        label: '제동디스크 온도',
                        data: [150, 155, 160, 165, 170, 175, 180],
                        borderColor: '#dc3545',
                        backgroundColor: 'rgba(220, 53, 69, 0.1)',
                        borderWidth: 2,
                        tension: 0.3,
                        fill: true
                    },
                    {
                        label: '냉각수 온도',
                        data: [85, 88, 90, 92, 94, 95, 96],
                        borderColor: '#ffc107',
                        backgroundColor: 'rgba(255, 193, 7, 0.1)',
                        borderWidth: 2,
                        tension: 0.3,
                        fill: true
                    },
                    {
                        label: '엔진 온도',
                        data: [78, 79, 80, 81, 82, 83, 82],
                        borderColor: '#0064A4',
                        backgroundColor: 'rgba(0, 100, 164, 0.1)',
                        borderWidth: 2,
                        tension: 0.3,
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false,
                        title: {
                            display: true,
                            text: '온도 (°C)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                }
            }
        });
    }
    
    // Pressure Chart
    const pressureChartElem = document.getElementById('pressureChart');
    if (pressureChartElem) {
        const ctx = pressureChartElem.getContext('2d');
        
        // Same time labels as temperature chart
        const timeLabels = [];
        const now = new Date();
        
        for (let i = 6; i >= 0; i--) {
            const time = new Date(now.getTime() - i * 10 * 60000);
            timeLabels.push(time.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }));
        }
        
        // Sample data
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: timeLabels,
                datasets: [
                    {
                        label: '제동 압력',
                        data: [55, 58, 60, 55, 50, 45, 40],
                        borderColor: '#dc3545',
                        backgroundColor: 'rgba(220, 53, 69, 0.1)',
                        borderWidth: 2,
                        tension: 0.3,
                        fill: true
                    },
                    {
                        label: '유압 시스템',
                        data: [120, 122, 125, 124, 122, 120, 118],
                        borderColor: '#0064A4',
                        backgroundColor: 'rgba(0, 100, 164, 0.1)',
                        borderWidth: 2,
                        tension: 0.3,
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false,
                        title: {
                            display: true,
                            text: '압력 (bar)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                }
            }
        });
    }
    
    // Electrical Chart
    const electricalChartElem = document.getElementById('electricalChart');
    if (electricalChartElem) {
        const ctx = electricalChartElem.getContext('2d');
        
        // Same time labels as temperature chart
        const timeLabels = [];
        const now = new Date();
        
        for (let i = 6; i >= 0; i--) {
            const time = new Date(now.getTime() - i * 10 * 60000);
            timeLabels.push(time.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }));
        }
        
        // Sample data
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: timeLabels,
                datasets: [
                    {
                        label: '배터리 전압',
                        data: [24.1, 24.2, 24.1, 24.0, 24.2, 24.3, 24.2],
                        borderColor: '#28a745',
                        backgroundColor: 'rgba(40, 167, 69, 0.1)',
                        borderWidth: 2,
                        tension: 0.3,
                        fill: true,
                        yAxisID: 'y'
                    },
                    {
                        label: '전력 소비량',
                        data: [350, 360, 380, 400, 420, 410, 390],
                        borderColor: '#6f42c1',
                        backgroundColor: 'rgba(111, 66, 193, 0.1)',
                        borderWidth: 2,
                        tension: 0.3,
                        fill: true,
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        title: {
                            display: true,
                            text: '전압 (V)'
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: '전력 (W)'
                        },
                        grid: {
                            drawOnChartArea: false
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                }
            }
        });
    }
}

/**
 * Initializes maintenance type chart
 */
function initMaintenanceTypeChart() {
    const maintenanceTypeChartElem = document.getElementById('maintenanceTypeChart');
    if (!maintenanceTypeChartElem) return;
    
    const ctx = maintenanceTypeChartElem.getContext('2d');
    
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['예방 정비', '수리', '점검'],
            datasets: [{
                data: [14, 8, 5],
                backgroundColor: [
                    '#28a745',
                    '#dc3545',
                    '#17a2b8'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        boxWidth: 12,
                        font: {
                            size: 11
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${label}: ${value}건 (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

/**
 * Add CSS to handle loading state
 */
document.head.insertAdjacentHTML('beforeend', `
<style>
.loading {
    position: relative;
    overflow: hidden;
}

.loading:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.7);
    z-index: 10;
}

.loading:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 30px;
    height: 30px;
    margin: -15px 0 0 -15px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid var(--primary-color);
    border-radius: 50%;
    z-index: 20;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>
`);
