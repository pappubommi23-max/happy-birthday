/* YEAR SCROLL */
let year = 2003;
const yearText = document.getElementById("yearText");

const interval = setInterval(() => {
    year++;
    yearText.innerText = year;

    if (year === 2026) {
        clearInterval(interval);
        setTimeout(showBirthdayMsg, 1000);
    }
}, 200);

function showBirthdayMsg() {
    hideAll();
    document.getElementById("msg1").classList.remove("hidden");

    setTimeout(() => {
        hideAll();
        document.getElementById("msg2").classList.remove("hidden");
    }, 3000);
}
function nextStep() {
    hideAll();
    document.getElementById("msg3").classList.remove("hidden");
    startFireworks();

    /* 🔊 START MUSIC (user click = allowed) */
    const music = document.getElementById("bgm");
    music.volume = 0.7;
    music.play().catch(err => console.log("Audio blocked:", err));

    setTimeout(() => {
        hideAll();
        document.getElementById("slideshow").classList.remove("hidden");
        startSlideshow();
    }, 4000);
}

function hideAll() {
    document.querySelectorAll(".center").forEach(el => el.classList.add("hidden"));
}

/* SLIDESHOW */
const images = [
    "pic1.png",
    "pic2.jpg",
    "pic3.jpg",
    "pic4.jpg",
    "pic5.jpg",
    "pic6.jpg",
    "pic9.jpg",
    "pic8.jpg",
    "pic7.jpg"
    
];
let imgIndex = 0;

function startSlideshow() {
    setInterval(() => {
        imgIndex = (imgIndex + 1) % images.length;
        document.getElementById("slideImg").src = images[imgIndex];
    }, 2500);
}

/* FIREWORKS */
/* HD DARK FIREWORKS */
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const colors = [
    "#6a00ff", // violet
    "#0ff0fc", // neon blue
    "#ff2e63", // dark pink
    "#08d9d6", // teal
    "#f72585"  // magenta
];

function createFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height * 0.6;

    for (let i = 0; i < 120; i++) {
        particles.push({
            x,
            y,
            angle: Math.random() * Math.PI * 2,
            speed: Math.random() * 6 + 2,
            radius: Math.random() * 2 + 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: 1,
            depth: Math.random() * 2 + 0.5 // 👈 3D depth feel
        });
    }
}

function animateFireworks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    particles.forEach((p, i) => {
        const dx = Math.cos(p.angle) * p.speed * p.depth;
        const dy = Math.sin(p.angle) * p.speed * p.depth;

        p.x += dx;
        p.y += dy;
        p.alpha -= 0.015;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * p.depth, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${hexToRgb(p.color)}, ${p.alpha})`;
        ctx.shadowBlur = 20;
        ctx.shadowColor = p.color;
        ctx.fill();

        if (p.alpha <= 0) particles.splice(i, 1);
    });

    requestAnimationFrame(animateFireworks);
}

function hexToRgb(hex) {
    const bigint = parseInt(hex.replace("#",""), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r},${g},${b}`;
}

function startFireworks() {
    createFirework();
    const fireInterval = setInterval(createFirework, 900);

    setTimeout(() => {
        clearInterval(fireInterval);
    }, 4000);

    animateFireworks();
}
/* HEART BALLOON FLOW */
const balloonContainer = document.getElementById("balloon-container");

const heartColors = [
    "#ff2e63", // pink
    "#f72585", // magenta
    "#6a00ff", // violet
    "#ff5d8f", // rose
    "#ff006e"  // love red
];

function createHeart() {
    const heart = document.createElement("div");
    heart.className = "balloon";

    const size = Math.random() * 15 + 20;
    heart.style.width = size + "px";
    heart.style.height = size + "px";

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.background =
        heartColors[Math.floor(Math.random() * heartColors.length)];

    const duration = Math.random() * 8 + 10;
    heart.style.animationDuration = duration + "s";

    balloonContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

/* More density = full page */
setInterval(createHeart, 350);
