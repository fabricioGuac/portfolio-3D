//Imports useEffect and useRef  from React, essential hooks for managing side effects and referencing DOM elements
import { useEffect, useRef } from 'react';

//Imports useNavigate to enable programatic navigation between views
import { useNavigate } from 'react-router-dom';

//Imports the core Three.js library for creating and displaying 3D graphics on the web
import * as THREE from 'three';

//Imports the function to initialize the variables for the threejs scene
import initializeScene from '../utils/initializeScene';

//Imports the function to apply the sun's position when the scene is initialized
import updateSun from '../utils/updateSun';

//Imports the key controls
import { handleKeyDown, handleKeyUp } from '../utils/keyControls';

//Imports the animate function
import animate from '../utils/animate';


export default function Navigation() {
    //Initializes a ref to store a reference to the container DOM element for the 3D scene
    const containerRef = useRef(null);

    //Initializes the navigate function using the useNavigate hook
    const navigate = useNavigate();


    //Stuff for the mouse 
    const mouse = useRef(new THREE.Vector2());
    const raycaster = useRef(new THREE.Raycaster());

    //Sets up the 3D scene when the component is mounted
    useEffect(() => {
        
        //Stores the reference to the container DOM element where the 3D scene will be rendered
        const container = containerRef.current;

        //Initializes the key variables for the threejs scene
        const { scene, camera, renderer, water, sun, sky, boat, islands, labelRenderer } = initializeScene(container, navigate);


            //Parameters for the sun position
            const parameters = {
                //Defines the sun elevation in the sky
                elevation: 1,
                //Positions the sun in the horizon (azimuth 180 = south)
                azimuth: 180,
            };

            //Calls the updateSun function to apply the sun's position when the scene is initialized
            updateSun(sun, sky, water, parameters);

        //Function to handle window resizing
        function onWindowResize() {
            //Updates the camera aspectration when the window is resized
            camera.aspect = window.innerWidth / window.innerHeight;
            //Updates the projection matrix with the new aspect ratio
            camera.updateProjectionMatrix();
            //Resizes the renderer to match the new window dimensions
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        function onMouseMove(e){
            mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.current.y = -(e.clientY / window.innerWidth) * 2 + 1;
        }
        
        

        function onClick() {
            const intersects = raycaster.current.intersectObjects(islands.flatMap(island => island.meshes));

            if(intersects.length > 0) {
                const intersectedMesh = intersects[0].object;
                

                const intersectedIsland = islands.find(island => island.meshes.some(mesh => mesh === intersectedMesh));


                if(intersectedIsland){
                    intersectedIsland.handleClick();
                    console.log('Clicked on ', intersectedIsland);
                }
            }
        }

        //Defines the offset for the 3rd person camera view
        const cameraOffset = new THREE.Vector3(-10, 16, -40);

        //Starts the animation loop
        animate(renderer, scene, camera, boat, water, cameraOffset, islands, labelRenderer, raycaster, mouse );

        //Adds the event listeners event listeners
        window.addEventListener('keydown', handleKeyDown(boat));
        window.addEventListener('keyup', handleKeyUp(boat));
        window.addEventListener('resize', onWindowResize);
        window.addEventListener('click', onClick);
        window.addEventListener('mousemove', onMouseMove);

        // Cleanup function to remove the renderer and event listeners when the component unmounts
        return () => {
            //Removes the renderer DOM element from the container
            container.removeChild(renderer.domElement);
            //Removes the keydown event listener
            window.removeEventListener('keydown', handleKeyDown(boat));
            //Removes the keyup event listener
            window.removeEventListener('keyup', handleKeyUp(boat));
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