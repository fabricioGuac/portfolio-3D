//Imports the core Three.js library for creating and displaying 3D graphics on the web
import * as THREE from 'three';

export default function animate(renderer, scene, camera, boat, water, cameraOffset) {

    //Requests the next frame to keep the animation going
    requestAnimationFrame(() => animate(renderer, scene, camera, boat, water, cameraOffset));

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
    }

    //Renders the scene from the perspective of the camera
    renderer.render(scene, camera);
}