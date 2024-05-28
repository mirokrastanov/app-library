import './Navigation.css';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme, useThemeUpdate } from '../../contexts/ThemeContext';
import { useSearch, useSearchUpdate } from '../../contexts/SearchContext';
import { NavBtn } from '../shared/navBtn/NavBtn';
import { NavSearch } from '../shared/navSearch/NavSearch';
import { NavBkFwd } from '../shared/navBtn/NavBkFwd';

function Navigation() {
    const [topScroll, setTopScroll] = useState(true);
    const [mobileWidth, setMobileWidth] = useState(false);
    const [searchShown, setSearchShown] = useState(false);
    const [hamburgerShown, setHamburgerShown] = useState(false);

    const darkTheme = useTheme();
    const toggleTheme = useThemeUpdate();
    const searchValue = useSearch();
    const updateSearchValue = useSearchUpdate();
    const navigate = useNavigate();

    const scrollHandler = (e) => {
        const scrollPos = window.scrollY;
        if (scrollPos > 10) setTopScroll(false);
        else setTopScroll(true);
    };

    const screenResizeHandler = (e) => {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 767) setMobileWidth(true);
        else setMobileWidth(false);
    };

    const hamburgerOnChangeHandler = (e) => {
        if (e.target.checked) setHamburgerShown(true);
        else setHamburgerShown(false);
    };

    const navHandler = (e) => {
        if (mobileWidth) setHamburgerShown(false);
    };

    const searchToggleHandler = (e) => {
        if (mobileWidth) {
            setHamburgerShown(false);
            updateSearchValue('');
            navigate('/search');
            return;
        }
        if (searchShown) {
            if (!e.target.classList.contains('material-symbols-outlined')) return;
            setSearchShown(false);
        }
        else setSearchShown(true);
    };

    const searchOnChangeHandler = (e) => {
        updateSearchValue(e.target.value);
    };

    const searchOnSubmitHandler = (e) => {
        e.preventDefault();
        if (!searchValue) return;
        setSearchShown(false);
        navigate('/search');
    };

    useEffect(() => {
        window.addEventListener('scroll', scrollHandler);
        window.addEventListener('load', screenResizeHandler);
        window.addEventListener('resize', screenResizeHandler);

        return () => {
            window.removeEventListener('scroll', scrollHandler);
            window.removeEventListener('load', screenResizeHandler);
            window.removeEventListener('resize', screenResizeHandler);
        };
    }, []);

    return (
        <header className={`main-header ${topScroll ? '' : 'scrolled'}`}>
            <div className="logo">
                {/* LOGO */}
                <Link className='home-link' to='/'>
                    App Library
                    <p className='powered-by'>By: Miroslav Krastanov</p>
                </Link>
                {/* DARK MODE TOGGLE */}
                <div className="theme-toggle">
                    <input type="checkbox" id="darkmode-toggle" checked={darkTheme} onChange={toggleTheme} />
                    <label htmlFor="darkmode-toggle" className='tooltip-anchor'>
                        <span className="material-symbols-outlined">light_mode</span>
                        <div className='tooltip mode-tooltip'>{darkTheme ? 'Lights ON' : 'Go Dark'}</div>
                        <span className="material-symbols-outlined">dark_mode</span>
                    </label>
                </div>
            </div>
            {/* HAMBURGER MENU (MOBILE) */}
            <input checked={hamburgerShown} type="checkbox" className='menu-btn' id='menu-btn' onChange={hamburgerOnChangeHandler} />
            <label htmlFor="menu-btn" className='menu-icon'>
                <span className='menu-icon__line'></span>
            </label>

            <ul className="nav-links">
                <NavBkFwd target={'Back'} check={mobileWidth} handler={(e) => { navigate(-1); navHandler(e); }} />
                <NavBkFwd target={'Forward'} check={mobileWidth} handler={(e) => { navigate(+1); navHandler(e); }} />
                <NavSearch searchValue={searchValue} checks={[searchShown, mobileWidth]}
                    handlers={[searchToggleHandler, searchOnSubmitHandler, searchOnChangeHandler]} />

                <NavBtn target={'Home'} check={mobileWidth} handler={navHandler} />
            </ul>
        </header>
    )
}

export default Navigation;