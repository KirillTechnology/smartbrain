import React from "react";
import './FaceRecognition.css'

const FaceRecognition = ({imageURL, boxes}) => {

    // console.log('boxes: ', boxes);
    // console.log('boxes type : ', typeof(boxes));

    let i = 0;
    return (
        <div className="output" style={ imageURL.length===0 ? {display:'none'} : {display:'block'} }>
            {imageURL==='False' ? <p className="error">:: Something is wrong! Check the link ::</p> : null}
            <img id='input-image' alt='' src={imageURL}/>
            {
            boxes.map(box => {
                return <div key={i++} className="bounding-box" style={{top: box.topRow, left: box.leftCol, bottom: box.bottomRow, right: box.rightCol}}></div>
            })}
        </div>
    )
}

export default FaceRecognition;