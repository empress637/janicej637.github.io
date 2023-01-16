/***********
 * triangle015.js
 * A simple triangle with orbit control
 * M. Laszlo
 * September 2019
 ***********/

let camera, scene, renderer;
let cameraControls;
let clock = new THREE.Clock();


/*************************
 * CISC 681: Assignment 1
 * Janice James
 * January 16, 2023
 ************************/

//PROBLEM 2 = createCylinder(n, rad, len)

function createScene() {
    let cylinder = createCylinder(4,8,15); 
	let axes = new THREE.AxesHelper(10);
    scene.add(cylinder);
	
	//scene.add(axes);
	
}

function createCylinder(n, rad, len){
  let len2 = len / 2;  
    let geom = new THREE.Geometry();
	
    // push vertices
 for (let i = 0; i < n+1; i++) {
    let x = rad * Math.cos(2 * Math.PI * i / n);
	let y = rad * Math.sin(2 * Math.PI * i / n);
	geom.vertices.push(new THREE.Vector3(x,len2,y),new THREE.Vector3(x,-len2,y));	
    }
	
    //push faces
for (let j = 0; j < n*2; j++) {
    let face1 = new THREE.Face3(j, j +1, j + 2);
	geom.faces.push(face1);
	}
	
geometry = new THREE.BoxGeometry( 10, 10, 10, 2, 2, 2 );
mat = new THREE.MeshBasicMaterial( { color: 0xFF0000 } );
object = new THREE.Mesh( geom);

edges = new THREE.EdgesHelper( object, 0xFF0000 );

scene.add( object );
scene.add( edges );

	//let mat = new THREE.MeshBasicMaterial({   wireframe:false, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 });	
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

