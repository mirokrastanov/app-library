import './TicTacToe.css';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function TicTacToe() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [go, setGo] = useState('circle');
    const [info, setInfo] = useState('Circle goes first.');
    const [isGameActive, setIsGameActive] = useState(true);

    useEffect(() => {
        checkScore();
    }, [board]);

    function handleClick(index) {
        if (board[index] || !isGameActive) return;
        console.log(board[index], index);
        const newBoard = board.map((c, i) => {
            if (i == index && !c) return go;
            return c;
        });
        setBoard(newBoard);
        setGo(go === 'circle' ? 'cross' : 'circle');
        setInfo(`It is now ${go === 'circle' ? 'cross' : 'circle'}'s go.`);
    };

    function checkScore() {
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let combo of winningCombos) {
            const [a, b, c] = combo;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                setIsGameActive(false);
                setInfo(`${board[a] == 'circle' ? 'Circle' : 'Cross'} wins!`);
                return;
            }
        }

        if (board.every(cell => cell)) {
            setInfo('This game was a draw.');
            setIsGameActive(false);
        }
    };

    function renderNewGame() {
        setBoard(Array(9).fill(null));
        setGo('circle');
        setInfo('Circle goes first.');
        setIsGameActive(true);
    };

    return (
        <div className="app-demo-ctr" id="ttt-ctr" onLoad={renderNewGame}>
            <div id="ttt-inner">
                <div className="btn" id="new-game" onClick={renderNewGame}>{isGameActive ? 'Restart' : 'New Game'}</div>
                <div id="game-board">
                    {board.map((cell, index) => (
                        <div
                            key={index}
                            data-id={index}
                            className="square"
                            onClick={() => handleClick(index)}
                        >
                            {cell && <div className={cell}></div>}
                        </div>
                    ))}
                </div>
                <p id="info">{info}</p>
            </div>
        </div>
    )
}

export default TicTacToe;



