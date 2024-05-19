import './Breakout.css';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Breakout() {
    const navigate = useNavigate();
    const canvasRef = useRef(null);
    const [gameOver, setGameOver] = useState(true);





    return (
        <div className="app-demo-ctr" id="breakout">
            <h1>Breakout Demo</h1>

            {gameOver && (
                <div id="breakout-controls">
                    <h4>CONTROLS</h4>
                    <p>
                        <span className="material-symbols-outlined">arrow_back</span>
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </p>
                </div>
            )}

            <div id="breakout-board">
                <div id="breakout-score">Score: 5000 pts</div>
                <canvas id="canvas" width="600" height="600" ref={canvasRef}></canvas>
                {gameOver && <div id="end-btn">Play Again</div>}
                {gameOver && <div id="winner">You Won!!!</div>}
            </div>
        </div>
    )
}

export default Breakout;