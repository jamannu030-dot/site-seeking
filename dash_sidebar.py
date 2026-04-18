import os

dashboard_css = """
/* --- Dashboard & Sidebar Layout --- */
.dashboard-container {
    display: flex;
    max-width: 1600px;
    margin: 40px auto;
    padding: 0 5%;
    gap: 40px;
    position: relative;
    z-index: 2;
}

.sidebar {
    width: 260px;
    flex-shrink: 0;
    background: rgba(1, 10, 28, 0.4);
    backdrop-filter: blur(10px);
    border: 1px solid var(--glass-border);
    padding: 30px 0; /* Removing side padding for flush hover states */
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.sidebar-title {
    font-size: 0.8rem;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 2px;
    margin: 20px 0 10px 25px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
}

.sidebar a {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 15px 25px;
    color: var(--text-primary);
    text-decoration: none;
    font-size: 1.05rem;
    font-family: 'Montserrat', sans-serif;
    transition: all 0.3s ease;
    border-left: 3px solid transparent;
    position: relative;
}

.sidebar a:hover, .sidebar a.active {
    background: rgba(0, 229, 255, 0.05);
    border-left-color: var(--accent-teal);
    color: var(--accent-teal);
}

.sidebar a i {
    font-size: 1.4rem;
}

.dashboard-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(1, 10, 28, 0.4);
    backdrop-filter: blur(10px);
    border: 1px solid var(--glass-border);
    padding: 25px 30px;
}

#dash-greeting {
    font-size: 1.8rem;
    font-family: 'Playfair Display', serif;
    color: var(--text-primary);
    margin: 0;
}

.user-profile-badge {
    display: flex;
    align-items: center;
    gap: 15px;
    cursor: pointer;
    background: var(--input-bg);
    padding: 8px 20px;
    border: 1px solid var(--glass-border);
    transition: all 0.3s ease;
}

.user-profile-badge:hover {
    border-color: var(--accent-teal);
    box-shadow: 0 0 15px rgba(0, 229, 255, 0.2);
}

.avatar {
    width: 35px;
    height: 35px;
    background: var(--accent-teal);
    color: #010A1C;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    font-weight: bold;
    font-size: 1.2rem;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
}

.stat-card {
    background: rgba(1, 10, 28, 0.4);
    backdrop-filter: blur(10px);
    border: 1px solid var(--glass-border);
    padding: 25px;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
}

.stat-card:hover {
    border-color: var(--accent-teal);
    transform: translateY(-5px);
}

.stat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.stat-header h4 {
    font-family: 'Montserrat', sans-serif;
    color: var(--text-secondary);
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.stat-icon {
    font-size: 2rem;
    color: var(--accent-teal);
}

.stat-card .value {
    font-size: 3rem;
    font-weight: 700;
    color: var(--text-primary);
    font-family: 'Playfair Display', serif;
}

.dashboard-section {
    margin-top: 20px;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.section-header h3 {
    font-size: 1.6rem;
    font-family: 'Playfair Display', serif;
    color: var(--text-primary);
}

.activity-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(1, 10, 28, 0.4);
    backdrop-filter: blur(10px);
    border: 1px solid var(--glass-border);
    padding: 20px 25px;
    transition: all 0.3s ease;
}

.activity-item:hover {
    border-color: var(--accent-teal);
    transform: translateX(10px) translateZ(0); 
}

.activity-content {
    display: flex;
    align-items: center;
    gap: 20px;
}

.activity-icon {
    font-size: 1.8rem;
}

.activity-text {
    font-family: 'Montserrat', sans-serif;
    color: var(--text-primary);
    font-size: 1.1rem;
}

.activity-time {
    color: var(--text-secondary);
    font-size: 0.9rem;
    font-family: 'Montserrat', sans-serif;
}
"""

with open("styles.css", "a", encoding="utf-8") as f:
    f.write("\n" + dashboard_css + "\n")

print("Dashboard specific styles rigorously injected.")
