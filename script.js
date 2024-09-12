// Setup Three.js 3D Scene for Molecular Model
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 200 / 200, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(200, 200);
document.getElementById('molecule-3d').appendChild(renderer.domElement);

// Create a simple sphere to represent an atom
const geometry = new THREE.SphereGeometry(0.5, 32, 32);
const material = new THREE.MeshBasicMaterial({ color: 0x42a5f5 });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Position the camera and sphere
camera.position.z = 5;

// Create an animation loop
function animate() {
  requestAnimationFrame(animate);
  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.01;
  renderer.render(scene, camera);
}

animate();
