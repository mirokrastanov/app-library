import './Snake.css';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useInterval } from './useInterval.js';
import { CANVAS_SIZE, SNAKE_START, APPLE_START, SCALE, SPEED, DIRECTIONS } from './constants.js';


/**@type {CanvasRenderingContext2D} */
function Snake() {
    const navigate = useNavigate();
    const canvasRef = useRef(null);
    const [snake, setSnake] = useState(SNAKE_START);
    const [apple, setApple] = useState(APPLE_START);
    const [dir, setDir] = useState([0, -1]);
    const [speed, setSpeed] = useState(null);
    const [gameOver, setGameOver] = useState(true);

    useInterval(() => gameLoop(), speed);

    useEffect(() => {

        window.addEventListener('keydown', moveSnake);
        return () => {
            window.removeEventListener('keydown', moveSnake);
        };
    }, [dir]);

    function moveSnake(e) {
        //   UP   -  DOWN  -   LEFT  -  RIGHT
        //   38   -   40   -    37   -   39
        // [0,-1] - [0, 1] - [-1, 0] - [1, 0]
        const keyCode = e.keyCode;

        if ((keyCode == 38 && dir[1] == 0) || (keyCode == 40 && dir[1] == 0)
            || (keyCode == 37 && dir[0] == 0) || (keyCode == 39 && dir[0] == 0)) {
            setDir(DIRECTIONS[keyCode])
        }
    }

    const endGame = () => {
        setSpeed(null);
        setGameOver(true);
    };

    const createApple = () =>
        apple.map((_a, i) => Math.floor(Math.random() * (CANVAS_SIZE[i] / SCALE)));

    const checkCollision = (piece, snk = snake) => {
        if (
            piece[0] * SCALE >= CANVAS_SIZE[0] ||
            piece[0] < 0 ||
            piece[1] * SCALE >= CANVAS_SIZE[1] ||
            piece[1] < 0
        )
            return true;

        for (const segment of snk) {
            if (piece[0] === segment[0] && piece[1] === segment[1]) return true;
        }
        return false;
    };

    const checkAppleCollision = newSnake => {
        if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
            let newApple = createApple();
            while (checkCollision(newApple, newSnake)) {
                newApple = createApple();
            }
            setApple(newApple);
            return true;
        }
        return false;
    };

    const gameLoop = () => {
        const snakeCopy = JSON.parse(JSON.stringify(snake));
        const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];
        snakeCopy.unshift(newSnakeHead);
        if (checkCollision(newSnakeHead)) endGame();
        if (!checkAppleCollision(snakeCopy)) snakeCopy.pop();
        setSnake(snakeCopy);
    };

    const startGame = () => {
        setSnake(SNAKE_START);
        setApple(APPLE_START);
        setDir([0, -1]);
        setSpeed(SPEED);
        setGameOver(false);
    };

    useEffect(() => {
        const context = canvasRef.current.getContext("2d");
        context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
        context.clearRect(0, 0, canvasRef.current.width / SCALE, canvasRef.current.height / SCALE);

        snake.forEach(([x, y], i) => {
            if (i == 0) {
                context.fillStyle = "purple";
            } else if (i == 1) {
                context.fillStyle = "rgba(0, 112, 9, 0.7)";
            }
            context.fillRect(x, y, 1, 1);
        });
        context.fillStyle = "red";
        context.fillRect(apple[0], apple[1], 1, 1);
    }, [snake, apple, gameOver]);



    return (
        <div className="app-demo-ctr" id="dino">
            <h1>Snake Demo</h1>
            <div id="snake-board">
                <div id="snake-score">Score: {snake.length * 100} pts</div>
                <canvas id="canvas"
                    ref={canvasRef}
                    width={`${CANVAS_SIZE[0]}px`}
                    height={`${CANVAS_SIZE[1]}px`}
                />
                {gameOver && <div id="end-btn" onClick={startGame}>Play Again</div>}
            </div>

        </div>
    )
}

export default Snake;