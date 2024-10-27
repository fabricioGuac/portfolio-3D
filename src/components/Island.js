//Imports the core Three.js library for creating and displaying 3D graphics on the web
import * as THREE from 'three';

//Imports the GLTFLoader from the Three.js examples to load 3D models
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

//Imports what will be used for the labels (the renderer goes in the animate function)
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
// import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';


export default class Island {
    constructor(scene, modelPath, position, link, nameTag, navigate) {

        //Creates a new instance of the GLTFLoader to load 3D models
        const loader = new GLTFLoader();

        this.modelPath = modelPath;
        this.position = position;
        this.link = link;
        this.nameTag = nameTag;
        this.navigate = navigate;
        this.hasNavigated = false;
        this.meshes = [];
        this.isHovered = false;


        //Loads the island model from the specified GLTF file
        loader.load(modelPath, (gltf) => {
            //Stores the loaded island model in the class instance
            this.island = gltf.scene;
            //Adds the island model to the specified scene
            scene.add(this.island);


            //Sets the initial properties for the island
            //Sets the scale for the island model
            this.island.scale.set(4,4,4);
            //Sets the initial position for the island model
            this.island.position.set(position.x, position.y,position.z);

            const labelDiv = document.createElement('div');
            labelDiv.className = 'islanLabel';
            labelDiv.textContent = this.nameTag;
            const label = new CSS2DObject(labelDiv);
            label.position.set(0,10,0);
            this.island.add(label);


            this.island.traverse((child) => {
                if(child.isMesh) {
                    this.meshes.push(child);
                }
            })


            this.boundingBox = new THREE.Box3().setFromObject(this.island);
        });
    }

    handleClick() {
        if(this.island && !this.hasNavigated){
            console.log(this.link)
            this.navigate(this.link);
            this.hasNavigated = true;
        }
    }

    checkCollision(boatBoundingBox) {
        if(this.boundingBox && this.boundingBox.intersectsBox(boatBoundingBox) && !this.hasNavigated){
        this.handleClick();
        }
    }

    hoverEffect(){
        if (this.island){
            this.island.scale.set(8,8,8);
        }
    }

    resetScale() {
        if (this.island) {
            this.island.scale.set(4, 4, 4);
        }
    }
}