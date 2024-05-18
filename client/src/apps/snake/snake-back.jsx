import './Snake.css';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/**@type {CanvasRenderingContext2D} */
function Snake() {
    const navigate = useNavigate();
    const canvas = useRef(null);
    const [width, height, hSize, vSize] = [600, 600, 20, 20];
    const rectSize = width / hSize;

    const [gameEnded, setGameEnded] = useState(true);
    const [score, setScore] = useState(0);
    const [ctx, setCtx] = useState(null);
    const [apple, setApple] = useState({ x: 5, y: 15 });
    const [snake, setSnake] = useState({ x: 10, y: 10 });
    const [tail, setTail] = useState({ segments: [], size: 3 });
    const [speed, setSpeed] = useState({ x: 1, y: 0 });
    const [inputSpeed, setInputSpeed] = useState({ x: 1, y: 0 });

    useEffect(() => {
        if (ctx == null) setCtx(canvas.current.getContext('2d'));

        window.addEventListener('keydown', handleInput);
        return () => {
            window.removeEventListener('keydown', handleInput);
        };
    }, []);

    useEffect(() => {
        if (ctx != null) drawGrid();
    }, [ctx]);




    // useEffect(() => {
    //     console.log(inputSpeed);
    // }, [inputSpeed]);

    function handleInput(e) {
        // console.log(e.key, inputSpeed);
        //   UP   -  DOWN  -   LEFT  -  RIGHT
        //   38   -   40   -    37   -   39
        // [0,-1] - [0, 1] - [-1, 0] - [1, 0]
        // if (e.key == 'ArrowUp' && speed.y == 0) setInputSpeed({ x: 0, y: -1 })
        // else if (e.key == 'ArrowDown' && speed.y == 0) setInputSpeed({ x: 0, y: 1 })
        // else if (e.key == 'ArrowLeft' && speed.x == 0) setInputSpeed({ x: -1, y: 0 })
        // else if (e.key == 'ArrowRight' && speed.x == 0) setInputSpeed({ x: 1, y: 0 })
    }

    function drawGrid() {
        ctx.strokeStyle = '#999999';
        ctx.beginPath();
        for (let x = 1; x < hSize; x++) {
            ctx.moveTo(x * rectSize, 0);
            ctx.lineTo(x * rectSize, height);
        }
        for (let y = 1; y < vSize; y++) {
            ctx.moveTo(0, y * rectSize);
            ctx.lineTo(width, y * rectSize);
        }
        ctx.closePath();
        ctx.stroke();
    }
    function clear() {
        ctx.clearRect(0, 0, width, height);
    }
    function drawRect(x, y, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x * rectSize + 1, y * rectSize + 1, rectSize - 2, rectSize - 2);
    }
    function start() {
        setSnake({ x: 10, y: 10 });
        setTail({ segments: [], size: 3 });
        setSpeed({ x: 1, y: 0 });
        setInputSpeed({ x: 1, y: 0 });
        spawnApple();
        setGameEnded(false);
        main();
    }
    function tick() {
        updateScore();
        setTail({ segments: [...tail.segments, { x: snake.x, y: snake.y }], size: tail.size });
        while (tail.segments.length > tail.size) setTail({ segments: tail.segments.slice(1), size: tail.size });
        setSpeed({ x: inputSpeed.x, y: inputSpeed.y });
        setSnake({ x: snake.x + speed.x, y: snake.y + speed.y });
        if (snake.y == -1) setSnake({ x: snake.x, y: vSize - 1 });
        if (snake.y == vSize) setSnake({ x: snake.x, y: 0 });
        if (snake.x == -1) setSnake({ x: hSize - 1, y: snake.y });
        if (snake.x == hSize) setSnake({ x: 0, y: snake.y });
        tail.segments.forEach(seg => {
            if (seg.x == snake.x && seg.y == snake.y) gameOver();
        });
        if (snake.x == apple.x && snake.y == apple.y) {
            setTail({ segments: tail.segments, size: tail.size++ });
            spawnApple();
        }
    }
    function drawScene() {
        let counter = 0;
        clear();
        drawGrid();
        drawRect(snake.x, snake.y, 'purple');
        tail.segments.forEach(seg => {
            console.log(++counter);
            drawRect(seg.x, seg.y, 'green');
        });
        drawRect(apple.x, apple.y, 'red');
    }
    function main() {
        tick();
        drawScene();
    }
    function spawnApple() {
        setApple({ x: Math.floor(Math.random() * hSize), y: Math.floor(Math.random() * vSize) });
        tail.segments.forEach(seg => {
            if (seg.x == apple.x && seg.y == apple.y) spawnApple();
        });
    }
    function gameOver() {
        setGameEnded(true);
    }

    function updateScore() {
        setScore((tail.size - 3) * 1000);
    }



    // useEffect(() => {
    //     if (ctx != null) main();
    //     // console.log(gameEnded);

    // }, [100]);

    // snake, apple, gameOver - dependecies 
    return (
        <div className="app-demo-ctr" id="dino">
            <h1>Snake Demo</h1>
            <div id="snake-board">
                <div className="btn" onClick={main}>Main</div>
                <div id="snake-score">Score: {score} pts</div>
                <canvas id="canvas" ref={canvas} width={width} height={height} />
                {gameEnded && <div id="end-btn" onClick={start}>Play Again</div>}
            </div>

        </div>
    )
}

export default Snake;