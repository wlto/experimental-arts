const art = (function () {

  // Constants
  const MAX_CUBES = 250;

  // Event and window variables
  let mouseX = 0, mouseY = 0;
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;

  // Art scene
  let renderer, camera, scene;
  let spreadSize = 200;
  let cubesGroup;
  let step = 0;
  let cubesGeometry;
  let directionalLight;
  let minDistanceFromCenter = 100;
  let mouseMoveIntensity = 1.5;

  function mountRenderer() {
    renderer =
      window.WebGLRenderingContext
      ? new THREE.WebGLRenderer({ alpha: true })
      : new THREE.CanvasRenderer();
    renderer.setClearColor(0x242424, 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('WebGLContainer').appendChild(renderer.domElement);
  }

  function initializeScene() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = minDistanceFromCenter;
    scene.add(camera);

    let light = new THREE.AmbientLight(0xffffff);
    scene.add(light);

    directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
    scene.add(directionalLight);

    cubesGroup = new THREE.Group();
    scene.add(cubesGroup);
  }

  function render() {
    orbitCamera();
    renderer.render(scene, camera);
    window.requestAnimationFrame(render);
  }

  window.onload = () => {
    mountRenderer();
    initializeScene();

    // Adding event listeners
    addEvents();

    generateCubes();
    changeCubesColors();

    render();
  }

  // Artwork creation
  function generateCubes() {
    let averageSize = 10;
    let randomSize = 1;
    let cubesMaterial = new THREE.MeshBasicMaterial({
      vertexColors: THREE.FaceColors
    });
    cubesGeometry = new THREE.BoxGeometry(
      randomSize * averageSize,
      randomSize * averageSize,
      randomSize * averageSize
    );

    for (let i = 0; i < MAX_CUBES; i++) {
      randomSize = Math.random();
      let newCube = new THREE.Mesh(
        cubesGeometry,
        cubesMaterial
      );

      newCube.position.x = Math.random() * spreadSize - spreadSize/2;
      newCube.position.y = Math.random() * spreadSize - spreadSize/2;
      newCube.position.z = Math.random() * spreadSize - spreadSize/2;

      newCube.rotation.x = THREE.Math.radToDeg(Math.PI/4);
      newCube.rotation.y = THREE.Math.radToDeg(Math.PI/4);
      newCube.rotation.z = THREE.Math.radToDeg(Math.PI/4);

      cubesGroup.add(newCube);
    }
  }

  function orbitCamera() {
    step += 0.0001;

    cubesGroup.rotation.x = Math.cos(step) * minDistanceFromCenter/2;
    cubesGroup.rotation.y = Math.sin(step) * minDistanceFromCenter/2;
    cubesGroup.rotation.z = Math.sin(step) * minDistanceFromCenter/2;

    camera.position.x += (mouseX - camera.position.x) * 0.01;
    camera.position.y += (-mouseY - camera.position.y) * 0.01;

    directionalLight.position.copy(camera.position);
    directionalLight.updateMatrixWorld();

    camera.lookAt(scene.position);
    camera.updateMatrixWorld();
  }

  function changeCubesColors() {
    // Apparently there are 12 faces in total in a Box feometry
    let randomColor;
    for (let i = 0; i < cubesGeometry.faces.length; i+=2) {
      randomColor = Math.random() * 0xffffff;
      cubesGeometry.faces[i].color.setHex(randomColor);
      cubesGeometry.faces[i+1].color.setHex(randomColor);
      cubesGeometry.colorsNeedUpdate = true;
    }
  }

  // Events
  function onDocumentMouseMove(e) {
    mouseX = (e.clientX - windowWidth/2) * mouseMoveIntensity;
    mouseY = (e.clientY - windowHeight/2) * mouseMoveIntensity;
  }

  function addEvents() {
    // Mouse move
    document.onmousemove = onDocumentMouseMove;
  }
})();