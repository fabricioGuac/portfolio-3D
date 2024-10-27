//Imports the core Three.js library for creating and displaying 3D graphics on the web
import * as THREE from 'three';

// import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';


//Imports the createWater function
import createWater from '../components/Water';

//Imports the createSjy function
import createSky from '../components/Sky';

//Imports the boat class
import Boat from '../components/Boat';

//Imports the island class
import Island from '../components/Island';


//Initializes the scene
export default function initializeScene(container, navigate) {
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

    //Initializes the islands
    const skillIsland = new Island(scene,'src/assets/Treactopus/scene.gltf',{x: -90, y: 2, z: -160},'/skills', 'Skills', navigate, 3, 10);
    const contactBottle = new Island(scene,'src/assets/Bottle/scene.gltf',{x: -10, y: 5, z: -200},'/contact', 'Contact',navigate, 8, 3.5);
    const PortfolioIsland = new Island(scene,'src/assets/ShellIsland/scene.gltf',{x: 70, y: -2, z: -320},'/projects', 'Projects',navigate, 6, 6);
    const aboutMeIsland = new Island(scene,'src/assets/TropicalIsland/scene.gltf',{x: 175, y: -2, z: -180},'/aboutMe', 'About me',navigate, 0.1, 300);


    //Configures the css2d renderer
    const labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
    container.appendChild(labelRenderer.domElement);

    return {scene, camera, renderer, water, sun, sky, boat, islands: [skillIsland, PortfolioIsland, contactBottle, aboutMeIsland], labelRenderer};
}