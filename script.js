<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Feather icons
    feather.replace();
    
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        document.documentElement.classList.add('dark');
    }
    
    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // Typing effect elements
    const nameTypingElement = document.getElementById('nameTyping');
    const nameTexts = ["Ashmaan", "a Developer", "a Designer", "a Creator"];
    
    const workTypingElement = document.getElementById('workTyping');
    const workTexts = [
        "amazing digital experiences",
        "responsive web applications",
        "elegant user interfaces",
        "powerful backend systems",
        "innovative mobile apps",
        "accessible websites"
    ];

    let nameCurrentIndex = 0;
    let workCurrentIndex = 0;

    function typeText(element, texts, currentIndex) {
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100; // Speed of typing
        let deleteSpeed = 50;  // Speed of deleting
        let pauseTime = 2000;  // Pause after typing each phrase

        function type() {
            const text = texts[currentIndex];

            if (!isDeleting && charIndex <= text.length) {
                element.textContent = text.substring(0, charIndex);
                charIndex++;
                setTimeout(type, typingSpeed);
            } else if (isDeleting && charIndex >= 0) {
                element.textContent = text.substring(0, charIndex);
                charIndex--;
                setTimeout(type, deleteSpeed);
            } else if (!isDeleting) {
                isDeleting = true;
                setTimeout(type, pauseTime); // Pause before deleting
            } else {
                isDeleting = false;
                currentIndex = (currentIndex + 1) % texts.length;
                setTimeout(() => typeText(element, texts, currentIndex), 500); // Small delay before next text
                return;
            }
        }

        type();
    }

    // Start typing effects with improved speed
    typeText(nameTypingElement, nameTexts, nameCurrentIndex);
    typeText(workTypingElement, workTexts, workCurrentIndex);

    // Breadcrumb navigation
    const sections = ['home', 'about', 'skills', 'projects', 'contact'];
    const breadcrumbSeparator = document.getElementById('breadcrumbSeparator');
    const breadcrumbCurrent = document.getElementById('breadcrumbCurrent');

    function updateBreadcrumb() {
        const scrollPosition = window.scrollY + 100;
        let currentSection = 'home';

        for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i] === 'home' 
                ? document.querySelector('main') 
                : document.getElementById(sections[i]);

            if (section && section.offsetTop <= scrollPosition) {
                currentSection = sections[i];
                break;
            }
        }

        if (currentSection === 'home') {
            breadcrumbSeparator.style.display = 'none';
            breadcrumbCurrent.style.display = 'none';
        } else {
            breadcrumbSeparator.style.display = 'block';
            breadcrumbCurrent.style.display = 'block';
            breadcrumbCurrent.textContent = currentSection;
            breadcrumbCurrent.href = `#${currentSection}`;
        }
    }

    window.addEventListener('scroll', updateBreadcrumb);
    updateBreadcrumb();

    // Cursor effect
    const cursor = document.querySelector('.cursor-effect');
    
    if (cursor && window.matchMedia('(pointer: fine)').matches) {
        document.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                cursor.style.left = `${e.clientX}px`;
                cursor.style.top = `${e.clientY}px`;
                cursor.style.opacity = '1';
            });
        });

        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '1';
        });

        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
        });

        // Add cursor interaction with clickable elements
        document.querySelectorAll('button, a, .memory-card').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('active'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
        });
    }

    // Animate skill bars on scroll
    const skillCards = document.querySelectorAll('.skill-card');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillLevel = entry.target.getAttribute('data-skill');
                const progressBar = entry.target.querySelector('.skill-progress');
                progressBar.style.width = `${skillLevel}%`;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    skillCards.forEach(card => {
        observer.observe(card);
    });

    // Memory game
    const memoryGame = document.getElementById('memoryGame');
    const memoryGrid = document.getElementById('memoryGrid');
    const memoryResult = document.getElementById('memoryResult');
    const startGameBtn = document.getElementById('startGameBtn');

    let cards = [];
    let flippedCards = [];
    let solvedCards = [];
    let isLocked = false;

    function flipCard(index) {
        const cardElement = document.querySelector(`.memory-card[data-index="${index}"]`);

        if (flippedCards.includes(index) || solvedCards.includes(index) || isLocked) return;

        const cardInner = cardElement.querySelector('.card-inner');
        cardInner.textContent = cards[index];
        cardElement.classList.add('flipped');
        flippedCards.push(index);

        if (flippedCards.length === 2) {
            isLocked = true;

            const [first, second] = flippedCards;
            if (cards[first] === cards[second]) {
                // Mark cards as solved
                solvedCards.push(first, second);
                document.querySelector(`.memory-card[data-index="${first}"]`).classList.add('solved');
                document.querySelector(`.memory-card[data-index="${second}"]`).classList.add('solved');
                flippedCards = [];
                isLocked = false;

                if (solvedCards.length === cards.length) {
                    setTimeout(() => {
                        memoryResult.innerHTML = `
                            <p class="text-green-500 font-bold mb-2">You won! 🎉</p>
                            <button class="btn btn-primary" onclick="startGame()">Play Again</button>
                        `;
                    }, 500);
                }
            } else {
                setTimeout(() => {
                    document.querySelector(`.memory-card[data-index="${first}"]`).classList.remove('flipped');
                    document.querySelector(`.memory-card[data-index="${second}"]`).classList.remove('flipped');
                    flippedCards = [];
                    isLocked = false;
                }, 1000);
            }
        }
    }

    function startGame() {
        cards = [1, 1, 2, 2, 3, 3, 4, 4].sort(() => Math.random() - 0.5);
        flippedCards = [];
        solvedCards = [];
        isLocked = false;

        memoryGrid.innerHTML = '';
        memoryResult.innerHTML = '';

        cards.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.className = 'memory-card';
            cardElement.dataset.index = index;
            
            const cardInner = document.createElement('div');
            cardInner.className = 'card-inner';
            cardElement.appendChild(cardInner);
            
            cardElement.addEventListener('click', () => flipCard(index));
            cardElement.addEventListener('mouseenter', () => cursor.classList.add('active'));
            cardElement.addEventListener('mouseleave', () => cursor.classList.remove('active'));
            
            memoryGrid.appendChild(cardElement);
        });

        startGameBtn.style.display = 'none';
        memoryGrid.style.display = 'grid';
    }

    startGameBtn.addEventListener('click', startGame);
    window.startGame = startGame;
});
=======
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Feather icons
    feather.replace();
    
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        document.documentElement.classList.add('dark');
    }
    
    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // Typing effect elements
    const nameTypingElement = document.getElementById('nameTyping');
    const nameTexts = ["Ashmaan", "a Developer", "a Designer", "a Creator"];
    
    const workTypingElement = document.getElementById('workTyping');
    const workTexts = [
        "amazing digital experiences",
        "responsive web applications",
        "elegant user interfaces",
        "powerful backend systems",
        "innovative mobile apps",
        "accessible websites"
    ];

    let nameCurrentIndex = 0;
    let workCurrentIndex = 0;

    function typeText(element, texts, currentIndex) {
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100; // Speed of typing
        let deleteSpeed = 50;  // Speed of deleting
        let pauseTime = 2000;  // Pause after typing each phrase

        function type() {
            const text = texts[currentIndex];

            if (!isDeleting && charIndex <= text.length) {
                element.textContent = text.substring(0, charIndex);
                charIndex++;
                setTimeout(type, typingSpeed);
            } else if (isDeleting && charIndex >= 0) {
                element.textContent = text.substring(0, charIndex);
                charIndex--;
                setTimeout(type, deleteSpeed);
            } else if (!isDeleting) {
                isDeleting = true;
                setTimeout(type, pauseTime); // Pause before deleting
            } else {
                isDeleting = false;
                currentIndex = (currentIndex + 1) % texts.length;
                setTimeout(() => typeText(element, texts, currentIndex), 500); // Small delay before next text
                return;
            }
        }

        type();
    }

    // Start typing effects with improved speed
    typeText(nameTypingElement, nameTexts, nameCurrentIndex);
    typeText(workTypingElement, workTexts, workCurrentIndex);

    // Breadcrumb navigation
    const sections = ['home', 'about', 'skills', 'projects', 'contact'];
    const breadcrumbSeparator = document.getElementById('breadcrumbSeparator');
    const breadcrumbCurrent = document.getElementById('breadcrumbCurrent');

    function updateBreadcrumb() {
        const scrollPosition = window.scrollY + 100;
        let currentSection = 'home';

        for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i] === 'home' 
                ? document.querySelector('main') 
                : document.getElementById(sections[i]);

            if (section && section.offsetTop <= scrollPosition) {
                currentSection = sections[i];
                break;
            }
        }

        if (currentSection === 'home') {
            breadcrumbSeparator.style.display = 'none';
            breadcrumbCurrent.style.display = 'none';
        } else {
            breadcrumbSeparator.style.display = 'block';
            breadcrumbCurrent.style.display = 'block';
            breadcrumbCurrent.textContent = currentSection;
            breadcrumbCurrent.href = `#${currentSection}`;
        }
    }

    window.addEventListener('scroll', updateBreadcrumb);
    updateBreadcrumb();

    // Cursor effect
    const cursor = document.querySelector('.cursor-effect');

    if (window.matchMedia('(pointer: fine)').matches) {
        document.addEventListener('mousemove', e => {
            cursor.style.transform = `translate(${e.clientX - 12}px, ${e.clientY - 12}px)`;
        });
    }

    // Animate skill bars on scroll
    const skillCards = document.querySelectorAll('.skill-card');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillLevel = entry.target.getAttribute('data-skill');
                const progressBar = entry.target.querySelector('.skill-progress');
                progressBar.style.width = `${skillLevel}%`;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    skillCards.forEach(card => {
        observer.observe(card);
    });

    // Memory game
    const memoryGame = document.getElementById('memoryGame');
    const memoryGrid = document.getElementById('memoryGrid');
    const memoryResult = document.getElementById('memoryResult');
    const startGameBtn = document.getElementById('startGameBtn');

    let cards = [];
    let flippedCards = [];
    let solvedCards = [];
    let isLocked = false;

    function startGame() {
        cards = [1, 1, 2, 2, 3, 3, 4, 4].sort(() => Math.random() - 0.5);
        flippedCards = [];
        solvedCards = [];
        isLocked = false;

        memoryGrid.innerHTML = '';
        memoryResult.innerHTML = '';

        cards.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.className = 'memory-card';
            cardElement.dataset.index = index;
            cardElement.addEventListener('click', () => flipCard(index));
            memoryGrid.appendChild(cardElement);
        });

        startGameBtn.style.display = 'none';
        memoryGrid.style.display = 'grid';
    }

    function flipCard(index) {
        const cardElement = document.querySelector(`.memory-card[data-index="${index}"]`);

        if (flippedCards.includes(index) || solvedCards.includes(index) || isLocked) return;

        cardElement.textContent = cards[index];
        cardElement.classList.add('flipped');
        flippedCards.push(index);

        if (flippedCards.length === 2) {
            isLocked = true;

            const [first, second] = flippedCards;
            if (cards[first] === cards[second]) {
                solvedCards.push(first, second);
                flippedCards = [];
                isLocked = false;

                if (solvedCards.length === cards.length) {
                    memoryResult.innerHTML = `<p class="text-green-500 font-bold mb-2">You won! 🎉</p>
                        <button class="btn btn-primary" onclick="startGame()">Play Again</button>`;
                }
            } else {
                setTimeout(() => {
                    flippedCards.forEach(idx => document.querySelector(`.memory-card[data-index="${idx}"]`).textContent = '');
                    flippedCards = [];
                    isLocked = false;
                }, 1000);
            }
        }
    }

    startGameBtn.addEventListener('click', startGame);
    window.startGame = startGame;
});
>>>>>>> 4749810be7ec7ed1993329bdeb9067c324786759
