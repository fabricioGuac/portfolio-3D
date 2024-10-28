//Imports useEffect and useRef  from React, essential hooks for managing side effects and referencing DOM elements
import { useEffect, useRef } from 'react';

//Imports useNavigate to enable programatic navigation between views
import { useNavigate } from 'react-router-dom';

//Imports the core Three.js library for creating and displaying 3D graphics on the web
import * as THREE from 'three';

//Imports the Controls component
import Controls from '../components/Controls';

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


    //References for mouse position and raycasting for detecting intersections 
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
            const isPortrait = window.innerWidth < 768 && window.innerHeight > window.innerWidth;
        
            //If in portrait mode on mobile inverts aspect ratio for landscape effect
            const aspectRatio = isPortrait ? window.innerHeight / window.innerWidth : window.innerWidth / window.innerHeight;
        
            //Updates the camera aspect ratio when the window is resized
            camera.aspect = aspectRatio;
            //Updates the projection matrix with the new aspect ratio
            camera.updateProjectionMatrix();
        
            //Determines dimensions based on orientation
            const width = isPortrait ? window.innerHeight : window.innerWidth;
            const height = isPortrait ? window.innerWidth : window.innerHeight;
        
            //Update renderer and label renderer sizes
            renderer.setSize(width, height);
            labelRenderer.setSize(width, height);
        }
        
        // Add event listener for resizing
        window.addEventListener('resize', onWindowResize);
        onWindowResize(); // Initial call to set up sizes
        

        //Function to update the mouse coordinates on mouse movement
        function onMouseMove(e) {

            //Normalizes mouse x coordinates
            //Converts pixel position (0 to window.innerWidth) to normalized device coordinate (-1 to 1)
            //Divides by window.innerWidth to get a range from 0 to 1.
            //Multiplies by 2 to stretch the range to [0, 2].
            //Subtracts 1 to shift the range to [-1, 1].
            mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;


            //Normalizes mouse y coordinates
            //Converts pixel position (0 to window.innerHeight) to normalized device coordinate (-1 to 1)
            //Divides by window.innerHeight to get a range from 0 to 1.
            //Negates the result to flip the range (top becomes 0, bottom becomes -1).
            //Multiplies by 2 to stretch the range to [0, -2].
            //Adds 1 to shift the range to [-1, 1].
            mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        }


        //Function to handle click events
        function onClick() {

            //Sets the raycaster from the mouse position
            raycaster.current.setFromCamera(mouse.current, camera);

            //Filters the islands to find the ones that the ray intersects with
            const intersectedBoundingBoxes = islands.filter(island =>
                island.boundingBox && raycaster.current.ray.intersectsBox(island.boundingBox)
            );

            //If an island was clicked trigger it's click handler
            if (intersectedBoundingBoxes.length > 0) {

                //Gets the first intersected island from the filtered array
                const intersectedIsland = intersectedBoundingBoxes[0];
                //Ensures there is an intersected island available
                if (intersectedIsland) {
                    //Handles the click event for the island
                    intersectedIsland.handleClick();
                    console.log('Clicked on ', intersectedIsland);
                }
            }
        }


        //Defines the offset for the 3rd person camera view
        const cameraOffset = new THREE.Vector3(-10, 16, -40);

        //Starts the animation loop
        animate(renderer, scene, camera, boat, water, cameraOffset, islands, labelRenderer, raycaster, mouse);

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
            //Removes the mousemove event listener
            window.removeEventListener('mousemove', onMouseMove);
            //Removes the click event listener
            window.removeEventListener('click', onClick);
        };
    }, []);

    return (
        <div>
            {/* <Controls boat={boat}/> */}
            <div ref={containerRef} className="sceneContainer"></div>
        </div>
    );
}