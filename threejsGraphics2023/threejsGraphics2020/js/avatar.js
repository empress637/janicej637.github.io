let camera, scene, renderer;
let cameraControls;
let clock = new THREE.Clock();
let mat;



function createScene() {
    let Levels = controls.Levels;
    let Color = new THREE.Color(controls.Color);
    let opacity = controls.opacity;
    let matArgs = {color: Color, transparent: true, opacity: opacity};
    mat = new THREE.MeshLambertMaterial(matArgs);


    let light = new THREE.PointLight(0xFFFFFF, 1.0, 1000 );
    light.position.set(0, 0, 40);
    let light2 = new THREE.PointLight(0xFFFFFF, 0.4, 1000 );
    light2.position.set(20, 40,20);
    let ambientLight = new THREE.AmbientLight(0x111111);
    scene.add(light);
    scene.add(light2);
    scene.add(ambientLight);
 
	let axes = new THREE.AxesHelper(10);
	//scene.add(axes);

let floor = makeFloor();
scene.add(floor);


let figure = new Figure();
figure.init();

}

// Figure
class Figure  {
	constructor(params) {
		this.params = {
			x: 0,
			y: 0,
			z: 0
		}
		
		// Create group and add to scene
		this.group = new THREE.Group();
		scene.add(this.group);
		
		// Position according to params
		this.group.position.x = this.params.x;
		this.group.position.y = this.params.y;
		this.group.position.z = this.params.z;
		// this.group.rotation.y = this.params.ry
		// this.group.scale.set(5, 5, 5)
		
		// Material
		this.headHue = getRandomInt(0, 360);
		this.bodyHue = getRandomInt(0, 360);
		this.headLightness = getRandomInt(40, 65);
		this.headMaterial = new THREE.MeshLambertMaterial({ color: "blue" });
		this.bodyMaterial = new THREE.MeshLambertMaterial({ color: "red" });
		
		this.arms = [];
		this.legsGroup = [];
	}
	
	createBody() {
		this.body = new THREE.Group();
		//const geometry = new THREE.BoxGeometry(1, 1.5, 1);
		const geometry = new THREE.SphereGeometry(.75);
		const bodyMain = new THREE.Mesh(geometry, mat);
		
		this.body.add(bodyMain);
		bodyMain.position.y = -1.2;
		this.group.add(this.body);
		
		this.createLegs();
	}
	
	createHead() {
		// Create a new group for the head
		this.head = new THREE.Group();
		
		// Create the main cube of the head and add to the group
		const geometry = new THREE.SphereGeometry(.5);
		const headMain = new THREE.Mesh(geometry, mat);
		this.head.add(headMain);
		
		// Add the head group to the figure
		this.group.add(this.head);
		
		// Position the head group
		this.head.position.y = 0;
		
		// Add the eyes
		this.createEyes();
		
		// Add the nose
		this.createNose();
		
		// Add the mouth
		this.createMouth();
		
		// Add the hair
		this.createHair();
		
		// Add the ears
		this.createEars();
	}
	
	
	createEyes() {
		const eyes = new THREE.Group();
		const brows = new THREE.Group();
		const geometry = new THREE.SphereGeometry(0.10, 6, 1.5);
		const geometry2 = new THREE.SphereGeometry(0.04, 6, 6);		
		const geometry3 = new THREE.BoxGeometry(0.04,.01, .01);	
		const material = new THREE.MeshLambertMaterial({ color: "white" });	
		const material2 = new THREE.MeshLambertMaterial({ color: "black" });
		
		
		for(let i = 0; i < 2; i++) {
			const m = i % 2 === 0 ? 1 : -1;
			const eye = new THREE.Mesh(geometry, material);
			const eye2 = new THREE.Mesh(geometry2, material2);
			const hair2 = new THREE.Mesh(geometry3, material);
			const hair3 = new THREE.Mesh(geometry3, material);
			
			eyes.add(eye,eye2);
			brows.add(hair2,hair3);
			
		// Position the eye
		eye.position.x = 0.20 * m;
		eye.position.z = 0.30 ;
		eye.position.y = 0.26 ;
			
			
		eye2.position.x = 0.20 * m;
		eye2.position.z = 0.36;
		eye2.position.y = 0.30 ;
		
				
		//Create Brows
		hair2.position.x = 0.26 ;
		hair2.position.z = 0.30 ;
		hair2.position.y = 0.36 ;	
	
		
		hair3.position.z = 0.30;
		hair3.position.y = 0.36 ;
		hair3.position.x = -0.26 ;
		
		}
		
		this.head.add(eyes);

		
		this.head.add(brows);
	}
	
		createNose() {
	
		// Create Nose and add to the group
		const nose = new THREE.Group();
		const geometry = new THREE.SphereGeometry(.1);
		const nos = new THREE.Mesh(geometry, mat);

		
		// Position the Nose group
		nos.position.x = 0 ;
		nos.position.z = 0.40 ;
		nos.position.y = 0.15 ;
		
		this.head.add(nos);

	}
	
	
		createMouth() {
	
		// Create Mouth and add to the group
		const mouth = new THREE.Group();
		const geometry = new THREE.BoxGeometry(.1,.04,.02,.1);
		const mat1 = new THREE.MeshLambertMaterial({ color: controls.Color });
		const mos = new THREE.Mesh(geometry, mat1);

		
		// Position the Nose group
		mos.position.x = 0 ;
		mos.position.z = 0.50 ;
		mos.position.y = -0.02 ;
		
		this.head.add(mos);

	}


		createHair() {
	
		// Create Hair and add to the group
		const hair = new THREE.Group();
		const geometry = new THREE.SphereGeometry(.60);
		const mat1 = new THREE.MeshLambertMaterial({ color: "white" });
		const hos = new THREE.Mesh(geometry, mat1);

		
		// Position the hair group
		hos.position.x = 0 ;
		hos.position.z = -.30 ;
		hos.position.y = .40;
		
		
		
		this.head.add(hos);

	}	

	createEars() {
	const ear = new THREE.Group();
	const geometry = new THREE.SphereGeometry(0.15,4, 3);

	const no = new THREE.Group();
	const gem = new THREE.SphereGeometry(0.05,.01, .01);
	const material2 = new THREE.MeshLambertMaterial({ color: "black" });	
	

	
	for(let i = 0; i < 2; i++) {
		// Define the ears material		
	const ears = new THREE.Mesh(geometry, mat);
		const m = i % 2 === 0 ? 1 : -1;
		
		// Add the ears to the group
		ear.add(ears);

		
		// Position the ears
		ears.position.x = 0.38 * m;
		ears.position.z = 0.0025 ;
		ears.position.y = .10;
		this.head.add(ear);
		
	}
}		
	
	createArms() {
		const height = 0.85;
		
		for(let i = 0; i < 2; i++) {
			const armGroup = new THREE.Group();
			const geometry = new THREE.BoxGeometry(0.25, height, 0.25);
			const geometry2 = new THREE.SphereGeometry(.25);
			const geometry3 = new THREE.BoxGeometry(.4, .3, .1);
			const arm = new THREE.Mesh(geometry, this.headMaterial);
			const shol = new THREE.Mesh(geometry2, this.headMaterial);
			const hands = new THREE.Mesh(geometry3, this.headMaterial);
			const m = i % 2 === 0 ? 1 : -1;
			
			// Add arm to group
			armGroup.add(arm);
			armGroup.add(shol);
			armGroup.add(hands);
			
			// Add group to figure
			this.body.add(armGroup);
			
			// Translate the arm by half the height
			arm.position.y = height * -0.5;
			// Translate the shol by half the height
			shol.position.y = height * -0.1;
			// Translate the hands by half the height
			hands.position.y = height * -1.3;
			
			// Position the arm relative to the figure
			armGroup.position.x = m * 0.8;
			armGroup.position.y =- 0.9;
			
			// Rotate the arm
			//armGroup.rotation.z = degreesToRadians(30 * m);
			
			// Push to the array
			this.arms.push(armGroup);
		}
	}
	
	createLegs() {
		const height = 0.75;
		for(let i = 0; i < 2; i++) {
			
		const legs = new THREE.Group();
		const geometry = new THREE.BoxGeometry(0.25, height, 0.25);
		const geometry2 = new THREE.SphereGeometry(.2);
		const geometry3 = new THREE.BoxGeometry(.4, .3, .1);
		const leg = new THREE.Mesh(geometry, this.headMaterial);
		const knee = new THREE.Mesh(geometry2, this.headMaterial);
		const foot = new THREE.Mesh(geometry3, this.headMaterial);		
		
		
			const m = i % 2 === 0 ? 1 : -1;
			
			legs.add(leg, knee, foot);
			this.body.add(legs);
			
			leg.position.x = m * 0.32;
			knee.position.x = m * 0.32;
			knee.position.y = height * .5;
			foot.position.x = m * 0.32;
			foot.position.y = height * -1;
			
			legs.position.y = -2.5;
			this.legsGroup.push(legs);
		}	
		
		
	}
	
	/*bounce() {
		this.group.rotation.y = this.params.ry;
		this.group.position.y = this.params.y;
		this.arms.forEach((arm, index) => {
			const m = index % 2 === 0 ? 1 : -1;
			arm.rotation.z = this.params.armRotation * m;
		})
	}*/
	
	init() {
		this.createBody();
		this.createHead();
		this.createArms();
	}
	

}

function makeFloor() {
    let color = new THREE.Color(0x333333);
    let matArgs = {color: color, transparent: true, opacity: 0.8};
    let mat = new THREE.MeshBasicMaterial(matArgs);
    let geom = new THREE.BoxGeometry(15, 0, 15);
    let floor = new THREE.Mesh(geom, mat);
	floor.position.y = -4;
    return floor;
}

		
var controls = new function() {
    this.Levels = 6;
	this.Scale = 0.5;
    this.opacity = 1.0;
    this.Color = '#f00200';

}

function update() {
	scene.remove(head);
    //head = createHead( controls.Levels, mat, len,controls.Scale, geometry);	
    scene.add(head);	
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
   // gui.add(controls, 'Levels', 0, 6).step(1).onChange(update);
	//gui.add(controls, 'Scale', 0.1, 0.9).step(0.01).onChange(updateScale);
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

    camera = new THREE.PerspectiveCamera( 100, canvasRatio, 1.5, 1000);
    camera.position.set(0, 1, 5);
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




