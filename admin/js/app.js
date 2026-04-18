/**
 * Admin App Logic
 * Handles UI routing, rendering charts, table population, and interactions.
 */

document.addEventListener('DOMContentLoaded', async () => {
    // Check Auth
    if (!AdminAPI.isAuthenticated()) {
        window.location.href = 'login.html';
        return;
    }

    // Set Initial Theme
    if (localStorage.getItem('admin-theme') === 'dark' || (!localStorage.getItem('admin-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    }

    // Elements
    const views = document.querySelectorAll('.view-section');
    const navItems = document.querySelectorAll('.nav-item');
    const sidebar = document.getElementById('sidebar');
    const toggleSidebarBtn = document.getElementById('toggle-sidebar');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const logoutBtn = document.getElementById('logout-btn');

    // Routing Logic
    function switchView(viewId) {
        views.forEach(view => {
            view.classList.add('hidden');
            view.classList.remove('animate-fade-in');
        });
        navItems.forEach(nav => {
            nav.classList.remove('bg-primary/10', 'text-primary', 'dark:bg-primary/20', 'border-r-4', 'border-primary');
            nav.classList.add('text-gray-500', 'dark:text-gray-400');
        });

        const targetView = document.getElementById(viewId);
        if (targetView) {
            targetView.classList.remove('hidden');
            targetView.classList.add('animate-fade-in');
        }

        const activeNav = document.querySelector(`.nav-item[data-target="${viewId}"]`);
        if (activeNav) {
            activeNav.classList.add('bg-primary/10', 'text-primary', 'dark:bg-primary/20', 'border-r-4', 'border-primary');
            activeNav.classList.remove('text-gray-500', 'dark:text-gray-400');
        }

        // Trigger specific re-renders
        if (viewId === 'dashboard-view') loadDashboard();
        if (viewId === 'users-view') loadUsers();
        if (viewId === 'activity-view') loadActivity();
        if (viewId === 'content-view') loadCustomPlaces();
    }

    // Event Listeners
    navItems.forEach(nav => {
        nav.addEventListener('click', (e) => {
            e.preventDefault();
            const target = nav.getAttribute('data-target');
            switchView(target);
        });
    });

    toggleSidebarBtn.addEventListener('click', () => {
        document.body.classList.toggle('sidebar-closed');
    });

    themeToggleBtn.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('admin-theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
        renderCharts(); // Re-render charts for theme update
    });

    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        AdminAPI.logout();
    });

    // ----------------------------------------------------
    // Dashboard Logic
    // ----------------------------------------------------
    let visitorChartInstance = null;

    async function loadDashboard() {
        const stats = await AdminAPI.getDashboardStats();
        document.getElementById('stat-total-users').innerText = stats.totalUsers;
        document.getElementById('stat-active-users').innerText = stats.activeUsers;
        document.getElementById('stat-revenue').innerText = stats.totalRevenue;
        document.getElementById('stat-bounce').innerText = stats.bounceRate;

        renderCharts();
    }

    function renderCharts() {
        const isDark = document.documentElement.classList.contains('dark');
        const textColor = isDark ? '#9ca3af' : '#4b5563';
        const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

        const ctx = document.getElementById('visitorChart');
        if (!ctx) return;

        if (visitorChartInstance) visitorChartInstance.destroy();

        visitorChartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                datasets: [{
                    label: 'New Users',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    borderColor: '#4f46e5',
                    backgroundColor: 'rgba(79, 70, 229, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { color: textColor },
                        grid: { color: gridColor }
                    },
                    x: {
                        ticks: { color: textColor },
                        grid: { display: false }
                    }
                }
            }
        });
    }

    // ----------------------------------------------------
    // Users Logic
    // ----------------------------------------------------
    async function loadUsers() {
        const users = await AdminAPI.getUsers();
        const tbody = document.getElementById('users-table-body');
        tbody.innerHTML = '';

        users.forEach(user => {
            const tr = document.createElement('tr');
            tr.className = 'border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50';
            
            const statusColor = user.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';

            tr.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                            ${user.name.charAt(0)}
                        </div>
                        <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900 dark:text-white">${user.name}</div>
                            <div class="text-sm text-gray-500 dark:text-gray-400">${user.email}</div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor}">
                        ${user.status}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    ${user.role}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    ${user.joined}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button class="text-primary hover:text-indigo-900 dark:hover:text-indigo-400 mr-3 edit-user-btn" data-id="${user.id}"><i class="fas fa-edit"></i></button>
                    <button class="text-red-600 hover:text-red-900 dark:hover:text-red-400 delete-user-btn" data-id="${user.id}"><i class="fas fa-trash"></i></button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        // Attach events
        document.querySelectorAll('.delete-user-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                if (confirm('Are you sure you want to delete this user?')) {
                    await AdminAPI.deleteUser(id);
                    loadUsers();
                    showToast('success', 'User deleted successfully.');
                }
            });
        });
    }

    // Modal Add User logic
    document.getElementById('add-user-btn').addEventListener('click', () => {
        document.getElementById('user-modal').classList.remove('hidden');
        document.getElementById('user-modal').classList.add('flex');
    });

    document.getElementById('close-modal-btn').addEventListener('click', () => {
        document.getElementById('user-modal').classList.add('hidden');
        document.getElementById('user-modal').classList.remove('flex');
    });

    document.getElementById('user-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('user-name').value;
        const email = document.getElementById('user-email').value;
        const role = document.getElementById('user-role').value;
        const password = document.getElementById('user-password').value; // Get the assigned password
        
        // Pass it into our Admin database (Simulating DB secure storage)
        await AdminAPI.addUser({ name, email, role, password, status: 'active' });
        
        document.getElementById('user-modal').classList.add('hidden');
        document.getElementById('user-modal').classList.remove('flex');
        document.getElementById('user-form').reset();
        
        loadUsers();
        showToast('success', 'User added successfully.');
    });

    // ----------------------------------------------------
    // Activity Logic
    // ----------------------------------------------------
    async function loadActivity() {
        const logs = await AdminAPI.getLogs();
        const container = document.getElementById('activity-feed');
        const miniContainer = document.getElementById('mini-activity-feed');
        if (container) container.innerHTML = '';
        if (miniContainer) miniContainer.innerHTML = '';

        logs.forEach((log, index) => {
            const date = new Date(log.time);
            const timeString = date.toLocaleString();
            
            // Full Activity Feed
            if (container) {
                const div = document.createElement('div');
                div.className = 'flex items-start space-x-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors';
                div.innerHTML = `
                    <div class="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                        <i class="fas fa-history"></i>
                    </div>
                    <div class="flex-1">
                        <p class="text-sm font-medium text-gray-900 dark:text-white">
                            <span class="font-bold">${log.user}</span> ${log.action}
                        </p>
                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">${timeString}</p>
                    </div>
                `;
                container.appendChild(div);
            }

            // Mini Activity Feed (Dashboard) - limit to 6 items
            if (miniContainer && index < 6) {
                const miniDiv = document.createElement('div');
                miniDiv.className = 'flex items-start gap-3';
                miniDiv.innerHTML = `
                    <div class="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/10 flex items-center justify-center text-blue-500 text-xs shrink-0">
                        <i class="fas fa-bolt"></i>
                    </div>
                    <div>
                        <p class="text-sm text-gray-900 dark:text-white"><span class="font-semibold">${log.user}</span> ${log.action.toLowerCase()}</p>
                        <p class="text-xs text-gray-400 mt-0.5">${timeString}</p>
                    </div>
                `;
                miniContainer.appendChild(miniDiv);
            }
        });
    }

    // Export Logic
    window.downloadActivityLogs = async function() {
        const logs = await AdminAPI.getLogs();
        if(!logs || logs.length === 0) {
            alert("No activity logs available to export.");
            return;
        }

        // Prepare CSV Headers
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "Log ID,User,Action,Timestamp\n";

        // Append Rows
        logs.forEach(log => {
            // encapsulate strings in quotes safely
            const safeId = `"${log.id || ''}"`;
            const safeUser = `"${(log.user || '').replace(/"/g, '""')}"`;
            const safeAction = `"${(log.action || '').replace(/"/g, '""')}"`;
            const safeTime = `"${new Date(log.time).toISOString()}"`;

            csvContent += `${safeId},${safeUser},${safeAction},${safeTime}\n`;
        });

        // Create browser anchor link exactly for native download
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `SiteSeeking_Activity_Logs_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showToast('success', 'Activity logs downloaded successfully.');
    };

    // ----------------------------------------------------
    // Content Management Logic
    // ----------------------------------------------------
    function loadCustomPlaces() {
        const customPlacesStr = localStorage.getItem('siteSeeking_custom_places');
        const listBtn = document.getElementById('admin-custom-places-list');
        if (!listBtn) return;
        
        if (!customPlacesStr) {
            listBtn.innerHTML = '<div class="flex items-center justify-between p-3 border border-gray-100 dark:border-gray-700 rounded-xl"><p class="text-sm text-gray-500">No custom places added yet.</p></div>';
            return;
        }

        const customPlaces = JSON.parse(customPlacesStr);
        listBtn.innerHTML = '';
        let hasItems = false;

        for (let category in customPlaces) {
            customPlaces[category].forEach((place, index) => {
                hasItems = true;
                const div = document.createElement('div');
                div.className = 'flex items-center justify-between p-3 border border-gray-100 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors';
                div.innerHTML = `
                    <div class="flex items-center gap-3">
                        <i class="fas fa-map-pin text-primary text-xl"></i>
                        <div>
                            <p class="font-medium">${place.name}</p>
                            <p class="text-xs text-gray-500 capitalize">${category}</p>
                        </div>
                    </div>
                `;
                listBtn.appendChild(div);
            });
        }
        
        if (!hasItems) {
            listBtn.innerHTML = '<div class="flex items-center justify-between p-3 border border-gray-100 dark:border-gray-700 rounded-xl"><p class="text-sm text-gray-500">No custom places added yet.</p></div>';
        }
    }

    const addPlaceForm = document.getElementById('add-place-form');
    if (addPlaceForm) {
        addPlaceForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('place-name').value;
            const category = document.getElementById('place-category').value;
            const history = document.getElementById('place-history').value;
            const lat = document.getElementById('place-lat').value;
            const lon = document.getElementById('place-lon').value;

            let customPlaces = JSON.parse(localStorage.getItem('siteSeeking_custom_places') || '{}');
            if (!customPlaces[category]) customPlaces[category] = [];
            
            customPlaces[category].unshift({
                name: name,
                image: "https://images.unsplash.com/photo-1598322312687-32b005fe438f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                history: history,
                lat: lat,
                lon: lon,
                rating: "5.0",
                reviews: "1 (Admin)",
                timings: "09:00 AM - 05:00 PM",
                fee: "Free Entry",
                photography: "Allowed"
            });

            localStorage.setItem('siteSeeking_custom_places', JSON.stringify(customPlaces));
            
            // Log to activity
            AdminAPI._addLog('System', `Added new custom place: ${name}`);

            showToast('success', 'Place added! Live on user site.');
            addPlaceForm.reset();
            loadCustomPlaces();
        });
    }

    // ----------------------------------------------------
    // Global Utilities
    // ----------------------------------------------------
    function showToast(type, message) {
        let toast = document.getElementById('admin-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'admin-toast';
            toast.className = 'fixed bottom-4 right-4 transform translate-y-full opacity-0 transition-all duration-300 bg-white dark:bg-darkPanel shadow-2xl rounded-xl p-4 flex items-center gap-3 z-50';
            toast.innerHTML = `<div id="admin-toast-icon" class="w-8 h-8 rounded-full flex items-center justify-center shrink-0"></div><p id="admin-toast-message" class="text-sm font-medium"></p>`;
            document.body.appendChild(toast);
        }

        const icon = document.getElementById('admin-toast-icon');
        const msg = document.getElementById('admin-toast-message');

        toast.classList.remove('translate-y-full', 'opacity-0');
        msg.textContent = message;

        if (type === 'success') {
            icon.className = 'w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400';
            icon.innerHTML = '<i class="fas fa-check"></i>';
        } else {
            icon.className = 'w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400';
            icon.innerHTML = '<i class="fas fa-exclamation"></i>';
        }

        setTimeout(() => {
            toast.classList.add('translate-y-full', 'opacity-0');
        }, 3000);
    }

    // Storage Listener for Live Sync across tabs (Admin <-> User)
    window.addEventListener('storage', (e) => {
        if (e.key === 'admin_logs') {
            const act = document.getElementById('activity-view');
            if (act && !act.classList.contains('hidden')) loadActivity();
            const dash = document.getElementById('dashboard-view');
            if (dash && !dash.classList.contains('hidden')) {
                // To reload mini activity feed logic
                loadActivity(); 
            }
            showToast('success', 'New user interaction detected in real-time!');
        }
        if (e.key === 'admin_users') {
            const usersView = document.getElementById('users-view');
            if (usersView && !usersView.classList.contains('hidden')) loadUsers();
            
            const dash = document.getElementById('dashboard-view');
            if (dash && !dash.classList.contains('hidden')) loadDashboard();
            showToast('success', 'User registry updated in real-time!');
        }
    });

    // Initialize default view
    switchView('dashboard-view');
});
