/**
 * Dashboard Specific JavaScript for KTX Maintenance Dashboard
 * Includes chart initializations and dashboard-specific interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all charts
    initCharts();
    
    // Initialize dashboard tabs and interactions
    initDashboardInteractions();
});

/**
 * Initializes all charts in the dashboard
 */
function initCharts() {
    // Train Status Donut Chart
    initStatusDonutChart();
    
    // Train Type Bar Chart
    initTrainTypeBarChart();
    
    // KPI Gauge Charts
    initGaugeCharts();
    
    // KPI Trend Chart
    initKPITrendChart();
}

/**
 * Initializes the status donut chart
 */
function initStatusDonutChart() {
    const chartElem = document.getElementById('statusDonutChart');
    if (!chartElem) {
        console.error('차트 요소를 찾을 수 없습니다: statusDonutChart');
        return;
    }
    
    const ctx = chartElem.getContext('2d');
    
    // 캔버스 요소의 크기를 명시적으로 설정
    chartElem.style.width = '100%';
    chartElem.style.height = '100%';
    chartElem.style.minHeight = '200px';
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['정상 운행', '예정 정비', '진행중 정비', '고장'],
            datasets: [{
                data: [280, 42, 20, 8],
                backgroundColor: [
                    '#28a745', // Success - Green
                    '#ffc107', // Warning - Yellow
                    '#17a2b8', // Info - Teal
                    '#dc3545'  // Danger - Red
                ],
                borderWidth: 0,
                cutout: '75%'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.raw;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${context.label}: ${value}대 (${percentage}%)`;
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true
            }
        }
    });
}

/**
 * Initializes the train type bar chart
 */
function initTrainTypeBarChart() {
    const chartElem = document.getElementById('trainTypeBarChart');
    if (!chartElem) {
        console.error('차트 요소를 찾을 수 없습니다: trainTypeBarChart');
        return;
    }
    
    const ctx = chartElem.getContext('2d');
    
    // 캔버스 요소의 크기를 명시적으로 설정
    chartElem.style.width = '100%';
    chartElem.style.height = '100%';
    chartElem.style.minHeight = '200px';
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['KTX', '전동차', 'ITX-새마을', '무궁화호', '화물열차'],
            datasets: [
                {
                    label: '정상 운행',
                    data: [85, 120, 30, 25, 20],
                    backgroundColor: '#28a745',
                    barPercentage: 0.7,
                    categoryPercentage: 0.8
                },
                {
                    label: '정비 중',
                    data: [15, 35, 7, 3, 2],
                    backgroundColor: '#ffc107',
                    barPercentage: 0.7,
                    categoryPercentage: 0.8
                },
                {
                    label: '고장',
                    data: [2, 4, 1, 1, 0],
                    backgroundColor: '#dc3545',
                    barPercentage: 0.7,
                    categoryPercentage: 0.8
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    stacked: true,
                    grid: {
                        display: false
                    }
                },
                y: {
                    stacked: true,
                    beginAtZero: true,
                    ticks: {
                        stepSize: 50
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        boxWidth: 12,
                        padding: 15,
                        font: {
                            size: 11
                        }
                    }
                }
            },
            animation: {
                duration: 1000,
                easing: 'easeOutQuart'
            }
        }
    });
}

/**
 * Initializes the KPI gauge charts
 */
function initGaugeCharts() {
    // Prediction Accuracy Gauge
    createGaugeChart('predictAccuracyGauge', 87, '#28a745');
    
    // Preventive Maintenance Gauge
    createGaugeChart('preventiveMaintenanceGauge', 76, '#0064A4');
    
    // MTTR Gauge (inverted - lower is better)
    createGaugeChart('mttrGauge', 70, '#ffc107'); // Representing 4.2h as 70% good (scale would be different)
    
    // Schedule Adherence Gauge
    createGaugeChart('scheduleAdherenceGauge', 92, '#28a745');
}

/**
 * Creates a gauge chart with the given parameters
 */
function createGaugeChart(elementId, value, color) {
    const chartElem = document.getElementById(elementId);
    if (!chartElem) return;
    
    const ctx = chartElem.getContext('2d');
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [value, 100 - value],
                backgroundColor: [
                    color,
                    '#f1f1f1'
                ],
                borderWidth: 0,
                cutout: '80%',
                circumference: 180,
                rotation: -90
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
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
}

/**
 * Initializes the KPI trend chart
 */
function initKPITrendChart() {
    const chartElem = document.getElementById('kpiTrendChart');
    if (!chartElem) return;
    
    const ctx = chartElem.getContext('2d');
    
    // Sample data for the last 6 months
    const labels = ['12월', '1월', '2월', '3월', '4월', '5월'];
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: '고장 예측 정확도',
                    data: [75, 77, 80, 82, 85, 87],
                    borderColor: '#28a745',
                    backgroundColor: 'rgba(40, 167, 69, 0.1)',
                    fill: false,
                    tension: 0.3,
                    borderWidth: 2,
                    pointRadius: 3
                },
                {
                    label: '예방 정비율',
                    data: [65, 68, 70, 72, 74, 76],
                    borderColor: '#0064A4',
                    backgroundColor: 'rgba(0, 100, 164, 0.1)',
                    fill: false,
                    tension: 0.3,
                    borderWidth: 2,
                    pointRadius: 3
                },
                {
                    label: '정비 일정 준수율',
                    data: [83, 85, 87, 88, 90, 92],
                    borderColor: '#6f42c1',
                    backgroundColor: 'rgba(111, 66, 193, 0.1)',
                    fill: false,
                    tension: 0.3,
                    borderWidth: 2,
                    pointRadius: 3
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false,
                    min: 60,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
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
                    position: 'bottom',
                    labels: {
                        boxWidth: 12,
                        padding: 15,
                        font: {
                            size: 11
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.raw + '%';
                        }
                    }
                }
            }
        }
    });
}

/**
 * Initializes dashboard specific interactions
 */
function initDashboardInteractions() {
    // Schedule view tabs
    initScheduleTabs();
    
    // Panel expand/collapse functionality
    initPanelControls();
}

/**
 * Initializes schedule tabs functionality
 */
function initScheduleTabs() {
    const scheduleNavBtns = document.querySelectorAll('.schedule-nav-btn');
    const scheduleViews = document.querySelectorAll('.schedule-view');
    
    if (!scheduleNavBtns.length || !scheduleViews.length) return;
    
    scheduleNavBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            scheduleNavBtns.forEach(navBtn => navBtn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const viewId = this.getAttribute('data-view');
            
            // Hide all views
            scheduleViews.forEach(view => {
                view.classList.remove('active');
                view.style.display = 'none';
            });
            
            // Show selected view
            const selectedView = document.getElementById(viewId + '-view');
            if (selectedView) {
                selectedView.classList.add('active');
                selectedView.style.display = 'block';
            }
        });
    });
}

/**
 * Initializes panel control buttons (refresh, expand, more)
 */
function initPanelControls() {
    // Refresh buttons
    const refreshButtons = document.querySelectorAll('.btn-refresh');
    
    refreshButtons.forEach(button => {
        button.addEventListener('click', function() {
            const panel = this.closest('.dashboard-panel');
            
            // Add a rotating animation
            this.classList.add('rotating');
            
            // Remove the animation after it completes
            setTimeout(() => {
                this.classList.remove('rotating');
            }, 1000);
            
            // In a real app, we would refresh the panel data here
            // For the mockup, we'll just show a message
            console.log('Refreshing panel: ' + panel.querySelector('h3').textContent);
        });
    });
    
    // Expand buttons (to be implemented)
    const expandButtons = document.querySelectorAll('.btn-expand');
    
    expandButtons.forEach(button => {
        button.addEventListener('click', function() {
            const panel = this.closest('.dashboard-panel');
            
            // Toggle a fullscreen class (to be implemented in CSS)
            panel.classList.toggle('fullscreen');
            
            // Toggle button icon
            if (panel.classList.contains('fullscreen')) {
                this.innerHTML = '<i class="fas fa-compress"></i>';
            } else {
                this.innerHTML = '<i class="fas fa-expand"></i>';
            }
        });
    });
    
    // More buttons (to be implemented)
    const moreButtons = document.querySelectorAll('.btn-more');
    
    moreButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Show a dropdown menu or modal with more options
            // For the mockup, we'll just log a message
            console.log('More options for panel: ' + this.closest('.dashboard-panel').querySelector('h3').textContent);
        });
    });
}

/**
 * Add a CSS rule to handle the rotating animation
 */
document.head.insertAdjacentHTML('beforeend', `
<style>
.rotating {
    animation: rotate 1s linear;
}

@keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

.dashboard-panel.fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    border-radius: 0;
}
</style>
`);
