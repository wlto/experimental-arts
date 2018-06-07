const art = (function () {

  let renderer, camera, scene;
  let distanceFromCenter = 100;
  let randomBallsNum = 600;

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
    camera.position.z = distanceFromCenter;

    let light = new THREE.AmbientLight(0xffffff);
    let dirLight = new THREE.DirectionalLight(0xffffff);

    scene.add(camera);
    scene.add(light);
    scene.add(dirLight);
    
    var axesHelper = new THREE.AxesHelper(20);
    scene.add( axesHelper );
  }

  function render() {
    rotateCameraAround(scene.position);
    renderer.render(scene, camera);
    window.requestAnimationFrame(render);
  }

  let alpha = 0;
  function rotateCameraAround(objTarget) {
    alpha += 0.001;

    // camera.position.x = Math.cos(alpha) * distanceFromCenter;
    camera.position.y = Math.sin(alpha) * distanceFromCenter;
    camera.position.x = Math.sin(alpha) * distanceFromCenter;
    camera.position.z = Math.cos(alpha) * distanceFromCenter;

    // camera.rotation.x = cameraSpeed;
    camera.lookAt(objTarget);
    camera.updateMatrixWorld();
  }

  function rotateRandomBoxes() {
    let randomBox;
    for (let i = 0; i < randomBallsNum; i++) {
      randomBox = scene.getObjectByName('box-' + i);
      randomBox.rotation.x = -alpha * 0.1 * 10;
      randomBox.rotation.y = -alpha * 0.1 * 10;
      // randomBox.rotation.z = 0.02 * Math.random() * 10;
    }
  }

  // Demo ---
  function addRandomBoxes() {
    let randomNum = Math.random() * 12;
    let box;
    let spread = 50;

    for (let i = 0; i < randomBallsNum; i++) {
      randomNum = Math.random() * 3;

      box = new THREE.Mesh(
        new THREE.BoxGeometry(randomNum, randomNum, randomNum),
        new THREE.MeshLambertMaterial({ color: randomNum * 0xffffff })
      );

      box.position.x = (Math.random() < 0.5 ? Math.random() : -Math.random()) * spread;
      box.position.y = (Math.random() < 0.5 ? Math.random() : -Math.random()) * spread;
      box.position.z = (Math.random() < 0.5 ? Math.random() : -Math.random()) * spread;

      box.rotation.x = Math.random()/2;
      box.rotation.y = Math.random()/2;
      box.rotation.z = Math.random()/2;

      box.name = 'box-' + i;
      scene.add(box);
    }
  }
  // --------

  window.onload = () => {
    mountRenderer();
    initializeScene();

    addRandomBoxes();

    render();
  }
})();