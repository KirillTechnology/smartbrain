import React from "react";
import './ImageLinkForm.css'


const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return (
        <div style={{width:'90%'}} >
            <p>This SmartBrain app detects faces in your uploaded image</p>
            <p>* Don't resize window after face is detected</p>
            <p>* The file size of each image input should be less than 20MB.</p>
            <p>* The app uses Clarifai API and sometime it can be down as they are constantly getting updated.</p>
            
            <div className="input1">
                <input type='text' className="image-search" onChange={onInputChange}></input>
                <button className="" style={{marginLeft:'10px'}} onClick={onButtonSubmit}>Detect face</button>
            </div>
        </div>
        
    )
}

export default ImageLinkForm;