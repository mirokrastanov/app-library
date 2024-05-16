import { Link, useNavigate } from 'react-router-dom';
import './GuessTheNumber.css';
import React, { useEffect, useState } from 'react';

function GuessTheNumber() {
    const [gameOver, setGameOver] = useState(false);
    const [playerChoice, setPlayerChoice] = useState('');
    const [computerChoice, setComputerChoice] = useState('');
    const [winner, setWinner] = useState(false);
    const [isLower, setIsLower] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [emptyInput, setEmptyInput] = useState(false);
    const [firstInteraction, setFirstInteraction] = useState(true);
    const [history, setHistory] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        resetGame();
        setComputerChoice(genComputerChoice());
    }, []);

    useEffect(() => {
        checkWinner();
    }, [playerChoice]);

    function resetGame() {
        setGameOver(false);
        setPlayerChoice('');
        setComputerChoice(genComputerChoice());
        setWinner(false);
        setIsLower(null);
        setInputValue('');
        setEmptyInput(false);
        setFirstInteraction(true);
        setHistory([]);
    }

    function genComputerChoice() {
        return Math.floor((Math.random() * 100) + 1);
    }

    function checkWinner() {
        // console.log(playerChoice, ' | ', computerChoice);
        if (playerChoice != '' && playerChoice) {
            if (playerChoice == computerChoice) {
                setIsLower(null);
                setWinner(true);
                setGameOver(true);
                setHistory(prev => [{ num: playerChoice, isLower: null }, ...prev]);
                return;
            } else if (playerChoice < computerChoice) {
                setIsLower(true);
            } else {
                setIsLower(false);
            }
            setHistory(prev => [{ num: playerChoice, isLower: playerChoice < computerChoice }, ...prev]);
        }
    }

    function giveUp(e) {
        setIsLower(null);
        setGameOver(true);

    }

    function handleSubmit(e) {
        e.preventDefault();
        setFirstInteraction(false);
        if (inputValue == '') {
            setEmptyInput(true);
            setPlayerChoice('');
            return;
        }
        setPlayerChoice(e.target.guess.value);
    }

    function handleChange(e) {
        e.preventDefault();
        setInputValue(e.target.value);
    }

    function squareCheck(xIsLower) {
        if (xIsLower == null) return '';
        else if (xIsLower) return ' low';
        else return ' high';
    }

    return (
        <div className='app-demo-ctr'>
            <h1>APP DEMO</h1>
            <div className='btn app-top' onClick={() => navigate(-1)}>Go Back</div>


            <h1>Guess The Number</h1>
            <p className={gameOver ? 'g-hidden' : ''}>Enter a number between 1-100</p>
            {firstInteraction && !gameOver
                ? (<p id="guess-tip" className="low">Come on. Give it a try.</p>)
                : (<></>)}
            {!firstInteraction && emptyInput && playerChoice == '' && !gameOver
                ? (<p id="guess-tip" className="high">Input is empty!</p>)
                : (<></>)}
            {isLower && playerChoice != '' && playerChoice && !winner && !gameOver
                ? (<p id="guess-tip" className="low">Too Low! Guess higher!</p>)
                : (<></>)}
            {!isLower && playerChoice != '' && playerChoice && !winner && !gameOver
                ? (<p id="guess-tip" className="high">Too High! Guess lower!</p>)
                : (<></>)}
            {winner
                ? (<p id="guess-tip" className="low">YOU WIN!</p>)
                : (<></>)}
            {gameOver && !winner
                ? (<p id="guess-tip" className="high">You gave up.</p>)
                : (<></>)}

            <section>
                <div id="guess-scene">
                    <form onSubmit={handleSubmit} className={gameOver ? 'g-hidden' : ''}>
                        <label htmlFor="guess"></label>
                        <input name='guess' type="number" placeholder="14?" min={1} max={100}
                            onChange={handleChange} value={inputValue} />
                        <button type="submit">Guess</button>
                    </form>
                    {gameOver
                        ? (<h2>The Number is: {computerChoice}</h2>)
                        : (<></>)}
                    <h3>Guesses: {history.length}</h3>
                </div>

                <h2>Guess History</h2>
                <div id="guess-history">
                    {history.map((x, i) => (<div key={'s-h-' + i}
                        className={`guess-square${squareCheck(x.isLower)}`}>
                        <span>{x.num}</span>
                        {squareCheck(x.isLower) == ''
                            ? (<span className="material-symbols-outlined">verified</span>)
                            : (x.isLower
                                ? (<span className="material-symbols-outlined">arrow_upward</span>)
                                : (<span className="material-symbols-outlined">arrow_downward</span>)
                            )}
                    </div>))}
                </div>
            </section>

            <h1 id="g-win" className="g-hidden">You win! The Number is: 38</h1>

            <div className="g-btns">
                <div className={`btn${gameOver ? ' g-hidden' : ''}`} onClick={giveUp}>Give Up</div>
                <div className='btn' onClick={resetGame}>Play Again</div>
            </div>
        </div>
    )
}

export default GuessTheNumber;