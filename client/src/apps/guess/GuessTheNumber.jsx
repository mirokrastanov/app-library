import { Link, useNavigate } from 'react-router-dom';
import './GuessTheNumber.css';
import React, { useEffect, useState } from 'react';

function GuessTheNumber() {
    const [gameOver, setGameOver] = useState(false);
    const [playerChoice, setPlayerChoice] = useState('');
    const [computerChoice, setComputerChoice] = useState('');
    const [currentHover, setCurrentHover] = useState('');
    const [winner, setWinner] = useState('');
    const isRock = currentHover === 'r';
    const isPaper = currentHover === 'p';
    const isScissors = currentHover === 's';
    const navigate = useNavigate();

    useEffect(() => {
        resetGame();
    }, [])

    useEffect(() => {
        if (playerChoice !== '' && computerChoice !== '') {
            checkWinner();
            setGameOver(true);
        }
    }, [computerChoice])

    function onMouseOver(e) { setCurrentHover(e.target.dataset.choice) }
    function onMouseLeave(e) { setCurrentHover('') }
    function onChoiceSelected(e) {
        if (e.target.dataset.choice === 'r' || e.target.dataset.choice === 'p' || e.target.dataset.choice === 's') {
            setPlayerChoice(e.target.dataset.choice);
            setComputerChoice(genComputerChoice());
        }
    }
    function resetGame() {
        setGameOver(false);
        setPlayerChoice('');
        setComputerChoice('');
        setCurrentHover('');
        setWinner('');
    }
    function genComputerChoice() {
        const choices = ['r', 'p', 's'];
        return choices[Math.floor(Math.random() * 3)];
    }
    function checkWinner() {
        // console.log(playerChoice, ' | ', computerChoice);
        if (playerChoice === computerChoice) {
            setWinner('It\'s a tie');
        } else if (playerChoice === 'r' && computerChoice === 's') {
            setWinner('You win');
        } else if (playerChoice === 'p' && computerChoice === 'r') {
            setWinner('You win');
        } else if (playerChoice === 's' && computerChoice === 'p') {
            setWinner('You win');
        } else {
            setWinner('You lose');
        }
    }

    return (
        <div className='app-demo-ctr'>
            <h1>APP DEMO</h1>
            <div className='btn app-top' onClick={() => navigate(-1)}>Go Back</div>


            <h1>Guess The Number</h1>
            <p>Enter a number between 1-100</p>
            <p id="guess-tip">Too Low! Guess higher!</p>

            <section>
                <div id="guess-scene">
                    <form>
                        <label htmlFor="guess"></label>
                        <input name='guess' type="number" placeholder="14?" />
                        <button type="submit">Guess</button>
                    </form>
                    <p>Guesses: 3</p>
                </div>

                <h2>Guess History</h2>
                <div id="guess-history">
                    <div className="guess-square">
                        <p>13</p>
                        <span className="material-symbols-outlined">arrow_upward</span>
                    </div>
                    <div className="guess-square">
                        <p>53</p>
                        <span className="material-symbols-outlined">arrow_downward</span>
                    </div>
                    <div className="guess-square">
                        <p>13</p>
                        <span className="material-symbols-outlined">arrow_upward</span>
                    </div>
                    <div className="guess-square">
                        <p>53</p>
                        <span className="material-symbols-outlined">arrow_downward</span>
                    </div>
                    <div className="guess-square">
                        <p>13</p>
                        <span className="material-symbols-outlined">arrow_upward</span>
                    </div>
                    <div className="guess-square">
                        <p>53</p>
                        <span className="material-symbols-outlined">arrow_downward</span>
                    </div>
                </div>
            </section>

            <div className="g-btns">
                <div className='btn'>Give Up</div>
                <div className='btn'>Play Again</div>
            </div>
        </div>
    )
}

export default GuessTheNumber;