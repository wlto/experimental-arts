const art = (function () {

  let renderer, camera, scene;
  let particleSystem;
  let spawnRate = 5000;
  let particleOptions = {
    position: new THREE.Vector3(),
    positionRandomness: 0.3,
    velocity: new THREE.Vector3(),
    velocityRandomness: 0.5,
    color: Math.random() * 0xffffff,
    turbulence: 0.4,
    lifetime: 2,
    size: 5 * Math.random()
  };

  function mountRenderer() {
    renderer =
      window.WebGLRenderingContext
      ? new THREE.WebGLRenderer()
      : new THREE.CanvasRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('WebGLContainer').appendChild(renderer.domElement);
  }

  function initializeScene() {
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 100;
    scene.add(camera);
    
    // Light
    let light = new THREE.AmbientLight(0xffffff);
    scene.add(light);
  }

  function render() {
    spawnParticles();
    renderer.render(scene, camera);
    window.requestAnimationFrame(render);
  }

  window.onload = () => {
    mountRenderer();
    initializeScene();

    initializeParticleSystem();

    render();
  }

  // /////////////////////////////////
  function initializeParticleSystem() {
    particleSystem = new THREE.GPUParticleSystem({
      maxParticles: 25000
    });

    scene.add(particleSystem);
  }

  function spawnParticles() {
    for (let i = 0; i < spawnRate; i++) {
      particleSystem.spawnParticle(particleOptions);
    }
    particleSystem.update(new THREE.Clock());
  }
})();