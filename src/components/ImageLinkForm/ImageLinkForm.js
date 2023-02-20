import React from "react";
import './ImageLinkForm.css'


const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return (
        <div style={{width:'90%'}} >
            <p>This SmartBrain app detects faces in your uploaded image</p>
            {/* <p>* Don't resize window after face is detected</p> */}
            <p>* Image should be {'<'}20MB</p>
            <p>* The app uses Clarifai API and sometime it can be down</p>
            <p>* Use Google Chrome for better experience</p>
            {/* <p>* The app uses free database, which deletes logins every 90 days</p> */}
            
            <div className="input1">
                <input type='text' className="image-search" placeholder="Type image url" onChange={onInputChange}></input>
                <button className="" style={{marginLeft:'10px'}} onClick={onButtonSubmit}>Detect face</button>
            </div>
        </div>
        
    )
}

export default ImageLinkForm;