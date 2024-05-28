import './SearchPage.css';
import { useSearch, useSearchUpdate } from '../../contexts/SearchContext';
import { Routes, Route, Navigate, useParams, useLocation, Link } from 'react-router-dom';
import TechImg from '../shared/techImg/TechImg';
import { appData } from '../../util/assets';
import PageLoader from '../shared/pageLoader/PageLoader';
import PreviewImg from '../shared/previewImg/PreviewImg';
import { EmbeddedVideo } from '../../util/Embeds';

function SearchPage() {
    return (
        <div>SearchPage</div>
    )
}

export default SearchPage;