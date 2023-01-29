/***********
 * triangle015.js
 * A simple triangle with orbit control
 * M. Laszlo
 * September 2019
 ***********/

let camera, scene, renderer;
let cameraControls;
let clock = new THREE.Clock();


function createScene() {
    let tetra = makeTetra();
    let axes = new THREE.AxesHelper(10);
    scene.add(tetra);
    scene.add(axes);
}

function makeTetra(retainF, level, mat, len=1) {
    if (level == 0) {
        let geom = new THREE.TetrahedronGeometry(len, 0);
        return new THREE.Mesh(geom, mat);
    } else {
        let cantor = makeTetra(retainF, level-1, mat, len);
        let root = new THREE.Object3D();
        root.scale.set(1/3, 1/3, 1/3);
        for (x of [-len, 0, len]) {
            for (y of [-len, 0, len]) {
                for (z of [-len, 0, len]) {
                    if (retainF(x, y, z, len)) {
                        let clone = cantor.clone();
                        clone.position.set(x, y, z);
                        root.add(clone);
                    }
                }
            }
        }
        return root;
    }
}
 
function retainF(x, y, z, len) {
    return (Math.abs(x) + Math.abs(y) + Math.abs(z)) > len;
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
