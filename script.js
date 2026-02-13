/* =========================================
   VYNTAX - WEBFLOW-STYLE ANIMATIONS
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================
    // 1. GSAP SCROLL ANIMATIONS (Webflow Style)
    // =========================================
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        initScrollAnimations();
    }

    // =========================================
    // 2. EXISTING TOOLS
    // =========================================
    
    // --- Box Shadow Generator ---
    const hShadow = document.getElementById('h-shadow');
    const vShadow = document.getElementById('v-shadow');
    const blurRadius = document.getElementById('blur-radius');
    const shadowColor = document.getElementById('shadow-color');
    const shadowBox = document.getElementById('shadow-box');
    const shadowCode = document.getElementById('shadow-code');

    if(hShadow && shadowBox) {
        function updateShadow() {
            const val = `${hShadow.value}px ${vShadow.value}px ${blurRadius.value}px ${shadowColor.value}`;
            shadowBox.style.boxShadow = val;
            shadowCode.innerText = `box-shadow: ${val};`;
        }
        [hShadow, vShadow, blurRadius, shadowColor].forEach(input => {
            input.addEventListener('input', updateShadow);
        });
        updateShadow();
    }

    // --- Gradient Generator ---
    const color1 = document.getElementById('color1');
    const color2 = document.getElementById('color2');
    const direction = document.getElementById('direction');
    const gradientBox = document.getElementById('gradient-box');
    const gradientCode = document.getElementById('gradient-code');

    if(color1 && gradientBox) {
        window.updateGradient = function() {
            const val = `linear-gradient(${direction.value}, ${color1.value}, ${color2.value})`;
            gradientBox.style.background = val;
            gradientCode.innerText = `background: ${val};`;
        }
        [color1, color2, direction].forEach(input => {
            input.addEventListener('input', updateGradient);
            input.addEventListener('change', updateGradient);
        });
        updateGradient();
    }

    // --- Glassmorphism Generator ---
    const glassBlur = document.getElementById('glass-blur');
    const glassOpacity = document.getElementById('glass-opacity');
    const glassOutline = document.getElementById('glass-outline');
    const glassBox = document.getElementById('glass-box');
    const glassCode = document.getElementById('glass-code');

    if(glassBlur && glassBox) {
        function updateGlass() {
            const opac = glassOpacity.value / 100;
            const bgStyle = `rgba(255, 255, 255, ${opac})`;
            glassBox.style.background = bgStyle;
            glassBox.style.backdropFilter = `blur(${glassBlur.value}px)`;
            glassBox.style.border = `1px solid ${glassOutline.value}`;
            glassCode.innerText = `background: ${bgStyle}; backdrop-filter: blur(${glassBlur.value}px); border: 1px solid ${glassOutline.value};`;
        }
        [glassBlur, glassOpacity, glassOutline].forEach(input => {
            input.addEventListener('input', updateGlass);
        });
        updateGlass();
    }

    // --- Keycode Finder ---
    window.addEventListener('keydown', (e) => {
        const keyDisplay = document.getElementById('key-display');
        const keyOutput = document.getElementById('keycode-output');
        if (keyDisplay && keyOutput) {
            keyDisplay.innerText = e.key === " " ? "Space" : e.key;
            keyOutput.innerText = `Key: ${e.key} | Code: ${e.keyCode}`;
        }
    });

    // =========================================
    // 3. NEW TOOLS
    // =========================================
    initColorPalette();
    initLoremGenerator();
    initPasswordGenerator();

    // =========================================
    // 4. CANVAS ANIMATIONS (for other pages)
    // =========================================
    initHyperspeed();
    initGridMotion();
});

// =========================================
// WEBFLOW-STYLE SCROLL ANIMATIONS
// =========================================
function initScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // ===== HERO SECTION =====
    gsap.from('.hero h1', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out'
    });

    gsap.from('.hero .subtitle', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out'
    });

    gsap.from('.hero .cta-group', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.6,
        ease: 'power3.out'
    });

    // Code card parallax
    gsap.to('.hero-visual', {
        y: 200,
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5
        }
    });

    // ===== SECTION HEADERS =====
    gsap.utils.toArray('.section-header, .section-title').forEach(header => {
        gsap.from(header, {
            y: 60,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
                end: 'top 50%',
                scrub: 1
            }
        });
    });

    // ===== TOOL CARDS =====
    gsap.utils.toArray('.tool-card').forEach((card, index) => {
        const isEven = index % 2 === 0;
        gsap.from(card, {
            x: isEven ? -80 : 80,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'top 60%',
                scrub: 1
            }
        });
    });

    // ===== SNIPPET CARDS =====
    gsap.utils.toArray('.snippet-card').forEach((card, index) => {
        gsap.from(card, {
            scale: 0.85,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'top 65%',
                scrub: 1
            }
        });
    });

    // ===== RESOURCE CARDS =====
    gsap.utils.toArray('.resource-category').forEach((card, index) => {
        gsap.from(card, {
            y: 80,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'top 65%',
                scrub: 1
            }
        });
    });

    // ===== CHEAT SHEET CARDS =====
    gsap.utils.toArray('.cheatsheet-card').forEach((card, index) => {
        gsap.from(card, {
            scale: 0.9,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'top 65%',
                scrub: 1
            }
        });
    });

    // ===== COMPONENT CARDS =====
    gsap.utils.toArray('.component-card').forEach((card, index) => {
        gsap.from(card, {
            y: 60,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'top 65%',
                scrub: 1
            }
        });
    });

    // ===== ROADMAP STEPS =====
    gsap.utils.toArray('.roadmap-step').forEach((step, index) => {
        const isEven = index % 2 === 0;
        gsap.from(step, {
            x: isEven ? -100 : 100,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: step,
                start: 'top 85%',
                end: 'top 60%',
                scrub: 1
            }
        });
    });

    console.log('✅ Webflow-style scroll animations initialized!');
}

// =========================================
// COLOR PALETTE GENERATOR
// =========================================
function initColorPalette() {
    const baseColorInput = document.getElementById('base-color');
    if (!baseColorInput) return;

    window.generatePalette = function() {
        const baseColor = baseColorInput.value;
        const colors = generateColorScheme(baseColor);
        
        const palettePreview = document.querySelectorAll('.palette-color');
        const paletteCode = document.getElementById('palette-code');
        
        colors.forEach((color, index) => {
            if (palettePreview[index]) {
                palettePreview[index].style.background = color;
            }
        });
        
        paletteCode.innerText = colors.join(', ');
    }

    generatePalette();
}

function generateColorScheme(baseHex) {
    const rgb = hexToRgb(baseHex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    
    const colors = [
        baseHex,
        hslToHex((hsl.h + 30) % 360, hsl.s, Math.min(hsl.l + 10, 90)),
        hslToHex((hsl.h + 60) % 360, hsl.s, Math.max(hsl.l - 10, 10)),
        hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l),
        hslToHex((hsl.h + 220) % 360, hsl.s, Math.min(hsl.l + 15, 95))
    ];
    
    return colors;
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
}

function hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}

// =========================================
// LOREM IPSUM GENERATOR
// =========================================
function initLoremGenerator() {
    const loremCount = document.getElementById('lorem-count');
    if (!loremCount) return;

    window.generateLorem = function() {
        const paragraphs = parseInt(loremCount.value);
        const loremText = generateLoremIpsum(paragraphs);
        
        const loremOutput = document.getElementById('lorem-output');
        const loremCode = document.getElementById('lorem-code-display');
        
        if (loremOutput) loremOutput.innerText = loremText;
        if (loremCode) loremCode.innerText = loremText.substring(0, 100) + '...';
    }
}

function generateLoremIpsum(paragraphs) {
    const loremParagraphs = [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
        "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
        "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa."
    ];
    
    let result = '';
    for (let i = 0; i < paragraphs; i++) {
        result += loremParagraphs[i % loremParagraphs.length] + '\n\n';
    }
    
    return result.trim();
}

// =========================================
// PASSWORD GENERATOR
// =========================================
function initPasswordGenerator() {
    const passLength = document.getElementById('pass-length');
    if (!passLength) return;

    window.generatePassword = function() {
        const length = parseInt(passLength.value);
        const useUpper = document.getElementById('pass-upper').checked;
        const useNumbers = document.getElementById('pass-numbers').checked;
        const useSymbols = document.getElementById('pass-symbols').checked;
        
        const password = createPassword(length, useUpper, useNumbers, useSymbols);
        
        const passDisplay = document.getElementById('password-display');
        const passCode = document.getElementById('password-code');
        
        if (passDisplay) passDisplay.innerText = password;
        if (passCode) passCode.innerText = password;
    }
}

function createPassword(length, useUpper, useNumbers, useSymbols) {
    let chars = 'abcdefghijklmnopqrstuvwxyz';
    if (useUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useNumbers) chars += '0123456789';
    if (useSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    return password;
}

// =========================================
// CHEAT SHEET TOGGLE
// =========================================
window.toggleCheatsheet = function(id) {
    const card = document.getElementById(id).parentElement;
    card.classList.toggle('active');
}

// =========================================
// HELPER FUNCTIONS
// =========================================
window.copyToolCode = function(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;
    navigator.clipboard.writeText(element.innerText).then(() => {
        alert("Code Copied!");
    });
}

window.copySnippet = function(id) {
    const text = document.getElementById(id).value;
    navigator.clipboard.writeText(text).then(() => {
        alert("Snippet Copied!");
    });
}

// =========================================
// HYPERSPEED CANVAS (for blog page)
// =========================================
function initHyperspeed() {
    const hCanvas = document.getElementById('hyperspeed-canvas');
    if (!hCanvas) return;

    const ctx = hCanvas.getContext('2d');
    let width, height;
    let stars = [];
    const starCount = 200;
    const speed = 2;

    function resizeH() {
        width = window.innerWidth;
        height = window.innerHeight;
        hCanvas.width = width;
        hCanvas.height = height;
    }
    window.addEventListener('resize', resizeH);
    resizeH();

    class Star {
        constructor() {
            this.x = (Math.random() - 0.5) * width;
            this.y = (Math.random() - 0.5) * height;
            this.z = Math.random() * width;
        }
        update() {
            this.z -= speed;
            if (this.z <= 0) {
                this.z = width;
                this.x = (Math.random() - 0.5) * width;
                this.y = (Math.random() - 0.5) * height;
            }
        }
        draw() {
            let x = (this.x / this.z) * width + width / 2;
            let y = (this.y / this.z) * height + height / 2;
            let size = (width - this.z) / width * 3;
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(x, y, Math.max(0, size), 0, Math.PI * 2);
            ctx.fill();
        }
    }
    for (let i = 0; i < starCount; i++) stars.push(new Star());

    function animateH() {
        ctx.fillStyle = 'rgba(2, 6, 23, 0.5)';
        ctx.fillRect(0, 0, width, height);
        stars.forEach(star => { star.update(); star.draw(); });
        requestAnimationFrame(animateH);
    }
    animateH();
}

// =========================================
// GRID MOTION CANVAS (for about page)
// =========================================
function initGridMotion() {
    const gCanvas = document.getElementById('grid-canvas');
    if (!gCanvas) return;

    const ctx = gCanvas.getContext('2d');
    let w, h;
    let time = 0;
    const gridSize = 40;
    const waveSpeed = 0.02;
    const waveHeight = 10;

    function resizeG() {
        w = window.innerWidth;
        h = window.innerHeight;
        gCanvas.width = w;
        gCanvas.height = h;
    }
    window.addEventListener('resize', resizeG);
    resizeG();

    function drawGrid() {
        ctx.fillStyle = '#020617'; 
        ctx.fillRect(0, 0, w, h);
        ctx.strokeStyle = 'rgba(39, 201, 63, 0.15)'; 
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let x = 0; x <= w; x += gridSize) {
            for (let y = 0; y <= h; y += 10) { 
                const yOffset = Math.sin((x * 0.01) + (y * 0.01) + time) * waveHeight;
                if (y === 0) ctx.moveTo(x, y + yOffset);
                else ctx.lineTo(x, y + yOffset);
            }
        }
        for (let y = 0; y <= h; y += gridSize) {
            for (let x = 0; x <= w; x += 10) {
                const yOffset = Math.sin((x * 0.01) + (y * 0.01) + time) * waveHeight;
                if (x === 0) ctx.moveTo(x, y + yOffset);
                else ctx.lineTo(x, y + yOffset);
            }
        }
        ctx.stroke();
        time += waveSpeed;
        requestAnimationFrame(drawGrid);
    }
    drawGrid();
}
