import './App.css';
import { useState } from 'react';
import { Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom';
import { useTheme } from './contexts/ThemeContext';
import Navigation from './components/navigation/Navigation';
import Home from './components/home/Home';
import NotFound from './components/notFound/NotFound';

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
                    <Route path='home' element={<Navigate to='/' />} />
                    <Route path='index.html' element={<Navigate to='/' />} />
                    


                    <Route path='*' element={<NotFound />} />
                </Routes>
            </div>

        </div>
    )
}

export default App;
