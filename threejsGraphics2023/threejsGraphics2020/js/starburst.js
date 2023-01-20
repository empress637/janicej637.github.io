/***********
 * triangle015.js
 * A simple triangle with orbit control
 * M. Laszlo
 * September 2019
 ***********/

let camera, scene, renderer;
let cameraControls;
let clock = new THREE.Clock();


//PROBLEM 1 = Starburst Torus 


function createScene() {
	let torus = makeTorus(12,2, 57,2);
	scene.add(torus);
	
	//let axes = new THREE.AxesHelper(10);	
	//scene.add(axes);
}


function makeTorus(majorRad,minorRad, nbrRays, rad){
	let geom = new THREE.TorusGeometry(majorRad, minorRad, 100, 1220);
	let root = new THREE.Object3D();
	let max = geom.vertices.length;

for (let i = 0; i < 800; i++) {
        let j = getRandomInt(1,max);
        let vertex = geom.vertices[j];
		let burst = starburst(nbrRays,rad);
        burst.position.set(vertex.x , vertex.z , vertex.y);
		root.add(burst);    
	}	  
return root;

}

function starburst(maxRays, maxRad) {
    let origin = new THREE.Vector3(0, 0, 0);
    let innerColor = getRandomColor(0.8, 0.1, 0.8);
    let black = new THREE.Color(0x000000);
    let geom = new THREE.Geometry();
    let nbrRays = getRandomInt(1, maxRays);
    if (Math.random() < 0.5) {
        nbrRays = getRandomInt(4, 57);
    }
    for (let i = 0; i < nbrRays; i++) {
        let r = getRandomFloat(0.1, maxRad);
        let dest = getRandomPointOnSphere(r);
        geom.vertices.push(origin, dest);
        geom.colors.push(innerColor, black);
    }
    let args = {vertexColors: true, linewidth: 1};
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

