const art = (function () {

  let renderer, camera, scene;

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

    scene.add(camera);
    scene.add(light);
  }

  function render() {
    renderer.render(scene, camera);
    window.requestAnimationFrame(render);
  }

  // Demo ---
  function addBox() {
    const box = new THREE.Mesh(
      new THREE.BoxGeometry(20, 20, 20),
      new THREE.MeshLambertMaterial({color: 0x9883E5})
    );
    scene.add(box);
  }
  // --------

  window.onload = () => {
    mountRenderer();
    initializeScene();

    // Demo ---
    addBox();
    // --------

    render();
  }
})();