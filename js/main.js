// Everything Has a Home - Main JavaScript

// DOM Elements
const mainScreen = document.getElementById('main-screen');
const homelessScreen = document.getElementById('homeless-screen');

// Navigation Functions
function showHomelessScreen() {
    mainScreen.classList.add('hidden');
    homelessScreen.classList.remove('hidden');
}

function showMainScreen() {
    homelessScreen.classList.add('hidden');
    mainScreen.classList.remove('hidden');
}

// Photo Functions
function takePhoto() {
    const photoArea = document.querySelector('.photo-area');
    
    // Check if we can access camera (this is a mock for now)
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // In a real app, this would open the camera
        simulatePhotoCapture();
    } else {
        // Fallback for testing
        simulatePhotoCapture();
    }
    
    function simulatePhotoCapture() {
        photoArea.classList.add('has-photo');
        photoArea.innerHTML = `
            <div class="photo-placeholder">📸</div>
            <div class="photo-title">Photo captured!</div>
            <div class="photo-subtitle">Now answer the questions below ↓</div>
        `;
        
        // Show a success animation
        photoArea.style.transform = 'scale(1.02)';
        setTimeout(() => {
            photoArea.style.transform = 'scale(1)';
        }, 200);
    }
}

// Question Selection
function selectOption(element) {
    // Remove selected class from siblings
    const siblings = element.parentNode.querySelectorAll('.option-button');
    siblings.forEach(sibling => sibling.classList.remove('selected'));
    
    // Add selected class to clicked element
    element.classList.add('selected');
    
    // Check if both questions are answered
    checkQuestionsCompletion();
}

// Check if all questions are answered and update suggestion
function checkQuestionsCompletion() {
    const selectedOptions = document.querySelectorAll('.option-button.selected');
    
    if (selectedOptions.length >= 2) {
        // Get the selected answers
        const frequency = selectedOptions[0].textContent;
        const location = selectedOptions[1].textContent;
        
        // Generate suggestion based on answers
        generateSuggestion(frequency, location);
    }
}

// Generate home suggestion based on user answers
function generateSuggestion(frequency, location) {
    const suggestionBox = document.querySelector('.suggestion-box');
    const suggestionText = suggestionBox.querySelector('.suggestion-text');
    
    let suggestion = '';
    
    // Logic for generating suggestions
    if (frequency === 'Daily') {
        if (location === 'Kitchen') {
            suggestion = 'Since you use this daily in the kitchen, try:<br><strong>"Counter drawer next to where you prep food"</strong>';
        } else if (location === 'Bedroom') {
            suggestion = 'Since you use this daily in the bedroom, try:<br><strong>"Nightstand drawer or tray on dresser"</strong>';
        } else if (location === 'Living room') {
            suggestion = 'Since you use this daily in the living room, try:<br><strong>"Coffee table drawer or side table"</strong>';
        } else if (location === 'Office/Desk') {
            suggestion = 'Since you use this daily at your desk, try:<br><strong>"Top desk drawer or desktop organizer"</strong>';
        }
    } else if (frequency === 'Weekly') {
        suggestion = `Since you use this weekly in the ${location.toLowerCase()}, try:<br><strong>"A designated shelf or cabinet in that room"</strong>`;
    } else if (frequency === 'Monthly') {
        suggestion = `Since you use this monthly, try:<br><strong>"A storage box labeled '${location}' items"</strong>`;
    } else if (frequency === 'Rarely') {
        suggestion = 'Since you rarely use this, consider:<br><strong>"High shelf storage or donate if not needed"</strong>';
    }
    
    suggestionText.innerHTML = suggestion;
    
    // Add a gentle animation to draw attention
    suggestionBox.style.transform = 'scale(1.02)';
    setTimeout(() => {
        suggestionBox.style.transform = 'scale(1)';
    }, 300);
}

// Notification handlers
function handleDoneButton() {
    const notificationCard = document.querySelector('.notification-card');
    notificationCard.style.opacity = '0';
    notificationCard.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        notificationCard.style.display = 'none';
    }, 300);
    
    // In a real app, this would save the completion to storage
    console.log('User completed daily routine');
}

function handleSkipButton() {
    const notificationCard = document.querySelector('.notification-card');
    notificationCard.style.opacity = '0.5';
    
    // In a real app, this might set a reminder for later
    console.log('User skipped daily routine');
    
    setTimeout(() => {
        notificationCard.style.display = 'none';
    }, 2000);
}

// Create home button handler
function handleCreateHome() {
    const createButton = document.querySelector('.create-home-button');
    
    // Visual feedback
    createButton.innerHTML = '✅ Home Created!';
    createButton.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    
    // In a real app, this would:
    // 1. Save the item and its home location
    // 2. Add it to the user's catalog
    // 3. Set up location-based reminders
    
    setTimeout(() => {
        // Navigate back to main screen with success message
        showMainScreen();
        showSuccessMessage();
    }, 1500);
}

// Show success message after creating a home
function showSuccessMessage() {
    const mainContent = document.querySelector('.main-content');
    
    const successBanner = document.createElement('div');
    successBanner.className = 'success-banner';
    successBanner.innerHTML = `
        <div class="success-content">
            <span class="success-icon">🎉</span>
            <span class="success-text">Great! Your item now has a home!</span>
        </div>
    `;
    
    // Add styles for success banner
    successBanner.style.cssText = `
        background: linear-gradient(135deg, #d1fae5, #a7f3d0);
        border-radius: 20px;
        padding: 20px;
        margin-bottom: 24px;
        box-shadow: 0 4px 20px rgba(16, 185, 129, 0.15);
        border: 1px solid rgba(16, 185, 129, 0.2);
        position: relative;
        overflow: hidden;
        transform: translateY(-20px);
        opacity: 0;
        transition: all 0.3s ease;
    `;
    
    const successContent = successBanner.querySelector('.success-content');
    successContent.style.cssText = `
        display: flex;
        align-items: center;
        color: #047857;
        font-weight: 600;
        font-size: 16px;
    `;
    
    const successIcon = successBanner.querySelector('.success-icon');
    successIcon.style.cssText = `
        font-size: 24px;
        margin-right: 12px;
    `;
    
    // Insert at the top of main content
    const firstChild = mainContent.firstElementChild;
    mainContent.insertBefore(successBanner, firstChild);
    
    // Animate in
    setTimeout(() => {
        successBanner.style.transform = 'translateY(0)';
        successBanner.style.opacity = '1';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        successBanner.style.transform = 'translateY(-20px)';
        successBanner.style.opacity = '0';
        setTimeout(() => {
            if (successBanner.parentNode) {
                successBanner.parentNode.removeChild(successBanner);
            }
        }, 300);
    }, 4000);
}

// Initialize app
function initializeApp() {
    // Add event listeners
    const doneButton = document.querySelector('.done-button');
    const skipButton = document.querySelector('.skip-button');
    const createHomeButton = document.querySelector('.create-home-button');
    
    if (doneButton) {
        doneButton.addEventListener('click', handleDoneButton);
    }
    
    if (skipButton) {
        skipButton.addEventListener('click', handleSkipButton);
    }
    
    if (createHomeButton) {
        createHomeButton.addEventListener('click', handleCreateHome);
    }
    
    // Simulate location-based notifications (in real app, this would use geolocation)
    simulateLocationDetection();
}

// Simulate location-based reminders
function simulateLocationDetection() {
    // In a real app, this would:
    // 1. Use geolocation API to detect when user arrives home
    // 2. Show notification only during certain hours
    // 3. Track which items still need homes
    
    console.log('Location detection initialized');
    
    // For demo purposes, show notification after 3 seconds
    setTimeout(() => {
        console.log('User detected at home - showing reminder');
        // Notification is already visible, but this could trigger it
    }, 3000);
}

// Progress tracking
function updateProgress() {
    // In a real app, this would:
    // 1. Count total items cataloged
    // 2. Track which daily items have homes
    // 3. Calculate completion percentage
    // 4. Update the progress section dynamically
    
    const progressItems = document.querySelectorAll('.progress-item');
    let completedItems = 0;
    
    progressItems.forEach(item => {
        const status = item.querySelector('.progress-status');
        if (status.classList.contains('status-done')) {
            completedItems++;
        }
    });
    
    console.log(`Progress: ${completedItems}/${progressItems.length} daily items have homes`);
}

// Search functionality (for future implementation)
function initializeSearch() {
    // This would handle the "Where did I put...?" functionality
    // 1. Search through cataloged items
    // 2. Use fuzzy matching for item names
    // 3. Show location with visual cues
    // 4. Track successful finds for gamification
    
    console.log('Search functionality ready');
}

// Gamification features
function updateGamification() {
    // Features to implement:
    // 1. Points for adding items (+10 points)
    // 2. Streaks for daily organization
    // 3. Achievements for milestones
    // 4. Level progression
    // 5. Friendly competition with family/roommates
    
    console.log('Gamification system active');
}

// Data persistence (for future implementation)
function saveData() {
    // In a real app, this would:
    // 1. Save to local storage as backup
    // 2. Sync with cloud database
    // 3. Export data for backup
    // 4. Import existing organization systems
    
    console.log('Data persistence ready');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    updateProgress();
    initializeSearch();
    updateGamification();
    console.log('Everything Has a Home app initialized!');
});

// Service Worker registration (for PWA functionality)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}