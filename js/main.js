// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, observerOptions);

// Observe all sections and cards with animation classes
document.querySelectorAll('.fade-in-section, .slide-in-left, .slide-in-right, .project-card, .philosophy-card').forEach(element => {
    observer.observe(element);
});

// Language Switcher
let currentLang = 'ko';

const translations = {
    ko: {
        // Navigation
        'Home': 'Home',
        'About': 'About',
        'Philosophy': 'Philosophy',
        'Projects': 'Projects',
        'Board': 'Board',
        'Contact': 'Contact',
        
        // Hero Section
        'Full-Stack Developer & Builder': 'Full-Stack Developer & Builder',
        '팀과 함께 성장하며 아이디어를 빠르고 정확하게 제품으로 완성합니다.': '팀과 함께 성장하며 아이디어를 빠르고 정확하게 제품으로 완성합니다.',
        '포트폴리오 보기': '포트폴리오 보기',
        
        // About Section
        'About Me': 'About Me',
        '끊임없이 배우고 성장하는 개발자입니다': '끊임없이 배우고 성장하는 개발자입니다',
        
        // Philosophy Section
        '개발 철학': '개발 철학',
        '제가 개발을 대하는 자세입니다': '제가 개발을 대하는 자세입니다',
        
        // Projects Section
        '프로젝트': '프로젝트',
        '제가 진행했던 주요 프로젝트들입니다': '제가 진행했던 주요 프로젝트들입니다',
        
        // Contact Section
        '언제든지 연락주세요!': '언제든지 연락주세요!'
    },
    en: {
        // Navigation
        'Home': 'Home',
        'About': 'About',
        'Philosophy': 'Philosophy',
        'Projects': 'Projects',
        'Board': 'Board',
        'Contact': 'Contact',
        
        // Hero Section
        'Full-Stack Developer & Builder': 'Full-Stack Developer & Builder',
        '팀과 함께 성장하며 아이디어를 빠르고 정확하게 제품으로 완성합니다.': 'Building ideas into products quickly and precisely with the team.',
        '포트폴리오 보기': 'View Portfolio',
        
        // About Section
        'About Me': 'About Me',
        '끊임없이 배우고 성장하는 개발자입니다': 'A developer who continuously learns and grows',
        
        // Philosophy Section
        '개발 철학': 'Development Philosophy',
        '제가 개발을 대하는 자세입니다': 'My approach to development',
        
        // Projects Section
        '프로젝트': 'Projects',
        '제가 진행했던 주요 프로젝트들입니다': 'Key projects I\'ve worked on',
        
        // Contact Section
        '언제든지 연락주세요!': 'Feel free to reach out anytime!'
    }
};

function switchLanguage(lang) {
    currentLang = lang;
    
    // Update all elements with data-ko and data-en attributes
    document.querySelectorAll('[data-ko][data-en]').forEach(element => {
        const koreanText = element.getAttribute('data-ko');
        const englishText = element.getAttribute('data-en');
        
        if (lang === 'en') {
            element.textContent = englishText;
        } else {
            element.textContent = koreanText;
        }
    });
    
    // Update language button text
    const langText = document.querySelector('.lang-text');
    if (langText) {
        langText.textContent = lang === 'ko' ? 'KOR' : 'ENG';
    }
    
    // Update language options active state
    document.querySelectorAll('.lang-option').forEach(option => {
        if (option.getAttribute('data-lang') === lang) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
    
    // Store preference
    localStorage.setItem('preferredLanguage', lang);
}

// Initialize language switcher
document.addEventListener('DOMContentLoaded', () => {
    const langOptions = document.querySelectorAll('.lang-option');
    const langSwitcher = document.querySelector('.language-switcher');
    const langCurrent = document.querySelector('.lang-current');
    
    // Click on language options
    langOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            const lang = option.getAttribute('data-lang');
            switchLanguage(lang);
            
            // Close dropdown on mobile
            if (window.innerWidth <= 768) {
                langSwitcher.classList.remove('active');
            }
        });
    });
    
    // Toggle dropdown on current button click (for mobile)
    if (langCurrent) {
        langCurrent.addEventListener('click', (e) => {
            e.stopPropagation();
            if (window.innerWidth <= 768) {
                langSwitcher.classList.toggle('active');
            }
        });
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        if (langSwitcher) {
            langSwitcher.classList.remove('active');
        }
    });
    
    // Load saved language preference
    const savedLang = localStorage.getItem('preferredLanguage') || 'ko';
    switchLanguage(savedLang);
});

// Typing effect for subtitle
document.addEventListener('DOMContentLoaded', () => {
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const text = typingText.textContent;
        typingText.textContent = '';
        typingText.style.borderRight = '3px solid #ffffff';
        
        let charIndex = 0;
        const typingSpeed = 100; // milliseconds per character
        
        function typeCharacter() {
            if (charIndex < text.length) {
                typingText.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeCharacter, typingSpeed);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    typingText.style.borderRight = 'none';
                }, 500);
            }
        }
        
        // Start typing after a short delay
        setTimeout(typeCharacter, 800);
    }
});

// Active navigation link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Console easter egg
console.log('%c👋 안녕하세요!', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%c소스 코드가 궁금하신가요? GitHub에서 확인하세요!', 'font-size: 14px; color: #764ba2;');
console.log('%chttps://github.com/hamini', 'font-size: 12px; color: #999;');

// Performance monitoring (optional)
if ('performance' in window) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⚡ 페이지 로드 시간: ${pageLoadTime}ms`);
    });
}
