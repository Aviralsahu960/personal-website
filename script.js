/* =========================================
   1. TOOLS LOGIC (Shadow, Gradient, Glass, Keycode)
   ========================================= */
const hShadow = document.getElementById('h-shadow');
const vShadow = document.getElementById('v-shadow');
const blurRadius = document.getElementById('blur-radius');
const shadowColor = document.getElementById('shadow-color');
const shadowBox = document.getElementById('shadow-box');
const shadowCode = document.getElementById('shadow-code');

if(hShadow) {
    function updateShadow() {
        if (!shadowBox) return; 
        const val = `${hShadow.value}px ${vShadow.value}px ${blurRadius.value}px ${shadowColor.value}`;
        shadowBox.style.boxShadow = val;
        shadowCode.innerText = `box-shadow: ${val};`;
    }
    [hShadow, vShadow, blurRadius, shadowColor].forEach(input => {
        input.addEventListener('input', updateShadow);
    });
}

const color1 = document.getElementById('color1');
const color2 = document.getElementById('color2');
const direction = document.getElementById('direction');
const gradientBox = document.getElementById('gradient-box');
const gradientCode = document.getElementById('gradient-code');

if(color1) {
    function updateGradient() {
        if (!gradientBox) return;
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

const glassBlur = document.getElementById('glass-blur');
const glassOpacity = document.getElementById('glass-opacity');
const glassOutline = document.getElementById('glass-outline');
const glassBox = document.getElementById('glass-box');
const glassCode = document.getElementById('glass-code');

if(glassBlur) {
    function updateGlass() {
        if (!glassBox) return;
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

window.addEventListener('keydown', (e) => {
    const keyDisplay = document.getElementById('key-display');
    const keyOutput = document.getElementById('keycode-output');
    if (keyDisplay && keyOutput) {
        keyDisplay.innerText = e.key === " " ? "Space" : e.key;
        keyOutput.innerText = e.keyCode;
    }
});

function copyToolCode(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;
    navigator.clipboard.writeText(element.innerText).then(() => alert("Code Copied!"));
}

function copySnippet(id) {
    const text = document.getElementById(id).value;
    navigator.clipboard.writeText(text).then(() => alert("Snippet Copied!"));
}

/* =========================================
   2. HYPERSPEED (Blog Page)
   ========================================= */
const hCanvas = document.getElementById('hyperspeed-canvas');
if (hCanvas) {
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
            ctx.arc(x, y, size, 0, Math.PI * 2);
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

/* =========================================
   3. GRID MOTION (About Page)
   ========================================= */
const gCanvas = document.getElementById('grid-canvas');
if (gCanvas) {
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