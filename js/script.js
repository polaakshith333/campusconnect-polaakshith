/**
 * CampusConnect Week 3 Logic
 * --------------------------
 * Handles event registration and data persistence.
 */

// Key for browser storage
const STORAGE_KEY = 'campus_connect_registrations';

console.log("✅ JavaScript Brain is connected!");

document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. HANDLE REGISTRATION (For event-detail.html) ---
    const registerBtn = document.getElementById('register-btn');
    const titleHeader = document.getElementById('event-title');

    if (registerBtn && titleHeader) {
        const eventName = titleHeader.innerText;

        // Check if already registered on page load
        const savedRegs = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        if (savedRegs.includes(eventName)) {
            applyRegisteredUI(registerBtn);
        }

        // Listen for the click
        registerBtn.addEventListener('click', function() {
            let registrations = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

            if (!registrations.includes(eventName)) {
                registrations.push(eventName);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(registrations));
                
                applyRegisteredUI(this);
                alert("🎉 Success! You registered for: " + eventName);
            }
        });
    }

    // --- 2. HANDLE DISPLAY (For my-registrations.html) ---
    const listContainer = document.getElementById('registrations-list');

    if (listContainer) {
        const registrations = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        
        if (registrations.length === 0) {
            listContainer.innerHTML = `<p style="color: #64748b; padding: 2rem;">You haven't registered for any events yet.</p>`;
        } else {
            listContainer.innerHTML = registrations.map(event => `
                <div style="background: white; padding: 1.2rem; margin-bottom: 1rem; border-radius: 12px; border-left: 6px solid #2563eb; box-shadow: 0 4px 6px rgba(0,0,0,0.1); display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-weight: bold; font-size: 1.1rem; color: #1e293b;">${event}</span>
                    <span style="color: #10b981; font-weight: 800; font-size: 0.8rem; background: #ecfdf5; padding: 0.3rem 0.6rem; border-radius: 6px;">CONFIRMED</span>
                </div>
            `).join('');
        }
    }
});

/**
 * Helper to update button appearance
 */
function applyRegisteredUI(btn) {
    btn.innerText = "✓ Registered";
    btn.style.backgroundColor = "#10b981"; // Success Green
    btn.style.color = "white";
    btn.disabled = true;
    btn.style.cursor = "default";
}
// Week 4 Polish: Checked and validated registration logic
