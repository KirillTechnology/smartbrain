import React from "react";
import Tilt from 'react-parallax-tilt';
import brain from './brain.png'
import './Logo.css';

const Logo = () => {
    return (
        <div className="tilt-container">
        <Tilt tiltMaxAngleX={30} tiltMaxAngleY={30}>
            <div className="tilt">
                {/* <h1>Logo 👽</h1> */}
                <img src={brain} alt='logo' style={{height:'70%', objectFit:'contain',filter:'invert(1)'}}/>
            </div>
        </Tilt>
        </div>
    )
}

export default Logo;