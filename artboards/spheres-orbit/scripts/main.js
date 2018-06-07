const art = (function () {

  let renderer, camera, scene;
  const SPHERES_MAX = 200;
  let controls;

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
    camera.position.z = 100;

    let light = new THREE.AmbientLight(0xffffff);
    let dirLight = new THREE.DirectionalLight(0xffffff);

    scene.add(camera);
    scene.add(light);
    scene.add(dirLight);
    scene.add(new THREE.AxesHelper(15));

    controls = new THREE.OrbitControls(camera);
    controls.update();
  }

  let alpha = 0;
  function render() {
    alpha += 0.0000000001;
    // jiggleSpheres(alpha);
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(render);
  }

  function jiggleSpheres(alpha) {
    for (let i = 0; i < SPHERES_MAX; i++) {
      let sphere = scene.getObjectByName('sphere-' + i);
      // sphere.lookAt(scene.position);
      sphere.position.z = Math.random() * Math.cos(alpha);
    }
  }

  function addRandomSpheres() {
    let size = 2;
    let spread = 30;

    for (let i = 0; i < SPHERES_MAX; i++) {
      let singleSpheresSize = Math.random();
      let sphere = new THREE.Mesh(
        new THREE.SphereGeometry(
          singleSpheresSize * size,
          singleSpheresSize * size * 10,
          singleSpheresSize * size * 10
        ),
        new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff })
      );

      sphere.position.x = (Math.random() < 0.5 ? -Math.random() : Math.random()) * spread;
      sphere.position.y = (Math.random() < 0.5 ? -Math.random() : Math.random()) * spread;
      sphere.position.z = (Math.random() < 0.5 ? -Math.random() : Math.random()) * spread;
      sphere.name = 'sphere-' + i;
      
      scene.add(sphere);
    }
  }

  window.onload = () => {
    mountRenderer();
    initializeScene();
    addRandomSpheres();
    render();
  }
})();