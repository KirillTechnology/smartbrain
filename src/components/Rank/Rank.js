import React from "react";
import './Rank.css'

const Rank = ({ name, score }) => {
    return (
        <div className="rank">
            <p>Hi {name}, Your score: {score}</p>
        </div>
    )
}

export default Rank;