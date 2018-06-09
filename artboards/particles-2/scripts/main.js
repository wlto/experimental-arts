const art = (function () {

  const MAX_PARTICLES = 2000;

  let renderer, camera, scene;
  let particles, particlesGeometry;
  let group;
  let size = window.innerWidth/2;
  const initialCameraPosition = 1000;

  function mountRenderer() {
    renderer =
      window.WebGLRenderingContext
      ? new THREE.WebGLRenderer({ alpha: true })
      : new THREE.CanvasRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x202030, 1);
    document.getElementById('WebGLContainer').appendChild(renderer.domElement);
  }

  function initializeScene() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
      100,
      window.innerWidth / window.innerHeight,
      1,
      1500
    );
    camera.position.z = initialCameraPosition;

    let light = new THREE.AmbientLight(0xffffff);

    scene.add(camera);
    scene.add(light);

    group = new THREE.Group();
    scene.add(group);
  }

  function render() {
    zoomCamera();
    renderer.render(scene, camera);
    window.requestAnimationFrame(render);
  }

  window.onload = () => {
    mountRenderer();
    initializeScene();
    createParticles();
    mountBoxHelper();
    registerControlButtons();
    render();
  }

  // ------------------------------------------------
  function createParticles(customZ, maxParticles = MAX_PARTICLES) {
    particlesGeometry = null;
    particlesGeometry = new THREE.Geometry();
    let particlesMaterial = new THREE.PointsMaterial({
      color: 0xD4CB92
    });

    let x, y, z;
    for (let i = 0; i < maxParticles; i++) {
      x = Math.random() * size - size/2;
      y = Math.random() * size - size/2;
      z = customZ ? -customZ * size * Math.random() : Math.random() * size - size/2;

      particlesGeometry.vertices.push(new THREE.Vector3(x, y, z));
    }
    particlesGeometry.lookAt(camera.position);
    particles = new THREE.Points(particlesGeometry, particlesMaterial);
    
    group.add(particles);
  }

  function mountBoxHelper() {
    let boxHelper = new THREE.BoxHelper(particles, 0xffffff);
    group.add(boxHelper);
  }

  function createStarLines(begZ, endZ) {
    let lineGeometry = new THREE.Geometry();
    let randomX = Math.random() * (size*2) - size;
    let randomY = Math.random() * (size*2) - size;

    lineGeometry.vertices.push(new THREE.Vector3(
      randomX,
      randomY,
      begZ
    ));
    lineGeometry.vertices.push(new THREE.Vector3(
      randomX * 10 * Math.random(),
      randomY * 10 * Math.random(),
      endZ
    ));

    let line = new THREE.Line(
      lineGeometry,
      new THREE.LineBasicMaterial({ color: 0xcccccc })
    );
    group.add(line);
  }

  let speed = 0;
  let slowdown = false;
  let stop = false;
  
  function zoomCamera() {
    if (stop == true) {
      speed = 0;
    } else {
      if (!slowdown) {
        speed += 0.4;
      } else {
        speed = Math.log(Date.now() / 1000000000000);
      }
    }

    if (camera.position.z <= 300) {
      // console.log('goes here?');
      moveExistingParticlesVertices();
    } else {
      createParticles(camera.position.z * 2, MAX_PARTICLES);
    }
    
    camera.position.z -= speed;
    // console.log(group.children);
  }

  function moveExistingParticlesVertices() {
    for (let i = 0; i < particlesGeometry.vertices.length; i++) {
      particlesGeometry.vertices[i].z += camera.position.z;
    }
  }
  
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function registerControlButtons() {
    document.getElementById('speedSpaceshipBtn').onclick = function () {
      slowdown = !slowdown;
      this.innerText = slowdown ? 'Full Speed' : 'Slow Down';
    }

    document.getElementById('restartSpaceshipBtn').onclick = function () {
      camera.position.z = initialCameraPosition;
      console.log(group);
      // group.remove(group.children[])
      group.children = [];
      createParticles();
      mountBoxHelper();
      // group.remove(particles);
      speed = 0;
    }

    document.getElementById('stopSpaceshipBtn').onclick = function () {
      stop = !stop;
      this.innerText = stop ? 'Resume' : 'Stop';
    }
  }
})();