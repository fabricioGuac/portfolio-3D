//Imports the Sky object, used to create a customizable atmospheric skybox with effects like time of day and sun position
import { Sky } from 'three/examples/jsm/objects/Sky';

// Sky
export default function createSky(scene) {

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

    return { sky };
}