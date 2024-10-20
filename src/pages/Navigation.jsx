//Imports useEffect and useRef from React, essential hooks for managing side effects and referencing DOM elements
import { useEffect, useRef } from 'react';

//Imports the core Three.js library for creating and displaying 3D graphics on the web
import * as THREE from 'three';

//Imports OrbitControls, a utility to allow for intuitive mouse-driven camera orbiting, panning, and zooming
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

//Imports the Water object, used to create a realistic water surface simulation with reflection and refraction
import { Water } from 'three/examples/jsm/objects/Water';

//Imports the Sky object, used to create a customizable atmospheric skybox with effects like time of day and sun position
import { Sky } from 'three/examples/jsm/objects/Sky';


export default function Navigation() {
    //Initializes a ref to store a reference to the container DOM element for the 3D scene
    const containerRef = useRef(null);

    //Sets up the 3D scene when the component is mounted
    useEffect(() => {
        //Initializes the key variables for the threejs scene
        let camera, scene, renderer, water, controls, sun, mesh;
        
        //Stores the reference to the container DOM element where the 3D scene will be rendered
        const container = containerRef.current;


        function init() {
            //Initializes the WebGL renderer which renders the 3D scene onto the screen
            renderer = new THREE.WebGLRenderer();
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

            //Creates a new Threejs scene
            scene = new THREE.Scene();

            //Sets up the camera with a field of view of 55, aspect ration matching the window size and far clipping plane at 20000 units 
            camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 20000);
            //Positions the camera
            camera.position.set(30, 30, 100);

            //Initializes a vector for the position of the sun
            sun = new THREE.Vector3();

            //Water
            //Creates a ;arge plane geometry for the water surface (10000 x 10000 units)
            const waterGeometry = new THREE.PlaneGeometry(10000, 10000);
            //Creates a new water object using the Water class simulating the water class
            water = new Water(waterGeometry, {
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

            // Sky
            //Creates a new sky object to simulate an skybox with atmospheric effects
            const sky = new Sky();
            //Scales the skybox to e 10000 units large so it covers the scene
            sky.scale.setScalar(10000);
            //Adds the skybox to the scene
            scene.add(sky);

            //Accesses the uniforms of the sky material (parameters controlling the sky's appearance)
            const skyUniforms = sky.material.uniforms;
            //Sets the turbidity of the sky
            skyUniforms['turbidity'].value = 10;
            //Sets the scattering effect of the light in the atmosphere
            skyUniforms['rayleigh'].value = 2;
            //Sets how much of the light scatters in the atmosphere based on particles in the air
            skyUniforms['mieCoefficient'].value = 0.002;
            //Adjusts the directionality of the light scattering
            skyUniforms['mieDirectionalG'].value = 0.8;

            //Parameters for the sun position
            const parameters = {
                //Defines the sun elevation in the sky
                elevation: 1,
                //Positions the sun in the horizon (azimuth 180 = south)
                azimuth: 180,
            };

            //Function to update the sun position
            function updateSun() {
                //Converts the elevation angle from degrees to radians for the sun's elevation
                const phi = THREE.MathUtils.degToRad(90 - parameters.elevation);
                //Converts the azimuth's angle from degrees to radians for the sun's position
                const theta = THREE.MathUtils.degToRad(parameters.azimuth);

                //Sets the sun's position using spherical coordinates (1 for radius, phi for elevation and theta for azimuth)
                sun.setFromSphericalCoords(1, phi, theta);

                //Updates the sun's position for the sky
                sky.material.uniforms['sunPosition'].value.copy(sun);
                //Updates the sun's direction for the water shader
                water.material.uniforms['sunDirection'].value.copy(sun).normalize();
            }

            //Calls the updateSun function to apply the sun's position when the scene is initialized
            updateSun();

            //Creates an empty mesh
            mesh = new THREE.Mesh();
            //Adds the meash to the scene
            scene.add(mesh);

            //Orbit controls
            //Initializes orbit controls with the camera and renderer to allow user to control the camera's rotation, zoom and pan
            controls = new OrbitControls(camera, renderer.domElement);
            //Sets the maximum angle for the camera's vertical rotation to 0.495π radians (just below the horizon)
            controls.maxPolarAngle = Math.PI * 0.495;
            //Sets the camera target
            controls.target.set(0, 10, 0);
            //Sets the minimum and maximum zooming distances for the camera
            controls.minDistance = 40.0;
            controls.maxDistance = 200.0;
            //Updates the controls to apply the changes
            controls.update();

            //Event listener to handle window resizing and adjust the camera and renderer sizes
            window.addEventListener('resize', onWindowResize);
        }

        //Function to handle window resizing
        function onWindowResize() {
            //Updates the camera aspectration when the window is resized
            camera.aspect = window.innerWidth / window.innerHeight;
            //Updates the projection matrix with the new aspect ratio
            camera.updateProjectionMatrix();
            //Resizes the renderer to match the new window dimensions
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        //Function to animate the scene
        function animate() {
            //Requests the next frame to keep the animation going
            requestAnimationFrame(animate);
            //Gets the current time and converts it to seconds
            const time = performance.now() * 0.001;

            //Moves the mesh object up and down in a sine wave pattern
            mesh.position.y = Math.sin(time) * 20 + 5;
            //Rotates the mesh object slowly around the x axis
            mesh.rotation.x = time * 0.5;
            //Rotates the mesh object slowly around the z axis
            mesh.rotation.z = time * 0.51;
            //Updates the water's time uniform for water animation making the water appear to move
            water.material.uniforms['time'].value += 1.0 / 60.0;
            //Renders the scne from the perspective of the camera
            renderer.render(scene, camera);
        }

        //Initializes the scene
        init();
        //Starts the animation loop
        animate();

        // Cleanup function to remove the renderer and event listeners when the component unmounts
        return () => {
            //Removes the renderer DOM element from the container
            container.removeChild(renderer.domElement);
            //Removes the resize event listener
            window.removeEventListener('resize', onWindowResize);
        };
    }, []);

    return (
        <div>
            <div ref={containerRef} ></div>
        </div>
    );
}