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
    pyramid = makePyramid(10,2.5,14, 5);
    let light = new THREE.PointLight(0xFFFFFF, 1.0, 1000 );
    light.position.set(0, 0, 40);
    let light2 = new THREE.PointLight(0xFFFFFF, 1.0, 1000 );
    light2.position.set(20, 40, -40);
    let ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(light);
    scene.add(light2);
    scene.add(ambientLight);
    scene.add(pyramid);

    
}



function makePyramid(majorRad,minorRad,nbrToruses,cherry,materials) {
    let ypos = cherry ;
    let sf = .01;
    if (!materials) mats = [];
    root = new THREE.Object3D();
    for (let i = 0; i <= nbrToruses; i++) {
        let geom = new THREE.TorusGeometry(majorRad, minorRad/i*2,  150, 20);
        let mat;
        if (!materials) {
            let matArgs = { color: getRandomColor()};
            mat = new THREE.MeshLambertMaterial(matArgs);
            mats.push(mat);
        } else {
            mat = mats[i];
        }
		
        let cyl = new THREE.Mesh(geom, mat);
        cyl.position.y = ypos;
        cyl.scale.set(sf, sf, sf);
		cyl.rotateX(190);
        root.add(cyl);
        ypos = ypos-.5;
        sf = sf+0.1;
		
		if(i==nbrToruses){
		let geometry = new THREE.SphereGeometry( minorRad*2/i*1.5 );
		let gem = new THREE.Mesh(geometry, mat);
		gem.position.y = cherry;
		root.add(gem);
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
