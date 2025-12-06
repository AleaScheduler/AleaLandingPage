// Stochastic Particle Background Animation
const canvas = document.getElementById('stochasticCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];

// Settings
const particleCount = 60;
const connectionDistance = 150;
const speed = 0.3; // Slower for "Science" feel

function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}

// Get color from CSS variable
function getParticleColor() {
    const style = getComputedStyle(document.body);
    return style.getPropertyValue('--particle-color').trim() || 'rgba(46, 64, 87, 0.2)';
}

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * speed;
        this.vy = (Math.random() - 0.5) * speed;
        this.size = Math.random() * 2 + 1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw(color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    resize();
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);

    const color = getParticleColor();
    // Parse rgba to get components for line transparency
    // This is a rough parsing, sufficient for our controlled variables
    let baseColor = color;

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(color);

        // Draw connections
        for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
                ctx.beginPath();
                // Use the base color but adjust alpha based on distance
                // Simplify: just use the variable color but assumes it has some opacity
                // To do it properly with distance fading, we'd need to parse the RGBA values from the CSS var
                // For now, let's just set the stroke style to the particle color, 
                // but we really want it to fade out.
                // Hack: Set globalAlpha
                ctx.globalAlpha = 1 - (distance / connectionDistance);
                ctx.strokeStyle = color;
                ctx.lineWidth = 1;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
                ctx.globalAlpha = 1.0;
            }
        }
    }

    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    resize();
    particles = [];
    init();
});

// Re-init on theme change (if we had a distinct event)
// But since we check getComputedStyle in the loop, it should update automatically

init();
animate();
