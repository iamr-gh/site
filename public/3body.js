const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Physics constants
const G = 1;
const dt = 0.002;
const softening = 0.05;
const trailLength = 800;

// Colors
const colors = ['#ff6b6b', '#4ecdc4', '#ffe66d'];

// Presets - mathematically precise initial conditions
// All use unit masses and are scaled for display
const presets = {
    figure8: {
        // Chenciner-Montgomery Figure-8 solution
        scale: 150,
        bodies: [
            { x: -0.97000436, y: 0.24308753, vx: 0.4662036850, vy: 0.4323657300, mass: 1 },
            { x: 0.97000436, y: -0.24308753, vx: 0.4662036850, vy: 0.4323657300, mass: 1 },
            { x: 0, y: 0, vx: -0.93240737, vy: -0.86473146, mass: 1 }
        ]
    },
    lagrange: {
        // Equilateral triangle with circular orbits
        scale: 150,
        bodies: (() => {
            const r = 1, v = 0.5;
            return [
                { x: 0, y: r, vx: v * Math.cos(-Math.PI/6), vy: v * Math.sin(-Math.PI/6), mass: 1 },
                { x: -r * Math.sin(2*Math.PI/3), y: r * Math.cos(2*Math.PI/3), vx: v * Math.cos(-Math.PI/6 + 2*Math.PI/3), vy: v * Math.sin(-Math.PI/6 + 2*Math.PI/3), mass: 1 },
                { x: -r * Math.sin(4*Math.PI/3), y: r * Math.cos(4*Math.PI/3), vx: v * Math.cos(-Math.PI/6 + 4*Math.PI/3), vy: v * Math.sin(-Math.PI/6 + 4*Math.PI/3), mass: 1 }
            ];
        })()
    },
    chaotic: {
        // Bound chaotic orbit - will show sensitivity to initial conditions
        scale: 150,
        bodies: [
            { x: -1, y: 0, vx: 0, vy: 0.5, mass: 1 },
            { x: 1, y: 0, vx: 0, vy: -0.5, mass: 1 },
            { x: 0, y: 0.5, vx: 0.5, vy: 0, mass: 1 }
        ]
    },
    butterfly: {
        // Butterfly orbit - another periodic solution
        scale: 150,
        bodies: [
            { x: -1, y: 0, vx: 0.30689, vy: 0.12551, mass: 1 },
            { x: 1, y: 0, vx: 0.30689, vy: 0.12551, mass: 1 },
            { x: 0, y: 0, vx: -0.61378, vy: -0.25102, mass: 1 }
        ]
    }
};

// State
let bodies = [];
let trails = [[], [], []];
let dragging = null; // { index, type: 'position' | 'velocity' }
let paused = false;
let scale = 1;
let displayScale = 150;
let center = { x: 0, y: 0 };

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    center = { x: canvas.width / 2, y: canvas.height / 2 };
}

function loadPreset(name) {
    const preset = presets[name];
    displayScale = preset.scale;
    bodies = preset.bodies.map(b => ({
        x: b.x,
        y: b.y,
        vx: b.vx,
        vy: b.vy,
        mass: b.mass
    }));
    trails = [[], [], []];
    syncMassSliders();
}

function syncMassSliders() {
    bodies.forEach((b, i) => {
        document.getElementById('mass' + i).value = b.mass;
    });
}

function readMassSliders() {
    bodies.forEach((b, i) => {
        b.mass = parseFloat(document.getElementById('mass' + i).value);
    });
}

// Physics
function computeAccel(bodies) {
    const accels = [];
    for (let i = 0; i < 3; i++) {
        let ax = 0, ay = 0;
        for (let j = 0; j < 3; j++) {
            if (i === j) continue;
            const dx = bodies[j].x - bodies[i].x;
            const dy = bodies[j].y - bodies[i].y;
            const r2 = dx * dx + dy * dy + softening * softening;
            const r = Math.sqrt(r2);
            const f = G * bodies[j].mass / r2;
            ax += f * dx / r;
            ay += f * dy / r;
        }
        accels.push({ ax, ay });
    }
    return accels;
}

// RK4 integration
function step() {
    const k1 = computeAccel(bodies);
    const tmp1 = bodies.map((b, i) => ({
        x: b.x + dt / 2 * b.vx,
        y: b.y + dt / 2 * b.vy,
        vx: b.vx + dt / 2 * k1[i].ax,
        vy: b.vy + dt / 2 * k1[i].ay,
        mass: b.mass
    }));

    const k2 = computeAccel(tmp1);
    const tmp2 = bodies.map((b, i) => ({
        x: b.x + dt / 2 * tmp1[i].vx,
        y: b.y + dt / 2 * tmp1[i].vy,
        vx: b.vx + dt / 2 * k2[i].ax,
        vy: b.vy + dt / 2 * k2[i].ay,
        mass: b.mass
    }));

    const k3 = computeAccel(tmp2);
    const tmp3 = bodies.map((b, i) => ({
        x: b.x + dt * tmp2[i].vx,
        y: b.y + dt * tmp2[i].vy,
        vx: b.vx + dt * k3[i].ax,
        vy: b.vy + dt * k3[i].ay,
        mass: b.mass
    }));

    const k4 = computeAccel(tmp3);

    for (let i = 0; i < 3; i++) {
        bodies[i].x += dt / 6 * (bodies[i].vx + 2 * tmp1[i].vx + 2 * tmp2[i].vx + tmp3[i].vx);
        bodies[i].y += dt / 6 * (bodies[i].vy + 2 * tmp1[i].vy + 2 * tmp2[i].vy + tmp3[i].vy);
        bodies[i].vx += dt / 6 * (k1[i].ax + 2 * k2[i].ax + 2 * k3[i].ax + k4[i].ax);
        bodies[i].vy += dt / 6 * (k1[i].ay + 2 * k2[i].ay + 2 * k3[i].ay + k4[i].ay);
    }
}

function toScreen(x, y) {
    return {
        x: center.x + x * displayScale * scale,
        y: center.y - y * displayScale * scale
    };
}

function toWorld(sx, sy) {
    return {
        x: (sx - center.x) / (displayScale * scale),
        y: (center.y - sy) / (displayScale * scale)
    };
}

function draw() {
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw trails
    for (let i = 0; i < 3; i++) {
        const trail = trails[i];
        if (trail.length < 2) continue;
        ctx.strokeStyle = colors[i];
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        const p0 = toScreen(trail[0].x, trail[0].y);
        ctx.moveTo(p0.x, p0.y);
        for (let j = 1; j < trail.length; j++) {
            const p = toScreen(trail[j].x, trail[j].y);
            ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
    }

    // Draw velocity arrows and bodies
    for (let i = 0; i < 3; i++) {
        const b = bodies[i];
        const pos = toScreen(b.x, b.y);
        const radius = 10 + b.mass * 3;

        // Velocity arrow
        const vScale = displayScale * scale * 0.3;
        const arrowEnd = {
            x: pos.x + b.vx * vScale,
            y: pos.y - b.vy * vScale
        };
        const vMag = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
        
        if (vMag > 0.01) {
            ctx.strokeStyle = colors[i];
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(pos.x, pos.y);
            ctx.lineTo(arrowEnd.x, arrowEnd.y);
            ctx.stroke();

            // Arrowhead
            const angle = Math.atan2(-b.vy, b.vx);
            const headLen = 12;
            ctx.beginPath();
            ctx.moveTo(arrowEnd.x, arrowEnd.y);
            ctx.lineTo(
                arrowEnd.x - headLen * Math.cos(angle - 0.4),
                arrowEnd.y + headLen * Math.sin(angle - 0.4)
            );
            ctx.moveTo(arrowEnd.x, arrowEnd.y);
            ctx.lineTo(
                arrowEnd.x - headLen * Math.cos(angle + 0.4),
                arrowEnd.y + headLen * Math.sin(angle + 0.4)
            );
            ctx.stroke();
        }

        // Body
        ctx.fillStyle = colors[i];
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    // Status
    if (paused) {
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.font = 'bold 16px system-ui';
        ctx.fillText('PAUSED', 20, 30);
        ctx.font = '13px system-ui';
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        ctx.fillText('Drag center to move • Drag edge to set velocity', 20, 50);
    }
}

function animate() {
    if (!paused && !dragging) {
        readMassSliders();
        // Multiple substeps for stability
        for (let i = 0; i < 5; i++) step();
        for (let i = 0; i < 3; i++) {
            trails[i].push({ x: bodies[i].x, y: bodies[i].y });
            if (trails[i].length > trailLength) trails[i].shift();
        }
    }
    draw();
    requestAnimationFrame(animate);
}

// Interaction
function getBodyAt(sx, sy) {
    for (let i = 0; i < 3; i++) {
        const pos = toScreen(bodies[i].x, bodies[i].y);
        const radius = 10 + bodies[i].mass * 3;
        const dx = sx - pos.x, dy = sy - pos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Within outer hit zone
        if (dist < radius + 25) {
            // Inner zone = position drag, outer zone = velocity drag
            const type = dist < radius * 0.7 ? 'position' : 'velocity';
            return { index: i, type };
        }
    }
    return null;
}

canvas.addEventListener('mousedown', (e) => {
    const hit = getBodyAt(e.clientX, e.clientY);
    if (hit) {
        dragging = hit;
        paused = true;
        document.getElementById('compute').textContent = 'Play';
    }
});

canvas.addEventListener('mousemove', (e) => {
    if (!dragging) {
        // Update cursor based on hover
        const hit = getBodyAt(e.clientX, e.clientY);
        canvas.style.cursor = hit ? (hit.type === 'position' ? 'move' : 'crosshair') : 'default';
        return;
    }
    
    const world = toWorld(e.clientX, e.clientY);
    const b = bodies[dragging.index];

    if (dragging.type === 'position') {
        b.x = world.x;
        b.y = world.y;
    } else {
        // Velocity: vector from body to mouse
        b.vx = (world.x - b.x) * 3;
        b.vy = (world.y - b.y) * 3;
    }
    draw();
});

canvas.addEventListener('mouseup', () => {
    if (dragging) {
        dragging = null;
        trails = [[], [], []];
    }
});

canvas.addEventListener('mouseleave', () => {
    if (dragging) {
        dragging = null;
        trails = [[], [], []];
    }
});

canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    scale *= e.deltaY > 0 ? 0.9 : 1.1;
    scale = Math.max(0.2, Math.min(5, scale));
});

// Controls
document.getElementById('compute').addEventListener('click', () => {
    paused = !paused;
    document.getElementById('compute').textContent = paused ? 'Play' : 'Pause';
});

document.getElementById('reset').addEventListener('click', () => {
    const presetName = document.getElementById('preset').value;
    loadPreset(presetName);
    paused = false;
    document.getElementById('compute').textContent = 'Pause';
});

document.getElementById('preset').addEventListener('change', (e) => {
    loadPreset(e.target.value);
    paused = false;
    document.getElementById('compute').textContent = 'Pause';
});

// Init
window.addEventListener('resize', resize);
resize();
loadPreset('figure8');
animate();
