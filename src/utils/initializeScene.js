//Imports the core Three.js library for creating and displaying 3D graphics on the web
import * as THREE from 'three';

//Imports the createWater function
import createWater from '../components/Water';

//Imports the createSjy function
import createSky from '../components/Sky';

//Imports the boat class
import Boat from '../components/Boat';

//Initializes the scene
export default function initializeScene(container) {
    //Creates a new Threejs scene
    const scene = new THREE.Scene();

    //Initializes the WebGL renderer which renders the 3D scene onto the screen
    const renderer = new THREE.WebGLRenderer();

    //Sets the renderer's size to the full width and height of the screen
    renderer.setSize(window.innerWidth, window.innerHeight);

    //Sets the pixel ratio of the renderer to match the device's pixel ratio
    renderer.setPixelRatio(window.devicePixelRatio);

    //Sets the method for adjusting the brightness and colors of the image to make it look more realistic
    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    //Sets the exposure level to half of the default value to make the image darker
    renderer.toneMappingExposure = 0.5;

    //Appends the renderer's output (a canvas) to the container element in the DOM
    container.appendChild(renderer.domElement);


    //Sets up the camera with a field of view of 55, aspect ration matching the window size and far clipping plane at 20000 units 
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 20000);

    //Sets up a new ambient light to provide a soft even ilumination across the scene
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);

    //Adds ambient light to the scene
    scene.add(ambientLight);

    //Initializes a vector for the position of the sun
    const sun = new THREE.Vector3();

    //Water
    const water = createWater(scene, sun);

    // Sky
    const { sky } = createSky(scene);

    //Initializes the boat and adds it to the scene
    const boat = new Boat(scene);

    return {scene, camera, renderer, water, sun, sky, boat};
}