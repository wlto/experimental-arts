const art = (function () {

  let renderer, camera, scene;
  let controls;
  let perlin;
  let cubesGeometry, cubes;
  const MAX_CUBES = 200;
  const SPREAD = 300;
  const AVG_CUBE_SIZE = 15;

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

    camera = new THREE.PerspectiveCamera(
      35,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 60;

    let light = new THREE.AmbientLight(0xffffff);
    let dirLight = new THREE.DirectionalLight(0xffffff);

    scene.add(camera);
    scene.add(light);
    scene.add(dirLight);

    controls = new THREE.OrbitControls(camera);
    controls.update();    

    cubes = new THREE.Group();
    scene.add(cubes);
  }

  function render() {
    perlinRotation();
    perlinPosition();
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(render);
  }

  window.onload = () => {
    mountRenderer();
    initializeScene();

    perlin = new ImprovedNoise();

    generateCubes();
    render();
  }

  // //////////////////////////
  function generateCubes() {
    let cubesMaterial = new THREE.MeshLambertMaterial({
      color: Math.random() * 0xffffff
    });

    let randomSize = 1;

    cubesGeometry = new THREE.BoxGeometry(
      randomSize * AVG_CUBE_SIZE,
      randomSize * AVG_CUBE_SIZE,
      randomSize * AVG_CUBE_SIZE
    );

    for (let i = 0; i < MAX_CUBES; i++) {
      randomSize = Math.random();
      let cube = new THREE.Mesh(
        cubesGeometry,
        cubesMaterial
      );

      cube.position.x = Math.random() * SPREAD - SPREAD/2;
      cube.position.y = Math.random() * SPREAD - SPREAD/2;
      cube.position.z = Math.random() * SPREAD - SPREAD/2;

      cube.rotation.x = Math.random() * THREE.Math.radToDeg(Math.PI/3);
      cube.rotation.y = Math.random() * THREE.Math.radToDeg(Math.PI/3);
      cube.rotation.z = Math.random() * THREE.Math.radToDeg(Math.PI/3);

      cube.name = 'cube-' + i;

      cubes.add(cube);
    }
  }

  function perlinRotation() {
    let smoothness = Date.now() / 10000000000000000;
    for (let i = 0; i < MAX_CUBES; i++) {
      let cube = cubes.getObjectByName('cube-' + i);
      cube.rotation.x += perlin.noise(
        smoothness * cube.rotation.x,
        smoothness * cube.rotation.y,
        smoothness * cube.rotation.z
      );
      cube.rotation.y += perlin.noise(
        smoothness * cube.rotation.x,
        smoothness * cube.rotation.y,
        smoothness * cube.rotation.z
      );
      cube.rotation.z += perlin.noise(
        smoothness * cube.rotation.x,
        smoothness * cube.rotation.y,
        smoothness * cube.rotation.z
      );

      // v---- Random
      // cube.rotation.x += Math.random();
      // cube.rotation.y += Math.random();
      // cube.rotation.z += Math.random();
    }
  }

  
  function perlinPosition() {
    let smoothness = 0.01;
    for (let i = 0; i < MAX_CUBES; i++) {
      let cube = cubes.getObjectByName('cube-' + i);
      
      cube.position.x = cube.position.y = cube.position.z = perlin.noise(
        smoothness,
        smoothness * 0.1,
        smoothness * 0.2
      );

      // cube.position.x = cube.position.y = cube.position.z = Math.random() * (SPREAD/50);
    }
  }
})();