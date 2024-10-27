//Imports the core Three.js library for creating and displaying 3D graphics on the web
import * as THREE from 'three';

//Imports the GLTFLoader from the Three.js examples to load 3D models
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

//Imports CSS2DObject for rendering 2D HTML elements in a 3D scene
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';


export default class Island {
    constructor(scene, modelPath, position, link, nameTag, navigate, scale, labelHeight) {

        //Creates a new instance of the GLTFLoader to load 3D models
        const loader = new GLTFLoader();

        //Path to the 3D model
        this.modelPath = modelPath;
        //Position for the model in the 3D space
        this.position = position;
        //Scale factor for the model
        this.scale = scale
        //Link for navigation when the island is clicked or collided
        this.link = link;
        //Name to display for the island
        this.nameTag = nameTag;
        //Instance of React's useNavigate for handling navigation within the class
        this.navigate = navigate;
        //Flag to prevent multiple navigations
        this.hasNavigated = false;
        //Flag to indicate if the island is being hovered
        this.isHovered = false;
        //Height to which the label will be displayed at
        this.labelHeight = labelHeight;


        //Loads the island model from the specified GLTF file
        loader.load(modelPath, (gltf) => {
            //Stores the loaded island model in the class instance
            this.island = gltf.scene;
            //Adds the island model to the specified scene
            scene.add(this.island);


            //Sets the initial properties for the island
            //Sets the scale for the island model
            this.island.scale.set(this.scale, this.scale, this.scale);
            //Sets the position for the island model
            this.island.position.set(this.position.x, this.position.y, this.position.z);
            //Sets the rotation for the island model in the y axis
            this.island.rotation.y = -1.5;
            
            //Creates the bounding box from the model for collision detection
            this.boundingBox = new THREE.Box3().setFromObject(this.island);
            
            //Creates a label for the model
            const labelDiv = document.createElement('div'); 
            //Sets the class for css styling
            labelDiv.className = 'islanLabel';
            //Sets the text content
            labelDiv.textContent = this.nameTag;
            //Creates a 2d object to display in the 3D space
            const label = new CSS2DObject(labelDiv);
            //Sets the label position above the model
            label.position.set(0, this.labelHeight, 0);
            //Adds the label to the model
            this.island.add(label);
        });
    }

    //Method to handle clicks on the model
    handleClick() {
        //Ensures the island is loaded and that is has not been navigated to
        if (this.island && !this.hasNavigated) {
            console.log(this.link)
            //Navigates to the respective link
            this.navigate(this.link);
            //Sets the hasNavigated flag to true to prevent further navigation
            this.hasNavigated = true;
        }
    }

    //Method to check for collisions with the island model and the boat bounding box
    checkCollision(boatBoundingBox) {
        //Conditional to check if the bounding box exists, the island has not been navigated to and that the bounding box intersects the boat bounding box
        if (this.boundingBox && this.boundingBox.intersectsBox(boatBoundingBox) && !this.hasNavigated) {
            //Calls the handle click method if a collision is detected
            this.handleClick();
        }
    }

    //Method to handle the hover of the model
    hoverEffect() {
        //ensures the island exists
        if (this.island) {
            //Doubles the scale of the island model
            this.island.scale.set(this.scale * 2, this.scale * 2,this.scale * 2);
        }
    }

    //Method to reset the scale of the island model
    resetScale() {
        //ensures the island exists
        if (this.island) {
            //Resets the scale to the original scale
            this.island.scale.set(this.scale, this.scale,this.scale);
        }
    }
}