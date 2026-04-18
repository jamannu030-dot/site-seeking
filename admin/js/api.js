/**
 * Admin API Simulator
 * Uses localStorage to simulate a database and backend connection.
 * Can be swapped out for real fetch() calls later.
 */

const AdminAPI = {
    // Initial Seed Data
    init: function() {
        if (!localStorage.getItem('admin_users')) {
            localStorage.setItem('admin_users', JSON.stringify([]));
        }

        if (!localStorage.getItem('admin_logs')) {
            localStorage.setItem('admin_logs', JSON.stringify([]));
        }
    },

    // Auth
    login: async function(username, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if ((username === 'admin' || username === 'admin@siteseeking.com') && password === 'admin') { // Mock credentials
                    localStorage.setItem('admin_token', 'mock_jwt_token_123');
                    resolve({ success: true, token: 'mock_jwt_token_123' });
                } else {
                    reject(new Error('Invalid username or password'));
                }
            }, 800);
        });
    },

    logout: function() {
        localStorage.removeItem('admin_token');
        window.location.href = 'login.html';
    },

    isAuthenticated: function() {
        return !!localStorage.getItem('admin_token');
    },

    // Users
    getUsers: async function() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(JSON.parse(localStorage.getItem('admin_users') || '[]'));
            }, 300);
        });
    },

    addUser: async function(userData) {
        return new Promise(resolve => {
            setTimeout(() => {
                const users = JSON.parse(localStorage.getItem('admin_users') || '[]');
                const newUser = {
                    ...userData,
                    id: Math.random().toString(36).substr(2, 9),
                    joined: new Date().toISOString().split('T')[0]
                };
                users.unshift(newUser);
                localStorage.setItem('admin_users', JSON.stringify(users));
                
                // Add log
                this._addLog('System', `Added new user: ${newUser.name}`);
                
                resolve({ success: true, user: newUser });
            }, 400);
        });
    },

    updateUser: async function(id, userData) {
        return new Promise(resolve => {
            setTimeout(() => {
                const users = JSON.parse(localStorage.getItem('admin_users') || '[]');
                const index = users.findIndex(u => u.id === id);
                if (index !== -1) {
                    users[index] = { ...users[index], ...userData };
                    localStorage.setItem('admin_users', JSON.stringify(users));
                    this._addLog('System', `Updated user: ${users[index].name}`);
                    resolve({ success: true });
                } else {
                    resolve({ success: false, error: 'User not found' });
                }
            }, 400);
        });
    },

    deleteUser: async function(id) {
        return new Promise(resolve => {
            setTimeout(() => {
                let users = JSON.parse(localStorage.getItem('admin_users') || '[]');
                users = users.filter(u => u.id !== id);
                localStorage.setItem('admin_users', JSON.stringify(users));
                this._addLog('System', `Deleted user ID: ${id}`);
                resolve({ success: true });
            }, 400);
        });
    },

    // Logs
    getLogs: async function() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(JSON.parse(localStorage.getItem('admin_logs') || '[]').sort((a,b) => new Date(b.time) - new Date(a.time)));
            }, 300);
        });
    },

    _addLog: function(user, action) {
        const logs = JSON.parse(localStorage.getItem('admin_logs') || '[]');
        logs.unshift({
            id: Math.random().toString(36).substr(2, 9),
            user,
            action,
            time: new Date().toISOString()
        });
        localStorage.setItem('admin_logs', JSON.stringify(logs));
    },

    // Stats
    getDashboardStats: async function() {
        return new Promise(resolve => {
            setTimeout(() => {
                const users = JSON.parse(localStorage.getItem('admin_users') || '[]');
                
                // Real DB counting
                const customPlacesRaw = JSON.parse(localStorage.getItem('siteSeeking_custom_places') || '{}');
                let customPlacesCount = 0;
                for(let cat in customPlacesRaw) {
                    customPlacesCount += customPlacesRaw[cat].length;
                }

                const userSaves = JSON.parse(localStorage.getItem('siteSeeking_saved') || '[]');

                resolve({
                    totalUsers: users.length,
                    activeUsers: users.filter(u => u.status === 'active').length,
                    totalRevenue: customPlacesCount,
                    bounceRate: userSaves.length
                });
            }, 300);
        });
    }
};

AdminAPI.init();
