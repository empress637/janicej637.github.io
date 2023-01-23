
let camera, scene, renderer;
let cameraControls;
let clock = new THREE.Clock();


let subject = new Subject();


let pyramid, mats;

function sequence(...fncs) {
    return function(delta) { fncs.forEach(g => g.call(this, delta)) };
}


function moveChildren(root, ...fncs) {
    let children = root.children;
    children.forEach(function (child, i, children) {
        let animFncs = fncs.map(g => g(child, i, children));
        child.update = sequence(...animFncs);
        subject.register(child);
    });
}



function makeColorAnimator(rate, saturation=1.0, lightness=0.5) {
    function f(child, i, children) {
        child.crate = rate;
        child.cval = i / children.length;
        return function (delta) {
            this.cval += delta * this.crate;
            this.cval = mod(this.cval, 1);
            let color = new THREE.Color().setHSL(this.cval, saturation, lightness);
            this.material.color = color;
        }
    }
    return f;
}



function createScene() {
    pyramid = makePyramid(10,2.5,14, 5);
    moveChildren(pyramid, makeColorAnimator(-0.1));

    let light = new THREE.PointLight(0xFFFFFF, 1.0, 1000 );
    light.position.set(0, 0, 40);
    let light2 = new THREE.PointLight(0xFFFFFF, 1.0, 1000 );
    light2.position.set(0, 0, -40);
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


function update() {
    let delta = clock.getDelta();
    subject.notify(delta);
}

var controls = new function() {
    this.colorRate = -0.1;
    this.saturation = 1.0;
}

function initGui() {
    let gui = new dat.GUI();
    gui.add(controls, 'colorRate', -1.0, 1.0).step(0.1).onChange(updateZig);
    gui.add(controls, 'saturation', 0.0, 1.0).step(0.1).onChange(updateZig);
}



function updateZig() {
    let colorRate = controls.colorRate;
    let saturation = controls.saturation;
    moveChildren(pyramid, makeColorAnimator(colorRate, saturation));
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
    renderer.setAnimationLoop( () => {
        update();
        renderer.render(scene, camera);
    });

	camera = new THREE.PerspectiveCamera( 40, canvasRatio, 1, 1000);
	camera.position.set(0, 12, 5);
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

