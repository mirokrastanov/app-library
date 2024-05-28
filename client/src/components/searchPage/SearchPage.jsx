import './SearchPage.css';
import React, { useState, useEffect } from 'react';
import { useSearch, useSearchUpdate } from '../../contexts/SearchContext';
import { Routes, Route, Navigate, useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import TechImg from '../shared/techImg/TechImg';
import { appData } from '../../util/assets';
import PageLoader from '../shared/pageLoader/PageLoader';
import PreviewImg from '../shared/previewImg/PreviewImg';
import { EmbeddedVideo } from '../../util/Embeds';
import AppCard from '../appCard/AppCard';

// import { search } from '../../services/showService.js';


export default function SearchPage() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const searchValue = useSearch();
    const updateSearchValue = useSearchUpdate();
    const navigate = useNavigate();

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

    async function searchOnSubmitHandler(e) {
        e.preventDefault();
        if (searchValue == '') return;

        await loadResults();
    };

    async function loadResults() {
        setLoading(true);

        // setResults();
        // setLoading(false);

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
                {searchValue != '' && (results.length > 0) > 0 && (loading
                    ? (<PageLoader />)
                    : (<>
                        <div id="s-r-1" className={`cards-cage`}>
                            {results.map(s => (<AppCard key={`${s.id}-apps`} {...s} />))}
                            {results.length == 0 && (<h2>No results</h2>)}
                        </div>
                    </>)
                )}
            </div>
        </div>
    )
};