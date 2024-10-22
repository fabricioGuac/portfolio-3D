
//Higher-order function to control the boat using a switch statement
export const handleKeyDown = (boat) => (e) => {
    //Check if the boat is defined
    if (!boat) {
        return;
    }

    switch (e.key) {
        case "ArrowUp":
            boat.speed.vel = 1;
            break;
        case "ArrowDown":
            boat.speed.vel = -1;
            break;
        case "ArrowRight":
            boat.speed.rot = -0.02;
            break;
        case "ArrowLeft":
            boat.speed.rot = 0.02;
            break;
        default:
            break;
    }
};

//Higher-order function to handle keyup events for stopping the boat's movement
export const handleKeyUp = (boat) => (e) => {
    //Check if the boat is defined
    if (!boat) {
        return;
    }

    switch (e.key) {
        case "ArrowUp":
        case "ArrowDown":
            boat.speed.vel = 0;
            break;
        case "ArrowRight":
        case "ArrowLeft":
            boat.speed.rot = 0;
            break;
        default:
            break;
    }
};
