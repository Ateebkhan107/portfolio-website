 // Scroll animations
 function handleScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in');
    const windowHeight = window.innerHeight;

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('visible');
        }
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.navigation a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Header transparency on scroll
function handleHeaderScroll() {
    const header = document.querySelector('header');
    const scrollY = window.scrollY;
    
    if (scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 1px 3px 0 rgb(0 0 0 / 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
}

// Interactive card effects
function initInteractiveElements() {
    const cards = document.querySelectorAll('.skill-card, .education-card, .project-card, .achievement-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Disable submit button
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !message) {
                showMessage('Please fill in all required fields.', 'error');
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showMessage('Please enter a valid email address.', 'error');
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
                return;
            }
            
            try {
                // Send email via backend API
                await sendEmail(name, email, phone, message);
                
                // Show popup notification
                showPopup('THANKS FOR CONTACTING! Your message has been sent successfully.', 'success');
                contactForm.reset();
                
            } catch (error) {
                showPopup(error.message || 'Sorry, there was an error sending your message. Please try again.', 'error');
            }
            
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        });
    }
}

// Send email via backend API
async function sendEmail(name, email, phone, message) {
    const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            email,
            phone,
            message
        })
    });

    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.message || 'Failed to send message');
    }
    
    return data;
}

// Show success/error messages
function showMessage(text, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.textContent = text;
    
    // Insert before the form
    const contactForm = document.getElementById('contactForm');
    contactForm.parentNode.insertBefore(message, contactForm);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (message.parentNode) {
            message.remove();
        }
    }, 5000);
}

// Show popup notification
function showPopup(message, type = 'success') {
    // Create popup overlay
    const popup = document.createElement('div');
    popup.className = 'popup-overlay';
    
    // Create popup content
    const popupContent = document.createElement('div');
    popupContent.className = `popup-content ${type}`;
    
    // Create icon
    const icon = document.createElement('i');
    icon.className = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
    
    // Create message text
    const messageText = document.createElement('p');
    messageText.textContent = message;
    
    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'popup-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.onclick = () => {
        document.body.removeChild(popup);
    };
    
    // Assemble popup
    popupContent.appendChild(closeBtn);
    popupContent.appendChild(icon);
    popupContent.appendChild(messageText);
    popup.appendChild(popupContent);
    
    // Add to body
    document.body.appendChild(popup);
    
    // Auto-close after 4 seconds
    setTimeout(() => {
        if (document.body.contains(popup)) {
            document.body.removeChild(popup);
        }
    }, 4000);
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navigation = document.querySelector('.navigation');
    
    if (mobileToggle && navigation) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navigation.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = navigation.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navigation.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileToggle.contains(e.target) && !navigation.contains(e.target)) {
                mobileToggle.classList.remove('active');
                navigation.classList.remove('active');
            }
        });
    }
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    initSmoothScrolling();
    initInteractiveElements();
    initContactForm();
    initMobileMenu();
    handleScrollAnimations();
});

// Event listeners
window.addEventListener('scroll', () => {
    handleScrollAnimations();
    handleHeaderScroll();
});