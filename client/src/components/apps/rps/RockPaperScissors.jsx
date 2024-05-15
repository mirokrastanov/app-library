import './RockPaperScissors.css';
import React, { useEffect, useState } from 'react';

function RockPaperScissors() {
    const [gameOver, setGameOver] = useState(false);
    const [playerChoice, setPlayerChoice] = useState('');
    const [currentHover, setCurrentHover] = useState('');
    const isRock = currentHover === 'r';
    const isPaper = currentHover === 'p';
    const isScissors = currentHover === 's';

    // useEffect(() => {
    //     console.log(currentHover);
    // }, [currentHover])

    function onMouseOver(e) { setCurrentHover(e.target.dataset.choice) }
    function onMouseLeave(e) { setCurrentHover('') }
    function onChoiceSelected(e) {
        if (e.target.dataset.choice === 'r' || e.target.dataset.choice === 'p' || e.target.dataset.choice === 's') {
            setPlayerChoice(e.target.dataset.choice);
            setGameOver(true);
        }
    }
    function resetGame() {
        setGameOver(false);
        setPlayerChoice('');
        setCurrentHover('');
    }

    return (
        <div className='app-demo-ctr'>
            <h1 id="choice" className={gameOver ? 'el-hidden' : ''}>Make your choice</h1>
            <div id="select" className={gameOver ? 'el-hidden' : ''}>
                <img src="/public/rps/rock.png" alt="rock-img"
                    onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} data-choice="r"
                    className={isPaper || isScissors ? 'op-50' : ''} onClick={onChoiceSelected} />
                <img src="/public/rps/paper.png" alt="paper-img"
                    onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} data-choice="p"
                    className={isRock || isScissors ? 'op-50' : ''} onClick={onChoiceSelected} />
                <img src="/public/rps/scissors.png" alt="scissors-img"
                    onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} data-choice="s"
                    className={isPaper || isRock ? 'op-50' : ''} onClick={onChoiceSelected} />
            </div>
            <h1 id="win" className={!gameOver ? 'el-hidden' : ''}>YOU WIN</h1>
            <div id="score" className={!gameOver ? 'el-hidden' : ''}>
                <div>
                    <h2 id="you">YOU</h2>
                    {playerChoice === 'r' && (<img src="/public/rps/rock.png" alt="rock-img" />)}
                    {playerChoice === 'p' && (<img src="/public/rps/paper.png" alt="paper-img" />)}
                    {playerChoice === 's' && (<img src="/public/rps/scissors.png" alt="scissors-img" />)}
                </div>
                <div>
                    <h2 id="computer">COMPUTER</h2>
                    <img src="/public/rps/paper.png" alt="paper-img" />
                </div>
            </div>
            <div className={`btn${!gameOver ? ' el-hidden' : ''}`}
                onClick={resetGame} >Play Again</div>
        </div>
    )
}

export default RockPaperScissors;