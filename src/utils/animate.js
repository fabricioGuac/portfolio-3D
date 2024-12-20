//Imports the core Three.js library for creating and displaying 3D graphics on the web
import * as THREE from 'three';

//Defines the animate function to update the scene and render the animation loop continuosly
export default function animate(renderer, scene, camera, boat, water, cameraOffset, islands, labelRenderer, raycaster, mouse, setIshoveringIsland) {

    //Requests the next frame to keep the animation going
    requestAnimationFrame(() => animate(renderer, scene, camera, boat, water, cameraOffset, islands, labelRenderer, raycaster, mouse, setIshoveringIsland));

    //Gets the current time and converts it to seconds
    const time = performance.now() * 0.001;

    //Updates the water's time uniform for water animation
    water.material.uniforms['time'].value += 1.0 / 60.0;

    //If the boat is loaded, updates its position and rotation
    if (boat.boat) {
        //Updates boat position
        boat.update();

        //Animates the boat pitching and rolling movements
        boat.pitchRoll(time);

        //Gets the position and direction of the boat
        const boatPosition = boat.getBoatPosition();
        const boatDirection = boat.getBoatDirection();

        //Ensures the position and directions are valid before proceeding
        if (boatPosition && boatDirection) {
            //Calculates the camera's offset based on the boat's current rotation 
            const offset = cameraOffset.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), boat.boat.rotation.y);

            //Calculates the target camera position by adding the offset to the boat's position
            const targetPosition = boatPosition.clone().add(offset);

            //Smoothly interpolates the camera position towards the target position
            camera.position.lerp(targetPosition, 0.1);

            //Defines the look-at point based on the boat's direction
            const lookAtPoint = boatPosition.clone().add(boatDirection.clone().multiplyScalar(70));

            //Sets the camera to look at the calculated point
            camera.lookAt(lookAtPoint);
        }

        //Sets the bounding box for the boat
        const boatBoundingBox = new THREE.Box3().setFromObject(boat.boat);

        //Reduces the bounding box
        boatBoundingBox.expandByScalar(-4);
        //Iterates through each island to check for potential collisions with the boat using the bounding box
        islands.forEach((island) => {
            island.checkCollision(boatBoundingBox);
        });
    }

    //Object to manage the hover timeouts to control the hover effect
    const hoverTimeouts = {};

    //Ensures the islands are loaded
    if (islands) {
        //Sets the raycaster's ray from the camera through the current mouse position
        raycaster.current.setFromCamera(mouse.current, camera);

        //Filters islands whose bounding boxes are intersected by the raycaster's ray
        const intersectingBoundingBoxes = islands.filter(island =>
            island.boundingBox && raycaster.current.ray.intersectsBox(island.boundingBox)
        );

        //Creates a set of the islands intersected by the ray
        const intersectedIslands = new Set(intersectingBoundingBoxes.map(island => island));

        //Iterates through each island to check it's hovered state
        islands.forEach(island => {
            //Checks if the island is currently intersected by the ray
            const isIntersected = intersectedIslands.has(island);

            //Conditional to check if the island is intersected and not hovered
            if (isIntersected && !island.isHovered) {

                //Applies the hover effect
                island.hoverEffect();
                //Sets the isHovered flag to true
                island.isHovered = true;

                //Sets the state variable to true to indicate that the cursor should display the anchor emoji when hovering over an island
                setIshoveringIsland(true);

                //Clears any existing timeout for the island to reset it's hovered state
                if (hoverTimeouts[island.nameTag]) {
                    clearTimeout(hoverTimeouts[island.nameTag]);
                }
            }

            //Conditional to check if the island is not intersected but it is hovered
            else if (!isIntersected && island.isHovered) {

                //Sets a timeout to reset the hover efect after 300 miliseconds to provide a smoother transition
                hoverTimeouts[island.nameTag] = setTimeout(() => {
                    //Removes the hover effect by reseting the island scale
                    island.resetScale();
                    //Sets the isHovered flag to false
                    island.isHovered = false;
                    //Sets the state variable to false to indicate that the cursor should revert to the default style when not hovering over an island
                    setIshoveringIsland(false);

                }, 300);
            }
        });
    }

    //Renders the scene and the lable renderer
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
}