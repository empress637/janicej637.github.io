
let camera, scene, renderer;
let cameraControls;
let clock = new THREE.Clock();

/*************************
 * CISC 681: Assignment 1
 * Janice James
 * January 16, 2023
 ************************/

//PROBLEM 1 = regularPolygonMesh(n, rad, innerColor, outerColor)

function createScene() {
    let polygon = regularPolygonMesh(8,6, 0xFF0000, 0x0000FF); 
	let axes = new THREE.AxesHelper(10);
    scene.add(polygon);
	
	//scene.add(axes);
	
}

function regularPolygonMesh(n,rad,innercolor, outercolor){
	let geom = new THREE.Geometry();

    // push n + 1 vertices	
	for (let i = 0; i <= n; i++) {
    let x = rad * Math.cos(2 * Math.PI * i / n);
	let y = rad * Math.sin(2 * Math.PI * i / n);
    
	geom.vertices.push(new THREE.Vector3(x,y,0));			
    }
	geom.vertices.push(new THREE.Vector3(0, (rad * Math.sin(2 * Math.PI * 0 / n)), 0));	
	
    // push the n triangular faces
	for (let i =0; i < n; i++) {
	let center = new THREE.Face3(0,0,0);
	let face = new THREE.Face3(i, i+1, center );	
	
    geom.faces.push(face);
	
	face.vertexColors.push(new THREE.Color(outercolor), new THREE.Color(outercolor), new THREE.Color(innercolor));
	
	}
	

    let mat = new THREE.MeshBasicMaterial({ vertexColors: THREE.VertexColors, side: THREE.DoubleSide});
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

