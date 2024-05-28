import './SearchPage.css';
import React, { useState, useEffect } from 'react';
import { useSearch, useSearchUpdate } from '../../contexts/SearchContext';
import { Routes, Route, Navigate, useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { appData } from '../../util/assets';
import PageLoader from '../shared/pageLoader/PageLoader';
import AppCard from '../appCard/AppCard';


export default function SearchPage() {
    const [results, setResults] = useState([]);
    const [prevSearch, setPrevSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const searchValue = useSearch();
    const updateSearchValue = useSearchUpdate();
    const navigate = useNavigate();
    const searchDelay = 300; // to simulate real fetch

    // useEffect(() => {
    //     console.log(searchValue);
    // }, [searchValue])

    useEffect(() => {
        // console.log(searchValue);
        if (searchValue != '') loadResults();
        setLoading(false);

        // return () => { updateSearchValue('') }
    }, []);

    function searchOnChangeHandler(e) {
        updateSearchValue(e.target.value);
    };

    function searchOnSubmitHandler(e) {
        e.preventDefault();
        if (searchValue == '') return;

        loadResults();
    };

    function loadResults() {
        if (!appData) return;
        setLoading(true);

        setTimeout(() => {
            let res = appData.filter(x => x.appName.toLowerCase().includes(searchValue.toLowerCase()));
            console.log(res);
            if (res.length > 0) setResults(res);
            else setResults([]);
            setPrevSearch(searchValue);
            setLoading(false);
        }, searchDelay); // forced loading delay to simulate a real fetch from API/DB
    };

    return (
        <div className="search-page-ctr">
            <div id="form-ctr">
                <h1>Search</h1>
                <form onSubmit={searchOnSubmitHandler}>
                    <input
                        type="text"
                        placeholder='Type Keywords...'
                        name='search'
                        autoComplete='off'
                        value={searchValue}
                        onChange={searchOnChangeHandler}
                    />
                    <span className="s-icon material-symbols-outlined"
                        onClick={searchOnSubmitHandler}>search</span>
                </form>
                <h4>Navigate through the app library with a simple search.</h4>
            </div>

            <div id="results-ctr">
                {prevSearch != '' && (loading
                    ? (<PageLoader />)
                    : (<>
                        <div id="s-r-1" className={`cards-cage`}>
                            {results.map(s => (<AppCard key={`${s.id}-apps`} id={s.id} />))}
                            {results.length == 0 && (<h2>No results</h2>)}
                        </div>
                    </>)
                )}
            </div>
        </div>
    )
};