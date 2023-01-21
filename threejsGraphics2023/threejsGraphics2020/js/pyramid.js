/***********
 * triangle015.js
 * A simple triangle with orbit control
 * M. Laszlo
 * September 2019
 ***********/

let camera, scene, renderer;
let cameraControls;
let clock = new THREE.Clock();


//PROBLEM 2 = Pyramid of Toruses 


function createScene() {
	let pyramid = makePyramid(14,18,.4);
	scene.add(pyramid);
	
	//let axes = new THREE.AxesHelper(10);	
	//scene.add(axes);
}


function makePyramid(nbrTorus,majorRad,minorRad){
let root = new THREE.Object3D();
let j = -5;
for (let i = nbrTorus-1; i < nbrTorus && i >=0; i--) {
		let y = j;
		let torus = makeTorus(majorRad,minorRad);
        torus.position.set(0,j,0);   
		torus.rotateX(190);		
		root.add(torus);  
		j = j+.7;
		majorRad = majorRad-1;
		minorRad = minorRad+.5/majorRad;
		
	if( i == 0){
	let sphereColor = getRandomColor(0.6, 0.5, 0.4);
	let geometry = new THREE.SphereGeometry( majorRad );
	let mat = new THREE.MeshBasicMaterial({ color: sphereColor});
    let mesh = new THREE.Mesh(geometry, mat);
	mesh.position.set(0,j+.5,0);
	scene.add(mesh);
	}
	}	  

	
return root;
}

function makeTorus(majorRad,minorRad){
let geom = new THREE.TorusGeometry(majorRad, minorRad, 150, 20);	
let innerColor = getRandomColor(0.6, 0.5, 0.4);
let mat = new THREE.MeshBasicMaterial({color: innerColor});	
let mesh = new THREE.Mesh(geom, mat);	  
return mesh;
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

	camera = new THREE.PerspectiveCamera( 40, canvasRatio, 1, 100);
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
