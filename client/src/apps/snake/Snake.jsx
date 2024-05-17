import './Snake.css';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Snake() {
    const [counter, setCounter] = useState(0);
    const [gameEnded, setGameEnded] = useState(false);
    const character = useRef(null);
    const block = useRef(null);
    const gameBoard = useRef(null);
    const navigate = useNavigate();

    return (
        <div className="app-demo-ctr" id="dino">
            <h1>Snake Demo</h1>
            <div id="snake-board">
                <div id="snake-score">5000</div>
                <canvas id="canvas" width="600" height="600"></canvas>

                <div id="end-btn">Play Again</div>
            </div>

        </div>
    )
}

export default Snake;