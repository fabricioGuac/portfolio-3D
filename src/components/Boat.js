//Imports the GLTFLoader from the Three.js examples to load 3D models
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

//Creates a class for the boat
export default class Boat {

    //Constructor that initializes the boat within the given scene
    constructor(scene) {
        //Creates a new instance of the GLTFLoader to load 3D models
        const loader = new GLTFLoader();

        //Loads the boat model from the specified GLTF file
        loader.load('src/assets/Boat/scene.gltf', (gltf) => {
            //Stores the loaded boat model in the class instance
            this.boat = gltf.scene;
            //Adds the boat model to the specified scene
            scene.add(this.boat);

            //Sets the initial properties for the boat
            //Sets the scale for the boat model
            this.boat.scale.set(2, 2, 2);
            //Sets the initial position of the boat in the scene
            this.boat.position.set(-10, 0, 50);
            //Sets the boat's rotation around the y axis
            this.boat.rotation.y = 3;

            //Defines the speed and rotation controls for the boat's movements
            this.speed = {
                vel: 0,
                rot: 0,
            };
        });
    }
    //Method to stop the boat's movements
    stop() {
        this.speed.vel = 0;
        this.speed.rot = 0;
    }
    //Method to update the boat's position and rotation based on speed
    update() {
        //Conditional to ensure the boat model has loaded
        if (this.boat) {
            this.boat.rotation.y += this.speed.rot;
            this.boat.translateZ(this.speed.vel);
        }
    }

    //Method to animate the pitching and rolling of the boat
    pitchRoll(time) {
        //Conditional check to ensure the boat model has loaded
        if (this.boat) {
            //Sets the frecuency of the pitching and rolling animation
            const frequency = 2;

            //Calculates the picth offset using a sine wave for smooth animation
            const pitchOffset = Math.sin(time * frequency) * 0.02;

            //Updates the boat's vertical position to simulate bobbing in the water
            this.boat.position.y = -0.1 + pitchOffset;

            //Updates the boat's rotation around the z axix for rolling effect
            this.boat.rotation.z = Math.sin(time * frequency + Math.PI / 2) * 0.05;

            //Updates the boat's rotation around the x axis for pitching effect
            this.boat.rotation.x = pitchOffset;
        }
    }
}