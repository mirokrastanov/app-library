import React from 'react';
import './DinoJumping.css';

function DinoJumping() {
    return (
        <div className="app-demo-ctr" id="dino">
            <div className="game">
                <div id="character"></div>
                <div id="block"></div>
            </div>
            <p>Score: <span id="scoreSpan"></span></p>
        </div>
    )
}

export default DinoJumping;