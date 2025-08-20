// Global Variables
let portfolioData = {};

// DOM Elements
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.getElementById('navbar');
const typingText = document.getElementById('typing-text');
const loadingScreen = document.getElementById('loading-screen');
const cvDownloadBtn = document.getElementById('cv-download');
const hireMeBtn = document.getElementById('hire-me');
const hireMeMainBtn = document.getElementById('hire-me-main');

// AI/GenAI focused typing phrases with enhanced variety
const phrases = [
    'AI Engineer & GenAI Specialist',
    'RAG Pipeline Architect',
    'LangChain Expert',
    'MLOps Engineer',
    'Generative AI Developer',
    'Neural Network Designer',
    'LLM Integration Specialist',
    'Machine Learning Engineer'
];

let currentPhrase = 0;
let currentChar = 0;
let isDeleting = false;

// Initialize AOS (Animate On Scroll)
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100,
            delay: 100
        });
    }
}

// Loading Screen Animation
function showLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.remove('hidden');
        
        // Simulate loading process
        setTimeout(() => {
            hideLoadingScreen();
        }, 3000);
    }
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        // Initialize AOS after loading
        setTimeout(() => {
            initAOS();
        }, 500);
    }
}

// Load Portfolio Data from JSON
async function loadPortfolioData() {
    try {
        const response = await fetch('portfolio-data-updated.json');
        if (!response.ok) {
            throw new Error('Failed to fetch portfolio data');
        }
        portfolioData = await response.json();
        console.log('ðŸš€ Portfolio data loaded successfully:', portfolioData);
        populatePortfolio();
        return true;
    } catch (error) {
        console.error('âŒ Error loading portfolio data:', error);
        // Try fallback JSON file
        try {
            const fallbackResponse = await fetch('portfolio-data.json');
            if (fallbackResponse.ok) {
                portfolioData = await fallbackResponse.json();
                console.log('ðŸ“¦ Fallback portfolio data loaded');
                populatePortfolio();
                return true;
            }
        } catch (fallbackError) {
            console.error('âŒ Fallback data also failed:', fallbackError);
        }
        // Use default data as last resort
        useDefaultData();
        return false;
    }
}

// Fallback data in case JSON fails to load
function useDefaultData() {
    console.log('ðŸ”„ Using default data...');
    portfolioData = {
        personalInfo: {
            name: "Rohit Kumar Kuppili",
            title: "AI Engineer & GenAI Specialist",
            tagline: "Building intelligent systems with RAG pipelines, LLMs, and advanced ML solutions",
            about: "Enthusiastic AI engineer with specialized experience in Generative AI, RAG pipelines, and LangChain. I focus on building full-stack ML systems, MLOps pipelines, and LLM integration.",
            email: "24mcs117@nith.ac.in",
            phone: "+91-7702315247",
            location: "NIT Hamirpur, Himachal Pradesh, India",
            github: "https://github.com/prof3soR",
            profileImage: "https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/23bbb1b3-0258-402d-9023-da3080e1c90b.png",
            cvUrl: "https://drive.google.com/file/d/your-cv-file-id/view"
        },
        skills: [
            {"name": "Python", "level": 95, "category": "Programming"},
            {"name": "LangChain", "level": 90, "category": "GenAI"},
            {"name": "OpenAI API", "level": 88, "category": "GenAI"},
            {"name": "RAG Pipelines", "level": 92, "category": "GenAI"},
            {"name": "MLOps", "level": 85, "category": "MLOps"},
            {"name": "Docker", "level": 80, "category": "DevOps"}
        ],
        projects: [],
        articles: [],
        achievements: [],
        socialLinks: {
            github: "https://github.com/prof3soR",
            linkedin: "https://linkedin.com/in/rohitkuppili",
            email: "24mcs117@nith.ac.in"
        }
    };
    populatePortfolio();
}

// Populate Portfolio with Data
function populatePortfolio() {
    populateHeroSection();
    populateAboutSection();
    populateSkillsSection();
    populateProjectsSection();
    populateArticlesSection();
    populateContactSection();
    console.log('âœ… Portfolio populated successfully!');
}

// Populate Hero Section
function populateHeroSection() {
    const heroName = document.getElementById('hero-name');
    const heroTagline = document.getElementById('hero-tagline');
    const projectsCount = document.getElementById('projects-count');
    const articlesCount = document.getElementById('articles-count');
    const profileImage = document.getElementById('profile-image');

    if (heroName && portfolioData.personalInfo.name) {
        heroName.innerHTML = `Hi, I'm <span class="gradient-text typing-text">${portfolioData.personalInfo.name}</span>`;
    }
    
    if (heroTagline && portfolioData.personalInfo.tagline) {
        heroTagline.textContent = portfolioData.personalInfo.tagline;
    }
    
    if (projectsCount && portfolioData.projects) {
        projectsCount.textContent = `${portfolioData.projects.length}+`;
    }
    
    if (articlesCount && portfolioData.articles) {
        articlesCount.textContent = `${portfolioData.articles.length}+`;
    }
    
    if (profileImage && portfolioData.personalInfo.profileImage) {
        profileImage.src = portfolioData.personalInfo.profileImage;
        profileImage.alt = portfolioData.personalInfo.name;
    }
}

// Populate About Section
function populateAboutSection() {
    const aboutText = document.getElementById('about-text');
    const educationTimeline = document.getElementById('education-timeline');
    const achievementsGrid = document.getElementById('achievements-grid');

    // About text
    if (aboutText && portfolioData.personalInfo.about) {
        aboutText.textContent = portfolioData.personalInfo.about;
    }

    // Education timeline
    if (educationTimeline && portfolioData.education) {
        educationTimeline.innerHTML = portfolioData.education.map(edu => `
            <div class="timeline-item">
                <h4>${edu.degree}</h4>
                <div class="institution">${edu.institution}</div>
                <div class="duration">${edu.duration} CGPA: ${edu.cgpa}</div>
            </div>
        `).join('');
    }

    // Achievements
    if (achievementsGrid && portfolioData.achievements) {
        achievementsGrid.innerHTML = portfolioData.achievements.map(achievement => `
            <div class="achievement-item">
                <div class="achievement-icon">
                    <i class="${achievement.icon || 'fas fa-trophy'}"></i>
                </div>
                <div class="achievement-content">
                    <h4>${achievement.title}</h4>
                    <p>${achievement.description} (${achievement.year})</p>
                </div>
            </div>
        `).join('');
    }
}

// Populate Skills Section
function populateSkillsSection() {
    const genaiSkills = document.getElementById('genai-skills');
    const mlopsSkills = document.getElementById('mlops-skills');
    const programmingSkills = document.getElementById('programming-skills');

    if (!portfolioData.skills) return;

    // Helper function to get skill icon
    function getSkillIcon(skill) {
        if (skill.icon) return skill.icon;
        
        const icons = {
            'Python': 'fab fa-python',
            'LangChain': 'fas fa-link',
            'OpenAI API': 'fas fa-brain',
            'RAG Pipelines': 'fas fa-project-diagram',
            'MLOps': 'fas fa-cogs',
            'Docker': 'fab fa-docker',
            'Flask/Django': 'fas fa-globe',
            'FAISS': 'fas fa-database',
            'Ollama': 'fas fa-robot',
            'Streamlit': 'fas fa-chart-line',
            'MLflow': 'fas fa-stream',
            'HuggingFace': 'fas fa-face-smile'
        };
        return icons[skill.name] || 'fas fa-code';
    }

    // Categorize skills
    const skillsByCategory = {
        GenAI: portfolioData.skills.filter(skill => skill.category === 'GenAI'),
        MLOps: portfolioData.skills.filter(skill => 
            skill.category === 'MLOps' || skill.category === 'DevOps'
        ),
        Programming: portfolioData.skills.filter(skill => 
            skill.category === 'Programming' || 
            skill.category === 'Web Dev' || 
            skill.category === 'Vector DB' || 
            skill.category === 'UI/UX'
        )
    };

    // Create skill item HTML
    function createSkillHTML(skill) {
        return `
            <div class="skill-item" data-skill="${skill.level}">
                <div class="skill-icon">
                    <i class="${getSkillIcon(skill)}"></i>
                </div>
                <h3>${skill.name}</h3>
                <div class="skill-progress">
                    <div class="progress-bar" data-progress="${skill.level}"></div>
                </div>
                <span class="skill-percentage">${skill.level}%</span>
            </div>
        `;
    }

    // Populate skill categories
    if (genaiSkills) {
        genaiSkills.innerHTML = skillsByCategory.GenAI.map(createSkillHTML).join('');
    }

    if (mlopsSkills) {
        mlopsSkills.innerHTML = skillsByCategory.MLOps.map(createSkillHTML).join('');
    }

    if (programmingSkills) {
        programmingSkills.innerHTML = skillsByCategory.Programming.map(createSkillHTML).join('');
    }
}

// Populate Projects Section
function populateProjectsSection() {
    const projectsGrid = document.getElementById('projects-grid');
    
    if (!projectsGrid || !portfolioData.projects) return;

    projectsGrid.innerHTML = portfolioData.projects.map(project => `
        <div class="project-card" data-category="${project.category}">
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}" loading="lazy">
                <div class="project-overlay">
                    <div class="project-links">
                        <a href="${project.github}" class="project-link" target="_blank" rel="noopener noreferrer" title="View Source Code">
                            <i class="fab fa-github"></i>
                        </a>
                        <a href="${project.live}" class="project-link" target="_blank" rel="noopener noreferrer" title="View Live Demo">
                            <i class="fas fa-external-link-alt"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');

    // Initialize project filtering
    initProjectFiltering();
}

// Initialize Project Filtering
function initProjectFiltering() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter projects with animation
            projectCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animation = `fadeIn 0.6s ease-in ${index * 0.1}s`;
                    card.style.animationFillMode = 'both';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Populate Articles Section
function populateArticlesSection() {
    const articlesGrid = document.getElementById('articles-grid');
    
    if (!articlesGrid || !portfolioData.articles) return;

    articlesGrid.innerHTML = portfolioData.articles.map((article, index) => `
        <div class="article-card" data-aos="fade-up" data-aos-delay="${index * 100}">
            <div class="article-header">
                <div class="article-icon">
                    <i class="fas fa-pen-nib"></i>
                </div>
                <div class="article-meta">
                    <div class="article-platform">${article.platform}</div>
                    <div class="article-views">${article.views} views</div>
                </div>
            </div>
            <h3>${article.title}</h3>
            <a href="${article.url}" target="_blank" rel="noopener noreferrer" class="article-link">
                Read Article <i class="fas fa-arrow-right"></i>
            </a>
        </div>
    `).join('');
}

// Populate Contact Section
function populateContactSection() {
    const contactDetails = document.getElementById('contact-details');
    const socialLinks = document.getElementById('social-links');

    // Contact details
    if (contactDetails && portfolioData.personalInfo) {
        contactDetails.innerHTML = `
            <div class="contact-item" data-aos="fade-right" data-aos-delay="100">
                <i class="fas fa-envelope"></i>
                <span>${portfolioData.personalInfo.email}</span>
            </div>
            <div class="contact-item" data-aos="fade-right" data-aos-delay="200">
                <i class="fas fa-phone"></i>
                <span>${portfolioData.personalInfo.phone}</span>
            </div>
            <div class="contact-item" data-aos="fade-right" data-aos-delay="300">
                <i class="fas fa-map-marker-alt"></i>
                <span>${portfolioData.personalInfo.location}</span>
            </div>
        `;
    }

    // Social links
    if (socialLinks && portfolioData.socialLinks) {
        const socialIcons = {
            github: 'fab fa-github',
            linkedin: 'fab fa-linkedin',
            twitter: 'fab fa-twitter',
            email: 'fas fa-envelope'
        };

        socialLinks.innerHTML = Object.entries(portfolioData.socialLinks)
            .filter(([platform, url]) => platform !== 'email') // Exclude email from social links
            .map(([platform, url], index) => `
                <a href="${url}" class="social-link" target="_blank" rel="noopener noreferrer" 
                   title="${platform.charAt(0).toUpperCase() + platform.slice(1)}"
                   data-aos="zoom-in" data-aos-delay="${(index + 1) * 100}">
                    <i class="${socialIcons[platform]}"></i>
                </a>
            `).join('');
    }
}

// Enhanced Typing Animation
function typeWriter() {
    if (!typingText) return;
    
    const current = phrases[currentPhrase];
    
    if (isDeleting) {
        typingText.textContent = current.substring(0, currentChar - 1);
        currentChar--;
    } else {
        typingText.textContent = current.substring(0, currentChar + 1);
        currentChar++;
    }
    
    let typeSpeed = isDeleting ? 50 : 120;
    
    if (!isDeleting && currentChar === current.length) {
        typeSpeed = 2500; // Pause at end
        isDeleting = true;
    } else if (isDeleting && currentChar === 0) {
        isDeleting = false;
        currentPhrase = (currentPhrase + 1) % phrases.length;
        typeSpeed = 800; // Pause before next phrase
    }
    
    setTimeout(typeWriter, typeSpeed);
}

// Mobile Navigation Toggle
function toggleMobileMenu() {
    if (mobileMenu && navMenu) {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Disable scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }
}

// Close mobile menu
function closeMobileMenu() {
    if (mobileMenu && navMenu) {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Smooth Scrolling
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        const offsetTop = element.offsetTop - 100; // Account for fixed navbar
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Update Active Navigation Link
function updateActiveLink() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Navbar Background on Scroll
function handleNavbarScroll() {
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
}

// Skills Animation
function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        const progressBar = item.querySelector('.progress-bar');
        const percentage = progressBar.getAttribute('data-progress');
        
        // Animate progress bar with staggered delay
        setTimeout(() => {
            progressBar.style.width = percentage + '%';
        }, index * 150);
    });
}

// Enhanced Intersection Observer
function createScrollObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // Trigger specific animations
                if (entry.target.id === 'skills') {
                    setTimeout(() => animateSkills(), 300);
                }
            }
        });
    }, observerOptions);
    
    // Observe all sections and elements
    const elementsToObserve = document.querySelectorAll('section, .skill-item, .project-card, .achievement-item, .article-card');
    elementsToObserve.forEach(element => {
        element.classList.add('scroll-reveal');
        observer.observe(element);
    });
}

// CV Download Functionality
function handleCVDownload() {
    if (portfolioData.personalInfo.cvUrl) {
        // Create a temporary link to trigger download
        const link = document.createElement('a');
        link.href = portfolioData.personalInfo.cvUrl;
        link.download = `${portfolioData.personalInfo.name.replace(/\s+/g, '_')}_CV.pdf`;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Show success notification
        showNotification('CV download initiated! ðŸ“„', 'success');
    } else {
        // Fallback - open a placeholder or show message
        showNotification('CV will be available soon! ðŸ“„', 'info');
    }
}

// Hire Me Functionality
function handleHireMe() {
    const email = portfolioData.personalInfo.email || '24mcs117@nith.ac.in';
    const subject = encodeURIComponent('Exciting Opportunity - Let\'s Work Together!');
    const body = encodeURIComponent(`Hi ${portfolioData.personalInfo.name || 'Rohit'},

I'm interested in discussing a potential collaboration opportunity with you. I was impressed by your expertise in GenAI, RAG pipelines, and LLM applications.

I'd love to connect and explore how we can work together.

Best regards,
[Your Name]`);
    
    const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show notification
    showNotification('Email client opened! Let\'s connect! ðŸš€', 'success');
}

// Enhanced Notification System
function showNotification(message, type = 'info', duration = 5000) {
    // Remove existing notifications
    document.querySelectorAll('.notification').forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-triangle',
        warning: 'fas fa-exclamation-circle',
        info: 'fas fa-info-circle'
    };
    
    notification.innerHTML = `
        <i class="${icons[type] || icons.info}"></i>
        <span>${message}</span>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add notification styles if not already present
    if (!document.getElementById('notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 1rem 1.5rem;
                border-radius: 12px;
                color: white;
                font-weight: 600;
                z-index: 10000;
                display: flex;
                align-items: center;
                gap: 0.75rem;
                animation: slideIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                backdrop-filter: blur(20px);
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
                max-width: 400px;
                min-width: 300px;
            }
            .notification-success { background: linear-gradient(135deg, #22c55e, #16a34a); }
            .notification-error { background: linear-gradient(135deg, #ef4444, #dc2626); }
            .notification-warning { background: linear-gradient(135deg, #f59e0b, #d97706); }
            .notification-info { background: linear-gradient(135deg, #6366f1, #4f46e5); }
            .notification-close {
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                padding: 0;
                margin-left: auto;
                opacity: 0.7;
                transition: opacity 0.2s;
            }
            .notification-close:hover { opacity: 1; }
            @keyframes slideIn {
                from { transform: translateX(100%) translateY(-20px); opacity: 0; }
                to { transform: translateX(0) translateY(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0) translateY(0); opacity: 1; }
                to { transform: translateX(100%) translateY(-20px); opacity: 0; }
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    });
    
    document.body.appendChild(notification);
    
    // Auto remove after duration
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }
    }, duration);
}

// Enhanced Particle System
function createEnhancedParticleSystem() {
    const particleCount = window.innerWidth > 768 ? 60 : 30;
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random colors from our palette
        const colors = [
            'rgba(99, 102, 241, 0.3)',
            'rgba(236, 72, 153, 0.3)',
            'rgba(16, 185, 129, 0.3)',
            'rgba(245, 158, 11, 0.3)'
        ];
        
        particle.style.cssText = `
            position: fixed;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            pointer-events: none;
            z-index: -1;
            opacity: ${Math.random() * 0.5 + 0.3};
        `;
        
        document.body.appendChild(particle);
        particles.push({
            element: particle,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8,
            life: Math.random() * 100 + 50
        });
    }
    
    function animateParticles() {
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life -= 0.1;
            
            // Wrap around screen
            if (particle.x < 0) particle.x = window.innerWidth;
            if (particle.x > window.innerWidth) particle.x = 0;
            if (particle.y < 0) particle.y = window.innerHeight;
            if (particle.y > window.innerHeight) particle.y = 0;
            
            // Update position
            particle.element.style.left = particle.x + 'px';
            particle.element.style.top = particle.y + 'px';
            
            // Fade out over time
            if (particle.life <= 0) {
                particle.life = 100;
                particle.element.style.opacity = Math.random() * 0.5 + 0.3;
            }
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
}

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', async () => {
    console.log('ðŸŽ¯ Initializing AI Portfolio...');
    
    // Show loading screen
    showLoadingScreen();
    
    // Load portfolio data
    const dataLoaded = await loadPortfolioData();
    
    // Initialize event listeners
    setupEventListeners();
    
    // Start typing animation after data loads
    setTimeout(() => {
        if (typingText) {
            typeWriter();
        }
    }, 1500);
    
    // Initialize scroll observer
    setTimeout(() => {
        createScrollObserver();
    }, 1000);
    
    // Create enhanced particle system
    setTimeout(() => {
        createEnhancedParticleSystem();
    }, 2000);
    
    console.log('ðŸš€ AI Portfolio initialized successfully!');
});

// Setup Event Listeners
function setupEventListeners() {
    // Mobile menu toggle
    if (mobileMenu) {
        mobileMenu.addEventListener('click', toggleMobileMenu);
    }
    
    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            smoothScroll(target);
            closeMobileMenu();
        });
    });
    
    // CV Download button
    if (cvDownloadBtn) {
        cvDownloadBtn.addEventListener('click', handleCVDownload);
    }
    
    // Hire Me buttons
    if (hireMeBtn) {
        hireMeBtn.addEventListener('click', handleHireMe);
    }
    
    if (hireMeMainBtn) {
        hireMeMainBtn.addEventListener('click', handleHireMe);
    }
    
    // Scroll events (throttled for performance)
    const throttledScrollHandler = throttle(() => {
        handleNavbarScroll();
        updateActiveLink();
    }, 100);
    
    window.addEventListener('scroll', throttledScrollHandler);
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            closeMobileMenu();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', throttle(() => {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    }, 250));
    
    // Initialize smooth scrolling for all internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            if (target !== '#') {
                smoothScroll(target);
            }
        });
    });
    
    // Enhanced keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });
}

// Export functions for global access
window.portfolioApp = {
    loadPortfolioData,
    populatePortfolio,
    showNotification,
    handleCVDownload,
    handleHireMe
};

// Add some fun easter eggs
console.log(`
ðŸš€ Welcome to Rohit's AI Portfolio!
ðŸ§  Built with modern web technologies and AI-powered creativity
ðŸŽ¨ Featuring interactive animations and smooth user experience
ðŸ“§ Ready to hire? Email: 24mcs117@nith.ac.in
Connect: https://github.com/prof3soR
`);