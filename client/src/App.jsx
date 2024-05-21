import './App.css';
import { useState } from 'react';
import { Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom';
import { useTheme } from './contexts/ThemeContext';
import Navigation from './components/navigation/Navigation';
import Home from './components/home/Home';
import NotFound from './components/notFound/NotFound';
import AppDetails from './components/appDetails/AppDetails';
import RockPaperScissors from './apps/rps/RockPaperScissors';
import GuessTheNumber from './apps/guess/GuessTheNumber';
import DinoJumping from './apps/dinoJumping/DinoJumping';
import Snake from './apps/snake/Snake';

function App() {
    const darkTheme = useTheme();
    // const location = useLocation();

    // useEffect(() => {
    //     console.log(location);
    // }, [location]);

    return (
        <div className={`app-ctr${darkTheme ? ' dark-mode' : ''}`}>

            <Navigation />

            <div className="app-content">
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route path='/home' element={<Navigate to='/' />} />
                    <Route path='/index.html' element={<Navigate to='/' />} />
                    <Route path='/details/:id' element={<AppDetails />} />

                    <Route path='/apps/rps' element={<RockPaperScissors />} />
                    <Route path='/apps/guess' element={<GuessTheNumber />} />
                    <Route path='/apps/dino-jumping' element={<DinoJumping />} />
                    <Route path='/apps/snake' element={<Snake />} />


                    <Route path='*' element={<NotFound />} />
                </Routes>
            </div>

        </div>
    )
}

export default App;
