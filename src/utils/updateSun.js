//Imports the core Three.js library for creating and displaying 3D graphics on the web
import * as THREE from 'three';


//Function to update the sun position
export default function updateSun(sun, sky, water, parameters) {
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