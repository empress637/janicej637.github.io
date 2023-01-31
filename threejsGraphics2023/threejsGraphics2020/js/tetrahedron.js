 
let camera, scene, renderer;
let cameraControls;
let clock = new THREE.Clock();
let tetrahedron;
let len;
let mat;
let geometry;

//PROBLEM 1 =  Sierpinski Tetrahedron

function createScene() {
    let Levels = controls.Levels;
    let Color = new THREE.Color(controls.Color);
    let opacity = controls.opacity;
    let matArgs = {color: Color, transparent: true, opacity: opacity};
    mat = new THREE.MeshLambertMaterial(matArgs);
	geometry = new THREE.TetrahedronGeometry(len);	
	tetrahedron = maketetrahedron3(6, mat, len, 0.5, geometry);
    let light = new THREE.PointLight(0xFFFFFF, 1.0, 1000 );
    light.position.set(0, 0, 40);
    let light2 = new THREE.PointLight(0xFFFFFF, 0.4, 1000 );
    light2.position.set(20, 40,20);
    let ambientLight = new THREE.AmbientLight(0x111111);
    scene.add(light);
    scene.add(light2);
    scene.add(ambientLight);
    scene.add(tetrahedron);
	
	let axes = new THREE.AxesHelper(10);
	//scene.add(axes);
}


function maketetrahedron3( level, mat, len=1, scale, geometry) {
    if (level == 0) {		
	let mesh = new THREE.Mesh(geometry, mat);
    return mesh;	
    }
    else {
		let root = new THREE.Object3D();
        root.scale.set(scale, scale, scale);
        let tf = (1 - scale) / scale;
        for (let v of geometry.vertices) {
            let root2 = new THREE.Object3D();
            let v2 = v.clone().multiplyScalar(tf);
            root2.position.set(v2.x, v2.y, v2.z);
            root2.add(maketetrahedron3(level-1, mat, len, scale, geometry));
            root.add(root2);
        }
        return root;
    }
	
}



var controls = new function() {
    this.Levels = 6;
	this.Scale = 0.5;
    this.opacity = 1.0;
    this.Color = '#f20202';

}

function update() {
	scene.remove(tetrahedron);
    tetrahedron = maketetrahedron3( controls.Levels, mat, len,controls.Scale, geometry);	
    scene.add(tetrahedron);	
}

function updateScale() {	
    let scale = controls.Scale;
    let tf = (1 - scale) / scale;
    let updateRec = function (root, level) {
        if (level > 0) {
            root.scale.set(scale, scale, scale);
            for (let i = 0; i < root.children.length; i++) {
                let c = root.children[i];
                let v = geometry.vertices[i].clone().multiplyScalar(tf);
                c.position.set(v.x, v.y, v.z);
                updateRec(c.children[0], level-1);
            }
        }
    }
    updateRec(tetrahedron, controls.Levels);
	
}


function initGui() {
    var gui = new dat.GUI();
    gui.add(controls, 'Levels', 0, 6).step(1).onChange(update);
	gui.add(controls, 'Scale', 0.1, 0.9).step(0.01).onChange(updateScale);
    gui.addColor(controls, 'Color');

}



function render() {
    var delta = clock.getDelta();
    cameraControls.update(delta);
    mat.color = new THREE.Color(controls.Color);
    mat.opacity = controls.opacity;
    renderer.render(scene, camera);
}



function init() {
	var canvasWidth = window.innerWidth;
	var canvasHeight = window.innerHeight;
	var canvasRatio = canvasWidth / canvasHeight;

	scene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer({antialias : true});
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	renderer.setSize(canvasWidth, canvasHeight);
	renderer.setClearColor(0x000000, 1.0);
    renderer.setAnimationLoop(function () {
    render();
    });

    camera = new THREE.PerspectiveCamera( 40, canvasRatio, 1, 1000);
    camera.position.set(0, 2, 3);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
}


function addToDOM() {
	var container = document.getElementById('container');
	var canvas = container.getElementsByTagName('canvas');
	if (canvas.length>0) {
		container.removeChild(canvas[0]);
	}
	container.appendChild( renderer.domElement );
}



init();
createScene();
initGui();
addToDOM();




