//Imports the core Three.js library for creating and displaying 3D graphics on the web
import * as THREE from 'three';

export default function animate(renderer, scene, camera, boat, water, cameraOffset, islands, labelRenderer, raycaster, mouse) {

    //Requests the next frame to keep the animation going
    requestAnimationFrame(() => animate(renderer, scene, camera, boat, water, cameraOffset, islands, labelRenderer, raycaster, mouse));

    //Gets the current time and converts it to seconds
    const time = performance.now() * 0.001;

    //Updates the water's time uniform for water animation
    water.material.uniforms['time'].value += 1.0 / 60.0;

    //If the boat is loaded, updates its position and rotation
    if (boat) {
        //Updates boat position
        boat.update();

        //Animates the boat pitching and rolling
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

        if (boat.boat) {

            const boatBoundingBox = new THREE.Box3().setFromObject(boat.boat);


            boatBoundingBox.expandByScalar(-4);
            islands.forEach((island) => {
                island.checkCollision(boatBoundingBox);
            });
        }
    }


    let hoverTimeouts = {};

    if (islands) {
        raycaster.current.setFromCamera(mouse.current, camera);
        const intersects = raycaster.current.intersectObjects(islands.flatMap(island => island.meshes), true);

        islands.forEach(island => {
            const isIntersected = intersects.some(intersect => island.meshes.includes(intersect.object));


            if (isIntersected && !island.isHovered) {
                island.hoverEffect();
                island.isHovered = true;


                if (hoverTimeouts[island.nameTag]) {
                    clearTimeout(hoverTimeouts[island.nameTag]);
                }
            } else if (!isIntersected && island.isHovered) {

                hoverTimeouts[island.nameTag] = setTimeout(() => {
                    island.resetScale();
                    island.isHovered = false;
                }, 300);
            }
        });
    }


    //Renders the scene from the perspective of the camera
    renderer.render(scene, camera);

    labelRenderer.render(scene, camera);
}