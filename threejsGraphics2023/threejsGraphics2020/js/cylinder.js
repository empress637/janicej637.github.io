/***********
 * triangle015.js
 * A simple triangle with orbit control
 * M. Laszlo
 * September 2019
 ***********/

let camera, scene, renderer;
let cameraControls;
let clock = new THREE.Clock();


//PROBLEM 2 = createCylinder(n, rad, len)

function createScene() {
    let cylinder = createCylinder(10,8,15); 
	let axes = new THREE.AxesHelper(10);
    scene.add(cylinder);
	
	//scene.add(axes);
	
}

function createCylinder(n, rad, len){
let len2 = len / 2;  
let geom = new THREE.Geometry();
let points1 = [];	
let points2 = [];

	//sides
for (let i = 0; i <= n; i++) {
    let x = rad * Math.cos(2 * Math.PI * i / n);
	let y = rad * Math.sin(2 * Math.PI * i / n);
	geom.vertices.push(new THREE.Vector3(x,len2,y),new THREE.Vector3(x,-len2,y));
    }
	
	//top
for (let i = 0; i <= n; i++) {
    let x = rad * Math.cos(2 * Math.PI * i / n);
	let y = rad * Math.sin(2 * Math.PI * i / n);	
	points1.push( new THREE.Vector3(x,len2,y) );
    }
	
    //bottom
for (let i = 0; i <= n; i++) {
    let x = rad * Math.cos(2 * Math.PI * i / n);
	let y = rad * Math.sin(2 * Math.PI * i / n);
	points2.push( new THREE.Vector3(-x,-len2,y) );
 }
    
let top = new THREE.BufferGeometry().setFromPoints( points1 );
let bottom = new THREE.BufferGeometry().setFromPoints( points2 ); 
let mat = new THREE.MeshBasicMaterial({color: 0xff0000});	
let lines = new THREE.LineSegments(
            geom,
            new THREE.LineBasicMaterial({
                color: new THREE.Color('red')
            }));
let lines1 = new THREE.Line(top, mat );
let lines2 = new THREE.Line(bottom, mat );
	
scene.add(lines, lines1, lines2 );

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

