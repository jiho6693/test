import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
import { OBJLoader } from 'OBJLoader';
import { GLTFLoader } from 'GLTFLoader';
import { DirectionalLight } from 'three';

console.log(OrbitControls);

//장면추가
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xEEEEEE); 

//카메라
//const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const fov = 70;
  const aspect = window.innerWidth / window.innerHeight;
  const near = 0.1  ;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;
scene.add(camera)

//렌더러
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({
  alpha : true,
  antialias : true
});
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const orbitControls = new OrbitControls(camera,renderer.domElement);

orbitControls.update();

//땅
// const geometry = new THREE.PlaneGeometry(20,20 );
// const material = new THREE.MeshStandardMaterial({
//   color:0xffffff,
//   side: THREE.DoubleSide});
// const ground = new THREE.Mesh(geometry, material);
// ground.position.x= 0
// ground.position.y= -1.5
// ground.rotation.x = Math.PI / 2;
// scene.add(ground);  
// ground.receiveShadow = true;
// ground.castShadow = true;

const geometry = new THREE.PlaneGeometry(0.2,5 );
const material = new THREE.MeshStandardMaterial({
  color:0xffffff,
  side: THREE.DoubleSide});
const ground = new THREE.Mesh(geometry, material);
ground.position.x= -2.5
ground.position.y= 0
ground.rotation.y = Math.PI / 2;
scene.add(ground);  
ground.receiveShadow = true;
ground.castShadow = true;

//벽
const geometry01 = new THREE.PlaneGeometry(5,5 );
const material01 = new THREE.MeshStandardMaterial({
  color:0xffffff,
  side: THREE.DoubleSide});
const frontwall = new THREE.Mesh(geometry01, material01);
frontwall.position.z= +2.5
scene.add(frontwall);  
frontwall.receiveShadow = true;
frontwall.castShadow = true;

const backwall = new THREE.Mesh(geometry01, material01);
backwall.position.z= -2.5
scene.add(backwall); 
backwall.receiveShadow = true;
backwall.castShadow = true;

const rightwall = new THREE.Mesh(geometry01, material01);
rightwall.position.x= +2.5
rightwall.rotation.y = Math.PI / 2;
scene.add(rightwall)
rightwall.receiveShadow = true;
rightwall.castShadow = true;

const geometry02 = new THREE.PlaneGeometry(5,1.5)
const leftwall = new THREE.Mesh(geometry02, material01);
leftwall.position.x= -2.5
leftwall.position.y= -0.75
leftwall.rotation.y = Math.PI / 2;
scene.add(leftwall)
leftwall.castShadow = true;
leftwall.receiveShadow = true;

const geometry03 = new THREE.PlaneGeometry(5,5)
const floor = new THREE.Mesh(geometry03, material01);
floor.position.x= 0
floor.position.y= -1.5
floor.rotation.x = Math.PI / 2;
scene.add(floor)
floor.receiveShadow = true;
floor.castShadow = true;

const ceil = new THREE.Mesh(geometry03, material01);
ceil.position.x= 0
ceil.position.y= +2.4
ceil.rotation.x = Math.PI / 2;
scene.add(ceil)
ceil.castShadow = true;
ceil.receiveShadow = true;







//obj
const loader = new GLTFLoader();
// // load a resource
loader.load(
	// resource URL
	'Rock1.glb',
	// called when the resource is loaded
	function ( gltf ) {
    
    gltf.scene.scale.set(0.5, 0.5, 0.5); 
    gltf.scene.position.y= -0.5
    gltf.scene.position.z= -1.8
    gltf.scene.position.x= 1
    gltf.scene.traverse( function ( child ){
      child.castShadow = true;
      child.receiveShadow = true;
     });
		scene.add( gltf.scene );

		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object

	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);

const loader1 = new GLTFLoader();
// // load a resource
loader1.load(
	// resource URL
	'sca.glb',
	// called when the resource is loaded
	function ( sca ) {
    sca.scene.scale.set(0.2, 0.2, 0.2); 
    
    sca.scene.position.y= -1.5;
    sca.scene.position.z= 1.1
    sca.scene.position.x= -1
    sca.scene.traverse( function ( child ){
      child.castShadow = true;
      child.receiveShadow = true;
     });
		scene.add( sca.scene );

		sca.animations; // Array<THREE.AnimationClip>
		sca.scene; // THREE.Group
		sca.scenes; // Array<THREE.Group>
		sca.cameras; // Array<THREE.Camera>
		sca.asset; // Object

	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);


 



//빛

const directionalLight = new THREE.DirectionalLight(0xFEF9E7 , 2);
  directionalLight.position.set(-9, 0 , 2);
  const dlHelper = new THREE.DirectionalLightHelper
  (directionalLight, 0.2, 0x0000ff);
  scene.add(dlHelper);
  scene.add(directionalLight);
  directionalLight.castShadow = true; // 그림자 0
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height  = 1024;
  directionalLight.shadow.radius = 1
  directionalLight.shadow.bias = -0.0005;

const light = new THREE.AmbientLight( 0x404040, 0.5); // soft white light
scene.add( light );


function render(time) {
time *= 0.0001;  // convert time to seconds  
directionalLight.position.y = Math.cos( time ) * 3.75 + 1.25;

renderer.render(scene, camera);

requestAnimationFrame(render);
}
requestAnimationFrame(render);

// 반응형 처리

function onWindowResize(){
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize);



