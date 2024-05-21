import React from 'react';
import './ScientificCalculator.css';

function ScientificCalculator() {
    return (
        <div className="app-demo-ctr" id="s-calc">
            <h1>Scientific Calculator</h1>

            <div className="calculator-grid">
                <div className="output">
                    <div className="previous-operand"></div>
                    <div className="current-operand"></div>
                </div>
                <div className="ans-sto">
                    <p id="ans-display">Ans: empty</p>
                    <p>|</p>
                    <p id="sto-display">STO: empty</p>
                </div>

                {/* <!-- new row --> */}
                <div className="span-two" id="toggler">
                    <input type="checkbox" className="toggle" id="check" />
                    <label htmlFor="check"></label>
                </div>
                <button>%</button>
                <button className="span-two">AC</button>
                <button>DEL</button>
                <button>÷</button>

                {/* <!-- new row --> */}
                <button>x!</button>
                <button>ln</button>
                <button>log</button>
                <button>1</button>
                <button>2</button>
                <button>3</button>
                <button>&#215;</button>

                {/* <!-- new row --> */}
                <button>sin</button>
                <button>cos</button>
                <button>tan</button>
                <button>4</button>
                <button>5</button>
                <button>6</button>
                <button>+</button>

                {/* <!-- new row --> */}
                <button>1/x</button>
                <button id="sqrt-1">&radic;</button>
                <button id="y-root-x">
                    <p>y</p>
                    <p>√</p>
                    <p>x</p>
                    {/* <!-- <img src="/images/y-root-x.png" alt="y-root-x-img"> --> */}
                </button>
                <button>7</button>
                <button>8</button>
                <button>9</button>
                <button>-</button>

                {/* <!-- new row --> */}
                <button>e</button>
                <button id="x2">x<sup>2</sup></button>
                <button>x<sup>y</sup></button>
                <button>.</button>
                <button>0</button>
                <button className="span-two">=</button>

                {/* <!-- new row --> */}
                <button>&pi;</button>
                <button>Ans</button>
                <button>STO</button>
                <button>RCL</button>
                <button className="hex-num-btn">A</button>
                <button className="hex-num-btn">B</button>
                <button className="hex-num-btn">C</button>


                {/* <!-- new row --> */}

                <button id="record"><p>Use</p>History</button>
                <div title="History" id="history-ctr" className="span-three">
                    <p>History:</p>
                    <select name="history" id="history">
                        <option value="empty" defaultValue={"empty"}>Empty</option>
                    </select>
                </div>
                <button className="hex-num-btn">D</button>
                <button className="hex-num-btn">E</button>
                <button className="hex-num-btn">F</button>


                {/* <!-- new row --> */}
                <div id="conversion-ctr">
                    <select name="conversion-from" className="conversion">
                        <option value="dec" defaultValue={"dec"}>Decimal</option>
                        <option value="bin">Binary</option>
                        <option value="oct">Octal</option>
                        <option value="hex">Hexadecimal</option>
                    </select>
                    <select name="conversion-to" className="conversion">
                        <option value="dec">Decimal</option>
                        <option value="bin" defaultValue={"bin"}>Binary</option>
                        <option value="oct">Octal</option>
                        <option value="hex">Hexadecimal</option>
                    </select>
                    <button className="conversion">Convert</button>
                </div>

            </div>

        </div>
    )
}

export default ScientificCalculator;