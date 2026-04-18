// Core Authentication & Theme Guard
// This script runs immediately on script load to prevent unauthorized page flashes and apply user preferences
(function() {
    // 1. Theme Initialization (Run immediately before DOM load)
    const savedTheme = localStorage.getItem('siteSeeking_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // 2. Auth Session Check
    const isUserLoggedIn = localStorage.getItem('siteSeeking_session') === 'active';
    
    // Define pages that don't require authentication
    const publicRoutes = ['login.html', 'register.html'];
    
    const pathArray = window.location.pathname.split('/');
    let currentPage = pathArray[pathArray.length - 1];
    if (!currentPage || currentPage === '') currentPage = 'index.html';

    // Protect private routes
    if (!isUserLoggedIn && !publicRoutes.includes(currentPage)) {
        window.location.replace('login.html');
    }
    
    // Redirect logged-in users away from auth pages
    if (isUserLoggedIn && (currentPage === 'login.html' || currentPage === 'register.html')) {
        window.location.replace('dashboard.html');
    }
})();

// Global Theme Logic
window.toggleTheme = function() {
    const root = document.documentElement;
    const body = document.body;
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Trigger Crazy Animation
    body.classList.add('theme-vortex');
    
    // Change theme halfway through animation
    setTimeout(() => {
        root.setAttribute('data-theme', newTheme);
        localStorage.setItem('siteSeeking_theme', newTheme);
    }, 600);
    
    // Clean up class
    setTimeout(() => {
        body.classList.remove('theme-vortex');
    }, 1200);
};

// Listen for theme changes in other tabs
window.addEventListener('storage', (e) => {
    if (e.key === 'siteSeeking_theme') {
        document.documentElement.setAttribute('data-theme', e.newValue);
    }
});

// Automatically inject global decorative elements & load animations on every page
document.addEventListener("DOMContentLoaded", () => {
    // Insert beautiful dynamic white/blue background blobs globally
    if (!document.querySelector('.global-blob')) {
        const blob1 = document.createElement('div');
        blob1.className = 'global-blob blob-1';
        document.body.prepend(blob1);

        const blob2 = document.createElement('div');
        blob2.className = 'global-blob blob-2';
        document.body.prepend(blob2);
    }
    
    // Apply global sleek sliding reveal to the page body for unity
    document.body.style.opacity = '0';
    document.body.style.animation = 'fadeInUpCard 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards';
});

// Helper to handle authentication submissions (Now with 2FA/OTP Simulation)
window.handleAuthSubmit = function(event) {
    if (event) event.preventDefault();
    
    const form = event.target;
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    
    // 1. Initial Authentication Animation
    btn.innerHTML = '<i class="ph ph-spinner ph-spin"></i> Authenticating...';
    btn.disabled = true;
    
    setTimeout(() => {
        // Hide Main Form, Show OTP Section
        const authBox = form.closest('.auth-box');
        const mainForm = authBox.querySelector('form');
        const otpSection = authBox.querySelector('.otp-section');
        const subtitle = authBox.querySelector('.subtitle');
        const email = mainForm.querySelector('input[type="email"]').value;
        const isLogin = window.location.pathname.includes('login.html');

        if (isLogin) {
            const name = email.split('@')[0];
            const logs = JSON.parse(localStorage.getItem('admin_logs') || '[]');
            logs.unshift({ id: Math.random().toString(36).substr(2, 9), user: name, action: 'Logged in', time: new Date().toISOString() });
            localStorage.setItem('admin_logs', JSON.stringify(logs));
            
            // Sync with admin users database
            syncUserToAdminDatabase(name, email);
            
            localStorage.setItem('siteSeeking_active_user', name);
            localStorage.setItem('siteSeeking_session', 'active');
            window.location.href = 'dashboard.html';
            return; // completely stops execution so the form won't progress to OTP!
        }

        if (mainForm && otpSection) {
            mainForm.style.display = 'none';
            otpSection.style.display = 'block';
            subtitle.innerHTML = `We've sent a 6-digit code to <strong>${email}</strong>`;
            
            // Save info temporarily for OTP verification
            const nameInput = mainForm.querySelector('input[type="text"]');
            sessionStorage.setItem('temp_auth_user', JSON.stringify({
                email: email,
                name: nameInput ? nameInput.value : email.split('@')[0]
            }));

            // Send actual email OTP request to node/python backend
            fetch('http://localhost:5005/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email })
            }).then(res => res.json())
              .then(data => {
                  if(data.success) {
                      sessionStorage.setItem('realSystemOTP', data.otp);
                      console.log("OTP successfully sent by server! Check terminal if SENDER_EMAIL is not set.");
                  }
              }).catch(err => {
                  console.log("Backend offline, defaulting to 123456.");
                  sessionStorage.setItem('realSystemOTP', '123456');
              });
            
            // Focus on first OTP input
            setTimeout(() => {
                const firstInput = otpSection.querySelector('.otp-input-group input');
                if (firstInput) firstInput.focus();
            }, 100);
        }
        
        btn.innerHTML = originalText;
        btn.disabled = false;
    }, 1500);
};

// OTP Verification Engine
window.verifyOTP = function(event) {
    if (event) event.preventDefault();
    const btn = event.target.querySelector('button');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = '<i class="ph ph-spinner ph-spin"></i> Verifying...';
    btn.disabled = true;

    // Collect OTP digits
    const inputs = document.querySelectorAll('.otp-input-group input');
    let otpValue = "";
    inputs.forEach(input => otpValue += input.value);

    setTimeout(() => {
        const correctOtp = sessionStorage.getItem('realSystemOTP') || '123456';
        if (otpValue === correctOtp) {
            
            // If we are in Forgot Password mode (resetting password)
            if (sessionStorage.getItem('reset_mode') === 'true') {
                const authBox = event.target.closest('.auth-box');
                authBox.querySelector('.otp-section').style.display = 'none';
                authBox.querySelector('.new-password-section').style.display = 'block';
                btn.innerHTML = originalText;
                btn.disabled = false;
                return;
            }

            // Normal Auth flow
            // Capture temp user data from sessionStorage
            const tempUser = JSON.parse(sessionStorage.getItem('temp_auth_user') || '{}');
            const isRegister = window.location.pathname.includes('register.html');
            const name = tempUser.name || tempUser.email?.split('@')[0] || 'User';
            const email = tempUser.email || 'user@example.com';
            
            // Connect to Admin DB
            const logs = JSON.parse(localStorage.getItem('admin_logs') || '[]');
            const users = JSON.parse(localStorage.getItem('admin_users') || '[]');
            
            if (isRegister) {
                const existing = users.find(u => u.email === email);
                if (!existing) {
                    users.unshift({
                        id: Math.random().toString(36).substr(2, 9),
                        name: name,
                        email: email,
                        role: 'user',
                        status: 'active',
                        joined: new Date().toISOString().split('T')[0]
                    });
                    localStorage.setItem('admin_users', JSON.stringify(users));
                    logs.unshift({ id: Math.random().toString(36).substr(2, 9), user: 'System', action: `New user registered: ${name}`, time: new Date().toISOString() });
                }
                logs.unshift({ id: Math.random().toString(36).substr(2, 9), user: name, action: 'Registered and logged in', time: new Date().toISOString() });
            } else {
                logs.unshift({ id: Math.random().toString(36).substr(2, 9), user: name, action: 'Logged in', time: new Date().toISOString() });
            }
            localStorage.setItem('admin_logs', JSON.stringify(logs));
            
            // Store active user name
            localStorage.setItem('siteSeeking_active_user', name);
            sessionStorage.removeItem('temp_auth_user');

            localStorage.setItem('siteSeeking_session', 'active');
            window.location.href = 'dashboard.html';
        } else {
            alert(`Invalid OTP. Please check your email inbox (or python console).`);
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    }, 1200);
};

// Helper for OTP input focus shifting
window.moveFocus = function(current, nextId) {
    if (current.value.length === 1 && nextId) {
        document.getElementById(nextId).focus();
    }
};

// Helper for signing out
window.handleSignOut = function(event) {
    if (event) event.preventDefault();
    
    // Log sign out
    const logs = JSON.parse(localStorage.getItem('admin_logs') || '[]');
    const activeUser = localStorage.getItem('siteSeeking_active_user') || 'User';
    logs.unshift({ id: Math.random().toString(36).substr(2, 9), user: activeUser, action: 'Logged out', time: new Date().toISOString() });
    localStorage.setItem('admin_logs', JSON.stringify(logs));
    localStorage.removeItem('siteSeeking_active_user');

    localStorage.removeItem('siteSeeking_session');
    window.location.href = 'index.html';
};

// ----------------------------------------
// FORGOT PASSWORD FLOW
// ----------------------------------------
window.showForgotPassword = function(e) {
    if (e) e.preventDefault();
    const authBox = e.target.closest('.auth-box');
    authBox.querySelector('form').style.display = 'none'; // hide main login
    authBox.querySelector('.forgot-password-section').style.display = 'block';
};

window.cancelReset = function(e) {
    if (e) e.preventDefault();
    const authBox = e.target.closest('.auth-box');
    authBox.querySelector('form').style.display = 'block'; 
    authBox.querySelector('.forgot-password-section').style.display = 'none';
};

window.handleForgotPassword = function(e) {
    if (e) e.preventDefault();
    const email = document.getElementById('reset-email').value;
    const btn = e.target.querySelector('button');
    const orig = btn.innerHTML;
    btn.innerHTML = 'Sending...';
    btn.disabled = true;

    sessionStorage.setItem('reset_mode', 'true');
    sessionStorage.setItem('temp_auth_user', JSON.stringify({ email: email, name: email.split('@')[0] }));

    fetch('http://localhost:5005/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email })
    }).then(res => res.json())
      .then(data => {
          sessionStorage.setItem('realSystemOTP', data.otp);
          finishSend();
      }).catch(err => {
          sessionStorage.setItem('realSystemOTP', '123456');
          finishSend();
      });

    function finishSend() {
        const authBox = e.target.closest('.auth-box');
        authBox.querySelector('.forgot-password-section').style.display = 'none';
        
        const otpSection = authBox.querySelector('.otp-section');
        otpSection.style.display = 'block';
        otpSection.querySelector('.subtitle').innerHTML = `Recovery OTP sent to <strong>${email}</strong>`;
        
        btn.innerHTML = orig;
        btn.disabled = false;
    }
};

window.saveNewPassword = function(e) {
    if (e) e.preventDefault();
    // Simulate updating DB (Since our users mock DB has no password field natively configured by the user yet)
    
    // Log the event securely
    const tempUser = JSON.parse(sessionStorage.getItem('temp_auth_user') || '{}');
    const logs = JSON.parse(localStorage.getItem('admin_logs') || '[]');
    logs.unshift({ id: Math.random().toString(36).substr(2, 9), user: tempUser.name || 'User', action: 'Reset Password Successfully', time: new Date().toISOString() });
    localStorage.setItem('admin_logs', JSON.stringify(logs));
    
    alert("New password successfully secured! Please login again.");
    sessionStorage.removeItem('reset_mode');
    window.location.reload();
};

// ----------------------------------------
// SOCIAL & NUMBER LOGIN
// ----------------------------------------
window.handleSocialLogin = function(provider) {
    if (provider === 'Gmail' || provider === 'Google') {
        const left = (screen.width/2)-(400/2);
        const top = (screen.height/2)-(600/2);
        window.open('google_auth.html', 'Google OAuth', `width=400,height=600,top=${top},left=${left},resizable=no,scrollbars=yes`);
        
        // Listen for authorized token/payload from popup
        window.addEventListener('message', function authListener(event) {
            if (event.data && event.data.type === 'GOOGLE_OAUTH_SUCCESS') {
                window.removeEventListener('message', authListener);
                completeSocialLogin('Gmail', event.data.email.split('@')[0], event.data.email);
            }
        });
    } else if (provider === 'Phone') {
        const number = prompt("Please enter your mobile number (e.g., +91 9876543210):");
        if (number && number.trim().length > 5) {
            
            // Ask for desired Display Name
            let chosenUsername = prompt("What would you like your Display Name to be?");
            if (!chosenUsername || chosenUsername.trim() === '') chosenUsername = "User";

            alert(`Sending secure OTP to ${number}...`);
            // Morph UI to show OTP verification
            const authBox = document.querySelector('.auth-box');
            if(authBox) {
                const forms = authBox.querySelectorAll('form');
                if(forms.length) forms[0].style.display = 'none';
                
                const otpSection = authBox.querySelector('.otp-section');
                if(otpSection) {
                    otpSection.style.display = 'block';
                    const subtitle = authBox.querySelector('.subtitle');
                    if(subtitle) subtitle.innerHTML = `We've sent a 6-digit code to <strong>${number}</strong> via SMS.`;
                    
                    setTimeout(() => {
                        const firstInput = otpSection.querySelector('.otp-input-group input');
                        if (firstInput) firstInput.focus();
                    }, 100);
                }
                sessionStorage.setItem('temp_auth_user', JSON.stringify({ email: number, name: chosenUsername }));
                sessionStorage.setItem('realSystemOTP', '123456'); // Simulated telecom SMS
                console.log("Mock Phone OTP is 123456");
            }
        }
    }
};

function completeSocialLogin(provider, name, emailFallback = '') {
    const logs = JSON.parse(localStorage.getItem('admin_logs') || '[]');
    logs.unshift({ id: Math.random().toString(36).substr(2, 9), user: name, action: `Logged in via ${provider}`, time: new Date().toISOString() });
    localStorage.setItem('admin_logs', JSON.stringify(logs));
    
    // Auto add to admin management structure seamlessly 
    let mockEmail = emailFallback || (provider === 'Phone' ? `${name}@phone.auth` : `${name}@gmail.com`);
    syncUserToAdminDatabase(name, mockEmail);
    
    localStorage.setItem('siteSeeking_active_user', name);
    localStorage.setItem('siteSeeking_session', 'active');
    
    // Animate loader slightly before redirecting
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 500);
}

// ----------------------------------------
// ADMIN DATABASE SYNC HELPER
// ----------------------------------------
window.syncUserToAdminDatabase = function(name, email) {
    const users = JSON.parse(localStorage.getItem('admin_users') || '[]');
    const existing = users.find(u => u.email === email || u.name === name);
    if (!existing) {
        users.unshift({
            id: Math.random().toString(36).substr(2, 9),
            name: name,
            email: email,
            role: 'user',
            status: 'active',
            joined: new Date().toISOString().split('T')[0]
        });
        localStorage.setItem('admin_users', JSON.stringify(users));
        
        // Log the creation
        const logs = JSON.parse(localStorage.getItem('admin_logs') || '[]');
        logs.unshift({ id: Math.random().toString(36).substr(2, 9), user: 'System', action: `New user automatically registered: ${name}`, time: new Date().toISOString() });
        localStorage.setItem('admin_logs', JSON.stringify(logs));
    }
}
