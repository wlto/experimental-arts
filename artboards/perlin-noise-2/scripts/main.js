const art = (function () {

  let renderer, camera, scene;
  let controls;
  let boundingSize = 200;
  let sphere, sphereMaterial, sphereGeometry;
  let perlin;

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

    camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 300;
    scene.add(camera);

    let light = new THREE.AmbientLight(0xffffff);
    scene.add(light);

    let dirLight = new THREE.DirectionalLight(0xffffff);
    dirLight.position.x = -2;
    dirLight.rotation.z = THREE.Math.radToDeg(Math.PI / 4);
    scene.add(dirLight);

    controls = new THREE.OrbitControls(camera);
    controls.update();

    let axesHelper = new THREE.AxesHelper(15);
    scene.add(axesHelper);
  }

  function render() {
    controls.update();
    moveSphere();
    renderer.render(scene, camera);
    window.requestAnimationFrame(render);
  }

  window.onload = () => {
    mountRenderer();
    initializeScene();
    perlin = new ImprovedNoise();
    addSphere();

    render();
  }

  // ///////////////////////////////////
  function addSphere() {
    sphereMaterial = new THREE.MeshLambertMaterial({
      color: Math.random() * 0xffffff,
      emissiveIntensity: 0.8
    });
    sphereGeometry = new THREE.SphereGeometry(5, 10, 10);

    sphere = new THREE.Mesh(
      sphereGeometry,
      sphereMaterial
    );

    scene.add(sphere);
  }

  let xOffset = 4;
  let yOffset = 2;
  let zOffset = 1;
  let speed = 0.5;
  let stop = false;
  // let val = 1000000000;
  function moveSphere() {
    // if (scene.children.length == 600) {
    //   stop = true;
    // }

    if (!stop) {
      xOffset += (0.02 * speed);
      yOffset += (0.015 * speed);
      zOffset += (0.01 * speed);

      sphere.position.x = perlin.noise(xOffset, xOffset, xOffset) * boundingSize;
      sphere.position.y = perlin.noise(yOffset, yOffset, yOffset) * boundingSize;
      sphere.position.z = perlin.noise(zOffset, zOffset, zOffset) * boundingSize;

      // drawSphere();
    } else {
      // explode();
    }
  }

  let key = 5;
  function drawSphere() {
    console.log(scene.children.length);
    if (xOffset % 2) {
      let newSphere = new THREE.Mesh(
        sphereGeometry,
        sphereMaterial
      );

      newSphere.position.copy(sphere.position);
      newSphere.randomSpeed = Math.random();
      newSphere.name = 'sp-' + (key++);

      scene.add(newSphere);
    }
  }

  function explode() {
    let childSphere;
    let xDirection, yDirection, zDirection;
    for (let i = 5; i < key; i++) {
      childSphere = scene.getObjectByName('sp-' + i);
      xDirection = childSphere.position.x < 0 ? -1 : 1;
      yDirection = childSphere.position.y < 0 ? -1 : 1;
      zDirection = childSphere.position.z < 0 ? -1 : 1;
      
      childSphere.position.x += (childSphere.randomSpeed * xDirection);
      childSphere.position.y += (childSphere.randomSpeed * yDirection);
      childSphere.position.z += (childSphere.randomSpeed * zDirection);
    }
  }
})();