const art = (function () {

  let renderer, camera, scene;
  let particleGeometry, maxParticles = 2000;

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

    let light = new THREE.AmbientLight(0xffffff);

    scene.add(camera);
    scene.add(light);
  }

  function render() {
    moveParticles();
    renderer.render(scene, camera);
    window.requestAnimationFrame(render);
  }

  function makeParticles() {
    let material = new THREE.PointCloudMaterial({
      color: 0xffffcc
    });

    particleGeometry = new THREE.Geometry();

    let x, y, z;
    for (let i = 0; i < maxParticles; i++) {
      x = (Math.random() * 800) - 600;
      y = (Math.random() * 800) - 600;
      z = (Math.random() * 800) - 600;

      particleGeometry.vertices.push(new THREE.Vector3(x, y, z));
    }

    let pointCloud = new THREE.PointCloud(particleGeometry, material);
    scene.add(pointCloud);
  }

  function moveParticles() {
    let dX, dY, dZ;
    particleGeometry.vertices.forEach(particle => {
      dX = Math.random() * 2 - 1;
      dY = Math.random() * 2 - 1;
      dZ = Math.random() * 2 - 1;
      particle.add(new THREE.Vector3(dX, dY, dZ));
    });
    particleGeometry.verticesNeedUpdate = true;
  }

  window.onload = () => {
    mountRenderer();
    initializeScene();
    makeParticles();
    render();
  }

})();