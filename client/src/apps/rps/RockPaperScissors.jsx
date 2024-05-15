import { Link, useNavigate } from 'react-router-dom';
import './RockPaperScissors.css';
import React, { useEffect, useState } from 'react';

function RockPaperScissors() {
    const [gameOver, setGameOver] = useState(false);
    const [playerChoice, setPlayerChoice] = useState('');
    const [computerChoice, setComputerChoice] = useState('');
    const [currentHover, setCurrentHover] = useState('');
    const isRock = currentHover === 'r';
    const isPaper = currentHover === 'p';
    const isScissors = currentHover === 's';
    const navigate = useNavigate();

    // useEffect(() => {
    //     console.log(currentHover);
    // }, [currentHover])

    function onMouseOver(e) { setCurrentHover(e.target.dataset.choice) }
    function onMouseLeave(e) { setCurrentHover('') }
    function onChoiceSelected(e) {
        if (e.target.dataset.choice === 'r' || e.target.dataset.choice === 'p' || e.target.dataset.choice === 's') {
            setPlayerChoice(e.target.dataset.choice);
            setComputerChoice(genComputerChoice());
            setGameOver(true);
        }
    }
    function resetGame() {
        setGameOver(false);
        setPlayerChoice('');
        setComputerChoice('');
        setCurrentHover('');
    }
    function genComputerChoice() {
        const choices = ['r', 'p', 's'];
        return choices[Math.floor(Math.random() * 3)];
    }

    return (
        <div className='app-demo-ctr'>
            <h1>APP DEMO</h1>
            <div style={{ margin: '10px 10px 30px 10px' }} className='btn' onClick={() => navigate(-1)}>Go Back</div>
            <h2 id="choice" className={gameOver ? 'el-hidden' : ''}>Make your choice</h2>
            <div id="select" className={gameOver ? 'el-hidden' : ''}>
                <img src="/rps/rock.png" alt="rock-img"
                    onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} data-choice="r"
                    className={isPaper || isScissors ? 'op-50' : ''} onClick={onChoiceSelected} />
                <img src="/rps/paper.png" alt="paper-img"
                    onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} data-choice="p"
                    className={isRock || isScissors ? 'op-50' : ''} onClick={onChoiceSelected} />
                <img src="/rps/scissors.png" alt="scissors-img"
                    onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} data-choice="s"
                    className={isPaper || isRock ? 'op-50' : ''} onClick={onChoiceSelected} />
            </div>
            <h1 id="win" className={!gameOver ? 'el-hidden' : ''}>YOU WIN</h1>
            <div id="score" className={!gameOver ? 'el-hidden' : ''}>
                <div>
                    <h2 id="you">YOU</h2>
                    {playerChoice === 'r' && (<img src="/rps/rock.png" alt="rock-img" />)}
                    {playerChoice === 'p' && (<img src="/rps/paper.png" alt="paper-img" />)}
                    {playerChoice === 's' && (<img src="/rps/scissors.png" alt="scissors-img" />)}
                </div>
                <div>
                    <h2 id="computer">COMPUTER</h2>
                    {computerChoice === 'r' && (<img src="/rps/rock.png" alt="rock-img" />)}
                    {computerChoice === 'p' && (<img src="/rps/paper.png" alt="paper-img" />)}
                    {computerChoice === 's' && (<img src="/rps/scissors.png" alt="scissors-img" />)}
                </div>
            </div>
            <div className={`btn${!gameOver ? ' el-hidden' : ''}`}
                onClick={resetGame} >Play Again</div>
        </div>
    )
}

export default RockPaperScissors;