import './DinoJumping.css';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function DinoJumping() {
    const [counter, setCounter] = useState(0);
    const [gameEnded, setGameEnded] = useState(false);
    const character = useRef(null);
    const block = useRef(null);
    const gameBoard = useRef(null);
    const navigate = useNavigate();


    useEffect(() => {
        // console.log(character.current.classList);


        window.addEventListener('click', handleInput);
        window.addEventListener('keydown', handleInput);
        return () => {
            window.removeEventListener('click', handleInput);
            window.removeEventListener('keydown', handleInput);
        };
    }, []);

    useEffect(() => {
        const checkDead = setInterval(function () {
            if (gameEnded) return;
            let characterTop = parseInt(window.getComputedStyle(character.current).getPropertyValue("top"));
            let blockLeft = parseInt(window.getComputedStyle(block.current).getPropertyValue("left"));
            if (blockLeft < 20 && blockLeft > -20 && characterTop >= 130) {
                block.current.style.animationPlayState = 'paused';
                setGameEnded(true);
            } else {
                setCounter(prevCounter => prevCounter + 1);
            }
        }, 10);

        return () => {
            clearInterval(checkDead);
        };
    }, [counter, gameEnded]);

    useEffect(() => {
        // console.log(gameEnded);
    }, [gameEnded])


    function handleInput(e) {
        if (gameEnded) return;
        // console.log(e.type);
        if ((e.type == 'keydown' && e.code == 'Space') || e.type == 'click') {
            jump(e);
        }
    }

    function jump(e) {
        // console.log('jump');
        if (gameEnded || !character.current) return;
        if (character.current.classList == "animate") return;
        character.current.classList.add("animate");
        setTimeout(function () {
            character.current.classList.remove("animate");
        }, 600);
    }

    function restartGame(e) {
        e.preventDefault();
        setCounter(0);
        setGameEnded(false);
    }

    return (
        <div className="app-demo-ctr" id="dino">
            <h1>APP DEMO</h1>
            <div className='btn' onClick={() => navigate(-1)}>Go Back</div>
            
            <h3>Press Spacebar or Left Mouse Click to jump</h3>

            {!gameEnded && <>
                <div className="game" ref={gameBoard}>
                    <div id="character" ref={character}></div>
                    <div id="block" ref={block}></div>
                </div>
                <p>Score: <span id="scoreSpan">{Math.floor(counter / 100)}</span></p>
            </>}
            {gameEnded &&
                <div className="final-wrap">
                    <div className="final-score">Score: {Math.floor(counter / 100)}</div>
                    <button className="new-game-btn" onClick={restartGame}>New Game</button>
                </div>
            }
        </div>
    )
}

export default DinoJumping;