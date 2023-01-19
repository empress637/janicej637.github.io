/***********
 * triangle015.js
 * A simple triangle with orbit control
 * M. Laszlo
 * September 2019
 ***********/

let camera, scene, renderer;
let cameraControls;
let clock = new THREE.Clock();


function createSceneA() {
    sphereRadius = 15;
    root = starburstsOnSphereA(400, sphereRadius, 100, 1)
    scene.add(root);
}


function starburstsOnSphereA(nbrBursts, sphereRadius, maxRays, maxRad) {
    let root = new THREE.Object3D();
    for (let i = 0; i < nbrBursts; i++) {
        let mesh = starburstA(maxRays, maxRad);
        let p = getRandomPointOnSphere(sphereRadius);
        mesh.position.set(p.x, p.y, p.z);
        root.add(mesh);
    }
    return root;
}

function starburstA(maxRays, maxRad) {
    let rad = 1;   // had been rad = 10?????
    let origin = new THREE.Vector3(0, 0, 0);
    let innerColor = getRandomColor(0.8, 0.1, 0.8);
    let black = new THREE.Color(0x000000);
    let geom = new THREE.Geometry();
    let nbrRays = getRandomInt(1, maxRays);
    for (let i = 0; i < nbrRays; i++) {
        let r = rad * getRandomFloat(0.1, maxRad);
        let dest = getRandomPointOnSphere(r);
        geom.vertices.push(origin, dest);
        geom.colors.push(innerColor, black);
    }
    let args = {vertexColors: true, linewidth: 2};
    let mat = new THREE.LineBasicMaterial(args);
    return new THREE.Line(geom, mat, THREE.LineSegments);
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

