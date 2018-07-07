// Credits
//
// https://www.clicktorelease.com/blog/vertex-displacement-noise-3d-webgl-glsl-three-js/

const art = (function() {
  let renderer, camera, scene;
  let controls;

  let start = Date.now();
  let sphereGeometry = new THREE.SphereGeometry(50, 64, 64);
  let sphereMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: {
        type: 'f',
        value: 0.0
      }
    },
    vertexShader: document.getElementById('vertexShader').textContent,
    fragmentShader: document.getElementById('fragmentShader').textContent
  });
  let sphere = null;

  function mountRenderer() {
    renderer = window.WebGLRenderingContext
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

    controls = new THREE.OrbitControls(camera);
    controls.update();

    scene.add(camera);
    scene.add(light);
  }

  function render() {
    renderer.render(scene, camera);
    sphereMaterial.uniforms['time'].value = 0.00025 * (Date.now() - start);
    controls.update();
    window.requestAnimationFrame(render);
  }

  function createSphere() {
    sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);
  }

  window.onload = () => {
    mountRenderer();
    initializeScene();
    createSphere();
    render();
  };
})();
