import './Snake.css';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { drawGrid, clearCanvas, drawRect, spawnApple } from './snakeUtil.js';

function Snake() {
    const navigate = useNavigate();

    const canvasRef = useRef(null);
    const [ctx, setCtx] = useState(null);
    const [width, height] = [600, 600];
    const hSize = 20;
    const vSize = 20;
    const rectSize = width / hSize;

    const [snake, setSnake] = useState({ x: 10, y: 10 });
    const [tail, setTail] = useState({ segments: [], size: 3 });
    const [apple, setApple] = useState({ x: 5, y: 15 });
    const [speed, setSpeed] = useState({ x: 1, y: 0 });
    const [inputSpeed, setInputSpeed] = useState({ x: 1, y: 0 });
    const [intervalId, setIntervalId] = useState(null);
    const [score, setScore] = useState(0);

    useEffect(() => {
        if (canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            setCtx(context);
        }

        const handleKeyDown = (e) => {
            if (e.key === 'ArrowUp' && speed.y === 0) setInputSpeed({ x: 0, y: -1 });
            else if (e.key === 'ArrowDown' && speed.y === 0) setInputSpeed({ x: 0, y: 1 });
            else if (e.key === 'ArrowLeft' && speed.x === 0) setInputSpeed({ x: -1, y: 0 });
            else if (e.key === 'ArrowRight' && speed.x === 0) setInputSpeed({ x: 1, y: 0 });
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        startGame();

    }, [ctx])

    function startGame() {
        setSnake({ x: 10, y: 10 });
        setTail({ segments: [], size: 3 });
        setSpeed({ x: 1, y: 0 });
        setInputSpeed({ x: 1, y: 0 });
        setApple(spawnApple(hSize, vSize, tail));
        setScore(0);

        if (intervalId) clearInterval(intervalId);
        const newIntervalId = setInterval(mainLoop, 100);
        setIntervalId(newIntervalId);
    };

    function tick() {
        setScore((tail.size - 3) * 1000);

        let newTailSegments = [...tail.segments, { x: snake.x, y: snake.y }];
        if (newTailSegments.length > tail.size) newTailSegments.shift();
        setTail({ ...tail, segments: newTailSegments });

        let newSnake = { ...snake, x: snake.x + inputSpeed.x, y: snake.y + inputSpeed.y };
        if (newSnake.y === -1) newSnake.y = vSize - 1;
        if (newSnake.y === vSize) newSnake.y = 0;
        if (newSnake.x === -1) newSnake.x = hSize - 1;
        if (newSnake.x === hSize) newSnake.x = 0;

        newTailSegments.forEach(seg => {
            if (seg.x === newSnake.x && seg.y === newSnake.y) gameOver();
        });

        if (newSnake.x === apple.x && newSnake.y === apple.y) {
            setTail({ ...tail, size: tail.size + 1 });
            setApple(spawnApple(hSize, vSize, tail));
        }

        setSnake(newSnake);
        setSpeed(inputSpeed);
    };

    function drawScene() {
        if (!ctx) return;
        clearCanvas(ctx, width, height);
        drawGrid(ctx, hSize, vSize, rectSize, width, height);
        drawRect(ctx, snake.x, snake.y, 'purple', rectSize);
        tail.segments.forEach(seg => drawRect(ctx, seg.x, seg.y, 'green', rectSize));
        drawRect(ctx, apple.x, apple.y, 'red', rectSize);
    };

    function mainLoop() {
        tick();
        drawScene();
    };

    function gameOver() {
        clearInterval(intervalId);
        const choice = window.confirm(`Game Over!\nYour Score: ${score}\n\nPlay Again?`);
        if (choice) startGame();
    };





    return (
        <div className="app-demo-ctr" id="dino">
            <h1>Snake Demo</h1>
            <div id="snake-board">
                <div id="snake-score">Score: {score} pts</div>
                <canvas id="canvas" width={width} height={height}
                    ref={canvasRef}></canvas>

                <div id="end-btn">Play Again</div>
            </div>

        </div>
    )
}

export default Snake;