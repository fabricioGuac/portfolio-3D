//Imports the Water object, used to create a realistic water surface simulation with reflection and refraction
import { Water } from 'three/examples/jsm/objects/Water';
//Imports the core Three.js library for creating and displaying 3D graphics on the web
import * as THREE from 'three';

//Water
export default function createWater (scene, sun) {
            //Creates a large plane geometry for the water surface (10000 x 10000 units)
            const waterGeometry = new THREE.PlaneGeometry(10000, 10000);

            //Creates a new water object using the Water class simulating the water class
            const water = new Water(waterGeometry, {

                //Specifies the resolution of the water texture (512x512 pixels)
                textureWidth: 512,
                textureHeight: 512,

                //Loads map texture to simulate water ripples
                waterNormals: new THREE.TextureLoader().load(

                    //URL to water normal textures
                    'https://threejs.org/examples/textures/waternormals.jpg',
                    (texture) => {
                        //Sets the texture wrapping mode to repeat the water texture in both directions
                        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                    }
                ),

                //Clones the sun vector to define the direction of the sunlight on the water
                sunDirection: sun.clone(),

                //Sets the color of the sunlight in the water (to white)
                sunColor: 0xffffff,

                //Sets the color of the water (to a dark greenish blue)
                waterColor: 0x001e0f,

                //Sets the ammount of distortion in the water ripples
                distortionScale: 3.7,

                //Determines if the fog should affect the water (enabled if the scene has fog)
                fog: scene.fog !== undefined,
            });

            //Rotates the water surface to lie flat (by rotating it  by -90 or -π/2 radians around the x axis)
            water.rotation.x = -Math.PI / 2;

            //Adds the water to the scene so it is rendered
            scene.add(water);

            //Returns the newly created water
            return water;
}