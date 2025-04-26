// Three.js animation for geometric shapes
let scene, camera, renderer, particles;

function init() {
    // Create scene
    scene = new THREE.Scene();
    
    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 10;
    
    // Create renderer
    const canvas = document.getElementById('heroCanvas');
    renderer = new THREE.WebGLRenderer({ 
        canvas: canvas,
        alpha: true,
        antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Create particles
    const geometry = new THREE.TetrahedronGeometry(1, 0);
    const material = new THREE.MeshPhongMaterial({
        color: 0x3B82F6,
        shininess: 100,
        transparent: true,
        opacity: 0.8,
        wireframe: true
    });
    
    particles = [];
    for (let i = 0; i < 30; i++) {
        const particle = new THREE.Mesh(geometry, material);
        particle.position.x = (Math.random() - 0.5) * 20;
        particle.position.y = (Math.random() - 0.5) * 20;
        particle.position.z = (Math.random() - 0.5) * 20;
        particle.rotation.x = Math.random() * Math.PI;
        particle.rotation.y = Math.random() * Math.PI;
        particle.rotation.z = Math.random() * Math.PI;
        particles.push(particle);
        scene.add(particle);
    }
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    
    // Rotate particles
    particles.forEach(particle => {
        particle.rotation.x += 0.01;
        particle.rotation.y += 0.01;
        particle.rotation.z += 0.01;
    });
    
    renderer.render(scene, camera);
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    init();
    animate();
}); 