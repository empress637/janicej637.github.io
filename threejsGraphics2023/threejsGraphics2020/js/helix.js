
let camera, scene, renderer;
let cameraControls;
let clock = new THREE.Clock();


function createScene() {
let matArgs = {color: 'blue', shininess: 80, transparent: true, opacity: 1.0, side: THREE.FrontSide};
let mat = new THREE.MeshPhongMaterial(matArgs);	
let geom = new THREE.SphereGeometry(1, 12, 12);
let mesh = new THREE.Mesh(geom, mat);
let helix = createHelix(mesh, 49, 1, Math.PI / 4, 0.5);
let light = new THREE.PointLight(0xFFFFFF, 1.0, 1000 );
light.position.set(10, 20, 20);
let light2 = new THREE.PointLight(0xFFFFFF, 0.6, 1000 );
light2.position.set(-20, -20, -20);
let ambientLight = new THREE.AmbientLight(0x111111);
scene.add(light);
scene.add(light2);
scene.add(ambientLight);
scene.add(helix);

let axes = new THREE.AxesHelper(10);
//scene.add(axes);
}


function createHelix(object, n, radius, angle, dist) {
let root = new THREE.Object3D();
for (let i = 0; i < n; i++) {
	
  // position
  object.position.set(
    Math.cos((angle  * i) )* radius*2,
    Math.sin((angle  * i) )* radius*2,
	dist * i
  );
  
  // rotation
  let clone = object.clone();
  clone.rotation.z = angle * i*dist;
 
  root.add(clone);
  
  
}

return root;
  
}


function animate() {
	window.requestAnimationFrame(animate);
	render();
}


function render() {
    let delta = clock.getDelta();
    cameraControls.update(delta);
	renderer.render(scene, camera);
}


function init() {
	let canvasWidth = window.innerWidth;
	let canvasHeight = window.innerHeight;
	let canvasRatio = canvasWidth / canvasHeight;

	scene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer({antialias : true, preserveDrawingBuffer: true});
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	renderer.setSize(canvasWidth, canvasHeight);
	renderer.setClearColor(0x000000, 1.0);

	camera = new THREE.PerspectiveCamera( 40, canvasRatio, 1, 1000);
	camera.position.set(0, 0, 30);
	camera.lookAt(new THREE.Vector3(0, 0, 0));

	cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
}


function addToDOM() {
	let container = document.getElementById('container');
	let canvas = container.getElementsByTagName('canvas');
	if (canvas.length>0) {
		container.removeChild(canvas[0]);
	}
	container.appendChild( renderer.domElement );
}


init();
createScene();
addToDOM();
render();
animate();

