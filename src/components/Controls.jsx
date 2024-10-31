import { useEffect, useState } from "react";

export default function Controls({ boat }) {
    //Initializes isMobile state variable to determine if the user is on a mobile devide
    const [isMobile, setIsMobile] = useState(false);
    //Initilaizes isDragging state variable to trac if the joystick is being actively dragged
    const [isDragging, setIsDragging] = useState(false);
    //Initializes joystickPosition state variable to store the current position of the joystick on the screen
    const [joystickPosition, setJoystickPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        //Function to check if the screen width is below 768px to detect mobile devices
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        //Calls the checkMobile function for initial check
        checkMobile();
        //Adds a resize event listener to update mobile state on screen size change
        window.addEventListener("resize", checkMobile);

        return () => {
            //Removes the resize event listener
            window.removeEventListener("resize", checkMobile);
        };
    }, []);

    //Function to handle the start of a joystick drag
    const handleTouchStart = (e) => {
        //Sets the isDragging state variable to true when the user starts dragging the joystick
        setIsDragging(true);
    };

    //Function to handle boat movement based on joystick input
    const handleTouchMove = (e) => {
        //Ensures joystick movement only occurs during an active drag
        if (!isDragging) {
            return;
        }

        //Captures the first touch point on the screen
        const touch = e.touches[0];
        //Gets the joystick's position and dimensions relative to the viewport 
        const joystick = e.target.getBoundingClientRect();

        //Calculates the x distance from the joystick's center to the touch point
        const x = touch.clientX - joystick.left - joystick.width / 2;
        //Calculates the y distance from the joystick's center to the touch point
        const y = touch.clientY - joystick.top - joystick.height / 2;

        //Calculates the actual distance from the joystick's center to the touch point, ensuring it does not exceed the joystick's radius
        const distance = Math.min(Math.sqrt(x * x + y * y), joystick.width / 2);
        // Calculates the angle of the touch point relative to the joystick center
        const angle = Math.atan2(y, x);

        //Updates the joystick position on the screen based on the calculated distance and angle
        setJoystickPosition({
            x: distance * Math.cos(angle),
            y: distance * Math.sin(angle),
        });

        //Sets the joystick radius as a max distance for normalizing movement strenght
        const maxDistance = joystick.width / 2;
        //Scales the disntance between 0 and 1 to control the boat's speed based on how far the joystick is dragged
        const normalizedDistance = distance / maxDistance;
        //Sets the boat's forward velocity using the normalized distance
        boat.speed.vel = normalizedDistance; 
        //Sets the boat's rotation based on the angle and scales it down for smoother rotation
        boat.speed.rot = angle * -0.02; 
    };

    //Function to handle the end of a joystick drag
    const handleTouchEnd = () => {
        //Sets the isDraggind state variable to false to stop joystick movement
        setIsDragging(false);
        //Resets the joystick to it's original position on the screen
        setJoystickPosition({ x: 0, y: 0 });  

        //Stops the boat's movement and rotation
        boat.speed.vel = 0;
        boat.speed.rot = 0;
    };


    return (
        <div className="controlsOverlay">
            <div className="instructions">
                <h1>
                    Welcome to my portfolio, {isMobile ? "Drag the joystick to move the boat" : "Use the arrow keys to move the boat"}
                </h1>
            </div>

            {isMobile && (
                <div className="joystick"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <div
                        className="joystick-inner"
                        style={{
                            transform: `translate(${joystickPosition.x}px, ${joystickPosition.y}px)`
                        }}
                    />
                </div>
            )}
        </div>
    );
}
