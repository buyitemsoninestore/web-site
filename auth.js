// Supabase Auth Handling Logic
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
let supabase;

// Initialize Supabase
if (window.supabase) {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

document.addEventListener('DOMContentLoaded', async () => {
    // Check Current Session on Page Load
    const { data: { session } } = await supabase.auth.getSession();

    // Update Global Navbar Login Button if Auth exists
    const navAuthBtn = document.querySelector('.nav-auth-btn');
    if (navAuthBtn && session) {
        navAuthBtn.href = 'dashboard.html';
        navAuthBtn.innerHTML = `
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span>Dashboard</span>
        `;
    }

    // Login Form Processing
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        // If already logged in, skip login page
        if (session) window.location.href = 'dashboard.html';

        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = loginForm.querySelector('input[type="email"]').value;
            const password = loginForm.querySelector('input[type="password"]').value;

            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (data.user) {
                window.location.href = 'dashboard.html';
            } else {
                alert('Login failed: ' + error.message);
            }
        });
    }

    // Registration Form Processing
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const fullName = registerForm.querySelector('input[type="text"]').value;
            const email = registerForm.querySelector('input[type="email"]').value;
            const password = registerForm.querySelector('input[type="password"]').value;

            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: { data: { full_name: fullName } }
            });

            if (data.user) {
                alert('Registration successful! Please verify your email.');
                window.location.href = 'login.html';
            } else {
                alert('Registration failed: ' + error.message);
            }
        });
    }

    // Google Login Handling
    const handleGoogleLogin = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: window.location.origin + '/dashboard.html'
            }
        });

        if (error) alert('Google login failed: ' + error.message);
    };

    // Attach to all Google buttons (Login & Register pages)
    const googleBtns = document.querySelectorAll('.social-btn');
    googleBtns.forEach(btn => {
        if (btn.innerText.includes('Google')) {
            btn.addEventListener('click', handleGoogleLogin);
        }
    });

    // Dashboard Initialization
    if (window.location.pathname.includes('dashboard.html')) {
        if (!session) {
            window.location.href = 'login.html';
            return;
        }

        const userDisplayName = document.getElementById('user-display-name');
        if (userDisplayName && session.user.user_metadata.full_name) {
            userDisplayName.textContent = `Hi, ${session.user.user_metadata.full_name}!`;
        }

        // Logout Logic
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', async () => {
                await supabase.auth.signOut();
                window.location.href = 'index.html';
            });
        }
    }
});
