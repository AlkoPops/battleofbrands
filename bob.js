
    const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('webgl'),
  antialias: true,
  alpha: true
});

renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0x505050, 0);
renderer.setPixelRatio = 20;
renderer.shadowMap.enabled = false;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.LinearToneMapping;
renderer.toneMappingExposure = 1;

renderer.setAnimationLoop( animate );

//Controls
//const controls = new OrbitControls( camera, renderer.domElement );

//controls.update() must be called after any manual changes to the camera's transform
camera.position.set( 0, 1.5, 8);
camera.lookAt(new THREE.Vector3(0, 1.8, 0)); // Make the camera look at the origin

//controls.update();

//EnvironmentMap
const hdriLoader = new RGBELoader()
hdriLoader.load('https://corsproxy.io/?https://alexanderkoschel.de/royal_esplanade_1k.hdr', function (texture) {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  //scene.background = texture;
  scene.environment = texture;
});

//Lights

//Ambientlight
const ambilight = new THREE.AmbientLight( 0x404040, 5 ); // soft white light
scene.add( ambilight );


//Spot15
const spotLight15 = new THREE.SpotLight(0xFFFFFF, 100, 3, Math.PI / 4, 0.1, 2);
spotLight15.position.set(-0.5, 0.1, 0.8);
spotLight15.castShadow = true;
spotLight15.shadow.mapSize.width = 1024;
spotLight15.shadow.mapSize.height = 1024;
spotLight15.shadow.bias = -0.005;

const target15 = new THREE.Object3D();
target15.position.set(0, 1, -1); // Center of the scene
scene.add(target15);
spotLight15.target = target15;

scene.add(spotLight15);
const spotLightHelper15 = new THREE.SpotLightHelper(spotLight15);
//scene.add(spotLightHelper15);

//Spot16
const spotLight16 = new THREE.SpotLight(0xFFFFFF, 100, 4, Math.PI / 4, 0.1, 2);
spotLight16.position.set(1, 0.1, 0.8);
spotLight16.castShadow = true;
spotLight16.shadow.mapSize.width = 1024;
spotLight16.shadow.mapSize.height = 1024;
spotLight16.shadow.bias = -0.005;

const target16 = new THREE.Object3D();
target16.position.set(0.5, 1.5 , -1); // Center of the scene
scene.add(target16);
spotLight16.target = target16;

scene.add(spotLight16);
const spotLightHelper16 = new THREE.SpotLightHelper(spotLight16);
//scene.add(spotLightHelper16);

//Axes Helper
const axesHelper = new THREE.AxesHelper( 5 );
//scene.add( axesHelper );




//Cone1 (Green) with adjusted light power
var geometry1 = new THREE.CylinderGeometry(0.05, 1.5, 6, 32*2, 20, true);
geometry1.applyMatrix4(new THREE.Matrix4().makeTranslation(0, -geometry1.parameters.height/2, 0));
geometry1.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
var material1 = new THREEx.VolumetricSpotLightMaterial();
var mesh1 = new THREE.Mesh(geometry1, material1);
mesh1.position.set(-1.7, 2.9, 1.7);
mesh1.lookAt(new THREE.Vector3(-2, 0, 0));
material1.uniforms.lightColor.value.set(0x008E54); // Blue
material1.uniforms.spotPosition.value = mesh1.position;

// Adjust the attenuation to control light power
material1.uniforms.attenuation.value = 2;  // Lower attenuation = brighter light, higher attenuation = dimmer light

scene.add(mesh1);


//Cone2 (Silver)
var geometry2 = new THREE.CylinderGeometry(0.05, 1.5, 5, 32*2, 20, true);
geometry2.applyMatrix4(new THREE.Matrix4().makeTranslation(0, -geometry2.parameters.height/2, 0));
geometry2.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
var material2 = new THREEx.VolumetricSpotLightMaterial();
var mesh2 = new THREE.Mesh(geometry2, material2);
mesh2.position.set(0, 3, -2.45);
mesh2.lookAt(new THREE.Vector3(0, 0, -3));
material2.uniforms.lightColor.value.set(0xC0C0C0); // Red
material2.uniforms.spotPosition.value = mesh2.position;
// Adjust the attenuation to control light power
material2.uniforms.attenuation.value = 2;  // Lower attenuation = brighter light, higher attenuation = dimmer light
scene.add(mesh2);

//Cone3 (Green)
var geometry3 = new THREE.CylinderGeometry(0.05, 1.5, 5, 32*2, 20, true);
geometry3.applyMatrix4(new THREE.Matrix4().makeTranslation(0, -geometry3.parameters.height/2, 0));
geometry3.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
var material3 = new THREEx.VolumetricSpotLightMaterial();
var mesh3 = new THREE.Mesh(geometry3, material3);
mesh3.position.set(0.95, 3, -2.3);
mesh3.lookAt(new THREE.Vector3(-0.5, 0, 0.5));
material3.uniforms.lightColor.value.set(0x008E54); // Green
material3.uniforms.spotPosition.value = mesh3.position;
// Adjust the attenuation to control light power
material3.uniforms.attenuation.value = 2;  // Lower attenuation = brighter light, higher attenuation = dimmer light
scene.add(mesh3);

//Cone4 (Silver)
var geometry4 = new THREE.CylinderGeometry(0.05, 1.5, 5, 32*2, 20, true);
geometry4.applyMatrix4(new THREE.Matrix4().makeTranslation(0, -geometry4.parameters.height/2, 0));
geometry4.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
var material4 = new THREEx.VolumetricSpotLightMaterial();
var mesh4 = new THREE.Mesh(geometry4, material4);
mesh4.position.set(1.7, 2.9, -1.7);
mesh4.lookAt(new THREE.Vector3(1, 0, -1.5));
material4.uniforms.lightColor.value.set(0xC0C0C0); // Yellow
material4.uniforms.spotPosition.value = mesh4.position;
scene.add(mesh4);
// Adjust the attenuation to control light power
material4.uniforms.attenuation.value = 2;  // Lower attenuation = brighter light, higher attenuation = dimmer light
scene.add(mesh4);

//Cone5 (green)
var geometry5 = new THREE.CylinderGeometry(0.05, 1.5, 5, 32*2, 20, true);
geometry5.applyMatrix4(new THREE.Matrix4().makeTranslation(0, -geometry5.parameters.height/2, 0));
geometry5.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
var material5 = new THREEx.VolumetricSpotLightMaterial();
var mesh5 = new THREE.Mesh(geometry5, material5);
mesh5.position.set(2.3, 3, -1);
mesh5.lookAt(new THREE.Vector3(0, 0,-1));
material5.uniforms.lightColor.value.set(0x008E54); // Cyan
material5.uniforms.spotPosition.value = mesh5.position;
// Adjust the attenuation to control light power
material5.uniforms.attenuation.value = 2;  // Lower attenuation = brighter light, higher attenuation = dimmer light
scene.add(mesh5);



//Cone6 (Green)
var geometry6 = new THREE.CylinderGeometry(0.05, 1.5, 5, 32*2, 20, true);
geometry6.applyMatrix4(new THREE.Matrix4().makeTranslation(0, -geometry6.parameters.height/2, 0));
geometry6.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
var material6 = new THREEx.VolumetricSpotLightMaterial();
var mesh6 = new THREE.Mesh(geometry6, material6);
mesh6.position.set(-1, 3, -2.3);
mesh6.lookAt(new THREE.Vector3(-1 , 0, -2));
material6.uniforms.lightColor.value.set(0x008E54); // Magenta
material6.uniforms.spotPosition.value = mesh6.position;
// Adjust the attenuation to control light power
material6.uniforms.attenuation.value = 2;  // Lower attenuation = brighter light, higher attenuation = dimmer light
scene.add(mesh6);

//Cone7 (Silver)
var geometry7 = new THREE.CylinderGeometry(0.05, 1.5, 5, 32*2, 20, true);
geometry7.applyMatrix4(new THREE.Matrix4().makeTranslation(0, -geometry7.parameters.height/2, 0));
geometry7.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
var material7 = new THREEx.VolumetricSpotLightMaterial();
var mesh7 = new THREE.Mesh(geometry7, material7);
mesh7.position.set(-2.3, 3, -1);
mesh7.lookAt(new THREE.Vector3(-1, 0, 0));
material7.uniforms.lightColor.value.set(0xC0C0C0); // Orange
material7.uniforms.spotPosition.value = mesh7.position;
// Adjust the attenuation to control light power
material7.uniforms.attenuation.value = 2;  // Lower attenuation = brighter light, higher attenuation = dimmer light
scene.add(mesh7);

//Cone8 (Green)
var geometry8 = new THREE.CylinderGeometry(0.05, 1.5, 5, 32*2, 20, true);
geometry8.applyMatrix4(new THREE.Matrix4().makeTranslation(0, -geometry8.parameters.height/2, 0));
geometry8.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
var material8 = new THREEx.VolumetricSpotLightMaterial();
var mesh8 = new THREE.Mesh(geometry8, material8);
mesh8.position.set(2.3, 3, 1);
mesh8.lookAt(new THREE.Vector3(2, 0, 0.2));
material8.uniforms.lightColor.value.set(0x008E54); // Purple
material8.uniforms.spotPosition.value = mesh8.position;
// Adjust the attenuation to control light power
material8.uniforms.attenuation.value = 2;  // Lower attenuation = brighter light, higher attenuation = dimmer light
scene.add(mesh8);

//Cone9 (Silver)
var geometry9 = new THREE.CylinderGeometry(0.05, 1.5, 5, 32*2, 20, true);
geometry9.applyMatrix4(new THREE.Matrix4().makeTranslation(0, -geometry9.parameters.height/2, 0));
geometry9.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
var material9 = new THREEx.VolumetricSpotLightMaterial();
var mesh9 = new THREE.Mesh(geometry9, material9);
mesh9.position.set(0, 3, 2.5);
mesh9.lookAt(new THREE.Vector3(0, 0, 0));
material9.uniforms.lightColor.value.set(0xC0C0C0); // Pink
material9.uniforms.spotPosition.value = mesh9.position;
// Adjust the attenuation to control light power
material9.uniforms.attenuation.value = 2;  // Lower attenuation = brighter light, higher attenuation = dimmer light
scene.add(mesh9);

//Cone10 (Green)
var geometry10 = new THREE.CylinderGeometry(0.05, 1.5, 5, 32*2, 20, true);
geometry10.applyMatrix4(new THREE.Matrix4().makeTranslation(0, -geometry10.parameters.height/2, 0));
geometry10.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
var material10 = new THREEx.VolumetricSpotLightMaterial();
var mesh10 = new THREE.Mesh(geometry10, material10);
mesh10.position.set(-2.5, 3, 0);
mesh10.lookAt(new THREE.Vector3(-1, 0, 1));
material10.uniforms.lightColor.value.set(0x008E54); // Lime
material10.uniforms.spotPosition.value = mesh10.position;
// Adjust the attenuation to control light power
material10.uniforms.attenuation.value = 2;  // Lower attenuation = brighter light, higher attenuation = dimmer light
scene.add(mesh10);

//Cone11 (Silver)
var geometry11 = new THREE.CylinderGeometry(0.05, 1.5, 5, 32*2, 20, true);
geometry11.applyMatrix4(new THREE.Matrix4().makeTranslation(0, -geometry11.parameters.height/2, 0));
geometry11.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
var material11 = new THREEx.VolumetricSpotLightMaterial();
var mesh11 = new THREE.Mesh(geometry11, material11);
mesh11.position.set(0.95, 2.95, 2.3);
mesh11.lookAt(new THREE.Vector3(1, 0, 2));
material11.uniforms.lightColor.value.set(0xC0C0C0); // Teal
material11.uniforms.spotPosition.value = mesh11.position;
// Adjust the attenuation to control light power
material11.uniforms.attenuation.value = 2;  // Lower attenuation = brighter light, higher attenuation = dimmer light
scene.add(mesh11);

//Cone12 (Silver)
var geometry12 = new THREE.CylinderGeometry(0.05, 1.5, 5, 32*2, 20, true);
geometry12.applyMatrix4(new THREE.Matrix4().makeTranslation(0, -geometry12.parameters.height/2, 0));
geometry12.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
var material12 = new THREEx.VolumetricSpotLightMaterial();
var mesh12 = new THREE.Mesh(geometry12, material12);
mesh12.position.set(2.4, 3, 0);
mesh12.lookAt(new THREE.Vector3(2, 0, 0));
material12.uniforms.lightColor.value.set(0xC0C0C0); // Coral
material12.uniforms.spotPosition.value = mesh12.position;
// Adjust the attenuation to control light power
material12.uniforms.attenuation.value = 2;  // Lower attenuation = brighter light, higher attenuation = dimmer light
scene.add(mesh12);

//Cone13 (Silver)
var geometry13 = new THREE.CylinderGeometry(0.05, 1.5, 5, 32*2, 20, true);
geometry13.applyMatrix4(new THREE.Matrix4().makeTranslation(0, -geometry13.parameters.height/2, 0));
geometry13.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
var material13 = new THREEx.VolumetricSpotLightMaterial();
var mesh13 = new THREE.Mesh(geometry13, material13);
mesh13.position.set(-2.3, 3, 1);
mesh13.lookAt(new THREE.Vector3(0, 0, -0.5));
material13.uniforms.lightColor.value.set(0xC0C0C0); // Gold
material13.uniforms.spotPosition.value = mesh13.position;
// Adjust the attenuation to control light power
material13.uniforms.attenuation.value = 2;  // Lower attenuation = brighter light, higher attenuation = dimmer light
scene.add(mesh13);

//Cone14 (Silver)
var geometry14 = new THREE.CylinderGeometry(0.05, 1.5, 5, 32*2, 20, true);
geometry14.applyMatrix4(new THREE.Matrix4().makeTranslation(0, -geometry14.parameters.height/2, 0));
geometry14.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
var material14 = new THREEx.VolumetricSpotLightMaterial();
var mesh14 = new THREE.Mesh(geometry14, material14);
mesh14.position.set(-1, 3, 2.3);
mesh14.lookAt(new THREE.Vector3(0, 0, 0));
material14.uniforms.lightColor.value.set(0xC0C0C0); // Silver
material14.uniforms.spotPosition.value = mesh14.position;
// Adjust the attenuation to control light power
material14.uniforms.attenuation.value = 2;  // Lower attenuation = brighter light, higher attenuation = dimmer light
scene.add(mesh14);



//Models
    //GLTF
const gltfLoader = new GLTFLoader();
        gltfLoader.load("https://corsproxy.io/?https://alexanderkoschel.de/NewStudio.glb", (gltf) => {
          gltf.scene.scale.set(2, 2, 2);
          gltf.scene.castShadow = true;
          gltf.scene.receiveShadow = true;
          scene.add(gltf.scene);
        });

    


 
function animate() {
  //controls.update();
  renderer.render(scene, camera);


}

// Define the target position
const targetPosition = new THREE.Vector3(0, 1.8, 0);

window.onload = function() {
  // Initial camera animation
  gsap.from(camera.position, {
    x: 10,
    y: 20,
    z: 5,
    ease: 'power2.inOut', // Use a valid easing function
    duration: 4,
    delay: 0.5,
    onUpdate: () => {
      camera.lookAt(targetPosition);
    }
  });
};



var firstslide = gsap.timeline({
  onUpdate: () => {
    camera.lookAt(targetPosition); // Update camera lookAt on every frame
  }
});

firstslide
  .to(camera.position, {
    x: 0,
    y: 2,
    z: 3,
    duration: 0.5, // Adjust the duration to make it faster
  })
  .to(camera.position, {
    x: 0,
    y: 15,
    z: 3,
    duration: 2, // Keep the second animation slower if desired
  }, "<1");

ScrollTrigger.create({
  trigger: ".cardsection",
  animation: firstslide,
  markers: true,
  start: "top top",
  end: "+=6500",
  pin: true,
  scrub: 1,
});

