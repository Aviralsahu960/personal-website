/* =========================================
   VYNTAX - WORKING VERSION (with Live Background)
   ========================================= */

console.log('🚀 Vyntax script loaded!');

document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ DOM ready!');
    
    // Initialize everything
    initTools();
    initNewTools();
    initScrollAnimations();
    initCanvasBackgrounds();
});

// =========================================
// TOOLS INITIALIZATION
// =========================================
function initTools() {
    console.log('Initializing tools...');
    
    // Box Shadow Generator
    const hShadow = document.getElementById('h-shadow');
    const vShadow = document.getElementById('v-shadow');
    const blurRadius = document.getElementById('blur-radius');
    const shadowColor = document.getElementById('shadow-color');
    const shadowBox = document.getElementById('shadow-box');
    const shadowCode = document.getElementById('shadow-code');

    if (hShadow && shadowBox) {
        function updateShadow() {
            const val = `${hShadow.value}px ${vShadow.value}px ${blurRadius.value}px ${shadowColor.value}`;
            shadowBox.style.boxShadow = val;
            shadowCode.innerText = `box-shadow: ${val};`;
        }
        hShadow.addEventListener('input', updateShadow);
        vShadow.addEventListener('input', updateShadow);
        blurRadius.addEventListener('input', updateShadow);
        shadowColor.addEventListener('input', updateShadow);
        updateShadow();
        console.log('✅ Shadow generator initialized');
    }

    // Gradient Generator
    const color1 = document.getElementById('color1');
    const color2 = document.getElementById('color2');
    const direction = document.getElementById('direction');
    const gradientBox = document.getElementById('gradient-box');
    const gradientCode = document.getElementById('gradient-code');

    if (color1 && gradientBox) {
        window.updateGradient = function() {
            const val = `linear-gradient(${direction.value}, ${color1.value}, ${color2.value})`;
            gradientBox.style.background = val;
            gradientCode.innerText = `background: ${val};`;
        };
        color1.addEventListener('input', updateGradient);
        color2.addEventListener('input', updateGradient);
        direction.addEventListener('change', updateGradient);
        updateGradient();
        console.log('✅ Gradient generator initialized');
    }

    // Glassmorphism Generator
    const glassBlur = document.getElementById('glass-blur');
    const glassOpacity = document.getElementById('glass-opacity');
    const glassOutline = document.getElementById('glass-outline');
    const glassBox = document.getElementById('glass-box');
    const glassCode = document.getElementById('glass-code');

    if (glassBlur && glassBox) {
        function updateGlass() {
            const opac = glassOpacity.value / 100;
            const bgStyle = `rgba(255, 255, 255, ${opac})`;
            glassBox.style.background = bgStyle;
            glassBox.style.backdropFilter = `blur(${glassBlur.value}px)`;
            glassBox.style.border = `1px solid ${glassOutline.value}`;
            glassCode.innerText = `background: ${bgStyle}; backdrop-filter: blur(${glassBlur.value}px); border: 1px solid ${glassOutline.value};`;
        }
        glassBlur.addEventListener('input', updateGlass);
        glassOpacity.addEventListener('input', updateGlass);
        glassOutline.addEventListener('input', updateGlass);
        updateGlass();
        console.log('✅ Glass generator initialized');
    }

    // Keycode Finder
    window.addEventListener('keydown', (e) => {
        const keyDisplay = document.getElementById('key-display');
        const keyOutput = document.getElementById('keycode-output');
        if (keyDisplay && keyOutput) {
            keyDisplay.innerText = e.key === " " ? "Space" : e.key;
            keyOutput.innerText = `Key: ${e.key} | Code: ${e.keyCode}`;
        }
    });
}

// =========================================
// NEW TOOLS
// =========================================
function initNewTools() {
    // Color Palette Generator
    const baseColorInput = document.getElementById('base-color');
    if (baseColorInput) {
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
        };
        generatePalette();
        console.log('✅ Palette generator initialized');
    }

    // Lorem Ipsum Generator
    const loremCount = document.getElementById('lorem-count');
    if (loremCount) {
        window.generateLorem = function() {
            const paragraphs = parseInt(loremCount.value);
            const loremText = generateLoremIpsum(paragraphs);
            
            const loremOutput = document.getElementById('lorem-output');
            const loremCode = document.getElementById('lorem-code-display');
            
            if (loremOutput) loremOutput.innerText = loremText;
            if (loremCode) loremCode.innerText = loremText.substring(0, 100) + '...';
        };
        console.log('✅ Lorem generator initialized');
    }

    // Password Generator
    const passLength = document.getElementById('pass-length');
    if (passLength) {
        window.generatePassword = function() {
            const length = parseInt(passLength.value);
            const upperEl = document.getElementById('pass-upper');
            const numsEl = document.getElementById('pass-numbers');
            const symEl = document.getElementById('pass-symbols');

            const useUpper = upperEl ? upperEl.checked : true;
            const useNumbers = numsEl ? numsEl.checked : true;
            const useSymbols = symEl ? symEl.checked : true;
            
            const password = createPassword(length, useUpper, useNumbers, useSymbols);
            
            const passDisplay = document.getElementById('password-display');
            const passCode = document.getElementById('password-code');
            
            if (passDisplay) passDisplay.innerText = password;
            if (passCode) passCode.innerText = password;
        };
        console.log('✅ Password generator initialized');
    }
}

// Helper functions
function generateColorScheme(baseHex) {
    const rgb = hexToRgb(baseHex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    
    return [
        baseHex,
        hslToHex((hsl.h + 30) % 360, hsl.s, Math.min(hsl.l + 10, 90)),
        hslToHex((hsl.h + 60) % 360, hsl.s, Math.max(hsl.l - 10, 10)),
        hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l),
        hslToHex((hsl.h + 220) % 360, hsl.s, Math.min(hsl.l + 15, 95))
    ];
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 217, g: 70, b: 239 }; // safe fallback
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

function generateLoremIpsum(paragraphs) {
    const loremParagraphs = [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
        "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
        "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium."
    ];
    
    let result = '';
    for (let i = 0; i < paragraphs; i++) {
        result += loremParagraphs[i % loremParagraphs.length] + '\n\n';
    }
    return result.trim();
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
// SCROLL ANIMATIONS
// =========================================
function initScrollAnimations() {
    if (typeof gsap === 'undefined') {
        console.log('⚠️ GSAP not loaded, skipping animations');
        return;
    }

    try {
        gsap.registerPlugin(ScrollTrigger);

        // Hero animations
        gsap.from('.hero h1', { y: 100, opacity: 0, duration: 1.2, ease: 'power3.out' });
        gsap.from('.hero .subtitle', { y: 50, opacity: 0, duration: 1, delay: 0.3, ease: 'power3.out' });
        gsap.from('.hero .cta-group', { y: 50, opacity: 0, duration: 1, delay: 0.6, ease: 'power3.out' });

        // Parallax effect
        gsap.to('.hero-visual', {
            y: 200,
            scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.5 }
        });

        // Section headers / titles
        gsap.utils.toArray('.fade-in-scroll').forEach((el) => {
            gsap.from(el, {
                y: 40,
                opacity: 0,
                duration: 0.9,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // Left slide cards
        gsap.utils.toArray('.slide-in-left').forEach((el) => {
            gsap.from(el, {
                x: -60,
                opacity: 0,
                duration: 0.9,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // Right slide cards
        gsap.utils.toArray('.slide-in-right').forEach((el) => {
            gsap.from(el, {
                x: 60,
                opacity: 0,
                duration: 0.9,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // Bottom slide cards
        gsap.utils.toArray('.slide-in-bottom').forEach((el) => {
            gsap.from(el, {
                y: 60,
                opacity: 0,
                duration: 0.9,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 88%',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // Scale in (snippets etc.)
        gsap.utils.toArray('.scale-in').forEach((el) => {
            gsap.from(el, {
                scale: 0.95,
                y: 20,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // ===== PASTE NEW CODE ENDS HERE =====

        console.log('✅ Scroll animations initialized');
    } catch (e) {
        console.log('⚠️ Animation error:', e);
    }
}

// =========================================
// CANVAS BACKGROUNDS
// =========================================
function initCanvasBackgrounds() {
    // Live geometric background for index page
    initGeometricBackground();

    // Hyperspeed for blog
    const hCanvas = document.getElementById('hyperspeed-canvas');
    if (hCanvas) {
        const ctx = hCanvas.getContext('2d');
        let width, height, stars = [];
        
        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;
            hCanvas.width = width;
            hCanvas.height = height;
        }
        window.addEventListener('resize', resize);
        resize();
        
        class Star {
            constructor() {
                this.x = (Math.random() - 0.5) * width;
                this.y = (Math.random() - 0.5) * height;
                this.z = Math.random() * width;
            }
            update() {
                this.z -= 2;
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
        
        for (let i = 0; i < 200; i++) stars.push(new Star());
        
        function animate() {
            ctx.fillStyle = 'rgba(2, 6, 23, 0.5)';
            ctx.fillRect(0, 0, width, height);
            stars.forEach(star => { star.update(); star.draw(); });
            requestAnimationFrame(animate);
        }
        animate();
        console.log('✅ Hyperspeed canvas initialized');
    }
    
    // Grid for about page
    const gCanvas = document.getElementById('grid-canvas');
    if (gCanvas) {
        const ctx = gCanvas.getContext('2d');
        let w, h, time = 0;
        
        function resize() {
            w = window.innerWidth;
            h = window.innerHeight;
            gCanvas.width = w;
            gCanvas.height = h;
        }
        window.addEventListener('resize', resize);
        resize();
        
        function draw() {
            ctx.fillStyle = '#020617';
            ctx.fillRect(0, 0, w, h);
            ctx.strokeStyle = 'rgba(39, 201, 63, 0.15)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            for (let x = 0; x <= w; x += 40) {
                for (let y = 0; y <= h; y += 10) {
                    const yOffset = Math.sin((x * 0.01) + (y * 0.01) + time) * 10;
                    if (y === 0) ctx.moveTo(x, y + yOffset);
                    else ctx.lineTo(x, y + yOffset);
                }
            }
            for (let y = 0; y <= h; y += 40) {
                for (let x = 0; x <= w; x += 10) {
                    const yOffset = Math.sin((x * 0.01) + (y * 0.01) + time) * 10;
                    if (x === 0) ctx.moveTo(x, y + yOffset);
                    else ctx.lineTo(x, y + yOffset);
                }
            }
            ctx.stroke();
            time += 0.02;
            requestAnimationFrame(draw);
        }
        draw();
        console.log('✅ Grid canvas initialized');
    }
}

// =========================================
// LIVE GEOMETRIC BACKGROUND (INDEX)
// =========================================
function initGeometricBackground() {
    const canvas = document.getElementById('geometric-bg');
    if (!canvas) return;

    // Respect reduced motion
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    let w = 0, h = 0, dpr = 1;
    let rafId = null;
    let t = 0;

    const cfg = {
        nodeCount: 70,
        maxSpeed: 0.35,
        linkDist: 170,
        nodeRadiusMin: 1.2,
        nodeRadiusMax: 2.4,
        glowAlpha: 0.10
    };

    const rand = (min, max) => Math.random() * (max - min) + min;

    let nodes = [];

    function resize() {
        dpr = Math.min(window.devicePixelRatio || 1, 2); // cap DPR for perf
        w = Math.floor(window.innerWidth);
        h = Math.floor(window.innerHeight);

        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function resetNodes() {
        nodes = Array.from({ length: cfg.nodeCount }, () => ({
            x: rand(0, w),
            y: rand(0, h),
            vx: rand(-cfg.maxSpeed, cfg.maxSpeed),
            vy: rand(-cfg.maxSpeed, cfg.maxSpeed),
            r: rand(cfg.nodeRadiusMin, cfg.nodeRadiusMax)
        }));
    }

    function drawGlow() {
        const gx = w * 0.2 + Math.sin(t * 0.002) * w * 0.10;
        const gy = h * 0.35 + Math.cos(t * 0.002) * h * 0.10;

        const rad = Math.max(w, h) * 0.75;
        const grad = ctx.createRadialGradient(gx, gy, 0, gx, gy, rad);
        grad.addColorStop(0, `rgba(34, 211, 238, ${cfg.glowAlpha})`); // cyan-ish
        grad.addColorStop(1, 'rgba(2, 6, 23, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
    }

    function step() {
        t++;

        ctx.clearRect(0, 0, w, h);

        drawGlow();

        // move nodes
        for (const n of nodes) {
            n.x += n.vx;
            n.y += n.vy;

            // wrap edges
            if (n.x < -20) n.x = w + 20;
            if (n.x > w + 20) n.x = -20;
            if (n.y < -20) n.y = h + 20;
            if (n.y > h + 20) n.y = -20;
        }

        // links
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const a = nodes[i], b = nodes[j];
                const dx = a.x - b.x;
                const dy = a.y - b.y;
                const dist = Math.hypot(dx, dy);

                if (dist < cfg.linkDist) {
                    const alpha = 1 - dist / cfg.linkDist;

                    // alternate colors for depth
                    ctx.strokeStyle = (j % 2 === 0)
                        ? `rgba(217, 70, 239, ${0.18 * alpha})` // pink
                        : `rgba(39, 201, 63, ${0.12 * alpha})`; // green

                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                }
            }
        }

        // nodes
        ctx.fillStyle = 'rgba(148, 163, 184, 0.75)'; // slate
        for (const n of nodes) {
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
            ctx.fill();
        }

        rafId = requestAnimationFrame(step);
    }

    function start() {
        if (rafId) return;
        rafId = requestAnimationFrame(step);
    }

    function stop() {
        if (!rafId) return;
        cancelAnimationFrame(rafId);
        rafId = null;
    }

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) stop();
        else start();
    });

    window.addEventListener('resize', () => {
        resize();
        resetNodes();
    });

    resize();
    resetNodes();
    start();

    console.log('✅ Geometric background initialized');
}

// =========================================
// UTILITY FUNCTIONS
// =========================================
window.toggleCheatsheet = function(id) {
    const content = document.getElementById(id);
    if (!content) return;
    const card = content.parentElement;
    if (!card) return;
    card.classList.toggle('active');
};

window.copyToolCode = function(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;
    navigator.clipboard.writeText(element.innerText).then(() => {
        alert("✅ Code Copied!");
    }).catch(() => {
        alert("❌ Copy failed - please select and copy manually");
    });
};

window.copySnippet = function(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const text = el.value;
    navigator.clipboard.writeText(text).then(() => {
        alert("✅ Snippet Copied!");
    }).catch(() => {
        alert("❌ Copy failed - please select and copy manually");
    });
};

console.log('✅ Vyntax fully loaded!');